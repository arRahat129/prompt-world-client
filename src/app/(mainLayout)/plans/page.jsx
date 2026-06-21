"use client";

import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { FiCheck, FiUser, FiBriefcase, FiHelpCircle } from 'react-icons/fi';

export default function PlansPage() {
    // State switcher between 'user' (User) and 'creator'
    const [billingTarget, setBillingTarget] = useState('user');

    // 1. Plan Structure Data Model
    const plansData = {
        user: [
            {
                name: "Free",
                price: "$0",
                period: "/forever",
                description: "Essential features for getting started and organizing your initial search tracking.",
                features: [
                    "Browse & save up to 10 jobs",
                    "Apply to up to 3 jobs per month",
                    "Basic profile page",
                    "Standard email alerts"
                ],
                buttonText: "Current Plan",
                isPopular: false,
                isCurrent: true
            },
            {
                name: "Pro Visibility",
                price: "$5",
                period: "/month",
                description: "Our most popular option for serious active candidates looking to rapidly accelerate landing a role.",
                features: [
                    "Apply to up to 30 jobs per month",
                    "Unlimited saved jobs",
                    "Advanced application tracking dashboard",
                    "Comprehensive salary insights",
                    "Priority profile visibility multiplier"
                ],
                buttonText: "Upgrade to Pro",
                isPopular: true,
                isCurrent: false
            }
        ],
        creator: [
            {
                name: "Free Creator",
                price: "$0",
                period: "/forever",
                description: "Standard creator sandbox tools to list items inside our public prompt repository ecosystem.",
                features: [
                    "Upload up to 3 prompts total",
                    "Standard creator profile matrix",
                    "Public marketplace community visibility",
                    "Basic performance analytics overview"
                ],
                buttonText: "Current Plan",
                isPopular: false,
                isCurrent: true
            },
            {
                name: "Pro Lifetime",
                price: "$5",
                period: "/lifetime",
                description: "Uncapped prompt generation capabilities with persistent marketplace visibility assets.",
                features: [
                    "Unlimited prompt uploads & listings",
                    "Lifetime active listing distribution profile",
                    "Advanced sales analytics conversion graphs",
                    "24/7 dedicated support priority queue",
                    "Verified Creator badge allocation"
                ],
                buttonText: "Unlock Lifetime Pro",
                isPopular: true,
                isCurrent: false
            }
        ]
    };

    const activePlans = plansData[billingTarget];

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-5xl mx-auto space-y-12">

                {/* Visual Typography Header Node */}
                <div className="text-center space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                        Transparent Pricing
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        Flexible plans tailored to your goals
                    </h1>
                    <p className="text-sm opacity-70 max-w-2xl mx-auto leading-relaxed">
                        Whether you are an ambitious job user hunting for your next milestone or a marketplace creator
                        distributing clean technical assets, we have got you covered.
                    </p>
                </div>

                {/* 2. Interactive Toggle Switch Node */}
                <div className="flex justify-center">
                    <div className="inline-flex p-1 border border-divider bg-content2 rounded-xl shadow-inner">
                        <Button
                            size="sm"
                            variant={billingTarget === 'user' ? 'solid' : 'light'}
                            color={billingTarget === 'user' ? 'primary' : 'default'}
                            className={`rounded-lg font-semibold text-xs px-4 h-9 transition-all`}
                            startContent={<FiUser size={14} />}
                            onClick={() => setBillingTarget('user')}
                        >
                            For Job users
                        </Button>
                        <Button
                            size="sm"
                            variant={billingTarget === 'creator' ? 'solid' : 'light'}
                            color={billingTarget === 'creator' ? 'primary' : 'default'}
                            className={`rounded-lg font-semibold text-xs px-4 h-9 transition-all`}
                            startContent={<FiBriefcase size={14} />}
                            onClick={() => setBillingTarget('creator')}
                        >
                            For Creators
                        </Button>
                    </div>
                </div>

                {/* 3. Fluid Grid Layout Plan Cards */}
                <div className={`grid gap-8 max-w-md mx-auto ${activePlans.length > 1 ? 'md:grid-cols-2 md:max-w-3xl' : 'grid-cols-1'}`}>
                    {activePlans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`relative border rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 shadow-sm bg-content1 ${plan.isPopular
                                    ? 'border-primary ring-2 ring-primary/20 shadow-md scale-102 z-10'
                                    : 'border-divider'
                                }`}
                        >
                            {plan.isPopular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-full shadow-sm">
                                    Most Popular
                                </span>
                            )}

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold tracking-tight">{plan.name}</h3>
                                    <p className="text-xs opacity-60 mt-1.5 leading-relaxed min-h-10">
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="flex items-baseline gap-1 py-2 border-b border-divider">
                                    <span className="text-4xl font-black tracking-tight">{plan.price}</span>
                                    <span className="text-xs opacity-60 font-medium">{plan.period}</span>
                                </div>

                                {/* Feature Iteration Node */}
                                <ul className="space-y-3.5 text-sm">
                                    {plan.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-3">
                                            <span className="w-5 h-5 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0 mt-0.5">
                                                <FiCheck size={12} />
                                            </span>
                                            <span className="opacity-80 text-xs leading-normal">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8">
                                <Button
                                    fullWidth
                                    color={plan.isPopular ? "primary" : "default"}
                                    variant={plan.isCurrent ? "bordered" : "solid"}
                                    className="font-bold text-xs h-11 rounded-xl shadow-sm tracking-wide"
                                    isDisabled={plan.isCurrent}
                                >
                                    {plan.buttonText}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 4. Frequently Asked Questions Area */}
                <div className="border-t border-divider pt-16 max-w-3xl mx-auto space-y-8">
                    <div className="text-center space-y-2">
                        <div className="w-10 h-10 border border-divider bg-content2 rounded-xl flex items-center justify-center mx-auto mb-2 opacity-80">
                            <FiHelpCircle size={18} />
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">Frequently Asked Questions</h2>
                        <p className="text-xs opacity-60">Have concerns regarding billing pipelines? Find answers below.</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            { q: "Can I cancel my subscription at any time?", a: "Yes, you can downgrade or terminate your billing cycle direct from your workspace dashboard panel at your discretion." },
                            { q: "How do refunds work if I change my mind?", a: "We support standard consumer clearance frameworks within a set calendar period if no extensive query parameters have been exhausted." }
                        ].map((faq, fIdx) => (
                            <div key={fIdx} className="border border-divider rounded-xl p-5 bg-content1/50">
                                <h4 className="text-sm font-bold">{faq.q}</h4>
                                <p className="text-xs opacity-60 mt-2 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}