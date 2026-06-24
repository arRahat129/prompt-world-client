'use client';

import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    PieChart, Pie, Cell,
    BarChart, Bar
} from 'recharts';

const COLORS = ['#006fee', '#3b82f6', '#60a5fa', '#94a3b8'];

export default function AdminAnalyticsCharts({ chartsData }) {
    const { categoryDistribution, aiToolDistribution, timelineChartData } = chartsData;

    return (
        <div className="space-y-8">
            <div className="bg-content1 p-6 rounded-2xl border border-divider shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-4">Platform Growth (Last 5 Days Trends)</h3>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%">
                        <AreaChart data={timelineChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#006fee" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#006fee" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPrompts" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--bg-divider), 0.1)" />
                            <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '12px', background: 'var(--bg-content1)', borderColor: 'var(--bg-divider)' }} />
                            <Legend />
                            <Area name="New Users" type="monotone" dataKey="newUsers" stroke="#006fee" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
                            <Area name="New Prompts" type="monotone" dataKey="newPrompts" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorPrompts)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-content1 p-6 rounded-2xl border border-divider shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold text-foreground mb-2">Prompt Categories</h3>
                    <div className="w-full h-75">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-content1 p-6 rounded-2xl border border-divider shadow-sm">
                    <h3 className="text-lg font-bold text-foreground mb-4">AI Tools Distribution</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={aiToolDistribution} barSize={32}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--bg-divider), 0.1)" />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{ fill: 'rgba(var(--bg-content2), 0.2)' }} />
                                <Bar dataKey="value" name="Prompts Count" fill="#006fee" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}