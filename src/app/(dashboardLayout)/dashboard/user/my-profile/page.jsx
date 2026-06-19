import React from 'react';
import { Avatar, Card, Chip, Separator, Skeleton } from '@heroui/react';
import { getUserSession } from '@/lib/core/session';

const MyProfile = async () => {
    const user = await getUserSession();

    // Unauthenticated State
    if (!user) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Access Denied</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Please sign in to view your profile dashboard.</p>
            </div>
        );
    }

    // Extended/Mock Account Data (Fallback values until linked to DB metrics)
    const accountDetails = {
        role: "User", // E.g., User, Admin, Creator
        totalPrompts: 14,
        subscription: "Free Plan", // E.g., Free Plan, Premium Pro
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-10 bg-slate-50/50 dark:bg-black/20">
            <Card className="w-full max-w-2xl border border-blue-50/50 dark:border-slate-800 bg-white dark:bg-gray-900/40 backdrop-blur-md shadow-xl p-6 sm:p-8 rounded-3xl">

                {/* Header Profile Summary */}
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-5">
                    <Avatar className="h-24 w-24 text-large border-2 border-blue-100 dark:border-blue-900 shadow-md">
                        <Avatar.Image
                            alt={user.name || "User Avatar"}
                            src={user.image || ""}
                            referrerPolicy="no-referrer"
                        />
                        <Avatar.Fallback className="bg-blue-600 text-white font-bold text-2xl">
                            {user.name ? user.name[0].toUpperCase() : "U"}
                        </Avatar.Fallback>
                    </Avatar>

                    <div className="flex flex-col gap-1 grow">
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                                {user.name}
                            </h2>
                            <Chip
                                size="sm"
                                color={accountDetails.subscription.includes("Premium") ? "success" : "default"}
                                variant="flat"
                                className="font-medium"
                            >
                                {accountDetails.subscription}
                            </Chip>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                            {user.email}
                        </p>
                    </div>
                </div>

                <Separator className="my-6 bg-slate-100 dark:bg-slate-800" />

                {/* Account Metrics and Structural Data Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    {/* Full Name */}
                    <div className="flex flex-col gap-1 bg-slate-50/60 dark:bg-black/10 p-4 rounded-2xl border border-slate-100/40 dark:border-slate-800/40">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            Display Name
                        </span>
                        <span className="text-base font-semibold text-slate-700 dark:text-slate-200">
                            {user.name}
                        </span>
                    </div>

                    {/* Registered Email */}
                    <div className="flex flex-col gap-1 bg-slate-50/60 dark:bg-black/10 p-4 rounded-2xl border border-slate-100/40 dark:border-slate-800/40">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            Email Address
                        </span>
                        <span className="text-base font-semibold text-slate-700 dark:text-slate-200 truncate">
                            {user.email}
                        </span>
                    </div>

                    {/* Account Role */}
                    <div className="flex flex-col gap-1 bg-slate-50/60 dark:bg-black/10 p-4 rounded-2xl border border-slate-100/40 dark:border-slate-800/40">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            Account Role
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-base font-semibold text-slate-700 dark:text-slate-200">
                                {accountDetails.role}
                            </span>
                        </div>
                    </div>

                    {/* Total Prompts */}
                    <div className="flex flex-col gap-1 bg-slate-50/60 dark:bg-black/10 p-4 rounded-2xl border border-slate-100/40 dark:border-slate-800/40">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            Total Prompts Created
                        </span>
                        <span className="text-base font-bold text-blue-600 dark:text-blue-400">
                            {accountDetails.totalPrompts}
                        </span>
                    </div>

                </div>
            </Card>
        </div>
    );
};

export default MyProfile;