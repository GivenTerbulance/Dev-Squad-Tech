import { db } from "@/lib/db";

export const AdminService = {
    async getStats() {
        const [totalUsers, totalReviews, totalFeedback, avgRating] = await Promise.all([
            db.user.count(),
            db.review.count(),
            db.feedback.count(),
            db.review.aggregate({
                _avg: {
                    rating: true,
                },
            }),
        ]);

        return {
            totalUsers,
            totalReviews,
            totalFeedback,
            averageRating: avgRating._avg.rating || 0,
        };
    },

    async getUsers(page = 1, limit = 10, search?: string) {
        const skip = (page - 1) * limit;

        const where: any = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [items, total] = await Promise.all([
            db.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    _count: {
                        select: {
                            reviews: true,
                            feedback: true,
                        },
                    },
                },
            }),
            db.user.count({ where }),
        ]);

        return { items, total };
    },

    async updateUserRole(userId: string, role: 'USER' | 'ADMIN') {
        return await db.user.update({
            where: { id: userId },
            data: { role },
            select: { id: true, email: true, role: true }
        });
    },

    async deleteUser(userId: string) {
        // This will also delete their reviews and feedback due to DB constraints if set, 
        // otherwise we might need to handle it manually. 
        // In our schema, we don't have onDelete: Cascade explicitly, so let's be safe.
        await db.$transaction([
            db.review.deleteMany({ where: { userId } }),
            db.feedback.deleteMany({ where: { userId } }),
            db.user.delete({ where: { id: userId } }),
        ]);
    },

    async deleteReview(reviewId: string) {
        return await db.review.delete({
            where: { id: reviewId },
        });
    },
};
