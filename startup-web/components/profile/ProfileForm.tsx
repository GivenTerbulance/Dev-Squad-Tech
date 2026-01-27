"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfileSchema, UpdateProfileData } from "@/features/users/user.schema";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProfileFormProps {
    initialData: {
        name?: string | null;
        image?: string | null;
        email: string;
    };
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateProfileData>({
        resolver: zodResolver(UpdateProfileSchema),
        defaultValues: {
            name: initialData.name || "",
            image: initialData.image || "",
        },
    });

    const onSubmit = async (data: UpdateProfileData) => {
        setIsSaving(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch("/api/users/me", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update profile");
            }

            setSuccess(true);
            router.refresh(); // Refresh server components to show new data

            // Wait a moment then hide success message
            setTimeout(() => setSuccess(false), 3000);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
            {error && (
                <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-6 p-4 rounded-md bg-green-50 border border-green-200 text-green-700 text-sm">
                    Profile updated successfully!
                </div>
            )}

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Email (Read-only) */}
                <div className="sm:col-span-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900 dark:text-white">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            type="email"
                            disabled
                            value={initialData.email}
                            className="block w-full rounded-md border-0 py-1.5 text-slate-500 shadow-sm ring-1 ring-inset ring-slate-300 bg-slate-50 sm:text-sm sm:leading-6 dark:bg-slate-950 dark:ring-slate-700 dark:text-slate-400 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Name */}
                <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-900 dark:text-white">
                        Full Name
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            id="name"
                            {...register("name")}
                            className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-slate-950 dark:ring-slate-700 dark:text-white"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                    </div>
                </div>

                {/* Image URL */}
                <div className="sm:col-span-4">
                    <label htmlFor="image" className="block text-sm font-medium leading-6 text-slate-900 dark:text-white">
                        Avatar URL
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            id="image"
                            {...register("image")}
                            placeholder="https://example.com/avatar.jpg"
                            className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-slate-950 dark:ring-slate-700 dark:text-white"
                        />
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-x-6">
                <button
                    type="submit"
                    disabled={isSaving}
                    className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSaving ? "Saving..." : "Save details"}
                </button>
            </div>
        </form>
    );
}
