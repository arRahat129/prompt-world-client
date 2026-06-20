import React from 'react';
import { FiEyeOff } from "react-icons/fi";
import PromptReviewForm from '../subscription/PromptReviewForm';

const PromptReviewSection = ({ prompt, isLocked, isCreatorViewer, isOwner }) => {
    const isRestricted = isCreatorViewer && !isOwner;

    return (
        <div className="pt-8 border-t border-zinc-800/80 space-y-6">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                    Community Reviews ({isRestricted ? "Restricted" : "0"})
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
                        <PromptReviewForm isLocked={isLocked} />

                        {/* Standard Empty Feed Module */}
                        <div className="md:col-span-7 h-full flex flex-col justify-center items-center text-center p-8 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20 min-h-65">
                            <div className="w-12 h-12 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-zinc-400">
                                No reviews submitted yet.
                            </p>
                            <p className="text-xs text-zinc-600 mt-1">
                                Be the first to share your verification thoughts with the developer community!
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default PromptReviewSection;