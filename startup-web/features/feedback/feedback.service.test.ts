import { FeedbackService } from './feedback.service';
import { prismaMock } from '../../jest.setup';

describe('FeedbackService', () => {
    const mockFeedback = {
        id: 'feedback-1',
        title: 'Great App',
        content: 'I really love this app.',
        userId: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {
            id: 'user-1',
            name: 'Test User',
            image: null,
        }
    };

    describe('create', () => {
        it('should create feedback successfully', async () => {
            const input = {
                title: 'Great App',
                content: 'I really love this app.',
                userId: 'user-1',
            };

            // @ts-ignore - simple mock sufficient
            prismaMock.feedback.create.mockResolvedValue(mockFeedback);

            const result = await FeedbackService.create(input);

            expect(result).toEqual(mockFeedback);
            expect(prismaMock.feedback.create).toHaveBeenCalledWith({
                data: input,
            });
        });
    });

    describe('getAll', () => {
        it('should return paginated feedback with total count', async () => {
            prismaMock.feedback.findMany.mockResolvedValue([mockFeedback]);
            prismaMock.feedback.count.mockResolvedValue(1);

            const result = await FeedbackService.getAll(1, 10);

            expect(result.items).toHaveLength(1);
            expect(result.total).toBe(1);
            expect(prismaMock.feedback.findMany).toHaveBeenCalledWith(expect.objectContaining({
                skip: 0,
                take: 10,
            }));
        });

        it('should filter by search term', async () => {
            prismaMock.feedback.findMany.mockResolvedValue([mockFeedback]);
            prismaMock.feedback.count.mockResolvedValue(1);

            await FeedbackService.getAll(1, 10, 'Great');

            expect(prismaMock.feedback.findMany).toHaveBeenCalledWith(expect.objectContaining({
                where: expect.objectContaining({
                    OR: expect.arrayContaining([
                        { title: { contains: 'Great', mode: 'insensitive' } },
                        { content: { contains: 'Great', mode: 'insensitive' } },
                    ]),
                }),
            }));
        });
    });

    describe('getByUserId', () => {
        it('should return feedback list for a specific user', async () => {
            prismaMock.feedback.findMany.mockResolvedValue([mockFeedback]);

            const result = await FeedbackService.getByUserId('user-1');

            expect(result).toHaveLength(1);
            expect(result[0].userId).toBe('user-1');
            expect(prismaMock.feedback.findMany).toHaveBeenCalledWith({
                where: { userId: 'user-1' },
                orderBy: { createdAt: "desc" },
            });
        });
    });
});
