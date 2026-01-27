import Link from "next/link";

const navigation = {
    solutions: [
        { name: 'Custom Software', href: '#features' },
        { name: 'AI Integration', href: '#features' },
        { name: 'Cloud Strategy', href: '#features' },
        { name: 'Security Audit', href: '#features' },
    ],
    expertise: [
        { name: 'Case Studies', href: '#' },
        { name: 'Our Process', href: '#' },
        { name: 'Open Source', href: 'https://github.com/GivenTerbulance' },
        { name: 'Tech Stack', href: '#features' },
    ],
    company: [
        { name: 'About Us', href: '#footer-heading' },
        { name: 'Our Squad', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Contact', href: 'mailto:info@devsquad.tech' },
    ],
    legal: [
        { name: 'Privacy', href: '#' },
        { name: 'Terms', href: '#' },
        { name: 'Security', href: '#' },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">Footer</h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Link href="/" className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            Dev Squad Tech
                        </Link>
                        <p className="text-sm leading-6 text-slate-600 dark:text-slate-400 max-w-xs">
                            Solving complex business problems through elite engineering and
                            innovative technology solutions.
                        </p>
                        <div className="flex gap-x-6">
                            {/* Simple text-based social placeholders */}
                            <Link href="#" className="text-slate-400 hover:text-primary-600 transition-colors">Twitter</Link>
                            <Link href="#" className="text-slate-400 hover:text-primary-600 transition-colors">GitHub</Link>
                            <Link href="#" className="text-slate-400 hover:text-primary-600 transition-colors">LinkedIn</Link>
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-bold leading-6 text-slate-900 dark:text-white">Solutions</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.solutions.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-bold leading-6 text-slate-900 dark:text-white">Expertise</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.expertise.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-bold leading-6 text-slate-900 dark:text-white">Company</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.company.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-bold leading-6 text-slate-900 dark:text-white">Legal</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.legal.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-slate-100 dark:border-slate-900 pt-8 sm:mt-20 lg:mt-24 text-center">
                    <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                        &copy; {new Date().getFullYear()} Startup Web. Inc. All rights reserved. Built with passion for developers.
                    </p>
                </div>
            </div>
        </footer>
    );
}
