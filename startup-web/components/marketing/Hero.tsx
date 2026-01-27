import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-20 pb-20 lg:pt-32 bg-slate-50 dark:bg-slate-950">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl opacity-20 pointer-events-none" aria-hidden="true">
                <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary-400 to-primary-800"
                    style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
                />
            </div>

            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 dark:border-primary-900/30 dark:bg-primary-900/20 dark:text-primary-400 mb-8 animate-fade-in">
                        <span className="flex h-2 w-2 rounded-full bg-primary-600 animate-pulse"></span>
                        South Africa's Premier Dev House
                    </div>

                    <h1 className="mx-auto max-w-4xl font-sans text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-7xl lg:text-8xl animate-fade-in leading-[1.1]">
                        World-class software, <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">built in Mzansi</span>.
                    </h1>

                    <p className="mx-auto mt-8 max-w-2xl text-xl text-slate-600 dark:text-slate-300 animate-slide-up leading-relaxed">
                        We are the elite engineering squad dedicated to solving Africa's toughest business
                        challenges with custom software, AI integration, and high-performance systems.
                    </p>

                    <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                        <Link
                            href="/register"
                            className="rounded-full bg-primary-600 px-10 py-4 text-base font-bold text-white shadow-xl shadow-primary-500/20 hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all hover:scale-105 active:scale-95"
                        >
                            Start Your Project
                        </Link>
                        <Link
                            href="/login"
                            className="rounded-full border border-slate-300 bg-white/80 backdrop-blur-sm dark:bg-slate-900/50 dark:border-slate-800 px-10 py-4 text-base font-bold text-slate-900 dark:text-white shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
                        >
                            View Case Studies <span aria-hidden="true" className="ml-1">→</span>
                        </Link>
                    </div>

                    {/* Trusted by section */}
                    <div className="mt-20 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-8">Trusted by innovators across the continent</p>
                        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale contrast-125 dark:invert">
                            {/* Placeholder for logos - using CSS shapes or text for simplicity */}
                            <div className="text-2xl font-black text-slate-900 tracking-tighter italic flex items-center gap-2">
                                <div className="h-6 w-6 rounded-sm bg-slate-900"></div> JOZI HUB
                            </div>
                            <div className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-slate-900"></div> CAPE VENTURES
                            </div>
                            <div className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-1">
                                <div className="h-5 w-5 bg-slate-900 rotate-45"></div> KZN Digital
                            </div>
                            <div className="text-xl font-mono font-bold text-slate-900">AFRICA_TECH</div>
                        </div>
                    </div>

                    {/* Product Mockup */}
                    <div className="mt-24 relative w-full max-w-6xl mx-auto animate-slide-up" style={{ animationDelay: "0.6s" }}>
                        <div className="absolute inset-0 bg-primary-500/10 blur-[100px] -z-10 rounded-full scale-110"></div>
                        <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 p-2 shadow-2xl overflow-hidden group">
                            <div className="absolute top-0 left-0 right-0 h-8 bg-slate-800/50 border-b border-white/5 flex items-center px-4 gap-1.5 z-10">
                                <div className="h-2.5 w-2.5 rounded-full bg-red-500/50"></div>
                                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50"></div>
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500/50"></div>
                            </div>
                            <div className="pt-8 transition-transform duration-700 group-hover:scale-[1.01]">
                                <Image
                                    src="/product-mockup.png"
                                    alt="SaaS Dashboard Mockup"
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto rounded-b-xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
