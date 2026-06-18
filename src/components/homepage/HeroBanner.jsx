"use client";

import React, { useState } from "react";
import Image from "next/image";
import heroPng from "@/images/hero.jpg";
import { Button } from "@heroui/react";
import { Search, Sparkles, ArrowRight, Zap, Flame } from "lucide-react";
import Link from "next/link";

export default function HeroBanner() {
    const [searchQuery, setSearchQuery] = useState("");

    const trendingTags = [
        { label: "Midjourney v6", href: "/prompts?tag=midjourney" },
        { label: "GPT-4o Automation", href: "/prompts?tag=gpt4" },
        { label: "Claude 3.5 Sonnet", href: "/prompts?tag=claude" },
        { label: "Stable Diffusion XL", href: "/prompts?tag=sdxl" },
        { label: "UI Component Gen", href: "/prompts?tag=uigen" }
    ];

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
    };

    return (
        <section className="relative w-full overflow-hidden py-20 md:py-32 lg:py-40 border-b border-blue-100/50 dark:border-blue-900/30">
            
            {/* FULL-BLEED BACKGROUND IMAGE CONTAINER */}
            <div className="absolute inset-0 -z-30 h-full w-full">
                <Image
                    src={heroPng}
                    alt="PromptWorld Hero Background Layout"
                    fill
                    priority
                    placeholder="blur"
                    className="object-cover object-center select-none"
                />
            </div>

            {/* INTEGRATED THEME GRADIENT OVERLAY MASKS */}
            {/* Light Mode Layer: Soft bluish-white fade */}
            <div className="absolute inset-0 -z-20 block dark:hidden bg-linear-to-b from-blue-50/80 via-white/95 to-slate-50" />
            {/* Dark Mode Layer: Immersive deep slate/black backdrop */}
            <div className="absolute inset-0 -z-20 hidden dark:block bg-linear-to-b from-black/85 via-gray-900/90 to-black" />

            {/* AMBIENT GLOW ACCENTS */}
            <div className="absolute top-1/3 left-1/2 -z-10 h-100 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 dark:bg-blue-400/5 blur-[140px]" />

            {/* CONTAINER CONTENT */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Centered layout approach highlights the background art seamlessly */}
                <div className="mx-auto max-w-4xl text-center space-y-8">

                    {/* Pill Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-100/80 dark:border-blue-900/40 bg-white/80 dark:bg-blue-950/40 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-400 shadow-xs">
                        <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
                        <span>Supercharge Your AI Productivity Flow</span>
                    </div>

                    {/* Heading Text Blocks */}
                    <div className="space-y-4">
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15]">
                            Engineered{" "}
                            <span className="bg-linear-to-r from-blue-600 via-indigo-500 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
                                AI Prompts
                            </span>{" "}
                            For Peak Automation
                        </h1>
                        <p className="mx-auto max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                            Stop typing blind instructions. Discover, unlock, and deploy copy-pasteable framework templates engineered for elite creativity and code generation.
                        </p>
                    </div>

                    {/* SEARCH INPUT CONSOLE */}
                    <form onSubmit={handleSearchSubmit} className="mx-auto max-w-2xl pt-2">
                        <div className="relative flex items-center p-1.5 rounded-2xl border border-blue-100 dark:border-blue-900/60 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-xl shadow-blue-100/20 dark:shadow-none focus-within:border-blue-500 dark:focus-within:border-blue-500 transition duration-200">
                            <div className="flex items-center pl-3 pointer-events-none text-slate-400 dark:text-slate-500">
                                <Search className="h-5 w-5" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search midjourney grids, cold emails, coding blocks..."
                                className="w-full h-12 bg-transparent pl-3 pr-4 text-sm text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
                            />
                            <Button
                                type="submit"
                                className="h-11 bg-blue-600 dark:bg-blue-500 font-semibold text-white hover:bg-blue-700 dark:hover:bg-blue-600 shadow-md rounded-xl px-6"
                            >
                                Search
                            </Button>
                        </div>
                    </form>

                    {/* TRENDING PROMPT METADATA TAGS */}
                    <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs pt-1">
                        <div className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300 mr-1">
                            <Flame className="h-3.5 w-3.5 text-orange-500" />
                            <span>Trending:</span>
                        </div>
                        {trendingTags.map((tag) => (
                            <Link
                                key={tag.label}
                                href={tag.href}
                                className="rounded-lg border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-gray-900/60 backdrop-blur-xs px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
                            >
                                {tag.label}
                            </Link>
                        ))}
                    </div>

                    {/* CENTRAL CALL-TO-ACTION BUTTONS */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            as={Link}
                            href="/prompts"
                            radius="xl"
                            className="h-12 w-full sm:w-auto bg-blue-600 text-white font-semibold px-8 hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none transition group"
                            endContent={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                        >
                            Explore Marketplace
                        </Button>

                        <Button
                            as={Link}
                            href="/register"
                            radius="xl"
                            variant="bordered"
                            className="h-12 w-full sm:w-auto border-blue-200/80 dark:border-slate-800 bg-white/40 dark:bg-transparent font-semibold text-slate-700 dark:text-slate-300 hover:bg-blue-50/50 dark:hover:bg-gray-800/40 px-6 backdrop-blur-xs"
                            startContent={<Zap className="h-4 w-4 text-blue-500" />}
                        >
                            Sell Your Prompts
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    );
}