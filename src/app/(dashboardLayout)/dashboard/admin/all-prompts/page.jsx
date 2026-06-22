import AdminPromptsTable from '@/components/dashboard/AdminPromptsTable';
import { getPrompts } from '@/lib/api/prompts';
import React from 'react';

const AllPrompts = async () => {
    const prompts = await getPrompts();
    return (
        <div className="w-full min-h-screen py-8 px-4 max-w-7xl mx-auto space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    System Index Directory Management
                </h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Review, approve, reject, delete, or promote prompt layout configurations across the system index registry.
                </p>
            </div>

            <AdminPromptsTable initialPrompts={prompts} />
        </div>
    );
};

export default AllPrompts;