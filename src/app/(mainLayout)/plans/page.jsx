"use client";

import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { FiCheck, FiUser, FiBriefcase, FiHelpCircle, FiChevronDown } from 'react-icons/fi';

export default function PlansPage() {
    const [billingTarget, setBillingTarget] = useState('user');

    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const plansData = {
        user: [
            {
                name: "Free",
                price: "$0",
                period: "/forever",
                description: "Essential features for getting started and organizing your initial search tracking.",
                icon: <FiUser size={18} className="opacity-60" />,
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
                icon: <FiCheck size={18} className="text-primary" />,
                features: [
                    "Apply to up to 30 jobs per month",
                    "Unlimited saved jobs",
                    "Advanced application tracking dashboard",
                    "Comprehensive salary insights"
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
                icon: <FiUser size={18} className="opacity-60" />,
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
                name: "Pro-Creator",
                price: "$5",
                period: "/month",
                description: "Expanded allocation built for expanding creators with active multi-departmental tracks.",
                icon: <FiCheck size={18} className="text-primary" />,
                features: [
                    "Up to 15 active prompt listings simultaneously",
                    "Full automated pipeline tracking workflow",
                    "Basic performance metrics & analytics",
                    "Dedicated email support desk response"
                ],
                buttonText: "Scale Workspace",
                isPopular: true,
                isCurrent: false
            }
        ]
    };

    const faqs = [
        {
            question: 'Can I cancel my subscription at any time?',
            answer: 'Yes, absolutely. All our premium tiers operate on flexible, non-binding month-to-month subscription structures. You can easily modify, downgrade, or cancel your renewal configurations through your profile billing dashboard settings at any time with no penalties.'
        },
        {
            question: 'How do refunds work if I change my mind?',
            answer: 'We maintain a 14-day satisfaction policy. If you determine the premium features aren’t a proper fit for your current search or hiring sequence within your initial two weeks of service, reach out to support for a complete refund.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We support all major international credit/debit networks including Visa, Mastercard, American Express, and Discover. Enterprise-grade recruiters also have options to establish monthly or annual invoicing arrangements via bank wire transfers.'
        }
    ];

    const activePlans = plansData[billingTarget];

    return (
        <div className="w-full min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            {/* Switched max-w from 6xl to 4xl to natively center and frame the 2-column card balance */}
            <div className="max-w-4xl mx-auto">

                {/* Header Title Typography */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                        Transparent Pricing
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight">
                        Flexible plans tailored to your goals
                    </h1>
                    <p className="mt-3 text-sm leading-relaxed opacity-70">
                        Whether you are an ambitious job user hunting for your next milestone or a marketplace creator
                        distributing clean technical assets, we have got you covered.
                    </p>
                </div>

                {/* Switch Segment Control Toggle Grid Wrapper */}
                <div className="flex justify-center mb-16">
                    <div className="p-1.5 bg-content2 border border-divider rounded-xl flex items-center gap-1 shadow-inner">
                        <button
                            onClick={() => setBillingTarget('user')}
                            className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${billingTarget === 'user'
                                ? 'bg-content1 text-foreground shadow-md border border-divider/50'
                                : 'opacity-60 hover:opacity-100'
                                }`}
                        >
                            <FiUser size={14} />
                            For Job users
                        </button>
                        <button
                            onClick={() => setBillingTarget('creator')}
                            className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${billingTarget === 'creator'
                                ? 'bg-content1 text-foreground shadow-md border border-divider/50'
                                : 'opacity-60 hover:opacity-100'
                                }`}
                        >
                            <FiBriefcase size={14} />
                            For Creators
                        </button>
                    </div>
                </div>

                {/* 2-Column Balanced Card Layout (Using reference utility styles) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-24">
                    {activePlans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`relative bg-content1 border rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-120 transition-all duration-300 hover:-translate-y-1 ${plan.isPopular
                                ? 'border-primary ring-2 ring-primary/10'
                                : 'border-divider hover:border-divider-horizontal'
                                }`}
                        >
                            {/* Popular Highlight Pill */}
                            {plan.isPopular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-bold text-primary-foreground bg-primary rounded-full uppercase tracking-wider shadow-md">
                                    Most Popular
                                </span>
                            )}

                            {/* Plan Name & Core Header Metadata */}
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <h3 className="text-xl font-bold">{plan.name}</h3>
                                    <div className="p-2 bg-content2/60 rounded-lg border border-divider">
                                        {plan.icon}
                                    </div>
                                </div>
                                <p className="text-xs opacity-60 leading-relaxed min-h-9">
                                    {plan.description}
                                </p>

                                {/* Dynamic Price Indicator Text Block */}
                                <div className="my-6 flex items-baseline gap-1">
                                    <span className="text-4xl font-black tracking-tight">{plan.price}</span>
                                    <span className="text-xs opacity-50 font-medium">{plan.period}</span>
                                </div>

                                <hr className="border-divider my-6" />

                                {/* Interactive Checkbox Checklist Array Mapping */}
                                <ul className="space-y-3">
                                    {plan.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-2.5 text-xs">
                                            <div className="w-4 h-4 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0 mt-0.5">
                                                <FiCheck size={10} className="stroke-3" />
                                            </div>
                                            <span className="leading-normal opacity-80">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Plan Action CTA Callout */}
                            <div className="mt-8">
                                <form action="/api/checkout_sessions" method="POST">
                                    <section>
                                        <button type="submit" role="link" className={`block w-full text-center text-xs font-semibold px-4 py-3 rounded-xl transition duration-200 ${plan.popular
                                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'
                                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/50'
                                            }`}>
                                            Checkout
                                        </button>
                                    </section>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Accordion Section Layout Wrapper */}
                <div className="max-w-3xl mx-auto border-t border-divider pt-16">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-content2 border border-divider text-foreground/60 mb-3">
                            <FiHelpCircle size={18} />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold">Frequently Asked Questions</h2>
                        <p className="text-xs opacity-50 mt-1">Have concerns regarding billing pipelines? Find instant clarity indicators below.</p>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    className="bg-content1 border border-divider rounded-xl overflow-hidden transition-colors duration-200"
                                >
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full flex items-center justify-between text-left p-4 gap-4 text-foreground/80 hover:text-foreground transition"
                                    >
                                        <span className="text-sm font-semibold">{faq.question}</span>
                                        <FiChevronDown
                                            className={`w-4 h-4 opacity-50 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary opacity-100' : ''
                                                }`}
                                        />
                                    </button>

                                    {/* Collapsible Accordion Element View Body */}
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-40 border-t border-divider/60' : 'max-h-0'
                                            }`}
                                    >
                                        <div className="p-4 text-xs opacity-60 leading-relaxed bg-content2/30">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}