import { UserService } from "@/features/users/user.service";
import { UpdateProfileSchema } from "@/features/users/user.schema";
import { getAuthUser } from "@/lib/auth-middleware";
import { ApiUtils } from "@/lib/api-utils";

export async function GET() {
    try {
        const user = await getAuthUser();
        if (!user) return ApiUtils.unauthorized();

        const profile = await UserService.getProfile(user.id);
        if (!profile) return ApiUtils.notFound("User not found");

        return ApiUtils.success(profile);
    } catch (error: any) {
        return ApiUtils.handleError(error);
    }
}

export async function PATCH(request: Request) {
    try {
        const user = await getAuthUser();
        if (!user) return ApiUtils.unauthorized();

        const body = await request.json();
        const validation = UpdateProfileSchema.safeParse(body);

        if (!validation.success) {
            return ApiUtils.handleError(validation.error);
        }

        const updatedProfile = await UserService.updateProfile(user.id, validation.data);
        return ApiUtils.success(updatedProfile);
    } catch (error: any) {
        return ApiUtils.handleError(error);
    }
}
