import Link from "next/link";
import { Button } from "@heroui/react";
import { ShieldExclamation, ArrowLeft } from "@gravity-ui/icons";

export default function UnauthorizedPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 px-6 py-12 relative overflow-hidden">
            {/* Background Aesthetic Bluish Glow Elements */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-sky-500/10 dark:bg-sky-600/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="w-full max-w-md text-center flex flex-col items-center z-10">
                {/* Visual Accent Icon */}
                <div className="mb-6 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 shadow-sm animate-pulse">
                    <ShieldExclamation className="size-12" />
                </div>

                {/* Main Error Headers */}
                <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2 block">
                    Error 401: Security Intercept
                </span>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                    Authentication Denied
                </h1>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    You do not have the required permissions or clearances to view this terminal node. Your access credentials were not verified for this specific route.
                </p>

                {/* Penalty / Warning Callout Box */}
                <div className="w-full rounded-xl border border-red-200/60 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 p-4 text-left mb-8">
                    <h4 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        Compliance Warning
                    </h4>
                    <p className="text-xs text-red-700/90 dark:text-red-300/80 leading-relaxed">
                        Repeated unauthorized requests or probing restricted dashboard routes breaks terms of service. Continued attempts **might result in an immediate account penalty or permanent suspension**.
                    </p>
                </div>

                {/* Navigation CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                    <Link href="/" className="w-full sm:w-auto">
                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition h-11 px-6 rounded-xl"
                        >
                            <ArrowLeft className="size-4" />
                            Return to Safety
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}