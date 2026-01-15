import { AdminService } from "@/features/admin/admin.service";
import { isAdmin } from "@/lib/auth-middleware";
import { ApiUtils } from "@/lib/api-utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        if (!(await isAdmin())) {
            return ApiUtils.forbidden();
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search = searchParams.get("search") || undefined;

        const { items, total } = await AdminService.getUsers(page, limit, search);
        return ApiUtils.success(items, 200, { page, limit, total });
    } catch (error: any) {
        return ApiUtils.handleError(error);
    }
}
