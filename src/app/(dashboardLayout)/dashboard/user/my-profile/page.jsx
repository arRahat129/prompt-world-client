import React from 'react';
import { Avatar, Card, Chip, Separator, Button } from '@heroui/react';
import Link from 'next/link';
import {
    FiMail, FiCheckCircle, FiUser, FiCode, FiLayers
} from 'react-icons/fi';
import { FaGem } from 'react-icons/fa6';
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

    const isPremium = user?.plan === 'user_pro';

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-10 bg-slate-50/50 dark:bg-slate-950/20">
            <div className="max-w-5xl mx-auto space-y-6 w-full flex flex-col items-center sm:items-start">
                <div className="w-full max-w-2xl text-left">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">User Account Profile</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage your plan, credentials, and published prompt details.
                    </p>
                </div>

                <Card className="w-full max-w-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 backdrop-blur-md shadow-xl p-6 sm:p-8 rounded-3xl flex flex-col gap-6">

                    {/* Header Profile Summary */}
                    <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-5">
                        <Avatar className="h-20 w-20 text-large border-2 border-blue-100 dark:border-blue-900 shadow-sm shrink-0">
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
                            <div className="flex flex-col sm:flex-row items-center gap-2 justify-center sm:justify-start">
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                                    {user.name}
                                </h2>
                                <Chip
                                    size="sm"
                                    variant="flat"
                                    className={`font-semibold text-xs px-2.5 h-6 rounded-full border ${isPremium
                                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-transparent'
                                        }`}
                                >
                                    {isPremium ? "Pro Member" : "Free Tier"}
                                </Chip>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center sm:justify-start gap-1.5">
                                <FiMail className="text-slate-400 dark:text-slate-500" /> {user.email}
                            </p>
                        </div>
                    </div>

                    <Separator className="bg-slate-100 dark:bg-slate-800/80" />

                    {/* Account Metrics and Structural Data Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Full Name */}
                        <div className="flex items-center gap-3 bg-slate-50/60 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                                <FiUser className="size-4" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                    Display Name
                                </span>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
                                    {user.name}
                                </span>
                            </div>
                        </div>

                        {/* Account Role */}
                        <div className="flex items-center gap-3 bg-slate-50/60 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                                <FiLayers className="size-4" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                    Account Role
                                </span>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 capitalize">
                                    {user?.role || "User"}
                                </span>
                            </div>
                        </div>

                        {/* Total Prompts */}
                        <div className="flex items-center gap-3 bg-slate-50/60 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50 sm:col-span-2">
                            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                                <FiCode className="size-4" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                    Total Prompts Created
                                </span>
                                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                    {user?.totalPrompts || '0'}
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Subscription Content Check */}
                    <div>
                        {isPremium ? (
                            <div className="w-full bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex items-center gap-3 text-blue-600 dark:text-blue-400 shadow-sm">
                                <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                    <FiCheckCircle size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-sm font-bold tracking-wide">Lifetime Pro Account Activated</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        Enjoy complete access to all private prompt structures, parameter configurations, and premium reviews!
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold text-sm sm:text-base">
                                        <FaGem className="text-blue-500 text-sm animate-bounce" />
                                        <h4>Upgrade to Pro Lifetime</h4>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-normal">
                                        Unlock access to all private templates, hidden structural parameter sets, and community features instantly.
                                    </p>
                                </div>
                                <Link href="/plans" className="w-full sm:w-auto shrink-0">
                                    <Button
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wide h-10 px-5 rounded-xl shadow-md shadow-blue-600/10 transition-all duration-200"
                                    >
                                        View Plans
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default MyProfile;