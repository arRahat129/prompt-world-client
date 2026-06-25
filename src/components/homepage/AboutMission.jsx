"use client";

import React from 'react';
import { Card } from "@heroui/react";
import { FiCheck } from "react-icons/fi";

const pillars = [
    { title: "Context Engineering", desc: "We move away from simple sentence strings toward structural markdown declarations." },
    { title: "Token Efficiency", desc: "Every template is structured to achieve the highest quality generation using fewer system parameters." },
    { title: "Model Adaptability", desc: "Pre-tested configurations adjusting gracefully across varying LLM window updates." }
];

const AboutMission = () => {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-20 border-t border-zinc-100 dark:border-zinc-900">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Left Branding Column */}
                <div className="lg:col-span-5 space-y-4">
                    <span className="text-xs font-bold text-sky-500 dark:text-sky-400 uppercase tracking-widest block">
                        Our Architectural Core
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-none">
                        Bridging the Gap Between Intent & AI Execution.
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                        Prompt World was not built for casual inputs. We engineered a platform for developers, creators, and data architects who require deterministic outputs from probabilistic generative systems.
                    </p>
                </div>

                {/* Right Static Cards Column */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {pillars.map((pillar, i) => (
                        <Card
                            key={i}
                            className="p-5 bg-white dark:bg-[#0f172a] border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between min-h-48"
                            shadow="none"
                        >
                            <div className="w-6 h-6 rounded-full bg-sky-500/10 dark:bg-sky-500/5 text-sky-500 dark:text-sky-400 flex items-center justify-center mb-4">
                                <FiCheck size={12} strokeWidth={3} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-bold text-sm text-zinc-800 dark:text-zinc-100">
                                    {pillar.title}
                                </h4>
                                <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-normal">
                                    {pillar.desc}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default AboutMission;