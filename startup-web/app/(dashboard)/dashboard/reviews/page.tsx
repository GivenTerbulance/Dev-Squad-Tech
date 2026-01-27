import ReviewList from "@/components/reviews/ReviewList";

export default function ReviewsPage() {
    return (
        <div className="max-w-4xl">
            <div className="border-b border-slate-200 pb-5 dark:border-slate-800 mb-8">
                <h3 className="text-base font-semibold leading-6 text-slate-900 dark:text-white">My Reviews</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Share your feedback and view your review history.</p>
            </div>

            <ReviewList />
        </div>
    )
}
