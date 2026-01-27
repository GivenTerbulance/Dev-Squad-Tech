"use client";

import { useEffect, useState } from "react";
import { UsersIcon, StarIcon, ChatBubbleLeftRightIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

interface Stats {
    users: number;
    reviews: number;
    feedback: number;
    revenue: number; // Mock revenue if not provided
}

export default function AdminStats() {
    const [stats, setStats] = useState<Stats>({ users: 0, reviews: 0, feedback: 0, revenue: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/stats")
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error("Failed to fetch stats");
            })
            .then((data) => setStats({ ...data, revenue: data.revenue || 0 }))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const statItems = [
        { name: 'Total Users', value: stats.users, icon: UsersIcon, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { name: 'Total Revenue', value: `R ${stats.revenue.toLocaleString()}`, icon: CurrencyDollarIcon, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
        { name: 'Active Reviews', value: stats.reviews, icon: StarIcon, color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
        { name: 'Feedback Items', value: stats.feedback, icon: ChatBubbleLeftRightIcon, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    ];

    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-xl bg-white p-6 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800 animate-pulse">
                        <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 mb-4"></div>
                        <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 mb-2"></div>
                        <div className="h-8 w-16 bg-slate-100 dark:bg-slate-800"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {statItems.map((item) => (
                <div key={item.name} className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800 transition-all hover:shadow-md">
                    <dt>
                        <div className={`absolute rounded-md p-3 ${item.bg}`}>
                            <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                        </div>
                        <p className="ml-16 truncate text-sm font-medium text-slate-500 dark:text-slate-400">{item.name}</p>
                    </dt>
                    <dd className="ml-16 flex items-baseline pb-1 sm:pb-2">
                        <p className="text-2xl font-semibold text-slate-900 dark:text-white">{item.value}</p>
                    </dd>
                </div>
            ))}
        </div>
    );
}
