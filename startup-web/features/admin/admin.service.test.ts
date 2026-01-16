import { AdminService } from './admin.service';
import { prismaMock } from '../../jest.setup';

describe('AdminService', () => {
    describe('getStats', () => {
        it('should return system statistics', async () => {
            prismaMock.user.count.mockResolvedValue(10);
            prismaMock.review.count.mockResolvedValue(5);
            prismaMock.feedback.count.mockResolvedValue(3);
            prismaMock.review.aggregate.mockResolvedValue({
                _avg: { rating: 4.5 },
                _count: { rating: 5 },
                _sum: { rating: 22.5 },
                _min: { rating: 1 },
                _max: { rating: 5 },
            });

            const result = await AdminService.getStats();

            expect(result).toEqual({
                totalUsers: 10,
                totalReviews: 5,
                totalFeedback: 3,
                averageRating: 4.5,
            });
        });
    });

    describe('getUsers', () => {
        it('should return paginated users with counts', async () => {
            const mockUsers = [
                {
                    id: 'user-1',
                    name: 'User 1',
                    email: 'u1@test.com',
                    role: 'USER' as const,
                    createdAt: new Date(),
                    _count: { reviews: 2, feedback: 1 }
                }
            ];

            prismaMock.user.findMany.mockResolvedValue(mockUsers as any);
            prismaMock.user.count.mockResolvedValue(1);

            const result = await AdminService.getUsers(1, 10);

            expect(result.items).toHaveLength(1);
            expect(result.total).toBe(1);
            expect(prismaMock.user.findMany).toHaveBeenCalledWith(expect.objectContaining({
                skip: 0,
                take: 10,
                select: expect.objectContaining({
                    _count: {
                        select: { reviews: true, feedback: true }
                    }
                })
            }));
        });
    });

    describe('updateUserRole', () => {
        it('should update user role', async () => {
            const updatedUser = { id: 'user-1', email: 'test@test.com', role: 'ADMIN' as const };
            prismaMock.user.update.mockResolvedValue(updatedUser as any);

            const result = await AdminService.updateUserRole('user-1', 'ADMIN');

            expect(result.role).toBe('ADMIN');
            expect(prismaMock.user.update).toHaveBeenCalledWith({
                where: { id: 'user-1' },
                data: { role: 'ADMIN' },
                select: expect.any(Object),
            });
        });
    });

    describe('deleteUser', () => {
        it('should delete user and related data in transaction', async () => {
            prismaMock.user.delete.mockResolvedValue({} as any);
            prismaMock.review.deleteMany.mockResolvedValue({ count: 5 });
            prismaMock.feedback.deleteMany.mockResolvedValue({ count: 2 });
            prismaMock.$transaction.mockImplementation((callback: any) => {
                if (Array.isArray(callback)) {
                    return Promise.resolve(callback);
                }
                // @ts-ignore
                return callback(prismaMock);
            });

            await AdminService.deleteUser('user-1');

            expect(prismaMock.review.deleteMany).toHaveBeenCalledWith({ where: { userId: 'user-1' } });
            expect(prismaMock.feedback.deleteMany).toHaveBeenCalledWith({ where: { userId: 'user-1' } });
            expect(prismaMock.user.delete).toHaveBeenCalledWith({ where: { id: 'user-1' } });
            expect(prismaMock.$transaction).toHaveBeenCalled();
        });
    });

    describe('deleteReview', () => {
        it('should delete a review', async () => {
            prismaMock.review.delete.mockResolvedValue({} as any);

            await AdminService.deleteReview('review-1');

            expect(prismaMock.review.delete).toHaveBeenCalledWith({
                where: { id: 'review-1' },
            });
        });
    });
});
