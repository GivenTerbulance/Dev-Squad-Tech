const testimonials = [
    {
        body: "Startup Web cut our development time in half. The boilerplate is incredibly thoughtful and the architecture is rock solid. Perfect for the Jozi tech scene.",
        author: {
            name: "Thabo Mokoena",
            handle: "thabo_codes",
            imageUrl: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            role: "CTO @ JoziTech Solutions"
        },
    },
    {
        body: "I've tried a dozen boilerplates, but this is the only one that truly feels production-ready. We launched our fintech app in Cape Town in record time.",
        author: {
            name: "Michelle Naidoo",
            handle: "michellen",
            imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            role: "Founder @ SeaPoint Finance"
        },
    },
    {
        body: "The authentication and database setup alone saved me weeks of work. Truly a lifesaver for small teams building for the African market.",
        author: {
            name: "Lerato Dlamini",
            handle: "lerato_d",
            imageUrl: "https://images.unsplash.com/photo-1517841905240-472988bad1fa?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            role: "Product Lead @ Ubuntu Digital"
        },
    },
    {
        body: "Finally, a boilerplate that doesn't just give you a shell, but a complete system. Scaled our e-commerce platform across SADC without issues.",
        author: {
            name: "Johan Van Der Merwe",
            handle: "johanvdm",
            imageUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            role: "Tech Lead @ SafariCommerc"
        },
    },
    {
        body: "The attention to detail in the UI components is outstanding. Our customers in Durban love the new dashboard!",
        author: {
            name: "Priya Chetty",
            handle: "priyac",
            imageUrl: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            role: "Design Director @ Coastal Creatives"
        },
    },
    {
        body: "Scale without the headache. This stack handles everything we threw at it during our launch in Sandton.",
        author: {
            name: "Sipho Nkosi",
            handle: "siphon",
            imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            role: "VP Engineering @ GoldMine Data"
        },
    },
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-24 sm:py-32 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-base font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">Testimonials</h2>
                    <p className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                        Loved by developers worldwide
                    </p>
                </div>

                <div className="mx-auto mt-16 flow-root max-w-2xl lg:mx-0 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.author.handle} className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-8 text-sm leading-6 ring-1 ring-slate-100 dark:ring-slate-800 transition-all hover:shadow-lg hover:-translate-y-1">
                                <blockquote className="text-slate-900 dark:text-slate-200">
                                    <p>{`“${testimonial.body}”`}</p>
                                </blockquote>
                                <figcaption className="mt-6 flex items-center gap-x-4">
                                    <img className="h-10 w-10 rounded-full bg-slate-100" src={testimonial.author.imageUrl} alt="" />
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white">{testimonial.author.name}</div>
                                        <div className="text-slate-600 dark:text-slate-400">{testimonial.author.role}</div>
                                    </div>
                                </figcaption>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
