import { FeedbackService } from "@/features/feedback/feedback.service";
import { CreateFeedbackSchema } from "@/features/feedback/feedback.schema";
import { getAuthUser } from "@/lib/auth-middleware";
import { ApiUtils } from "@/lib/api-utils";
import { NextRequest } from "next/server";

export async function POST(request: Request) {
    try {
        const user = await getAuthUser();

        if (!user) {
            return ApiUtils.unauthorized();
        }

        const body = await request.json();
        const validation = CreateFeedbackSchema.safeParse(body);

        if (!validation.success) {
            return ApiUtils.handleError(validation.error);
        }

        const feedback = await FeedbackService.create({
            ...validation.data,
            userId: user.id
        });
        return ApiUtils.success(feedback, 201);
    } catch (error: any) {
        return ApiUtils.handleError(error);
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search = searchParams.get("search") || undefined;

        const { items, total } = await FeedbackService.getAll(page, limit, search);
        return ApiUtils.success(items, 200, { page, limit, total });
    } catch (error: any) {
        return ApiUtils.handleError(error);
    }
}
