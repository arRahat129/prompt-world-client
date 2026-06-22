import { Suspense } from "react";
import { Card } from "@heroui/react";
import PromptCard from '@/components/prompts/PromptCard';
import FilterPanel from '@/components/prompts/FilterPanel';
import { filterPrompts } from '@/lib/api/prompts';

const AllPromptsPage = async ({ searchParams }) => {
    const sParams = await searchParams;

    const search = sParams.search || "";
    const category = sParams.category || "";
    const aiTool = sParams.aiTool || "";
    const difficulty = sParams.difficulty || "";

    const params = new URLSearchParams();

    params.set("status", "approved");

    if (search) {
        params.set("search", search);
    }
    if (category) {
        params.set("category", category);
    }
    if (aiTool) {
        params.set("aiTool", aiTool);
    }
    if (difficulty) {
        params.set("difficulty", difficulty);
    }

    const prompts = await filterPrompts(params);
    console.log(prompts);

    return (
        <div className="w-full min-h-screen py-8 px-4 max-w-7xl mx-auto space-y-8">

            {/* Page Header block with thematic title style */}
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Explore Prompts Marketplace
                </h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Discover fine-tuned technical and generative AI instructions engineered by the developer community.
                </p>
            </div>

            <Suspense fallback={<div className="h-28 w-full border border-zinc-200 dark:border-zinc-800 animate-pulse rounded-xl" />}>
                <FilterPanel />
            </Suspense>

            <Suspense fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array(8).fill(0).map((_, i) => (
                        <Card key={i} className="border border-zinc-200 dark:border-zinc-800 p-4 space-y-4 animate-pulse bg-transparent">
                            <div className="h-40 rounded-lg bg-zinc-100 dark:bg-zinc-900" />
                            <div className="space-y-2">
                                <div className="h-4 bg-zinc-100 dark:bg-zinc-900 w-3/5 rounded" />
                                <div className="h-3 bg-zinc-100 dark:bg-zinc-900 w-4/5 rounded" />
                            </div>
                        </Card>
                    ))}
                </div>
            }></Suspense>

            {/* Grid display layout handling */}
            {!prompts || prompts.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <p className="text-sm text-zinc-400 dark:text-zinc-500">No active prompts discovered in directory repository.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {prompts.map((prompt) => (
                        <PromptCard key={prompt._id} prompt={prompt} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllPromptsPage;