import React from 'react';
import Link from 'next/link';
import { FiArrowRight, FiShield, FiCheckCircle } from 'react-icons/fi';
import { getUserSession } from '@/lib/core/session';

export default async function AlreadyPaidPage() {
    const user = await getUserSession();

    const dashboardPath = user?.role ? `/dashboard/${user.role}` : '/dashboard';

    return (
        <div className="w-full min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="max-w-md w-full relative">

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-500/10 blur-[80px] pointer-events-none rounded-full" />

                <div className="relative bg-content1 border border-divider rounded-2xl p-8 shadow-xl text-center flex flex-col items-center">

                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20 mb-6 shadow-sm">
                        <FiShield size={32} className="stroke-[1.5]" />
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-blue-600 px-3 py-1 rounded-full mb-4 shadow-sm shadow-blue-500/10">
                        Account Fully Active
                    </span>

                    <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
                        You are Already Upgraded!
                    </h1>

                    <p className="mt-3 text-xs leading-relaxed opacity-60 max-w-sm">
                        You were redirected here because your account is already locked into our permanent premium tier. No further checkouts or charges are required.
                    </p>

                    <div className="w-full my-6 p-4 bg-content2/50 border border-divider rounded-xl text-left space-y-3">
                        <div className="flex items-start gap-2 text-xs">
                            <FiCheckCircle className="text-blue-500 mt-0.5 shrink-0" size={14} />
                            <p className="opacity-80"><strong>One-Time Payment Saved:</strong> Your transactional profile is secured.</p>
                        </div>
                        <div className="flex items-start gap-2 text-xs">
                            <FiCheckCircle className="text-blue-500 mt-0.5 shrink-0" size={14} />
                            <p className="opacity-80"><strong>Lifetime Status:</strong> Enjoy unrestricted permanent access with zero recurring fees.</p>
                        </div>
                    </div>

                    {/* Action Links */}
                    <div className="w-full flex flex-col gap-3">
                        <Link
                            href={dashboardPath}
                            className="w-full h-11 bg-primary text-primary-foreground font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition tracking-wide"
                        >
                            Go to My Dashboard
                            <FiArrowRight size={14} />
                        </Link>

                        <Link
                            href="/"
                            className="w-full h-11 bg-content2/60 border border-divider text-foreground font-medium text-xs rounded-xl flex items-center justify-center hover:bg-content2 transition tracking-wide"
                        >
                            Back to Homepage
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}