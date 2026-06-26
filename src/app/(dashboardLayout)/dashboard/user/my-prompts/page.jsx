import PromptsTable from '@/components/dashboard/PromptsTable';
import { getCreatorPrompts } from '@/lib/api/prompts';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const MyPrompts = async () => {
    const user = await getUserSession();
    // console.log(user);
    const prompts = await getCreatorPrompts(user?.id);

    return (
        <div className="min-h-screen p-6 sm:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">My Created Prompts</h1>
                    <p className="text-sm mt-1">
                        You have published {prompts.length} prompt configuration templates to the system index.
                    </p>
                </div>

                <PromptsTable initialPrompts={prompts} user={user} />
            </div>
        </div>
    );
};

export default MyPrompts;