import React from 'react';
import { Button } from "@heroui/react";
import {
    FiFlag,
    FiLogIn,
    FiLock
} from "react-icons/fi";
import { getSinglePrompt } from '@/lib/api/prompts';
import { getUserSession } from '@/lib/core/session';
import Link from 'next/link';
import PromptContentArea from '@/components/promptDetails/PromptContentArea';
import PromptDetailsSide from '@/components/promptDetails/PromptDetailsSide';
import PromptReviewSection from '@/components/promptDetails/PromptReviewSection';
import BookmarkButton from '@/components/BookmarkButton';
import BackToPreviousPage from '@/components/BackToPreviousPage';

const PromptDetailsPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();
    // console.log(user);

    if (!user) {
        return (
            <div className="w-full min-h-[80vh] flex items-center justify-center px-4">
                <div className="w-full max-w-md border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 text-center space-y-6 bg-linear-to-b from-zinc-50/50 to-transparent dark:from-zinc-900/20 shadow-xl backdrop-blur-md">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-50 shadow-inner">
                        <FiLock size={28} className="animate-pulse text-purple-600 dark:text-purple-400" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                            Authentication Required
                        </h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs mx-auto">
                            Join our community repository to access prompt source configurations, platform architectures, and creator tools.
                        </p>
                    </div>

                    <div className="pt-2">
                        <Link href={`/auth/signin?redirect=/prompts/${id}`}>
                            <Button
                                className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-semibold h-11 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                            >
                                <FiLogIn size={16} />
                                Sign In to Access
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const prompt = await getSinglePrompt(id);

    if (!prompt) {
        return (
            <div className="min-h-screen flex items-center justify-center text-zinc-400">
                Prompt not found or directory repository link missing.
            </div>
        );
    }

    const isOwner = user.email === prompt.creatorEmail;
    const isCreatorViewer = user.role?.toLowerCase() === 'creator';
    const isProUser = user?.plan?.toLowerCase() === 'user_pro';

    const isLocked = prompt.visibility?.toLowerCase() !== 'public' && !isOwner && !isProUser;

    return (
        <div className="w-full min-h-screen py-12 px-4 max-w-7xl mx-auto space-y-12">

            {/* Top Back Navigation Action Line */}
            <div className="flex items-center justify-between">
                <BackToPreviousPage />
            </div>

            {/* TWO COLUMN CONTENT SPLIT LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* LEFT MAIN MODULE COLUMN (2/3 width) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Header Details Title Row Block */}
                    <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                                {prompt.title}
                            </h1>
                            <div className="flex gap-2">

                                <BookmarkButton prompt={prompt} user={user} promptId={id} />
                                
                                <Button isIconOnly variant="outline" className="border-zinc-800 dark:border-zinc-200 rounded-xl">
                                    <FiFlag size={16} />
                                </Button>
                            </div>
                        </div>
                        <p className="text-base leading-relaxed max-w-3xl">
                            {prompt.description}
                        </p>
                    </div>

                    <PromptContentArea prompt={prompt} isLocked={isLocked} />
                </div>

                {/* RIGHT SIDEBAR METRICS COLUMN (1/3 width) */}
                <div>
                    <PromptDetailsSide prompt={prompt} isOwner={isOwner} isCreatorViewer={isCreatorViewer} />
                </div>
            </div>

            {/* BOTTOM SEGMENT BLOCK: COMMUNITY REVIEWS */}
            <PromptReviewSection prompt={prompt} isLocked={isLocked} isCreatorViewer={isCreatorViewer} isOwner={isOwner} />
        </div>
    );
};

export default PromptDetailsPage;