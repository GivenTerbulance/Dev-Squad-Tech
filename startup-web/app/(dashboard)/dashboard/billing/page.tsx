"use client";

import { useEffect, useState } from "react";
import { CreditCardIcon, CheckCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

interface Invoice {
    id: string;
    amount: number;
    status: "PENDING" | "PAID" | "FAILED";
    createdAt: string;
    currency: string;
}

export default function BillingPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    useEffect(() => {
        fetch("/api/billing")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setInvoices(data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        try {
            const res = await fetch("/api/billing/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: 5000 }), // Default R5000 deposit
            });

            const data = await res.json();

            if (res.ok && data.url) {
                window.location.href = data.url;
            } else {
                alert(data.error || "Failed to initiate checkout");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="border-b border-slate-200 pb-5 dark:border-slate-800">
                <h3 className="text-base font-semibold leading-6 text-slate-900 dark:text-white">Billing & Invoices</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Manage your project payments and view invoice history.</p>
            </div>

            {/* Quick Action: Pay Deposit */}
            <div className="rounded-xl border border-primary-100 bg-primary-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 dark:border-primary-900/50 dark:bg-primary-900/10">
                <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary-100 p-3 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                        <CreditCardIcon className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold leading-6 text-primary-900 dark:text-primary-100">Project Deposit</h3>
                        <p className="mt-1 text-sm text-primary-700 dark:text-primary-300">Secure your development slot with a 50% deposit.</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-primary-900 dark:text-white">R 5,000.00</p>
                    <button
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="mt-2 w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isCheckingOut ? (
                            <>
                                <ArrowPathIcon className="h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Pay Now via Stripe"
                        )}
                    </button>
                </div>
            </div>

            {/* Invoice List */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/50">
                    <h3 className="text-base font-semibold leading-6 text-slate-900 dark:text-white">Invoice History</h3>
                </div>

                {loading ? (
                    <div className="p-6 space-y-4 animate-pulse">
                        <div className="h-12 bg-slate-100 rounded-md dark:bg-slate-800"></div>
                        <div className="h-12 bg-slate-100 rounded-md dark:bg-slate-800"></div>
                    </div>
                ) : invoices.length === 0 ? (
                    <div className="text-center py-12 px-6">
                        <p className="text-sm text-slate-500">No invoices generated yet.</p>
                    </div>
                ) : (
                    <ul role="list" className="divide-y divide-slate-200 dark:divide-slate-800">
                        {invoices.map((invoice) => (
                            <li key={invoice.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        Invoice #{invoice.id.slice(0, 8).toUpperCase()}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        {new Date(invoice.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${invoice.status === 'PAID'
                                            ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/20 dark:text-green-400 dark:ring-green-900/10'
                                            : invoice.status === 'PENDING'
                                                ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-900/20 dark:text-yellow-500 dark:ring-yellow-900/10'
                                                : 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/20 dark:text-red-400 dark:ring-red-900/10'
                                        }`}>
                                        {invoice.status}
                                    </span>
                                    <p className="text-sm font-mono font-semibold text-slate-900 dark:text-white">
                                        R {invoice.amount.toLocaleString()}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
