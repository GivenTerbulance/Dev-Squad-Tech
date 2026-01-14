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

    async getAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            db.feedback.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: { user: { select: { name: true, email: true } } },
            }),
            db.feedback.count(),
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
