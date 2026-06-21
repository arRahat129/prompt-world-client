"use client";

import React, { useState } from 'react';
import { Button } from "@heroui/react";
import { FiBookmark } from "react-icons/fi";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createBookmark } from '@/lib/actions/bookmarks';

export default function BookmarkButton({ prompt, user, promptId }) {
    console.log(prompt);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmark = async () => {
        if (!user) {
            toast.error("Please login to bookmark this item.");
            router.push(`/auth/signin?redirect=/prompts/${promptId}`);
            return;
        }

        // Requirement 2: Check if user owns the prompt
        const isOwner = user.email === prompt.creatorEmail;
        if (isOwner) {
            toast.error("It's your prompt!");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await createBookmark({
                promptId: promptId,
                promptTitle: prompt.title,
                promptDescription: prompt.description,
                userId: user.id || user._id,
                userEmail: user.email,
                creatorName: prompt.creatorName,
                creatorEmail: prompt.creatorEmail
            });

            if (res.success) {
                toast.success(res.message || "Bookmarked successfully!");
                setIsBookmarked(res.isBookmarked);
                router.push(`/prompts/${promptId}`);
            } else {
                toast.error(res.message || "Failed to complete bookmark setup.");
            }
        } catch (error) {
            console.error("Client Action Failure:", error);
            toast.error("Network synchronization anomaly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Button
            isIconOnly
            variant="outline"
            isLoading={isSubmitting}
            onClick={handleBookmark}
            className="border-zinc-800 dark:border-zinc-200 rounded-xl transition-all"
        >
            <FiBookmark
                size={16}
                className={`transition-all duration-200 ${isBookmarked
                    ? 'fill-black text-black dark:fill-white dark:text-white'
                    : 'fill-transparent text-current'
                    }`}
            />
        </Button>
    );
}