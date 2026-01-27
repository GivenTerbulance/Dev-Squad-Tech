import { BillingService } from "@/features/billing/billing.service";
import { getAuthUser } from "@/lib/auth-middleware";
import { ApiUtils } from "@/lib/api-utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const user = await getAuthUser();
        if (!user) {
            return ApiUtils.unauthorized();
        }

        const invoices = await BillingService.getUserInvoices(user.id);
        return ApiUtils.success(invoices);
    } catch (error: any) {
        return ApiUtils.handleError(error);
    }
}
