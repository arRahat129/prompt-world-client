import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FiCheckCircle, FiArrowRight, FiMail } from 'react-icons/fi';
import { stripe } from '@/lib/stripe';
import { HiShieldCheck } from 'react-icons/hi2';
import { createPayment } from '@/lib/actions/plans';
import { getUserSession } from '@/lib/core/session';
import { IoCloudDoneOutline } from 'react-icons/io5';

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams;
    const user = await getUserSession();

    if (!session_id) {
        throw new Error('Please provide a valid session_id (`cs_test_...`)');
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    });

    const status = session?.status;
    const customerEmail = session?.customer_details?.email;

    if (status === 'open') {
        return redirect('/');
    }

    if (status === 'complete') {
        const planId = session?.metadata?.planId;

        const payInfo = {
            email: customerEmail,
            planId: planId
        };

        const result = await createPayment(payInfo);
        console.log(result);

        return (
            <div className="w-full min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-background">
                <div className="max-w-md w-full relative">

                    {/* Subtle Top Accent Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/15 blur-[90px] pointer-events-none rounded-full" />

                    <div className="relative bg-content1 border border-divider rounded-2xl p-8 shadow-xl text-center flex flex-col items-center">

                        <div className="w-16 h-16 rounded-2xl bg-success/10 text-success flex items-center justify-center border border-success/20 mb-6 shadow-sm">
                            <FiCheckCircle size={32} className="stroke-[1.5]" />
                        </div>

                        <span className="text-[10px] font-bold uppercase tracking-widest text-success bg-success/10 border border-success/20 px-2.5 py-1 rounded-full mb-3">
                            Payment Processed
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                            Account Elevated!
                        </h1>
                        <p className="mt-2 text-xs leading-relaxed opacity-60 max-w-sm">
                            Your payment has been securely confirmed. Your premium features are now active.
                        </p>

                        <div className="w-full my-6 p-5 bg-primary/10 border border-primary/20 rounded-xl relative overflow-hidden text-left">
                            <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none text-primary">
                                <IoCloudDoneOutline size={64} />
                            </div>

                            <span className="text-[9px] font-black tracking-wider text-white bg-primary px-2 py-0.5 rounded-md uppercase">
                                Lifetime Pass Activated
                            </span>

                            <h3 className="text-sm font-bold text-foreground mt-2">
                                One-Time Payment Completed
                            </h3>

                            <p className="text-[11px] opacity-70 mt-1 leading-relaxed">
                                You have successfully unlocked permanent premium status. There are no recurring monthly fees or future subscription bills. Your access is fully secured for life.
                            </p>
                        </div>

                        {customerEmail && (
                            <div className="w-full flex items-start gap-3 bg-content2/40 border border-divider/60 rounded-xl p-4 text-left mb-6">
                                <FiMail size={16} className="text-primary mt-0.5 shrink-0" />
                                <div className="space-y-0.5">
                                    <p className="text-[11px] font-medium opacity-50 uppercase tracking-wider">Confirmation Sent To</p>
                                    <p className="text-xs font-semibold text-foreground truncate break-all">{customerEmail}</p>
                                </div>
                            </div>
                        )}

                        <div className="w-full flex flex-col gap-3">
                            <Link
                                href={`/dashboard/${user?.role}`}
                                className="w-full h-11 bg-primary text-primary-foreground font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition tracking-wide"
                            >
                                Go to Dashboard
                                <FiArrowRight size={14} />
                            </Link>

                            <Link
                                href="/"
                                className="w-full h-11 bg-content2/60 border border-divider text-foreground font-medium text-xs rounded-xl flex items-center justify-center hover:bg-content2 transition tracking-wide"
                            >
                                Back to Homepage
                            </Link>
                        </div>

                        {/* Support Footer Note */}
                        <div className="mt-8 flex items-center gap-1.5 text-[11px] opacity-40 justify-center">
                            <HiShieldCheck size={12} />
                            <span>Secured transactional gateway</span>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    return null;
}