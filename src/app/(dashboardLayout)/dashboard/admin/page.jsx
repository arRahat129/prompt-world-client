import AdminAnalyticsCharts from '@/components/dashboard/AdminAnalyticsCharts';
import { adminAnalytics } from '@/lib/api/adminAnalytics';
import React from 'react';
import { FiUsers, FiCpu, FiCopy, FiDollarSign } from 'react-icons/fi';

const AdminHomePage = async () => {
    const response = await adminAnalytics();
    console.log(response);

    if (!response || !response.success) {
        return (
            <div className="p-8 text-center text-danger font-medium">
                Failed to resolve platform operational analytics metrics. Please retry shortly.
            </div>
        );
    }

    const { summaryCards, charts } = response;

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 bg-background min-h-screen transition-colors duration-200">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-black text-foreground tracking-tight">
                    System Admin Insights
                </h1>
                <p className="text-xs font-medium text-default-400">
                    Real-time platform usage metrics and performance distributions.
                </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-content1 p-5 rounded-2xl border border-divider shadow-sm flex flex-col justify-between relative overflow-hidden group">
                    <div>
                        <p className="text-[10px] font-bold text-default-400 uppercase tracking-wider">Total Users</p>
                        <p className="text-3xl font-black text-foreground mt-2 tracking-tight">{summaryCards.totalUsers}</p>
                    </div>
                    <FiUsers className="absolute right-4 bottom-4 text-blue-500/10 dark:text-blue-200 group-hover:text-blue-500/20 dark:group-hover:text-blue-200/20 transition-colors" size={40} />
                </div>

                <div className="bg-content1 p-5 rounded-2xl border border-divider shadow-sm flex flex-col justify-between relative overflow-hidden group">
                    <div>
                        <p className="text-[10px] font-bold text-default-400 uppercase tracking-wider">Total Actions</p>
                        <div className="flex items-baseline gap-1.5 mt-2">
                            <p className="text-3xl font-black text-foreground tracking-tight">{summaryCards.totalPrompts}</p>
                            <span className="text-[10px] text-default-400 font-medium lowercase">prompts</span>
                        </div>
                    </div>
                    <FiCpu className="absolute right-4 bottom-4 text-blue-500/10 dark:text-blue-200 group-hover:text-blue-500/20 dark:group-hover:text-blue-200/20 transition-colors" size={40} />
                </div>

                <div className="bg-content1 p-5 rounded-2xl border border-divider shadow-sm flex flex-col justify-between relative overflow-hidden group">
                    <div>
                        <p className="text-[10px] font-bold text-default-400 uppercase tracking-wider">System Copies</p>
                        <p className="text-3xl font-black text-foreground mt-2 tracking-tight">{summaryCards.totalCopies}</p>
                    </div>
                    <FiCopy className="absolute right-4 bottom-4 text-blue-500/10 dark:text-blue-200 group-hover:text-blue-500/20 dark:group-hover:text-blue-200/20 transition-colors" size={40} />
                </div>

                <div className="bg-content1 p-5 rounded-2xl border border-divider shadow-sm flex flex-col justify-between relative overflow-hidden group">
                    <div>
                        <p className="text-[10px] font-bold text-default-400 uppercase tracking-wider">Gross Revenue</p>
                        <p className="text-3xl font-black text-blue-500 dark:text-blue-400 mt-2 tracking-tight">
                            ${summaryCards.totalRevenue.toFixed(2)}
                        </p>
                    </div>
                    <FiDollarSign className="absolute right-4 bottom-4 text-blue-500/10 dark:text-blue-200 group-hover:text-blue-500/20 dark:group-hover:text-blue-200/20 transition-colors" size={40} />
                </div>
            </div>

            <div className="bg-content1 p-4 rounded-xl border border-divider shadow-sm flex flex-wrap items-center justify-between gap-4 transition-colors">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-default-400">Prompt Queue Status:</span>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-success shadow-sm shadow-success/40" />
                        <span className="text-xs font-semibold text-foreground">{summaryCards.promptsApproved} Approved</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-warning shadow-sm shadow-warning/40" />
                        <span className="text-xs font-semibold text-foreground">{summaryCards.promptsPending} Pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-danger shadow-sm shadow-danger/40" />
                        <span className="text-xs font-semibold text-foreground">{summaryCards.promptsRejected} Rejected</span>
                    </div>
                </div>
                <div className="text-[11px] font-medium text-default-400 tracking-tight">
                    Intercepted Volume: {summaryCards.totalPaymentsCount} Payments / {summaryCards.totalReviews} Reviews
                </div>
            </div>

            <AdminAnalyticsCharts chartsData={charts} />
        </div>
    );
};

export default AdminHomePage;