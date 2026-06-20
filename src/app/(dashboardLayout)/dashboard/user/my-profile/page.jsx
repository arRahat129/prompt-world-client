import React from 'react';
import { Avatar, Card, Chip, Separator } from '@heroui/react';
import {
    FiMail, FiFileText, FiCheckCircle, FiCheck,
    FiAward, FiCornerDownRight
} from 'react-icons/fi';
import { FaGem } from 'react-icons/fa6';
import { getUserSession } from '@/lib/core/session';
import UpgradeBtnProfile from '@/components/subscription/UpgradeBtnProfile';

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

    const isPremium = !!user.isPremiumView;

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-10 bg-slate-50/50 dark:bg-black/20">
            <div className="max-w-5xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">User Account Profile</h1>
                    <p className="text-sm text-zinc-400 mt-1">
                        Manage your plan, credentials, and published prompt details.
                    </p>
                </div>
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
                                    color={isPremium ? "success" : "default"}
                                    variant="flat"
                                    className={`font-semibold ${isPremium ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : ''}`}
                                >
                                    {isPremium ? "Premium Member" : "Free Tier"}
                                </Chip>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                <FiMail size={15} className="text-zinc-500" /> {user.email}
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
                                    {user?.role}
                                </span>
                            </div>
                        </div>

                        {/* Total Prompts */}
                        <div className="flex flex-col gap-1 bg-slate-50/60 dark:bg-black/10 p-4 rounded-2xl border border-slate-100/40 dark:border-slate-800/40">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Total Prompts Created
                            </span>
                            <span className="text-base font-bold text-blue-600 dark:text-blue-400">
                                {user?.totalPrompts || '0'}
                            </span>
                        </div>

                    </div>

                    <div>
                        {isPremium ? (
                            <div className="w-full bg-[#244D3F]/10 border border-[#244D3F]/40 rounded-xl p-4 flex items-center gap-3 text-emerald-400 shadow-inner">
                                <div className="w-6 h-6 rounded-full bg-[#244D3F]/30 flex items-center justify-center text-emerald-300 shrink-0">
                                    <FiCheck size={14} />
                                </div>
                                <p className="text-xs sm:text-sm font-medium tracking-wide">
                                    Lifetime Premium Active - Enjoy complete access to all Prompt Marketplace items!
                                </p>
                            </div>
                        ) : (
                            <div className="w-full bg-[#151B2C] border border-zinc-800 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                                        <FaGem className="text-purple-400 text-sm" />
                                        <h4>Upgrade to Pro Lifetime</h4>
                                    </div>
                                    <p className="text-xs text-zinc-400 max-w-xl leading-normal">
                                        Unlock access to all private prompt templates, parameter sets, and community reviews for a single one-time contribution of $5.
                                    </p>
                                </div>
                                <UpgradeBtnProfile />
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default MyProfile;