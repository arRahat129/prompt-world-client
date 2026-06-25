"use client";

import React, { useEffect, useState } from 'react';
import { Card, Spinner } from "@heroui/react";
import { FiCpu, FiUsers, FiSliders, FiCheckCircle } from "react-icons/fi";
import { getPlatformStats } from '@/lib/api/prompts';

const PlatformStats = () => {
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getPlatformStats();
                if (data) {
                    setStatsData(data);
                }
            } catch (error) {
                console.error("Error loading interactive data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="w-full min-h-48 flex items-center justify-center">
                <Spinner color="success" label="Calculating real-time database index metrics..." />
            </div>
        );
    }

    // Structure display parameters mapped directly to dynamic properties
    const dynamicStats = [
        {
            id: 1,
            metric: statsData?.totalPrompts || "0",
            title: "Active Templates",
            description: "Verified functional matrices globally deployed across the ecosystem index.",
            icon: FiCheckCircle,
            color: "text-emerald-500 bg-emerald-500/10"
        },
        {
            id: 2,
            metric: statsData?.totalGenerations ? `${statsData.totalGenerations}+` : "0",
            title: "Generations Saved",
            description: "Cumulative prompt runs executed successfully across all integrated user projects.",
            icon: FiCpu,
            color: "text-sky-500 bg-sky-500/10"
        },
        {
            id: 3,
            metric: statsData?.totalCategoriesCount || "0",
            title: "Operational Domains",
            description: "Distinct application categories currently indexed and actively managed.",
            icon: FiUsers,
            color: "text-purple-500 bg-purple-500/10"
        },
        {
            id: 4,
            metric: statsData?.totalToolsCount || "0",
            title: "AI Tools Supported",
            description: "Tailored multi-modal engine structures optimized within the current index environment.",
            icon: FiSliders,
            color: "text-amber-500 bg-amber-500/10"
        }
    ];

    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-12 space-y-3">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                    Platform Ecosystem
                </span>
                <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                    Ecosystem Stats at a Glance
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xl mx-auto leading-relaxed">
                    Track real-time network milestones, diverse model environments, and structural configurations optimized by our community of engineering specialists.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {dynamicStats.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Card
                            key={item.id}
                            className="p-6 bg-linear-to-b from-zinc-50 to-zinc-100/50 dark:from-[#0f172a] dark:to-[#0f172a]/40 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between transition-colors duration-200 hover:border-zinc-300 dark:hover:border-zinc-700"
                            shadow="none"
                        >
                            <div>
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-5 ${item.color}`}>
                                    <Icon size={20} />
                                </div>
                                <h3 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight font-mono">
                                    {item.metric}
                                </h3>
                                <h4 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 mt-1">
                                    {item.title}
                                </h4>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
};

export default PlatformStats;