import { NextResponse } from "next/server";
import { ZodError } from "zod";

export type ApiResponse<T = any> = {
    success: boolean;
    data?: T;
    error?: string;
    details?: any;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
    };
};

export const ApiUtils = {
    success<T>(data: T, status = 200, meta?: ApiResponse["meta"]) {
        return NextResponse.json(
            {
                success: true,
                data,
                meta,
            },
            { status }
        );
    },

    error(message: string, status = 500, details?: any) {
        return NextResponse.json(
            {
                success: false,
                error: message,
                details,
            },
            { status }
        );
    },

    badRequest(message: string, details?: any) {
        return this.error(message, 400, details);
    },

    unauthorized(message = "Unauthorized") {
        return this.error(message, 401);
    },

    forbidden(message = "Forbidden") {
        return this.error(message, 403);
    },

    notFound(message = "Not found") {
        return this.error(message, 404);
    },

    handleError(err: any) {
        console.error("API Error:", err);

        if (err instanceof ZodError) {
            return this.badRequest("Validation failed", err.format());
        }

        if (err.message === "Unauthorized" || err.message === "Invalid credentials") {
            return this.unauthorized(err.message);
        }

        if (err.message === "Forbidden") {
            return this.forbidden();
        }

        // Handle specific Prisma errors if needed
        if (err.code?.startsWith("P")) {
            return this.error("Database error occurred", 500, { code: err.code });
        }

        return this.error(err.message || "An unexpected error occurred");
    },
};
