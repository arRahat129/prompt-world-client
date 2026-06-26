import { Suspense } from "react";
import { Card } from "@heroui/react";
import PromptCard from '@/components/prompts/PromptCard';
import FilterPanel from '@/components/prompts/FilterPanel';
import { filterPrompts } from '@/lib/api/prompts';
import PromptListingContainer from "@/components/prompts/PromptListingContainer";

const AllPromptsPage = async ({ searchParams }) => {
    const sParams = await searchParams;

    const search = sParams.search || "";
    const category = sParams.category || "";
    const aiTool = sParams.aiTool || "";
    const difficulty = sParams.difficulty || "";
    const page = parseInt(sParams.page) || 1;

    const sortBy = sParams.sortBy || "";
    const order = sParams.order || "";

    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("perPage", "12");

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
    if (sortBy) {
        params.set("sortBy", sortBy);
    }
    if (order) {
        params.set("order", order);
    }

    const responseData = await filterPrompts(params) || { total: 0, prompts: [] };

    const prompts = responseData?.prompts ?? (Array.isArray(responseData) ? responseData : []);
    console.log(prompts);

    const total = responseData.total || prompts.length || 0;

    const filters = { search, category, aiTool, difficulty, page, sortBy, order };

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

            <PromptListingContainer
                prompts={prompts}
                total={total}
                filters={filters}
            />
        </div>
    );
};

export default AllPromptsPage;