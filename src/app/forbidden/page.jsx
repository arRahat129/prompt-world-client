import Link from "next/link";
import { Button } from "@heroui/react";
import { Lock, ArrowLeft } from "@gravity-ui/icons";

export default function ForbiddenPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 px-6 py-12 relative overflow-hidden">
            {/* Background Aesthetic Greenish Glow Elements */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#244D3F]/10 dark:bg-[#244D3F]/15 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/5 dark:bg-emerald-600/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="w-full max-w-md text-center flex flex-col items-center z-10">
                {/* Visual Accent Icon */}
                <div className="mb-6 p-4 rounded-2xl bg-[#244D3F]/5 dark:bg-[#244D3F]/20 text-[#244D3F] dark:text-emerald-400 border border-[#244D3F]/10 dark:border-emerald-900/30 shadow-sm animate-pulse">
                    <Lock className="size-12" />
                </div>

                {/* Main Error Headers */}
                <span className="text-xs font-semibold uppercase tracking-widest text-[#244D3F] dark:text-emerald-400 mb-2 block">
                    Error 403: Access Restricted
                </span>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                    Insufficient Privileges
                </h1>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    Your account identity is verified, but you do not possess the required tier clearance, subscription level, or administrative role authorized to decrypt this view.
                </p>

                {/* Information Callout Box */}
                <div className="w-full rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/10 p-4 text-left mb-8">
                    <h4 className="text-xs font-bold text-[#244D3F] dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        Upgrade or Re-auth Required
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        If you believe you should have access, please make sure you are logged into the correct profile, or consider upgrading to the **Pro Tier subscription** to unlock exclusive marketplace assets.
                    </p>
                </div>

                {/* Navigation CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                    <Link href="/" className="w-full sm:w-auto">
                        <Button
                            className="w-full bg-[#244D3F] hover:bg-[#1b3a2f] text-white font-medium shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 transition h-11 px-6 rounded-xl"
                        >
                            <ArrowLeft className="size-4" />
                            Return to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}