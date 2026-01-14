import { AuthService } from "@/features/auth/auth.service";
import { LoginSchema } from "@/features/auth/auth.schema";
import { ApiUtils } from "@/lib/api-utils";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validation = LoginSchema.safeParse(body);

        if (!validation.success) {
            return ApiUtils.handleError(validation.error);
        }

        const result = await AuthService.login(validation.data);
        return ApiUtils.success(result);
    } catch (error: any) {
        return ApiUtils.handleError(error);
    }
}
