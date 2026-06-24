import UserAnalyticsView from '@/components/dashboard/UserAnalyticsView';
import { userAnalytics } from '@/lib/api/userAnalytics';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function UserDashboardStatsPage() {
    let analyticsData = {
        success: false,
        summary: { totalBookmarks: 0, totalCopies: 0, totalReviews: 0 },
        userSummaryBars: [],
        chartData: []
    };

    try {
        const response = await userAnalytics();
        if (response?.success) {
            analyticsData = response;
        }
    } catch (error) {
        console.error("Failed to pre-fetch consumer stats layer context:", error);
    }

    return (
        <div className="p-6 space-y-8 min-h-screen">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Personal Interaction Stats</h1>
                <p className="text-sm text-zinc-400">
                    Comprehensive overview tracking your saved assets, template utility usage, and profile engagement trends.
                </p>
            </div>

            <UserAnalyticsView data={analyticsData} />
        </div>
    );
}