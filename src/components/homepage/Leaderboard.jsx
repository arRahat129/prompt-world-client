"use client";

import React, { useEffect, useState } from 'react';
import { Card, Avatar, Table, Spinner } from "@heroui/react";
import { FiAward, FiZap } from "react-icons/fi";
import { getLeaderboard } from '@/lib/api/prompts';

const Leaderboard = () => {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await getLeaderboard();
                console.log(response);
                if (response?.success) {
                    setCreators(response.data || []);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboardData();
    }, []);

    if (loading) {
        return (
            <div className="w-full min-h-96 flex items-center justify-center">
                <Spinner color="sky" label="Loading Elite Creators..." />
            </div>
        );
    }

    const topThree = creators.slice(0, 3);
    const podiumOrder = [];
    if (topThree[1]) podiumOrder.push({ ...topThree[1], rank: 2 });
    if (topThree[0]) podiumOrder.push({ ...topThree[0], rank: 1 });
    if (topThree[2]) podiumOrder.push({ ...topThree[2], rank: 3 });

    const remainingCreators = creators.slice(3);

    return (
        <section className="w-full max-w-5xl mx-auto px-4 py-16 relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-80 bg-sky-500/10 dark:bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center mb-16 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-sky-200/40 dark:border-sky-900/40 bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 font-bold text-xs uppercase tracking-widest">
                    <FiAward className="animate-pulse" /> Hall of Fame
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                    Top Prompt Creators
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-md mx-auto">
                    The elite minds engineering top-tier generative configurations on Prompt World. Here are the Top 10:
                </p>
            </div>

            {topThree.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-6 mb-12 pt-4">
                    {podiumOrder.map((creator) => {
                        const isFirst = creator.rank === 1;
                        const isSecond = creator.rank === 2;

                        return (
                            <div
                                key={creator._id}
                                className={`w-full sm:w-64 flex flex-col items-center ${
                                    isFirst ? 'sm:order-2 z-10 scale-105' : isSecond ? 'sm:order-1' : 'sm:order-3'
                                }`}
                            >
                                <div className="relative mb-4">
                                    <Avatar 
                                        className={`w-24 h-24 border-4 text-xl font-black shadow-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 ${
                                            isFirst ? 'border-sky-400 ring-4 ring-sky-400/20' :
                                            isSecond ? 'border-blue-400/70 ring-4 ring-blue-400/10' :
                                            'border-indigo-400/60 ring-4 ring-indigo-400/10'
                                        }`}
                                    >
                                        <Avatar.Image
                                            alt={creator.name || "Creator"}
                                            src={creator.image || ""}
                                            referrerPolicy="no-referrer"
                                        />
                                        <Avatar.Fallback>
                                            {creator.name ? creator.name[0].toUpperCase() : "U"}
                                        </Avatar.Fallback>
                                    </Avatar>
                                    <div className={`absolute -bottom-1 -right-1 h-7 w-7 rounded-full flex items-center justify-center text-xs font-black shadow-md text-white ${
                                        isFirst ? 'bg-linear-to-r from-sky-400 to-blue-500' : 
                                        isSecond ? 'bg-zinc-400' : 'bg-amber-700'
                                    }`}>
                                        {creator.rank}
                                    </div>
                                </div>

                                <Card
                                    className={`w-full p-6 text-center flex flex-col items-center justify-center border transition-all duration-300 bg-white dark:bg-[#0f172a] ${
                                        isFirst
                                            ? 'border-sky-400 shadow-lg shadow-sky-500/5 dark:shadow-sky-500/10 min-h-44'
                                            : 'border-zinc-200 dark:border-sky-950/40 min-h-36'
                                    }`}
                                    shadow="none"
                                >
                                    <h3 className="font-bold text-base text-zinc-800 dark:text-zinc-100 line-clamp-1 max-w-45">
                                        {creator.name || "Anonymous Engr"}
                                    </h3>

                                    <div className="flex items-center gap-1.5 text-sky-500 font-mono text-xs mt-3 font-extrabold bg-sky-50 dark:bg-sky-950/40 px-3 py-1 rounded-full border border-sky-100 dark:border-sky-900/30 shadow-xs">
                                        <FiZap size={12} fill="currentColor" />
                                        <span>{creator.totalPrompts} Prompts</span>
                                    </div>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="border border-zinc-200 dark:border-sky-950/40 rounded-xl overflow-hidden bg-white dark:bg-[#0f172a] shadow-sm">
                <Table shadow="none">
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Prompt World Creator Rankings">
                            <Table.Header>
                                <Table.Column width={90} align="center">Rank</Table.Column>
                                <Table.Column isRowHeader>Creator</Table.Column>
                                <Table.Column align="end">Total Prompts</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {remainingCreators.map((creator, index) => (
                                    <Table.Row key={creator._id || index}>
                                        <Table.Cell>
                                            <span className="font-bold font-mono text-sm text-zinc-400 dark:text-zinc-500">
                                                #{index + 4}
                                            </span>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="flex items-center gap-3 py-1">
                                                <Avatar className="h-8 w-8 border border-zinc-200 dark:border-sky-900/50 shadow-xs text-xs font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                                                    <Avatar.Image
                                                        alt={creator.name || "Creator"}
                                                        src={creator.image || ""}
                                                        referrerPolicy="no-referrer"
                                                    />
                                                    <Avatar.Fallback>
                                                        {creator.name ? creator.name[0].toUpperCase() : "U"}
                                                    </Avatar.Fallback>
                                                </Avatar>
                                                <span className="font-bold text-sm text-zinc-800 dark:text-zinc-200 line-clamp-1">
                                                    {creator.name || "Anonymous Creator"}
                                                </span>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span className="font-mono text-sm font-black text-sky-500 pr-4">
                                                {creator.totalPrompts}
                                            </span>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>
        </section>
    );
};

export default Leaderboard;