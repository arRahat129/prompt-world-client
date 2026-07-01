import React from 'react';
import { FiEyeOff, FiStar } from "react-icons/fi";
import PromptReviewForm from '../subscription/PromptReviewForm';
import { getReviewsByPromptId } from '@/lib/api/reviews';
import Image from 'next/image';
import { getSingleUser } from '@/lib/api/user';
import { getUserSession } from '@/lib/core/session';

const PromptReviewSection = async ({ prompt, isLocked, isCreatorViewer, isOwner }) => {
    // console.log(prompt);
    const sessionUser = await getUserSession();
    const user = await getSingleUser(sessionUser?.id);;
    // console.log(user);

    const isProUser = user?.plan?.toLowerCase() === 'user_pro';

    const isRestricted = isCreatorViewer && !isOwner && !isProUser;

    const reviews = await getReviewsByPromptId(prompt?._id);
    const totalReviews = Array.isArray(reviews) ? reviews.length : 0;

    return (
        <div className="pt-8 border-t border-zinc-800/80 space-y-6">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                    Community Reviews ({isRestricted ? "Restricted" : totalReviews})
                </h2>
            </div>

            {
                isRestricted ? (
                    <div className="w-full border border-purple-900/40 bg-purple-950/5 rounded-2xl p-8 relative overflow-hidden backdrop-blur-md">
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-xl mx-auto">
                            <div className="w-12 h-12 rounded-2xl bg-purple-900/30 border border-purple-800/50 text-purple-700 flex items-center justify-center shadow-lg">
                                <FiEyeOff size={22} className="animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-base font-bold text-zinc-100 tracking-tight">
                                    Evaluation Metrics Protected
                                </h4>
                                <p className="text-xs text-zinc-700 dark:text-zinc-400 leading-relaxed">
                                    To ensure compliance guidelines and maintain unbiased community tracking scores, active <span className="text-purple-800 font-semibold bg-purple-200/80 px-1.5 py-0.5 rounded border border-purple-900/40">Creator accounts</span> are restricted from examining external peer reviews or participating in secondary evaluation logs.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                        {/* Standard Action Input Card */}
                        {!isOwner && <PromptReviewForm isLocked={isLocked} promptId={prompt?._id} prompt={prompt} existingReviews={reviews} user={user} />}

                        {/* Standard Empty Feed Module */}
                        <div className={`${isOwner ? "md:col-span-12" : "md:col-span-7"} space-y-4 w-full`}>
                            {totalReviews > 0 ? (
                                <div className="space-y-4 max-h-125 overflow-y-auto pr-2 custom-scrollbar">
                                    {reviews.map((review) => (
                                        <div
                                            key={review._id}
                                            className="p-5 border border-zinc-800 rounded-2xl space-y-3 transition-all hover:border-zinc-700/60"
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                {/* Reviewer Profile */}
                                                <div className="flex items-center gap-3">
                                                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700">
                                                        <Image
                                                            src={review.reviewerImage || "https://ibb.co.com/VcNrR846"}
                                                            alt={review.reviewerName || "Reviewer avatar"}
                                                            fill
                                                            sizes="32px"
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{review.reviewerName}</h4>
                                                        <p className="text-[10px] text-zinc-500">
                                                            {review.createdAt ? (
                                                                new Date(review.createdAt).toLocaleString(undefined, {
                                                                    dateStyle: 'medium',
                                                                    timeStyle: 'short'
                                                                })
                                                            ) : (
                                                                "Just now"
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Star Count Array Map Output */}
                                                <div className="flex items-center gap-0.5">
                                                    {[...Array(5)].map((_, idx) => (
                                                        <FiStar
                                                            key={idx}
                                                            size={13}
                                                            className={idx < review.rating ? "text-amber-500 fill-amber-500" : "text-zinc-700 fill-transparent"}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Content Comment Text Block */}
                                            <p className="text-sm text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed wrap-break-word whitespace-pre-wrap pl-1">
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="w-full flex flex-col justify-center items-center text-center p-8 border border-dashed border-zinc-800 rounded-2xl min-h-65">
                                    <div className="w-12 h-12 rounded-xl border border-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200 mb-3">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-medium">
                                        No reviews submitted yet.
                                    </p>
                                    <p className="text-xs text-zinc-600 mt-1">
                                        {isOwner
                                            ? "Reviews submitted by buyers and developers will appear directly in this panel."
                                            : "Be the first to share your verification thoughts with the developer community!"
                                        }
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default PromptReviewSection;