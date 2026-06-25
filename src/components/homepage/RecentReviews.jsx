"use client";

import React, { useEffect, useState } from 'react';
import { Card, Avatar, Spinner } from "@heroui/react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { getRecentReviews } from '@/lib/api/reviews';

const RecentReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await getRecentReviews();
                setReviews(data);
            } catch (error) {
                console.error("Error loading reviews layout:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    if (loading) {
        return (
            <div className="w-full min-h-64 flex items-center justify-center">
                <Spinner color="success" label="Loading community feedback..." />
            </div>
        );
    }

    if (reviews.length === 0) {
        return null;
    }

    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-12 space-y-2">
                <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                    Customer Reviews
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-md mx-auto">
                    See what creators and developers are saying about configurations across Prompt World.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review) => (
                    <Card
                        key={review._id}
                        className="p-6 bg-white dark:bg-[#0f172a] border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700"
                        shadow="none"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Avatar className="h-10 w-10 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold text-sm">
                                    <Avatar.Image
                                        alt={review.reviewerName || "User Avatar"}
                                        src={review.reviewerImage || ""}
                                        referrerPolicy="no-referrer"
                                    />
                                    <Avatar.Fallback>
                                        {review.reviewerName ? review.reviewerName[0].toUpperCase() : "U"}
                                    </Avatar.Fallback>
                                </Avatar>

                                <div>
                                    <h4 className="font-bold text-sm text-zinc-800 dark:text-zinc-100 line-clamp-1">
                                        {review.reviewerName || "Anonymous User"}
                                    </h4>

                                    <div className="flex items-center gap-0.5 mt-0.5">
                                        {[...Array(5)].map((_, index) => {
                                            const starValue = index + 1;
                                            return starValue <= review.rating ? (
                                                <FaStar
                                                    key={index}
                                                    size={13}
                                                    className="text-amber-400"
                                                />
                                            ) : (
                                                <FaRegStar
                                                    key={index}
                                                    size={13}
                                                    className="text-zinc-300 dark:text-zinc-600"
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <p className="text-zinc-600 dark:text-zinc-300 text-sm italic line-clamp-4 mb-5">
                                {review.comment}
                            </p>
                        </div>

                        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                                Prompt Target
                            </span>
                            <h5 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 line-clamp-1 mt-0.5">
                                {review.promptName || "Untitled Prompt Configuration"}
                            </h5>
                            <p className="text-xs text-zinc-400 dark:text-zinc-500 line-clamp-1 mt-0.5">
                                {review.promptDescription || "No configuration context summary provided."}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default RecentReviews;