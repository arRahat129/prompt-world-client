import FeedbackDisplay from '@/components/dashboard/FeedbackDisplay';
import { getFeedbacksByCreatorId } from '@/lib/api/feedbacks';
import { getSingleUser } from '@/lib/api/user';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const FeedbackPage = async () => {
    const sessionUser = await getUserSession();
    const user = await getSingleUser(sessionUser?.id);;
    // console.log(user);

    const response = user?._id ? await getFeedbacksByCreatorId(user._id) : null;
    // console.log(response);
    const feedbacksList = response?.feedback || [];
    // console.log(feedbacksList, feedbacksList[0].prompt);
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-zinc-50 to-stone-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* HEADER SECTION */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                                Moderation Notices & Feedback
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-2">
                                Review warnings, compliance requests, and updates regarding your submitted assets.
                            </p>
                        </div>
                        <div className="bg-amber-500 text-white px-5 py-3 rounded-2xl shadow font-medium text-sm">
                            Total Notices: {feedbacksList.length}
                        </div>
                    </div>
                </div>

                <FeedbackDisplay initialFeedbacks={feedbacksList} />
            </div>
        </div>
    );
};

export default FeedbackPage;