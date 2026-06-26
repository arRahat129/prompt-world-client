'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createPayment } from '@/lib/actions/plans';
import { useSession } from '@/lib/auth-client';

export default function SuccessVerificationContent() {
    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const user = session?.user;
    // console.log(user);
    const router = useRouter();

    const targetPlanId = searchParams.get('plan_id');
    const sessionId = searchParams.get('session_id');
    const hasValidParams = Boolean(targetPlanId && sessionId);

    // 💡 Initialize state conditionally based on parameters right away!
    const [statusMessage, setStatusMessage] = useState(
        hasValidParams ? 'Verifying your upgrade session...' : 'Missing essential checkout parameters.'
    );
    const [isProcessing, setIsProcessing] = useState(hasValidParams);
    const [verificationSuccess, setVerificationSuccess] = useState(false);

    const syncInitiated = useRef(false);

    useEffect(() => {
        // Safe circuit-breakers with NO synchronous state updates
        if (!hasValidParams || syncInitiated.current) return;
        syncInitiated.current = true;

        const verifyCheckout = async () => {
            try {
                const response = await createPayment(targetPlanId);
                // console.log(response);

                if (response?.success) {
                    setStatusMessage('Success! Your premium privileges are now fully active.');
                    setVerificationSuccess(true);
                } else {
                    if (response?.message?.toLowerCase().includes('already') || response?.status === 400) {
                        setStatusMessage('Account already upgraded! Forwarding to validation view...');
                        router.push('/plans/alreadyPaid');
                    } else {
                        setStatusMessage(`Sync Verification Error: ${response?.message || 'Database validation anomaly.'}`);
                    }
                    setIsProcessing(false);
                }
            } catch (err) {
                setStatusMessage('A network pipeline error occurred. Please verify your profile dashboard.');
                setIsProcessing(false);
            }
        };

        verifyCheckout();
    }, [hasValidParams, targetPlanId, router]);

    useEffect(() => {
        if (!verificationSuccess) return;

        if (user && user.role) {
            const targetRedirect = `/dashboard/${user.role}` || '/';
            const timer = setTimeout(() => {
                router.push(targetRedirect);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [verificationSuccess, user, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
            <h2 className="text-xl font-bold mb-2">Payment Processing</h2>
            <p className="text-sm opacity-70 mb-4">{statusMessage}</p>
            {isProcessing && (
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            )}
        </div>
    );
}