import React from 'react';
import { creatorAnalytics } from '@/lib/api/creatorAnalytics';
import CreatorAnalyticsView from '@/components/dashboard/CreatorAnalyticsView';

export const dynamic = 'force-dynamic';

export default async function CreatorDashboardPage() {
    let analyticsData = {
        success: false,
        summary: { totalPrompts: 0, totalCopies: 0, totalBookmarks: 0 },
        chartData: []
    };

    try {
        const response = await creatorAnalytics();
        // console.log(response);
        if (response?.success) {
            analyticsData = response;
        }
    } catch (error) {
        console.error("Failed to pre-fetch analytics on server layer:", error);
    }

    return (
        <div className="p-6 space-y-8 min-h-screen">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Creator Dashboard</h1>
                <p className="text-sm text-zinc-400">Real-time prompt asset usage performance overview indicators</p>
            </div>

            <CreatorAnalyticsView data={analyticsData} />
        </div>
    );
}