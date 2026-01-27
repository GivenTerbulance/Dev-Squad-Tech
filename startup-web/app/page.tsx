import Navbar from "@/components/marketing/Navbar";
import Hero from "@/components/marketing/Hero";
import Features from "@/components/marketing/Features";
import Testimonials from "@/components/marketing/Testimonials";
import Pricing from "@/components/marketing/Pricing";
import CTA from "@/components/marketing/CTA";
import Footer from "@/components/marketing/Footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-white dark:bg-slate-950">
            <Navbar />
            <Hero />
            <Features />
            <Testimonials />
            <Pricing />
            <CTA />
            <Footer />
        </main>
    );
}
