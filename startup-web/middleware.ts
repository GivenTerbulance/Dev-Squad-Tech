import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev-only";
const secret = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
    // Only apply to specific API routes
    if (
        request.nextUrl.pathname.startsWith("/api/reviews") ||
        request.nextUrl.pathname.startsWith("/api/feedback") ||
        request.nextUrl.pathname.startsWith("/api/admin")
    ) {
        const authHeader = request.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];

        try {
            const { payload } = await jwtVerify(token, secret);

            // Clone the headers and add user info
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set("x-user-id", payload.userId as string);
            requestHeaders.set("x-user-email", payload.email as string);
            requestHeaders.set("x-user-role", payload.role as string);

            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        } catch (error) {
            return NextResponse.json(
                { error: "Invalid or expired token" },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/api/reviews/:path*", "/api/feedback/:path*", "/api/admin/:path*"],
};
