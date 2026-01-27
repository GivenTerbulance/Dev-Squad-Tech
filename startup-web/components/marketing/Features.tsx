import {
    BoltIcon,
    ShieldCheckIcon,
    DevicePhoneMobileIcon,
    GlobeAltIcon,
    ArrowPathIcon,
    ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";

const features = [
    {
        name: 'Custom Software Development',
        description: 'Bespoke web and mobile applications engineered for reliability, scalability, and exceptional user experience.',
        icon: BoltIcon,
    },
    {
        name: 'AI & Machine Learning',
        description: 'Integration of cutting-edge AI models to automate workflows, predict trends, and provide deep insights.',
        icon: ShieldCheckIcon,
    },
    {
        name: 'Performance Optimization',
        description: 'System audits and refactoring to ensure your technology stack runs at peak efficiency and speed.',
        icon: DevicePhoneMobileIcon,
    },
    {
        name: 'Cloud Infrastructure',
        description: 'Robust AWS, Azure, and GCP configurations that grow with your business while maintaining 99.9% uptime.',
        icon: GlobeAltIcon,
    },
    {
        name: 'Security & Compliance',
        description: 'End-to-end security audits, encryption, and compliance implementation to protect your most valuable data.',
        icon: ArrowPathIcon,
    },
    {
        name: 'Strategic Consulting',
        description: 'High-level technology roadmaps and architectural guidance to align your tech with business goals.',
        icon: ChatBubbleLeftRightIcon,
    },
];

export default function Features() {
    return (
        <section id="features" className="py-24 sm:py-32 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="container mx-auto px-4 relative">
                {/* Background decorative blob */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] -z-10"></div>

                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">Our Expertise</h2>
                    <p className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                        Solving technology's toughest puzzles
                    </p>
                    <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                        We don't just write code; we architect solutions that drive growth,
                        efficiency, and competitive advantage for your business.
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, idx) => (
                            <div
                                key={feature.name}
                                className="relative flex flex-col p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1 group"
                                style={{ transitionDelay: `${idx * 50}ms` }}
                            >
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 shadow-lg shadow-primary-600/20 transition-transform group-hover:rotate-6 group-hover:scale-110">
                                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <dt className="text-xl font-bold leading-7 text-slate-900 dark:text-white">
                                    {feature.name}
                                </dt>
                                <dd className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400 flex-auto">
                                    {feature.description}
                                </dd>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
