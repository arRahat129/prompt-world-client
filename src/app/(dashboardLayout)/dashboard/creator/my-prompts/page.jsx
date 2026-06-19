import PromptsTable from '@/components/dashboard/PromptsTable';
import { getCreatorPrompts } from '@/lib/api/prompts';
import React from 'react';

const MyPrompts = async () => {
    const creatorId = '6a33d1f3d8447d62b98dcbff';
    const prompts = await getCreatorPrompts(creatorId);

    return (
        <div className="min-h-screen p-6 sm:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">My Created Prompts</h1>
                    <p className="text-sm mt-1">
                        You have published {prompts.length} prompt configuration templates to the system index.
                    </p>
                </div>

                <PromptsTable initialPrompts={prompts} />
            </div>
        </div>
    );
};

export default MyPrompts;