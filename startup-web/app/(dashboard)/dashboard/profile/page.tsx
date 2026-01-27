"use client";

import { useEffect, useState } from "react";
import ProfileForm from "@/components/profile/ProfileForm";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/users/me");
                if (!res.ok) throw new Error("Failed to load profile");
                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="max-w-4xl animate-pulse">
                <div className="h-8 w-48 bg-slate-200 rounded dark:bg-slate-800 mb-8"></div>
                <div className="h-64 bg-slate-200 rounded dark:bg-slate-800"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-4xl text-center py-12">
                <p className="text-slate-500">Failed to load profile data.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl">
            <div className="border-b border-slate-200 pb-5 dark:border-slate-800 mb-8">
                <h3 className="text-base font-semibold leading-6 text-slate-900 dark:text-white">Profile</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Manage your personal information.</p>
            </div>

            <div className="flex flex-col gap-8">
                {/* Avatar Display Section */}
                <div className="flex items-center gap-x-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                    {user.image ? (
                        <img
                            src={user.image}
                            alt={user.name || "User"}
                            className="h-20 w-20 rounded-full object-cover bg-slate-100"
                        />
                    ) : (
                        <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center text-2xl font-bold text-primary-600">
                            {(user.name?.[0] || user.email[0]).toUpperCase()}
                        </div>
                    )}

                    <div>
                        <h3 className="text-base font-semibold leading-7 tracking-tight text-slate-900 dark:text-white">
                            {user.name || "User"}
                        </h3>
                        <p className="text-sm font-semibold leading-6 text-primary-600">{user.role}</p>
                    </div>
                </div>

                {/* Form Section */}
                <ProfileForm initialData={user} />
            </div>
        </div>
    )
}
