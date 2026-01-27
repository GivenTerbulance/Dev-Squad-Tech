import { BillingService } from "@/features/billing/billing.service";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-12-15.clover" as any })
    : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
    if (!stripe || !webhookSecret) {
        return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
    }

    const body = await request.text();
    const signature = (await headers()).get("stripe-signature");

    if (!signature) {
        return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`⚠️  Webhook signature verification failed.`, err.message);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    try {
        await BillingService.handleWebhook(event);
        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook handler failed:", error);
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
    }
}
