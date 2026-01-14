import { db } from "@/lib/db";
import { UpdateProfileData } from "./user.schema";

export const UserService = {
    async updateProfile(userId: string, data: UpdateProfileData) {
        return await db.user.update({
            where: { id: userId },
            data: {
                name: data.name,
                image: data.image,
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    },

    async getProfile(userId: string) {
        return await db.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    },
};
