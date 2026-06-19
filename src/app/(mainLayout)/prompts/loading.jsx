import React from 'react';

export default function LoadingAllPrompts() {
    return (
        <div className="w-full min-h-screen py-8 px-4 max-w-7xl mx-auto space-y-8">
            {/* Header Block Skeletons */}
            <div className="space-y-2">
                <div className="h-7 w-64 bg-zinc-200 dark:bg-zinc-800/80 rounded-md animate-pulse" />
                <div className="h-4 w-96 bg-zinc-100 dark:bg-zinc-900/60 rounded-md animate-pulse" />
            </div>

            {/* Grid Display Skeleton Items matching image_2ec0d8.png aspects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="w-full aspect-4/5 rounded-xl bg-zinc-50 dark:bg-[#0f172a] animate-pulse border border-zinc-200 dark:border-sky-950/20"
                    />
                ))}
            </div>
        </div>
    );
}