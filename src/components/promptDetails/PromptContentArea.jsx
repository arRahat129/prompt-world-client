'use client'
import React from 'react';
import UserSubscriptionBtn from '../subscription/UserSubscriptionBtn';
import CopyButton from '../CopyButton';
import { motion, AnimatePresence } from 'framer-motion';

const PromptContentArea = ({ prompt, isLocked, user, isOwner, redirectTo }) => {
    // console.log(prompt);

    const isProUser = user?.plan?.toLowerCase() === 'user_pro';
    const isCreatorPro = user?.plan?.toLowerCase() === 'creator_pro';

    const isViewLocked = isLocked && !isCreatorPro;

    const isCopyLocked = prompt.visibility?.toLowerCase() !== 'public' && !isOwner && !isProUser;

    return (
        <>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider">Prompt Template</h3>
                    {
                        !isCopyLocked &&
                        <CopyButton textToCopy={prompt.content} promptId={prompt._id} creatorId={prompt.creatorId} userId={user.id} />
                    }
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 min-h-55 flex items-center justify-center">
                    <div className={`w-full p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap select-all transition-all duration-300 ${isViewLocked
                        ? 'blur-md select-none pointer-events-none text-zinc-500 dark:text-zinc-600'
                        : 'text-purple-700 dark:text-purple-300'
                        }`}
                    >
                        {
                            isViewLocked
                                ? "Act as a Principal Software Architect. Define a backend database schema for [domain_concept] using Mongoose validation models. Then, supply corresponding modular Express controller routes executing full CRUD routines alongside secure JWT protection token checks."
                                : prompt.content
                        }
                    </div>

                    <AnimatePresence>
                        {
                            isViewLocked && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 space-y-4 z-10"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ delay: 0.05, duration: 0.3, ease: "easeOut" }}
                                        className="space-y-1 max-w-md"
                                    >
                                        <h3 className="text-xl font-bold text-white tracking-tight">
                                            Premium Prompt Content Locked
                                        </h3>
                                        <p className="text-xs text-zinc-300 leading-normal">
                                            Unlock access to see this prompt, review options, and duplicate copies for a one-time upgrade.
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.15, duration: 0.25 }}
                                    >
                                        <UserSubscriptionBtn price={5} redirectTo={redirectTo} />
                                    </motion.div>
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Usage Instructions
                </h3>
                <div className="text-sm leading-relaxed bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-900 rounded-xl p-5 space-y-2 text-zinc-600 dark:text-zinc-400">
                    <p>
                        • For best architectural validation metrics, configure model parameters to lower temperature values (0.3 - 0.5).
                    </p>
                    <p>
                        • Replace bracketed keyword metadata targets with your production domain contexts.
                    </p>
                </div>
            </div>

            {
                prompt.tags && (
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
                )
            }
        </>
    );
};

export default PromptContentArea;