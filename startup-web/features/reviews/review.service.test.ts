import { ReviewService } from './review.service';
import { prismaMock } from '../../jest.setup';

describe('ReviewService', () => {
    const mockReview = {
        id: 'review-1',
        rating: 5,
        comment: 'Great service!',
        userId: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    describe('create', () => {
        it('should create a review successfully', async () => {
            const data = {
                rating: 5,
                comment: 'Great service!',
                userId: 'user-1',
            };

            prismaMock.review.create.mockResolvedValue(mockReview);

            const result = await ReviewService.create(data);

            expect(result.id).toBe(mockReview.id);
            expect(prismaMock.review.create).toHaveBeenCalledWith({
                data,
            });
        });
    });

    describe('getAll', () => {
        it('should return paginated reviews', async () => {
            const mockItems = [mockReview];
            const mockTotal = 1;

            prismaMock.review.findMany.mockResolvedValue(mockItems);
            prismaMock.review.count.mockResolvedValue(mockTotal);

            const result = await ReviewService.getAll(1, 10);

            expect(result.items).toHaveLength(1);
            expect(result.total).toBe(1);
            expect(prismaMock.review.findMany).toHaveBeenCalled();
        });
    });

    describe('delete', () => {
        it('should delete a review if owner', async () => {
            prismaMock.review.delete.mockResolvedValue(mockReview);

            await ReviewService.delete('review-1', 'user-1');

            expect(prismaMock.review.delete).toHaveBeenCalledWith({
                where: { id: 'review-1', userId: 'user-1' },
            });
        });
    });
});
