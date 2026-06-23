'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card } from "@heroui/react";
import { FiCpu, FiLayers, FiAward, FiEye, FiCopy, FiStar, FiUser, FiCalendar, FiEyeOff } from "react-icons/fi";
import { FaStar } from 'react-icons/fa6';
import { getReviewsByPromptId } from '@/lib/api/reviews';


const PromptDetailsSide = ({ prompt, isOwner, isCreatorViewer }) => {
    const shouldHideStats = isCreatorViewer && !isOwner;

    const [averageRating, setAverageRating] = useState(0);
    const [totalReviewsCount, setTotalReviewsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAndCalculateReviews = async () => {
            if (!prompt?._id) return;

            try {
                setIsLoading(true);
                const reviews = await getReviewsByPromptId(prompt._id);
                console.log(reviews);

                if (reviews && reviews.length > 0) {
                    const totalRatingSum = reviews.reduce((acc, review) => acc + Number(review.rating || 0), 0);
                    const avg = totalRatingSum / reviews.length;

                    setAverageRating(Number(avg.toFixed(1)));
                    setTotalReviewsCount(reviews.length);
                } else {
                    setAverageRating(0);
                    setTotalReviewsCount(0);
                }
            } catch (error) {
                console.error("Failed to fetch or compute prompt reviews:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndCalculateReviews();
    }, [prompt?._id]);

    return (
        <Card className="border border-zinc-800/80 rounded-2xl p-6 space-y-6 shadow-xl backdrop-blur-md" radius="none">
            <h3 className="text-base font-bold tracking-tight">Prompt Details</h3>

            <div className="space-y-4 text-sm relative">
                <div className="flex justify-between items-center py-2.5 border-b border-zinc-800/60">
                    <span className="text-zinc-700 dark:text-zinc-400 flex items-center gap-2"><FiCpu size={14} /> AI Engine</span>
                    <span className="text-xs bg-purple-950/60 border border-purple-800/50 px-2.5 py-1 rounded-md text-purple-300 font-bold uppercase tracking-wider">{prompt.aiTool}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-zinc-800/60">
                    <span className="text-zinc-700 dark:text-zinc-400 flex items-center gap-2"><FiLayers size={14} /> Category</span>
                    <span className="text-xs bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded-md text-emerald-300 font-bold uppercase tracking-wider">{prompt.category}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-zinc-800/60">
                    <span className="text-zinc-700 dark:text-zinc-400 flex items-center gap-2">
                        <FiAward size={14} /> Difficulty
                    </span>
                    <span className="text-xs bg-zinc-800 border border-zinc-700 px-2.5 py-1 rounded-md text-zinc-300 font-bold uppercase tracking-wider">
                        {prompt.difficulty}
                    </span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-zinc-800/60">
                    <span className="text-zinc-700 dark:text-zinc-400 flex items-center gap-2">
                        <FiEye size={14} /> Visibility
                    </span>
                    <span className="text-zinc-700 dark:text-zinc-400 font-semibold uppercase text-xs tracking-wide">
                        {prompt.visibility}
                    </span>
                </div>

                {/* Metrics Row Section with Conditional Blur & Overlay for Peer Creators */}
                <div className="relative">
                    <div className={`space-y-4 transition-all duration-300 ${shouldHideStats ? 'blur-xs select-none pointer-events-none opacity-20' : ''}`}>
                        <div className="flex justify-between items-center py-2.5 border-b border-zinc-800/60">
                            <span className="text-zinc-700 dark:text-zinc-400 flex items-center gap-2"><FiCopy size={14} /> Copies Made</span>
                            <span className="font-bold">{prompt.copyCount || 0}</span>
                        </div>
                        <div className="flex justify-between items-center py-2.5">
                            <span className="text-zinc-700 dark:text-zinc-400 flex items-center gap-2"><FiStar size={14} /> Community Rating</span>
                            <span className="text-amber-500 font-bold flex items-center gap-1">
                                <FaStar />
                                {isLoading ? (
                                    <span className="text-xs text-zinc-500 font-normal animate-pulse">Loading...</span>
                                ) : (
                                    <>
                                        {averageRating}
                                        <span className="text-zinc-500 font-normal text-xs">({totalReviewsCount})</span>
                                    </>
                                )}
                            </span>
                        </div>
                    </div>

                    {
                        shouldHideStats && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center rounded-xl border border-zinc-800/50">
                                <FiEyeOff className="text-purple-800 dark:text-purple-400 mb-1" size={16} />
                                <p className="text-[11px] leading-normal text-zinc-700 dark:text-zinc-400 font-medium px-2">
                                    Statistics and performance graphs are hidden from concurrent platform creators.
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* Creator Information Data Module */}
            <div className="pt-4 border-t border-zinc-800/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    <FiUser size={12} /> Creator Information
                </h4>
                <div className="flex items-center gap-3 p-3 rounded-xl border border-zinc-800/80">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0">
                        <Image
                            src={prompt.creatorImage || "https://i.ibb.co/HptkjZh4/meta.png"}
                            alt={prompt.creatorName || "Creator Avatar"}
                            fill
                            sizes="36px"
                            className="object-cover"
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold truncate">{prompt.creatorName}</p>
                        <p className="text-xs text-zinc-700 dark:text-zinc-300 truncate">{prompt.creatorEmail}</p>
                    </div>
                </div>
                <p className="text-[10px] text-zinc-500 flex items-center gap-1.5 pt-1">
                    <FiCalendar size={10} /> Indexed on {new Date(prompt.createdAt).toLocaleDateString()}
                </p>
            </div>
        </Card>
    );
};

export default PromptDetailsSide;