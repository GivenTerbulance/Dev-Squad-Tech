import { AdminService } from "@/features/admin/admin.service";
import { isAdmin } from "@/lib/auth-middleware";
import { ApiUtils } from "@/lib/api-utils";

export async function GET() {
    try {
        if (!(await isAdmin())) {
            return ApiUtils.forbidden();
        }

        const stats = await AdminService.getStats();
        return ApiUtils.success(stats);
    } catch (error: any) {
        return ApiUtils.handleError(error);
    }
}
