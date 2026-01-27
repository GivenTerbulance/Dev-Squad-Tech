import { BillingService } from "@/features/billing/billing.service";
import { getAuthUser } from "@/lib/auth-middleware";
import { ApiUtils } from "@/lib/api-utils";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const user = await getAuthUser();
        if (!user) {
            return ApiUtils.unauthorized();
        }

        const body = await request.json();
        const { amount = 5000 } = body; // Default R5000 deposit

        // 1. Create a local invoice record first (Status: PENDING)
        const invoice = await BillingService.createDepositInvoice(user.id, amount);

        // 2. Create Stripe Checkout Session
        try {
            const url = await BillingService.createCheckoutSession(
                user.id,
                user.email || "",
                invoice.id,
                amount
            );

            if (!url) {
                return ApiUtils.error("Failed to generate checkout URL", 500);
            }

            return ApiUtils.success({ url });
        } catch (stripeError: any) {
            console.error("Stripe Error:", stripeError);
            return ApiUtils.error("Billing system misconfigured (Missing API Keys)", 503);
        }

    } catch (error: any) {
        return ApiUtils.handleError(error);
    }
}
