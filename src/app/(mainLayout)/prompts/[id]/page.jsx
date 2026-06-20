import React from 'react';
import Image from 'next/image';
import { Card, Button } from "@heroui/react";
import {
    FiCopy, FiBookmark, FiFlag, FiCpu, FiLayers,
    FiAward, FiEye, FiUser, FiCalendar, FiSend, FiStar
} from "react-icons/fi";
import { getSinglePrompt } from '@/lib/api/prompts';
import { FaArrowLeft } from 'react-icons/fa6';
import UserSubscriptionBtn from '@/components/subscription/UserSubscriptionBtn';
import PromptReviewForm from '@/components/subscription/PromptReviewForm';
import CopyButton from '@/components/CopyButton';

const PromptDetailsPage = async ({ params }) => {
    const { id } = await params;
    const prompt = await getSinglePrompt(id);

    if (!prompt) {
        return (
            <div className="min-h-screen flex items-center justify-center text-zinc-400">
                Prompt not found or directory repository link missing.
            </div>
        );
    }

    const isLocked = prompt.visibility?.toLowerCase() !== 'public';

    return (
        <div className="w-full min-h-screen py-12 px-4 max-w-7xl mx-auto space-y-12">

            {/* Top Back Navigation Action Line */}
            <div className="flex items-center justify-between">
                <button className="text-xs text-zinc-800 dark:text-zinc-400 hover:font-bold transition-colors flex items-center gap-2">
                    <FaArrowLeft /> Back to previous page
                </button>
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
                                <Button isIconOnly variant="outline" className="border-zinc-800 dark:border-zinc-200 rounded-xl">
                                    <FiBookmark size={16} />
                                </Button>
                                <Button isIconOnly variant="outline" className="border-zinc-800 dark:border-zinc-200 rounded-xl">
                                    <FiFlag size={16} />
                                </Button>
                            </div>
                        </div>
                        <p className="text-base leading-relaxed max-w-3xl">
                            {prompt.description}
                        </p>
                    </div>

                    {/* PROMPT CONTENT BLOCK CONTAINER */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold uppercase tracking-wider">Prompt Template</h3>
                            {!isLocked && (
                                <CopyButton textToCopy={prompt.content} />
                            )}
                        </div>
                        <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 min-h-55 flex items-center justify-center">


                            <div className={`w-full p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap select-all transition-all duration-300 ${isLocked
                                ? 'blur-md select-none pointer-events-none text-zinc-500 dark:text-zinc-600'
                                : 'text-purple-700 dark:text-purple-300'
                                }`}>
                                {isLocked
                                    ? "Act as a Principal Software Architect. Define a backend database schema for [domain_concept] using Mongoose validation models. Then, supply corresponding modular Express controller routes executing full CRUD routines alongside secure JWT protection token checks."
                                    : prompt.content
                                }
                            </div>

                            {/* Centered Premium Content Absolute Grid Overlay */}
                            {isLocked && (
                                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 space-y-4 z-10">
                                    <div className="space-y-1 max-w-md">
                                        <h3 className="text-xl font-bold text-white tracking-tight">
                                            Premium Prompt Content Locked
                                        </h3>
                                        <p className="text-xs text-zinc-300 leading-normal">
                                            Unlock access to see this prompt, review options, and duplicate copies for a one-time upgrade.
                                        </p>
                                    </div>
                                    <UserSubscriptionBtn price={5} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* USAGE INSTRUCTIONS INFOCARD */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">Usage Instructions</h3>
                        <div className="text-sm leading-relaxed bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-900 rounded-xl p-5 space-y-2 text-zinc-600 dark:text-zinc-400">
                            <p>• For best architectural validation metrics, configure model parameters to lower temperature values (0.3 - 0.5).</p>
                            <p>• Replace bracketed keyword metadata targets with your production domain contexts.</p>
                        </div>
                    </div>

                    {/* TAGS BLOCK STRIP */}
                    {prompt.tags && (
                        <div className="space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Keywords & Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {prompt.tags.split(',').map((tag, idx) => tag.trim() && (
                                    <span key={idx} className="text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-md text-zinc-700 dark:text-zinc-300 font-medium">
                                        #{tag.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT SIDEBAR METRICS COLUMN (1/3 width) */}
                <div className="space-y-6 lg:sticky lg:top-8">

                    {/* Prompt Meta Specification Details Summary Card */}
                    <Card className="bg-transparent border border-zinc-200 dark:border-zinc-900 rounded-2xl p-6 space-y-6 shadow-sm" radius="none">
                        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Prompt Details</h3>

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between items-center py-1.5 border-b border-zinc-100 dark:border-zinc-900">
                                <span className="text-zinc-500 flex items-center gap-2"><FiCpu size={14} /> AI Engine</span>
                                <span className="text-xs bg-purple-100 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50 px-2.5 py-1 rounded-md text-purple-700 dark:text-purple-300 font-bold uppercase tracking-wider">{prompt.aiTool}</span>
                            </div>
                            <div className="flex justify-between items-center py-1.5 border-b border-zinc-100 dark:border-zinc-900">
                                <span className="text-zinc-500 flex items-center gap-2"><FiLayers size={14} /> Category</span>
                                <span className="text-xs bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 px-2.5 py-1 rounded-md text-emerald-700 dark:text-emerald-300 font-bold uppercase tracking-wider">{prompt.category}</span>
                            </div>
                            <div className="flex justify-between items-center py-1.5 border-b border-zinc-100 dark:border-zinc-900">
                                <span className="text-zinc-500 flex items-center gap-2"><FiAward size={14} /> Difficulty</span>
                                <span className="text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2.5 py-1 rounded-md text-zinc-800 dark:text-zinc-300 font-bold uppercase tracking-wider">{prompt.difficulty}</span>
                            </div>
                            <div className="flex justify-between items-center py-1.5 border-b border-zinc-100 dark:border-zinc-900">
                                <span className="text-zinc-500 flex items-center gap-2"><FiEye size={14} /> Visibility</span>
                                <span className="text-zinc-700 dark:text-zinc-300 font-semibold uppercase text-xs tracking-wide">{prompt.visibility}</span>
                            </div>
                            <div className="flex justify-between items-center py-1.5 border-b border-zinc-100 dark:border-zinc-900">
                                <span className="text-zinc-500 flex items-center gap-2"><FiCopy size={14} /> Copies Made</span>
                                <span className="text-zinc-900 dark:text-zinc-50 font-bold">{prompt.copyCount || 0}</span>
                            </div>
                            <div className="flex justify-between items-center py-1.5">
                                <span className="text-zinc-500 flex items-center gap-2"><FiStar size={14} /> Community Rating</span>
                                <span className="text-amber-500 font-bold flex items-center gap-1">★ 5.0 <span className="text-zinc-400 dark:text-zinc-500 font-normal text-xs">(2)</span></span>
                            </div>
                        </div>

                        {/* CREATOR DATA SEGMENT BLOCK */}
                        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                                <FiUser size={12} /> Creator Information
                            </h4>
                            <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/40 p-3 rounded-xl border border-zinc-200 dark:border-zinc-900">
                                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0">
                                    <Image
                                        src={prompt.creatorImage || "https://i.ibb.co/HptkjZh4/meta.png"}
                                        alt={prompt.creatorName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{prompt.creatorName}</p>
                                    <p className="text-xs text-zinc-500 truncate">{prompt.creatorEmail}</p>
                                </div>
                            </div>
                            <p className="text-[10px] text-zinc-400 dark:text-zinc-600 flex items-center gap-1.5 pt-1">
                                <FiCalendar size={10} /> Indexed on {new Date(prompt.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </Card>
                </div>
            </div>

            {/* BOTTOM SEGMENT BLOCK: COMMUNITY REVIEWS */}
            <div className="pt-8 border-t border-zinc-200 dark:border-zinc-900 space-y-6">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Community Reviews (0)</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                    {/* Write/Submit Review Panel Form Module (Left) */}
                    <PromptReviewForm isLocked={isLocked} />

                    {/* Existing Content Feed Dynamic Module (Right) */}
                    <div className="md:col-span-7 h-full flex flex-col justify-center items-center text-center p-8 border border-dashed border-zinc-300 dark:border-zinc-900 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/5 min-h-65">
                        <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 flex items-center justify-center text-zinc-400 dark:text-zinc-500 mb-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-400">No reviews submitted yet.</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-600 mt-1">Be the first to share your verification thoughts with the developer community!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromptDetailsPage;