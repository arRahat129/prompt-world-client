"use client";

import React from 'react';
import { Card, Button } from "@heroui/react";
import {
    FiCpu,
    FiLayers,
    FiZap,
    FiShield,
    FiTrendingUp,
    FiUsers,
    FiArrowRight
} from "react-icons/fi";
import Link from 'next/link';

const WhyChooseUs = () => {
    const benefits = [
        {
            icon: <FiCpu className="text-sky-500" size={24} />,
            title: "Multi-Model Optimization",
            description: "Engineered specifically for ChatGPT, Midjourney, Claude, and Gemini. Get perfect outputs every single time without guessing configurations."
        },
        {
            icon: <FiZap className="text-blue-500" size={24} />,
            title: "Instant One-Click Copy",
            description: "Copy pristine structures directly to your clipboard alongside precise variables, difficulty parameters, and custom tokens instantly."
        },
        {
            icon: <FiLayers className="text-cyan-500" size={24} />,
            title: "Curated Framework Galleries",
            description: "Browse neatly organized stacks sorted by development, design, marketing, and automation workflows validated by community administrators."
        },
        {
            icon: <FiShield className="text-indigo-500" size={24} />,
            title: "Enterprise Token Security",
            description: "Protected backend authentication layer securing premium architectures, unique configurations, and creator submission histories seamlessly."
        },
        {
            icon: <FiTrendingUp className="text-emerald-500" size={24} />,
            title: "Performance Tracking",
            description: "Track precise usage analytics, view community validation scores, and monitor total dynamic counter synchronizations live on your dash."
        },
        {
            icon: <FiUsers className="text-violet-500" size={24} />,
            title: "Creator-First Ecosystem",
            description: "Built for prompt engineering pioneers. Showcase your elite generative logic, gain public validation, and grow your digital reputation."
        }
    ];

    return (
        <section className="w-full relative overflow-hidden bg-zinc-50/50 dark:bg-[#090d16] py-20 px-4 transition-colors duration-300">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-400/10 dark:bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-7xl mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-200/50 dark:border-sky-900/40 bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 font-semibold text-xs uppercase tracking-wider">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
                        Platform Advantages
                    </div>

                    <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                        Why Engineers Choose <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-500 via-blue-500 to-indigo-500">Prompt World</span>
                    </h2>

                    <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg">
                        The ultimate decentralized hub engineered to discover, optimize, and distribute professional generative AI instructions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((benefit, index) => (
                        <Card
                            key={index}
                            className="bg-white dark:bg-[#0f172a] border border-zinc-200 dark:border-sky-950/40 hover:border-sky-400/40 dark:hover:border-sky-500/40 hover:shadow-lg dark:hover:shadow-sky-500/5 transition-all duration-300 p-6 flex flex-col space-y-4 rounded-xl text-left"
                            shadow="none"
                        >
                            <div className="h-12 w-12 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center shrink-0 shadow-sm">
                                {benefit.icon}
                            </div>

                            <div className="space-y-2 grow">
                                <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
                                    {benefit.title}
                                </h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="mt-16 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        Ready to scale your generative model output quality?
                    </p>
                    <Link href="/prompts">
                        <Button
                            className="font-semibold text-sm bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-md shadow-sky-500/10 transition-all h-11 px-6 rounded-lg"
                            endContent={<FiArrowRight size={16} />}
                        >
                            Explore Open Marketplace
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;