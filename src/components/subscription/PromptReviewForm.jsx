'use client';

import React, { useState } from 'react';
import { Button } from "@heroui/react";
import { FiStar, FiSend, FiLock } from "react-icons/fi";
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { createReview } from '@/lib/actions/reviews';

const PromptReviewForm = ({ isLocked, promptId }) => {
    const { data: session } = useSession();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLocked || isSubmitting) {
            return;
        }

        // console.log({ rating, comment });

        if (!session?.user) {
            toast.error("Authentication Error: You must be logged in to leave reviews.");
            return;
        }

        if (rating === 0) {
            toast.error("Please pick a rating score before submitting.");
            return;
        }

        if (!comment.trim()) {
            toast.error("Please write a comment summarizing your evaluation experience.");
            return;
        }

        setIsSubmitting(true);
        const loadingToast = toast.loading("Saving your community review...");

        const finalReviewPayload = {
            promptId: promptId,
            rating: Number(rating),
            comment: comment.trim(),
            reviewerId: session?.user?.id,
            reviewerName: session?.user?.name || "Anonymous Developer",
            reviewerImage: session?.user?.image || ""
        };

        try {
            const res = await createReview(finalReviewPayload);

            if (res.success) {
                toast.success("Review submitted successfully!", { id: loadingToast });
                console.log("Form submitted! Here is your payload:", finalReviewPayload);
                setRating(0);
                setComment('');
            } else {
                toast.error(res.message || "Failed to submit review.", { id: loadingToast });
            }
        } catch (error) {
            console.error("Submission log track error:", error);
            toast.error("Network communication failure. Please check your log lines.", { id: loadingToast });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="md:col-span-5 relative overflow-hidden bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-900 rounded-2xl p-6 transition-all duration-300">

            {/* Conditional Lock Mask for Private Prompts */}
            {isLocked && (
                <div className="absolute inset-0 bg-zinc-100/10 dark:bg-zinc-950/20 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 z-20">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 mb-2">
                        <FiLock size={16} />
                    </div>
                    <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Reviews Locked</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-50">
                        You must subscribe to premium to review this prompt.
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className={`space-y-5 ${isLocked ? 'blur-sm select-none pointer-events-none' : ''}`}>
                <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-300">Submit a Review</h3>

                {/* Interactive Dynamic Star Selection Nodes */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                        Your Rating
                    </label>
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => {
                            const starValue = i + 1;
                            const isFilled = starValue <= rating;
                            return (
                                <FiStar
                                    key={i}
                                    size={20}
                                    onClick={() => !isSubmitting && setRating(starValue)}
                                    className={`cursor-pointer transition-all hover:scale-110 active:scale-95 ${isFilled
                                        ? 'text-amber-500 fill-amber-500 drop-shadow-[0_0_4px_rgba(245,158,11,0.2)]'
                                        : 'text-zinc-400 dark:text-zinc-600 fill-transparent'
                                        }`}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Interactive Comment Input Field */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Comment</label>
                    <textarea
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        disabled={isLocked}
                        placeholder="Share your experience working with this systemic prompt template instructions..."
                        className="w-full text-sm text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-950/50 border border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 focus:border-purple-500 dark:focus:border-purple-600 rounded-xl transition-all p-3 outline-none font-sans resize-none"
                    />
                </div>

                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isLocked || rating === 0 || isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-semibold text-xs h-11 rounded-xl transition-colors shadow-md"
                >
                    {!isSubmitting && <FiSend size={12} />} {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
            </form>
        </div>
    );
};

export default PromptReviewForm;