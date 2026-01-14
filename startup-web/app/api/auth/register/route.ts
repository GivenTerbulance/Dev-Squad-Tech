import { AuthService } from "@/features/auth/auth.service";
import { RegisterSchema } from "@/features/auth/auth.schema";
import { ApiUtils } from "@/lib/api-utils";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validation = RegisterSchema.safeParse(body);

        if (!validation.success) {
            return ApiUtils.handleError(validation.error);
        }

        const result = await AuthService.register(validation.data);
        return ApiUtils.success(result, 201);
    } catch (error: any) {
        return ApiUtils.handleError(error);
    }
}
