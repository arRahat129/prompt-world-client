import React from 'react';
import Link from "next/link";
import { Button } from "@heroui/react";
import { FiArrowLeft, FiAlertTriangle } from "react-icons/fi";
import AddPromptForm from './AddPromptForm';
import { getSingleUser } from '@/lib/api/user';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import { FaCrown } from 'react-icons/fa6';
import { getCreatorPrompts } from '@/lib/api/prompts';
import { getPlanById } from '@/lib/api/plans';

export default async function AddNewPrompt() {
    const sessionUser = await getUserSession();
    const user = await getSingleUser(sessionUser.id);
    // console.log(user);

    if (!user) {
        redirect(`/auth/signin?redirect=/dashboard/${user?.role}/add-prompt`);
    }

    const myPrompts = await getCreatorPrompts(user?._id) || [];
    const totalPrompts = myPrompts.length;
    // console.log(totalPrompts);

    const plan = await getPlanById(user?.plan || 'user_free');
    // console.log(plan);


    // Calculate restrictions safely using actual layout statistics
    const isRestricted = totalPrompts >= plan?.maxCreatingPermission;

    // Calculate progress bar usage percentage
    const usagePercentage = Math.min((totalPrompts / plan?.maxCreatingPermission) * 100, 100);

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">

                {/* Top Control Header Node */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-divider pb-6">
                    <div>
                        <Link
                            href="/dashboard/creator"
                            className="inline-flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition"
                        >
                            <FiArrowLeft /> Back to Dashboard
                        </Link>
                        <h1 className="text-xl font-bold tracking-tight mt-2">Create a New Prompt</h1>
                    </div>

                    <div className="flex items-center gap-2 border border-divider rounded-full px-3 py-1.5 self-start sm:self-center">
                        <FaCrown size={14} className="text-warning" />
                        <span className="text-xs font-medium">
                            Current Tier: <strong>{plan?.name}</strong>
                        </span>
                    </div>
                </div>

                {/* 1. Dynamic Progress Quota Tracker Block */}
                <div className="border border-divider rounded-2xl p-6 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider opacity-60">
                                Monthly Creation Status
                            </span>
                            <h2 className="text-base font-bold mt-0.5">
                                You have uploaded <span>{totalPrompts}</span> out of <span>{plan?.maxCreatingPermission}</span> total items
                            </h2>
                        </div>
                    </div>

                    {/* Fluid Theme-Compliant Bar */}
                    <div className="w-full bg-default-200 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden mb-5 border border-divider/50">
                        <div
                            className={`h-full transition-all duration-500 rounded-full ${isRestricted ? 'bg-red-500' : usagePercentage > 66 ? 'bg-amber-500' : 'bg-blue-500'
                                }`}
                            style={{ width: `${usagePercentage}%` }}
                        />
                    </div>
                </div>

                {/* 2. Form Rendering / Limit Enforcement Guard */}
                {isRestricted ? (
                    /* Locked View when Limits are fully met */
                    <div className="border border-dashed border-divider rounded-2xl p-12 text-center flex flex-col items-center justify-center max-w-xl mx-auto mt-6 animate-in fade-in-50 duration-300">
                        <div className="w-12 h-12 bg-warning/10 text-warning rounded-full flex items-center justify-center mb-4 border border-warning/20">
                            <FiAlertTriangle size={22} />
                        </div>
                        <h3 className="text-lg font-bold tracking-tight">
                            Marketplace Submission Blocked
                        </h3>
                        <p className="text-sm opacity-70 max-w-sm mt-2 leading-relaxed">
                            You have reached your tier maximum limit of {plan?.maxCreatingPermission} prompt uploads for this regular cycle context allocation. Please upgrade your plan to unlock higher limits.
                        </p>

                        <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                            <Link href="/plans" className="w-full">
                                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm h-10 rounded-xl transition-all">
                                    Upgrade Plan
                                </Button>
                            </Link>
                            <Link href="/dashboard/creator" className="w-full">
                                <Button variant="bordered" className="w-full border-divider font-medium text-sm h-10 rounded-xl transition-all">
                                    Exit Area
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* Active State Form View */
                    <div className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                        <AddPromptForm />
                    </div>
                )}

            </div>
        </div>
    );
}