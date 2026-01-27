"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Solutions', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'About', href: '#footer-heading' },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
            }`}>
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                        DEV SQUAD<span className="text-primary-600">.</span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700 dark:text-slate-200"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-bold leading-6 text-slate-700 hover:text-primary-600 dark:text-slate-200 dark:hover:text-primary-400 transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6 lg:items-center">
                    <Link href="/login" className="text-sm font-bold leading-6 text-slate-900 dark:text-white hover:text-primary-600 transition-colors">
                        Log in
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-full bg-primary-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-600/20 hover:bg-primary-500 transition-all active:scale-95"
                    >
                        Start Project
                    </Link>
                </div>
            </nav>

            {/* Mobile menu */}
            <div className={`lg:hidden ${mobileMenuOpen ? 'fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-slate-950 px-6 py-6 transition-all duration-300' : 'hidden'}`}>
                <div className="flex items-center justify-between">
                    <Link href="/" className="-m-1.5 p-1.5 text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                        DEV SQUAD<span className="text-primary-600">.</span>
                    </Link>
                    <button
                        type="button"
                        className="-m-2.5 rounded-md p-2.5 text-slate-700 dark:text-slate-200"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-slate-200 dark:divide-slate-800">
                        <div className="space-y-2 py-6">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-bold leading-7 text-slate-900 hover:bg-slate-50 dark:text-white dark:hover:bg-slate-900 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="py-6 space-y-4 text-center">
                            <Link
                                href="/login"
                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-bold leading-7 text-slate-900 hover:bg-slate-50 dark:text-white dark:hover:bg-slate-900"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Log in
                            </Link>
                            <Link
                                href="/register"
                                className="block rounded-full bg-primary-600 px-3 py-3 text-base font-bold leading-7 text-white shadow-lg shadow-primary-600/20 hover:bg-primary-500"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Start Project
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
