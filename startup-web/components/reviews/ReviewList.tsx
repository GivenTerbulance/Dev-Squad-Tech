"use client";

import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateReviewSchema, CreateReviewData } from "@/features/reviews/review.schema";

interface Review {
    id: string;
    rating: number;
    comment?: string;
    createdAt: string;
}

export default function ReviewList() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<CreateReviewData>({
        resolver: zodResolver(CreateReviewSchema),
        defaultValues: {
            rating: 5,
            comment: "",
        },
    });

    const ratingValue = watch("rating");

    const fetchReviews = async () => {
        try {
            const res = await fetch("/api/reviews?mine=true");
            if (res.ok) {
                const data = await res.json();
                setReviews(data);
            }
        } catch (error) {
            console.error("Failed to fetch reviews", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const onSubmit = async (data: CreateReviewData) => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                reset();
                fetchReviews(); // Refresh list
            } else {
                console.error("Failed to submit review");
            }
        } catch (error) {
            console.error("Error submitting review", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Create Review Form */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-base font-semibold leading-6 text-slate-900 dark:text-white">Write a Review</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-white">Rating</label>
                        <div className="flex gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setValue("rating", star)}
                                    className="focus:outline-none"
                                >
                                    {star <= ratingValue ? (
                                        <StarIcon className="h-6 w-6 text-yellow-400" />
                                    ) : (
                                        <StarIconOutline className="h-6 w-6 text-slate-300" />
                                    )}
                                </button>
                            ))}
                        </div>
                        {errors.rating && (
                            <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium leading-6 text-slate-900 dark:text-white">Comment</label>
                        <textarea
                            id="comment"
                            rows={3}
                            {...register("comment")}
                            className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-slate-950 dark:ring-slate-700 dark:text-white mt-1"
                            placeholder="Share your experience..."
                        />
                        {errors.comment && (
                            <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Review"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Review List */}
            <div className="space-y-4">
                <h3 className="text-base font-semibold leading-6 text-slate-900 dark:text-white">Your History</h3>
                {loading ? (
                    <div className="space-y-4 animate-pulse">
                        <div className="h-24 bg-slate-100 rounded-xl dark:bg-slate-800"></div>
                        <div className="h-24 bg-slate-100 rounded-xl dark:bg-slate-800"></div>
                    </div>
                ) : reviews.length === 0 ? (
                    <p className="text-sm text-slate-500">You haven&apost submitted any reviews yet.</p>
                ) : (
                    <div className="grid gap-4">
                        {reviews.map((review) => (
                            <div key={review.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <div className="flex items-center gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <StarIcon
                                            key={star}
                                            className={`h-4 w-4 ${star <= review.rating ? "text-yellow-400" : "text-slate-200"}`}
                                        />
                                    ))}
                                    <span className="ml-2 text-xs text-slate-400">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-700 dark:text-slate-300">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
