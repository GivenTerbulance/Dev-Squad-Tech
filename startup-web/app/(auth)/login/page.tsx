"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                let message = data.error || data.message || "Failed to login";

                // Extract specific validation errors if available
                if (data.details) {
                    if (data.details.email?._errors) {
                        message = data.details.email._errors[0];
                    } else if (data.details.password?._errors) {
                        message = data.details.password._errors[0];
                    } else if (data.details._errors?.[0]) {
                        message = data.details._errors[0];
                    }
                }

                throw new Error(message);
            }

            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full">
            {/* Left Side - Marketing/Testimonial */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative flex-col justify-between p-12 text-white">
                <div className="z-10">
                    <Link href="/" className="font-bold text-xl tracking-tight">Startup Web</Link>
                </div>
                <div className="z-10 relative max-w-lg">
                    <blockquote className="text-2xl font-medium leading-relaxed">
                        "This project transformed how we ship software. It used to take months to get off the ground, now we launch in days."
                    </blockquote>
                    <div className="mt-8 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center font-bold">JD</div>
                        <div>
                            <div className="font-semibold">Jane Doe</div>
                            <div className="text-slate-400 text-sm">CTO, TechCorp</div>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-slate-900 opacity-50 z-0"></div>
                {/* Abstract pattern */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-primary-600 rounded-full blur-[120px] opacity-20 z-0"></div>
            </div>

            {/* Right Side - Form */}
            <div className="flex w-full lg:w-1/2 flex-col justify-center items-center p-8 bg-slate-50 dark:bg-slate-950">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome back</h2>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Enter your credentials to access your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Email address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-md bg-primary-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>

                        <div className="text-center text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Don't have an account? </span>
                            <Link href="/register" className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
                                Create an account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
