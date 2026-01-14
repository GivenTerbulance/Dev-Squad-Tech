import { db } from "@/lib/db";
import {
    AuthResponse,
    LoginCredentials,
    RegisterCredentials,
} from "./auth.types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Use a secure secret in production!
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev-only";

export const AuthService = {
    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        const { email, password, name } = credentials;

        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: "USER",
            },
        });

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                image: user.image,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            token,
        };
    },

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const { email, password } = credentials;

        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                image: user.image,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            token,
        };
    },
};
