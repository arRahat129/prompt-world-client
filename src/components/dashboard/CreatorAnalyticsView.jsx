'use client';

import React from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar,
    Cell,
    LabelList
} from 'recharts';

export default function CreatorAnalyticsView({ data }) {
    const {
        summary = { totalPrompts: 0, totalCopies: 0, totalBookmarks: 0 },
        chartData = [],
        summaryBars = []
    } = data || {};

    const tooltipStyle = {
        background: '#111827',
        border: 'none',
        borderRadius: '12px',
        color: '#ffffff',
        padding: '10px 14px',
    };

    return (
        <div className="bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white space-y-10 p-10">

            {/* RECHARTS GLOBAL GRADIENT DEFINITIONS */}
            <svg className="absolute w-0 h-0" width="0" height="0">
                <defs>
                    {/* Bar 1: Total Prompts (Indigo) */}
                    <linearGradient id="barTotalPromptsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>

                    {/* Bar 2: Approved Status (Emerald) */}
                    <linearGradient id="barApprovedGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#047857" />
                    </linearGradient>

                    {/* Bar 3: Pending Status (Amber) */}
                    <linearGradient id="barPendingGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#b45309" />
                    </linearGradient>

                    {/* Bar 4: Total Copies (Cyan) */}
                    <linearGradient id="barCopiesGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#0891b2" />
                    </linearGradient>

                    {/* Bar 5: Total Bookmarks (Purple) */}
                    <linearGradient id="barBookmarksGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#7e22ce" />
                    </linearGradient>

                    {/* Line Growth Area Gradients */}
                    <linearGradient id="globalAreaPromptGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="globalAreaCopyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                </defs>
            </svg>

            {/* Summary KPI Grid */}
            <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex items-center space-x-5">
                    <div className="p-4 bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">Total Prompts</p>
                        <h3 className="text-3xl font-bold mt-1">{summary.totalPrompts}</h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex items-center space-x-5">
                    <div className="p-4 bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-2xl">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">Total Copies</p>
                        <h3 className="text-3xl font-bold mt-1">{summary.totalCopies}</h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex items-center space-x-5">
                    <div className="p-4 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">Total Bookmarks</p>
                        <h3 className="text-3xl font-bold mt-1">{summary.totalBookmarks}</h3>
                    </div>
                </div>
            </div>

            {chartData.length === 0 && summaryBars.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-[#0b1120]/40 py-24">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">No Analytics Record Fields Available</h3>
                </div>
            ) : (
                <div className="space-y-8">

                    {/* CHART 1: Core 5-Bar Collection Distribution Chart */}
                    <div className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-white">
                            Asset Metrics Overview
                        </h3>
                        <div className="h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={summaryBars} margin={{ top: 25, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />

                                    <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={45}>
                                        {/* Display exact numbers directly above each distinct bar */}
                                        <LabelList
                                            dataKey="value"
                                            position="top"
                                            fill="#64748b"
                                            fontSize={12}
                                            offset={8}
                                            fontWeight="bold"
                                        />
                                        {/* Inject distinct color gradients onto each bar from the array mapping */}
                                        {summaryBars.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fillKey} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* CHART 2: Accumulative Growth Trends */}
                    <div className="bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-white">
                            Accumulative Growth Metrics
                        </h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
                                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={tooltipStyle} />

                                    <Area type="monotone" dataKey="copies" name="Total Copies" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#globalAreaCopyGrad)" />
                                    <Area type="monotone" dataKey="prompts" name="Total Prompts" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#globalAreaPromptGrad)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}