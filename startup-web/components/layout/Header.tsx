"use client";

import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function Header() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        fetch("/api/users/me")
            .then((res) => {
                if (res.ok) return res.json();
                return null;
            })
            .then(setUser)
            .catch(console.error);
    }, []);

    return (
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:bg-slate-900/80 dark:border-slate-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-slate-700 lg:hidden dark:text-white">
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="relative flex flex-1"></div>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <button type="button" className="-m-2.5 p-2.5 text-slate-400 hover:text-slate-500">
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
                    <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800">
                        {user ? (
                            <>
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.name || "User"}
                                        className="h-8 w-8 rounded-full object-cover bg-primary-100"
                                    />
                                ) : (
                                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                                        {(user.name?.[0] || user.email?.[0] || "U").toUpperCase()}
                                    </div>
                                )}
                                <span className="hidden lg:flex lg:items-center">
                                    <span className="ml-4 text-sm font-semibold leading-6 text-slate-900 dark:text-white" aria-hidden="true">
                                        {user.name || "User"}
                                    </span>
                                </span>
                            </>
                        ) : (
                            <div className="h-8 w-8 rounded-full bg-slate-100 animate-pulse"></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
