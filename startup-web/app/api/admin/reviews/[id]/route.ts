import { AdminService } from "@/features/admin/admin.service";
import { isAdmin } from "@/lib/auth-middleware";
import { ApiUtils } from "@/lib/api-utils";

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
) {
    try {
        if (!(await isAdmin())) return ApiUtils.forbidden();

        await AdminService.deleteReview(params.id);
        return ApiUtils.success({ message: "Review deleted successfully" });
    } catch (error: any) {
        return ApiUtils.handleError(error);
    }
}
