import { db } from "@/lib/db";
import Stripe from "stripe";

// This will fail if key is missing, so we wrap in try-catch or explicit check in methods
const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-12-15.clover" as any })
    : null;

export const BillingService = {
    async createDepositInvoice(userId: string, amount: number = 5000) {
        // Create local invoice record
        return await db.invoice.create({
            data: {
                userId,
                amount,
                status: "PENDING",
            },
        });
    },

    async createCheckoutSession(userId: string, email: string, invoiceId: string, amount: number) {
        if (!stripe) {
            throw new Error("Stripe is not configured");
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "zar",
                        product_data: {
                            name: "Project Deposit",
                            description: "Initial deposit to secure development slot",
                        },
                        unit_amount: amount * 100, // Stripe expects cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/billing?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/billing?canceled=true`,
            customer_email: email,
            metadata: {
                userId,
                invoiceId,
            },
        });

        // Update invoice with session ID
        await db.invoice.update({
            where: { id: invoiceId },
            data: { stripeSessionId: session.id },
        });

        return session.url;
    },

    async getUserInvoices(userId: string) {
        return await db.invoice.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
    },

    async handleWebhook(event: Stripe.Event) {
        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            const invoiceId = session.metadata?.invoiceId;

            if (invoiceId) {
                await db.invoice.update({
                    where: { id: invoiceId },
                    data: { status: "PAID" },
                });
            }
        }
    },
};
