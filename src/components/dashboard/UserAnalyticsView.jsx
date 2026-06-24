'use client';

import React from 'react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell,
    LabelList
} from 'recharts';

export default function UserAnalyticsView({ data }) {
    const { asUserBars = [], asCreatorBars = [] } = data || {};

    const tooltipStyle = {
        background: '#111827',
        border: 'none',
        borderRadius: '12px',
        color: '#ffffff',
        padding: '10px 14px',
    };

    return (
        <div className="space-y-12 text-slate-900 dark:text-white">
            <svg className="absolute w-0 h-0" width="0" height="0">
                <defs>
                    {/* User Palette */}
                    <linearGradient id="userBarInteracted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>

                    <linearGradient id="userBarReviews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#be185d" />
                    </linearGradient>

                    <linearGradient id="userBarBookmarks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#0891b2" />
                    </linearGradient>

                    {/* Creator Palette */}
                    <linearGradient id="creatorBarTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#7e22ce" />
                    </linearGradient>

                    <linearGradient id="creatorBarApproved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#047857" />
                    </linearGradient>

                    <linearGradient id="creatorBarPending" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#b45309" />
                    </linearGradient>

                    <linearGradient id="creatorBarRejected" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f87171" />
                        <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>

                    <linearGradient id="creatorBarCopies" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f43f5e" />
                        <stop offset="100%" stopColor="#be123c" />
                    </linearGradient>

                    <linearGradient id="creatorBarBookmarks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0284c7" />
                        <stop offset="100%" stopColor="#0369a1" />
                    </linearGradient>

                    <linearGradient id="creatorBarReviews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#0f766e" />
                    </linearGradient>
                </defs>
            </svg>

            {/* AS USER CHART */}
            <div className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Your Activity Metrics
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Summary of prompts you have interacted with, reviewed,
                        or bookmarked
                    </p>
                </div>

                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={asUserBars}
                            margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#1e293b"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="name"
                                stroke="#64748b"
                                fontSize={11}
                                tickLine={false}
                            />

                            <YAxis
                                stroke="#64748b"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                            />

                            <Tooltip
                                contentStyle={tooltipStyle}
                                cursor={{ fill: 'rgba(255,255,255,0.01)' }}
                            />

                            <Bar
                                dataKey="value"
                                radius={[5, 5, 0, 0]}
                                barSize={50}
                            >
                                <LabelList
                                    dataKey="value"
                                    position="top"
                                    fill="#64748b"
                                    fontSize={12}
                                    offset={8}
                                    fontWeight="bold"
                                />

                                {asUserBars.map((entry, idx) => (
                                    <Cell
                                        key={`user-bar-${idx}`}
                                        fill={entry.fillKey}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* AS CREATOR CHART */}
            <div className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Your Asset Performance Metrics
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Insights on your created prompt assets, approvals, and
                        actions others took on them
                    </p>
                </div>

                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={asCreatorBars}
                            margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#1e293b"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="name"
                                stroke="#64748b"
                                fontSize={10}
                                tickLine={false}
                                interval={0}
                            />

                            <YAxis
                                stroke="#64748b"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                            />

                            <Tooltip
                                contentStyle={tooltipStyle}
                                cursor={{ fill: 'rgba(255,255,255,0.01)' }}
                            />

                            <Bar
                                dataKey="value"
                                radius={[5, 5, 0, 0]}
                                barSize={38}
                            >
                                <LabelList
                                    dataKey="value"
                                    position="top"
                                    fill="#64748b"
                                    fontSize={12}
                                    offset={8}
                                    fontWeight="bold"
                                />

                                {asCreatorBars.map((entry, idx) => (
                                    <Cell
                                        key={`creator-bar-${idx}`}
                                        fill={
                                            entry.fillKey ||
                                            'url(#creatorBarRejected)'
                                        }
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}