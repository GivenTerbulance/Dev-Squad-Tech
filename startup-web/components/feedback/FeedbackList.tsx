"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateFeedbackSchema, CreateFeedbackData } from "@/features/feedback/feedback.schema";

interface Feedback {
    id: string;
    title: string;
    content: string;
    createdAt: string;
}

export default function FeedbackList() {
    const [history, setHistory] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateFeedbackData>({
        resolver: zodResolver(CreateFeedbackSchema),
    });

    const fetchHistory = async () => {
        try {
            const res = await fetch("/api/feedback?mine=true");
            if (res.ok) {
                const data = await res.json();
                setHistory(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const onSubmit = async (data: CreateFeedbackData) => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                reset();
                setShowForm(false);
                fetchHistory(); // Refresh list
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* CTA Section */}
            {!showForm && (
                <div className="rounded-xl border border-primary-100 bg-primary-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 dark:border-primary-900/50 dark:bg-primary-900/10">
                    <div>
                        <h3 className="text-base font-semibold leading-6 text-primary-900 dark:text-primary-100">Need Expert Advice?</h3>
                        <p className="mt-1 text-sm text-primary-700 dark:text-primary-300">Schedule a consultation or submit a technical query to our engineering team.</p>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 whitespace-nowrap"
                    >
                        Request Consultation
                    </button>
                </div>
            )}

            {/* Form Section */}
            {showForm && (
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-semibold leading-6 text-slate-900 dark:text-white">New Request</h3>
                        <button onClick={() => setShowForm(false)} className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">Cancel</button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-slate-900 dark:text-white">Subject</label>
                            <input
                                type="text"
                                id="title"
                                {...register("title")}
                                className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-slate-950 dark:ring-slate-700 dark:text-white mt-1"
                                placeholder="e.g., Database Scaling Strategy"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium leading-6 text-slate-900 dark:text-white">Details</label>
                            <textarea
                                id="content"
                                rows={4}
                                {...register("content")}
                                className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-slate-950 dark:ring-slate-700 dark:text-white mt-1"
                                placeholder="Describe your challenge or requirements..."
                            />
                            {errors.content && (
                                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50"
                            >
                                {isSubmitting ? "Submitting..." : "Submit Request"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* History List */}
            <div className="space-y-4">
                <h3 className="text-base font-semibold leading-6 text-slate-900 dark:text-white">consultation History</h3>
                {loading ? (
                    <div className="space-y-4 animate-pulse">
                        <div className="h-20 bg-slate-100 rounded-xl dark:bg-slate-800"></div>
                        <div className="h-20 bg-slate-100 rounded-xl dark:bg-slate-800"></div>
                    </div>
                ) : history.length === 0 ? (
                    <p className="text-sm text-slate-500">No past consultations found.</p>
                ) : (
                    <div className="grid gap-4">
                        {history.map((item) => (
                            <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{item.content}</p>
                                    </div>
                                    <span className="text-xs text-slate-400 shrink-0">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
