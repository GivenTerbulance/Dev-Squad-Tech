import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
            <Sidebar />
            <div className="lg:pl-72">
                <Header />
                <main className="py-10 px-4 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
