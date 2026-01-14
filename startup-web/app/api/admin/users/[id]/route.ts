import { AdminService } from "@/features/admin/admin.service";
import { isAdmin } from "@/lib/auth-middleware";
import { ApiUtils } from "@/lib/api-utils";
import { z } from "zod";

const UpdateRoleSchema = z.object({
    role: z.enum(["USER", "ADMIN"]),
});

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        if (!(await isAdmin())) return ApiUtils.forbidden();

        const body = await request.json();
        const validation = UpdateRoleSchema.safeParse(body);

        if (!validation.success) {
            return ApiUtils.handleError(validation.error);
        }

        const updatedUser = await AdminService.updateUserRole(params.id, validation.data.role);
        return ApiUtils.success(updatedUser);
    } catch (error: any) {
        return ApiUtils.handleError(error);
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
) {
    try {
        if (!(await isAdmin())) return ApiUtils.forbidden();

        await AdminService.deleteUser(params.id);
        return ApiUtils.success({ message: "User deleted successfully" });
    } catch (error: any) {
        return ApiUtils.handleError(error);
    }
}
