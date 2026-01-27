import Link from "next/link";

export default function CTA() {
    return (
        <section className="py-24 sm:py-32">
            <div className="container mx-auto px-4">
                <div className="relative isolate overflow-hidden bg-primary-600 px-6 pt-16 shadow-2xl rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                    <svg
                        viewBox="0 0 1024 1024"
                        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                        aria-hidden="true"
                    >
                        <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                        <defs>
                            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                <stop stopColor="#fff" />
                                <stop offset={1} stopColor="#fff" />
                            </radialGradient>
                        </defs>
                    </svg>

                    <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            Ready to solve your toughest
                            <br />
                            tech challenges?
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-primary-100">
                            Our squad is ready to dive into your complex problems and deliver
                            results that matter. Let's build the future together.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                            <Link
                                href="/register"
                                className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all active:scale-95"
                            >
                                Book a Strategy Call
                            </Link>
                            <Link href="/login" className="text-sm font-bold leading-6 text-white hover:underline">
                                Our Methodology <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                    <div className="relative mt-16 h-80 lg:mt-8">
                        {/* A simple decorative element that looks like a code window */}
                        <div className="absolute left-0 top-0 w-[57rem] max-w-none rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm p-4 hidden lg:block">
                            <div className="flex items-center gap-1.5 mb-4">
                                <div className="h-2 w-2 rounded-full bg-red-400"></div>
                                <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                                <div className="ml-2 text-[10px] text-white/50 font-mono">startup-project/app/page.tsx</div>
                            </div>
                            <pre className="text-sm text-primary-100 font-mono leading-relaxed">
                                <code>{`export default function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />
      <Features />
      <Pricing />
    </div>
  );
}`}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
