import { db } from "@/lib/db";
import { CreateFeedbackInput, Feedback } from "./feedback.types";

export const FeedbackService = {
    async create(data: CreateFeedbackInput): Promise<Feedback> {
        return await db.feedback.create({
            data: {
                title: data.title,
                content: data.content,
                userId: data.userId,
            },
        });
    },

    async getAll(page = 1, limit = 10, search?: string) {
        const skip = (page - 1) * limit;

        const where: any = {};
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { content: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [items, total] = await Promise.all([
            db.feedback.findMany({
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
            db.feedback.count({ where }),
        ]);

        return { items, total };
    },

    async getByUserId(userId: string): Promise<Feedback[]> {
        return await db.feedback.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
    },
};
