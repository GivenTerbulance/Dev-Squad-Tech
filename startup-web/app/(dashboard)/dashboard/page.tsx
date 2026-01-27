import Link from "next/link";
import {
    CalendarIcon,
    CreditCardIcon,
    CheckCircleIcon,
    ArrowRightIcon,
    ClockIcon,
    ChatBubbleLeftRightIcon,
    CodeBracketIcon
} from "@heroicons/react/24/outline";

export default function DashboardPage() {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Section */}
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Project Hub</h1>
                <p className="mt-2 text-slate-600 dark:text-slate-400">Welcome to your dedicated engineering space. Here is the status of your current initiatives.</p>
            </div>

            {/* Quick Actions / Onboarding */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Link href="/dashboard/feedback" className="relative group overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                        <div className="rounded-xl bg-primary-50 p-3 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                            <CalendarIcon className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Book Kickoff Call</h3>
                            <p className="text-xs text-slate-500">Secure your strategy session</p>
                        </div>
                    </div>
                    <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 py-2.5 text-sm font-bold text-slate-900 dark:bg-slate-800 dark:text-white hover:bg-primary-600 hover:text-white transition-all">
                        Schedule Now <ArrowRightIcon className="h-4 w-4" />
                    </button>
                </Link>

                <Link href="/dashboard/billing" className="relative group overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                        <div className="rounded-xl bg-primary-50 p-3 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                            <CreditCardIcon className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Secure Deposit</h3>
                            <p className="text-xs text-slate-500">Initialize your project build</p>
                        </div>
                    </div>
                    <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-500/20 hover:bg-primary-500 transition-all">
                        Pay via Stripe <ArrowRightIcon className="h-4 w-4" />
                    </button>
                </Link>

                <Link href="/dashboard/reviews" className="relative group overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                        <div className="rounded-xl bg-primary-50 p-3 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                            <ChatBubbleLeftRightIcon className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Project Brief</h3>
                            <p className="text-xs text-slate-500">Upload your requirements</p>
                        </div>
                    </div>
                    <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 py-2.5 text-sm font-bold text-slate-900 dark:bg-slate-800 dark:text-white hover:bg-primary-600 hover:text-white transition-all">
                        Open Form <ArrowRightIcon className="h-4 w-4" />
                    </button>
                </Link>
            </div>

            {/* Project Timeline Section */}
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Project Roadmap</h2>
                    <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                        Solution Build
                    </span>
                </div>

                <div className="relative">
                    {/* Progress Bar Line */}
                    <div className="absolute left-4 top-0 h-full w-0.5 bg-slate-100 dark:bg-slate-800 lg:left-0 lg:top-4 lg:h-0.5 lg:w-full"></div>

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
                        {/* Step 1 */}
                        <div className="relative flex lg:flex-col lg:items-center text-center">
                            <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg shadow-primary-500/30">
                                <CheckCircleIcon className="h-5 w-5" />
                            </div>
                            <div className="ml-6 lg:ml-0 lg:mt-6">
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Discovery & Audit</p>
                                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Strategy & Requirements Mapping</p>
                                <p className="mt-2 text-[10px] uppercase tracking-wider font-bold text-primary-600">Completed</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative flex lg:flex-col lg:items-center text-center">
                            <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary-600 bg-white dark:bg-slate-950 text-primary-600 ring-4 ring-primary-50 dark:ring-primary-900/20">
                                <ClockIcon className="h-5 w-5 animate-pulse" />
                            </div>
                            <div className="ml-6 lg:ml-0 lg:mt-6">
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Solution Design</p>
                                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Architecture & Technical Specs</p>
                                <p className="mt-2 text-[10px] uppercase tracking-wider font-bold text-primary-500 animate-pulse">In Progress</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative flex lg:flex-col lg:items-center text-center">
                            <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                                <CodeBracketIcon className="h-5 w-5" />
                            </div>
                            <div className="ml-6 lg:ml-0 lg:mt-6 text-slate-400">
                                <p className="text-sm font-bold">Engineering Build</p>
                                <p className="mt-2 text-xs">Agile Development Sprints</p>
                                <p className="mt-2 text-[10px] uppercase tracking-wider font-bold">Upcoming</p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="relative flex lg:flex-col lg:items-center text-center text-slate-400">
                            <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                                <ArrowRightIcon className="h-5 w-5" />
                            </div>
                            <div className="ml-6 lg:ml-0 lg:mt-6">
                                <p className="text-sm font-bold">Testing & Delivery</p>
                                <p className="mt-2 text-xs">QA, Security & Handover</p>
                                <p className="mt-2 text-[10px] uppercase tracking-wider font-bold">Upcoming</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
