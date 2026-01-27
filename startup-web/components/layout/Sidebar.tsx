"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    HomeIcon,
    CodeBracketIcon,
    CalendarIcon,
    DocumentIcon,
    CreditCardIcon,
    Cog6ToothIcon
} from "@heroicons/react/24/outline";

const navigation = [
    { name: 'Project Hub', href: '/dashboard', icon: HomeIcon },
    { name: 'Active Sprints', href: '/dashboard/reviews', icon: CodeBracketIcon },
    { name: 'Consultations', href: '/dashboard/feedback', icon: CalendarIcon },
    { name: 'Documents', href: '/dashboard/settings', icon: DocumentIcon },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCardIcon },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                    <Link href="/" className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                        Dev Squad <span className="text-primary-600">Tech</span>
                    </Link>
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {navigation.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={classNames(
                                                    isActive
                                                        ? 'bg-slate-50 text-primary-600 dark:bg-slate-800 dark:text-primary-400'
                                                        : 'text-slate-700 hover:text-primary-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors'
                                                )}
                                            >
                                                <item.icon
                                                    className={classNames(
                                                        isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 group-hover:text-primary-600 dark:group-hover:text-white',
                                                        'h-6 w-6 shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                        <li className="mt-auto">
                            <Link
                                href="/dashboard/settings"
                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-slate-700 hover:bg-slate-50 hover:text-primary-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                            >
                                <Cog6ToothIcon
                                    className="h-6 w-6 shrink-0 text-slate-400 group-hover:text-primary-600 dark:group-hover:text-white"
                                    aria-hidden="true"
                                />
                                Settings
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
