import { db } from "@/lib/db";
import { CreateReviewInput, Review } from "./reviews.types";

export const ReviewService = {
    async create(data: CreateReviewInput): Promise<Review> {
        return await db.review.create({
            data: {
                rating: data.rating,
                comment: data.comment,
                userId: data.userId,
            },
        });
    },

    async getAll(page = 1, limit = 10, search?: string, rating?: number) {
        const skip = (page - 1) * limit;

        const where: any = {};
        if (rating) where.rating = rating;
        if (search) {
            where.comment = {
                contains: search,
                mode: 'insensitive',
            };
        }

        const [items, total] = await Promise.all([
            db.review.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                },
            }),
            db.review.count({ where }),
        ]);

        return { items, total };
    },

    async getByUserId(userId: string): Promise<Review[]> {
        return await db.review.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
    },

    async delete(id: string, userId: string): Promise<void> {
        await db.review.delete({
            where: { id, userId },
        });
    },
};
