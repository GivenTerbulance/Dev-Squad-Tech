import FeedbackList from "@/components/feedback/FeedbackList";

export default function FeedbackPage() {
    return (
        <div className="max-w-4xl">
            <div className="border-b border-slate-200 pb-5 dark:border-slate-800 mb-8">
                <h3 className="text-base font-semibold leading-6 text-slate-900 dark:text-white">Consultations</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Request expert advice or schedule a technical deep-dive.</p>
            </div>

            <FeedbackList />
        </div>
    )
}
