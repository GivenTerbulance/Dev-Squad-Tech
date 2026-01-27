import { CheckIcon } from "@heroicons/react/20/solid";

const tiers = [
    {
        name: "Free Strategy Call",
        id: "tier-free",
        href: "/register",
        priceMonthly: "R0",
        description: "Risk-free consultation to assess your technical challenges.",
        features: [
            "30-minute video consultation",
            "Problem assessment & diagnosis",
            "High-level recommendations",
            "Custom proposal for next steps",
            "No commitment required"
        ],
        mostPopular: false,
    },
    {
        name: "Quick Win Sprint",
        id: "tier-sprint",
        href: "/register",
        priceMonthly: "R8 500",
        description: "One-week focused sprint to solve a specific technical problem.",
        features: [
            "1-week dedicated engagement",
            "Solve ONE critical issue",
            "Bug fixes or optimizations",
            "Security patches",
            "Performance improvements",
            "Perfect for testing our services"
        ],
        mostPopular: true,
    },
    {
        name: "Discovery & Audit",
        id: "tier-discovery",
        href: "/register",
        priceMonthly: "R12 000",
        description: "Comprehensive technical evaluation and strategic roadmap.",
        features: [
            "Full stack technical audit",
            "Performance analysis",
            "Architecture recommendations",
            "Detailed ROI projections",
            "2-week engagement",
            "Executive summary report"
        ],
        mostPopular: false,
    },
    {
        name: "Solution Build",
        id: "tier-build",
        href: "/register",
        priceMonthly: "R45 000",
        description: "Custom engineering solution for your core business challenge.",
        features: [
            "4-6 week project timeline",
            "Dedicated lead engineer",
            "Agile development sprints",
            "Quality assurance & testing",
            "Deployment & handover",
            "30-day post-launch support",
        ],
        mostPopular: false,
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-base font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">Flexible Engagement</h2>
                    <p className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                        Built for SMEs & Startups
                    </p>
                    <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                        Start with a free consultation, scale as you grow.
                        Professional engineering without enterprise-level budgets.
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 lg:max-w-6xl lg:grid-cols-2 xl:grid-cols-4 lg:gap-x-8">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={`relative flex flex-col justify-between rounded-3xl p-8 xl:p-10 ${tier.mostPopular
                                ? "bg-slate-900 ring-4 ring-primary-600 dark:bg-slate-900 shadow-2xl scale-105 z-10"
                                : "bg-white ring-1 ring-slate-200 dark:bg-slate-900/40 dark:ring-slate-800"
                                }`}
                        >
                            {tier.mostPopular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary-600 px-4 py-1 text-sm font-bold text-white uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}
                            <div>
                                <h3
                                    id={tier.id}
                                    className={`text-2xl font-bold leading-8 ${tier.mostPopular ? "text-white" : "text-slate-900 dark:text-white"
                                        }`}
                                >
                                    {tier.name}
                                </h3>
                                <p
                                    className={`mt-4 text-sm leading-6 ${tier.mostPopular ? "text-slate-300" : "text-slate-600 dark:text-slate-400"
                                        }`}
                                >
                                    {tier.description}
                                </p>
                                <p className="mt-6 flex items-baseline gap-x-1">
                                    <span
                                        className={`text-4xl font-extrabold tracking-tight ${tier.mostPopular ? "text-white" : "text-slate-900 dark:text-white"
                                            }`}
                                    >
                                        {tier.priceMonthly}
                                    </span>
                                </p>
                                <ul
                                    role="list"
                                    className={`mt-8 space-y-3 text-sm leading-6 ${tier.mostPopular ? "text-slate-300" : "text-slate-600 dark:text-slate-400"
                                        }`}
                                >
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex gap-x-3">
                                            <CheckIcon
                                                className={`h-6 w-5 flex-none ${tier.mostPopular ? "text-primary-400" : "text-primary-600"
                                                    }`}
                                                aria-hidden="true"
                                            />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <a
                                href={tier.href}
                                aria-describedby={tier.id}
                                className={`mt-8 block rounded-full px-4 py-3 text-center text-sm font-bold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all active:scale-95 ${tier.mostPopular
                                    ? "bg-primary-600 text-white hover:bg-primary-500 focus-visible:outline-primary-600"
                                    : "bg-primary-50 text-primary-700 hover:bg-primary-100 dark:bg-primary-900/20 dark:text-primary-400 dark:hover:bg-primary-900/30"
                                    }`}
                            >
                                {tier.name === "Enterprise" ? "Contact sales" : "Get started today"}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
