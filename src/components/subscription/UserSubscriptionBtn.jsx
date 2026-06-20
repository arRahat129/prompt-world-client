'use client';

import React from 'react';
import { Button } from "@heroui/react";

const UserSubscriptionBtn = ({ price }) => {
    const handleSubscription = () => {
        // Integrate your payment gateway routing or API dispatch logic here
        console.log(`Initiating subscription logic for $${price}`);
    };

    return (
        <Button
            onClick={handleSubscription}
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-6 text-sm rounded-full transition-all shadow-lg hover:scale-[1.02]"
        >
            Subscribe to Premium (${price})
        </Button>
    );
};

export default UserSubscriptionBtn;