import { ReviewService } from "@/features/reviews/review.service";
import { CreateReviewSchema } from "@/features/reviews/review.schema";
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
        const validation = CreateReviewSchema.safeParse(body);

        if (!validation.success) {
            return ApiUtils.handleError(validation.error);
        }

        const review = await ReviewService.create({
            ...validation.data,
            userId: user.id
        });
        return ApiUtils.success(review, 201);
    } catch (error: any) {
        return ApiUtils.handleError(error);
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const mine = searchParams.get("mine") === "true";

        if (mine) {
            const user = await getAuthUser();
            if (!user) {
                return ApiUtils.unauthorized();
            }
            const reviews = await ReviewService.getByUserId(user.id);
            return ApiUtils.success(reviews);
        }

        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search = searchParams.get("search") || undefined;
        const rating = searchParams.get("rating") ? parseInt(searchParams.get("rating")!) : undefined;

        const { items, total } = await ReviewService.getAll(page, limit, search, rating);
        return ApiUtils.success(items, 200, { page, limit, total });
    } catch (error: any) {
        return ApiUtils.handleError(error);
    }
}
