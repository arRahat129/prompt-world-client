'use client';

import React from 'react';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

const UpgradeBtnProfile = () => {
    const router = useRouter();

    const handleUpgradeRedirect = () => {
        // Route directly to your pricing section or stripe billing gateway link
        router.push('/pricing');
    };

    return (
        <Button
            onClick={handleUpgradeRedirect}
            className="w-full sm:w-auto bg-[#244D3F] text-white hover:bg-[#1a382e] font-semibold text-xs px-5 h-10 rounded-xl transition-all shadow-sm hover:scale-[1.01]"
        >
            Upgrade ($5)
        </Button>
    );
};

export default UpgradeBtnProfile;