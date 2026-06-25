import { getFeaturedPrompts } from '@/lib/api/getFeaturedPrompts';
import React from 'react';
import { FiArrowRight, FiSliders } from 'react-icons/fi';
import PromptCard from '../prompts/PromptCard';
import Link from 'next/link';
import { Button } from '@heroui/react';

const FeaturedPrompts = async () => {
    const response = await getFeaturedPrompts();

    const featuredList = response?.data || [];
    console.log(featuredList);
    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col mb-8 text-left space-y-2">
                <div className="flex items-center gap-2 text-sky-500 font-semibold text-xs uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
                    Handpicked Highlights
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                    Featured Prompts
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xl">
                    Discover highly optimized community AI templates synchronized across matching generative frameworks.
                </p>
            </div>

            {featuredList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredList.map((prompt) => (
                        <PromptCard
                            key={prompt._id}
                            prompt={{ ...prompt, _id: prompt.promptId }}
                        />
                    ))}
                </div>
            ) : (
                <div className="w-full border border-dashed border-sky-200 dark:border-sky-950/60 rounded-2xl bg-linear-to-b from-sky-50/40 to-transparent dark:from-sky-950/10 dark:to-transparent py-16 px-4 flex flex-col items-center justify-center text-center">
                    <div className="h-14 w-14 rounded-full bg-sky-100 dark:bg-sky-950 flex items-center justify-center text-sky-500 mb-4 shadow-sm border border-sky-200/40 dark:border-sky-900/40">
                        <FiSliders size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                        No Featured Prompts Available
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm mt-1">
                        Our administrators have not highlighted any prompt configurations yet. Check back soon for fresh, top-tier selections!
                    </p>
                </div>
            )}

            <div className="flex justify-end mt-8">
                <Link href="/prompts">
                    <Button
                        className="font-medium text-sm bg-sky-500 hover:bg-sky-600 text-white shadow-sm shadow-sky-500/10 transition-colors h-10 rounded-lg"
                    >
                        View All Prompts <FiArrowRight size={16} />
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default FeaturedPrompts;