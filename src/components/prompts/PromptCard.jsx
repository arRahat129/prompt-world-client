"use client";

import React from 'react';
import { Card, Button, Chip, Avatar } from "@heroui/react";
import { FiEye, FiLayers, FiCopy, FiLock } from "react-icons/fi";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const PromptCard = ({ prompt }) => {
    console.log(prompt);
    const {
        _id,
        title = "Untitled Prompt",
        category = "General",
        aiTool = "AI Tool",
        description = "",
        thumbnail = "https://i.ibb.co.com/M5cvBDsV/prompt-Default-Thumbnail.webp",
        copyCount = 0,
        creatorName = "Anonymous",
        creatorImage = "https://i.ibb.co.com/216mxB4J/user-Sample.png",
        visibility = "public"
    } = prompt || {};

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            className="w-full h-full flex"
        >
            <Card
                className="w-full bg-white dark:bg-[#0f172a] border border-zinc-200 dark:border-sky-950/40 hover:border-sky-400/50 dark:hover:border-sky-500/50 transition-all duration-300 shadow-sm hover:shadow-md text-zinc-900 dark:text-zinc-50"
                shadow="none"
            >

                <div className="p-4 space-y-4 flex flex-col grow">
                    {/* Thumbnail Layer */}
                    {thumbnail && (
                        <div className="w-full aspect-21/9 rounded-lg overflow-hidden relative bg-zinc-100 dark:bg-zinc-900 shrink-0">
                            <Image
                                src={thumbnail}
                                alt={title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover select-none"
                                loading="lazy"
                            />
                        </div>
                    )}

                    {/* Metadata Tags Line */}
                    <div className="flex flex-wrap items-center gap-2">
                        <Chip
                            size="sm"
                            variant="flat"
                            className="uppercase font-semibold text-[10px] bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900/50"
                        >
                            {aiTool}
                        </Chip>
                        <Chip
                            size="sm"
                            variant="flat"
                            className="uppercase font-medium text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                        >
                            {prompt.difficulty || "standard"}
                        </Chip>

                        {visibility === "private" && (
                            <Chip
                                size="sm"
                                variant="flat"
                                className="text-[10px] bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/30 font-bold uppercase tracking-wider"
                            >
                                <FiLock size={10} className="mr-0.5" /> PREMIUM
                            </Chip>
                        )}

                    </div>

                    {/* Content Block */}
                    <div className="space-y-1">
                        <h3 className="text-base font-semibold tracking-tight line-clamp-1">
                            {title}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 min-h-8">
                            {description}
                        </p>
                    </div>

                    {/* Structural Category Reference Row */}
                    <div className="flex items-center gap-2 text-[11px] font-medium tracking-wide uppercase text-zinc-400 dark:text-zinc-500 pt-1">
                        <FiLayers size={12} className="text-sky-500/70" />
                        <span>{category}</span>
                    </div>
                </div>

                {/* Separator Line */}
                <div className="border-t border-zinc-100 dark:border-zinc-800/60 mx-4" />

                <div className="p-4 pt-3 flex flex-col gap-4 mt-auto">
                    <div className="flex items-center justify-between w-full text-zinc-500 dark:text-zinc-400">
                        <div className="flex items-center gap-2 min-w-0">
                            <Avatar className="h-6 w-6 shrink-0">
                                <Avatar.Image
                                    alt={creatorName || "User Avatar"}
                                    src={creatorImage || ""}
                                    referrerPolicy="no-referrer"
                                    className="object-cover"
                                />
                                <Avatar.Fallback>
                                    {creatorName ? creatorName[0].toUpperCase() : "U"}
                                </Avatar.Fallback>
                            </Avatar>

                            <span className="text-xs font-medium truncate max-w-30">{creatorName}</span>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-mono shrink-0">
                            <FiCopy size={12} className="text-zinc-400" />
                            <span>{copyCount}</span>
                        </div>
                    </div>

                    {/* Action Button Trigger */}
                    <Link href={`/prompts/${_id}`}>
                        <Button
                            className="w-full font-medium text-sm bg-sky-500 hover:bg-sky-600 text-white shadow-sm shadow-sky-500/10 transition-colors h-10 rounded-lg"
                            endContent={<FiEye size={14} />}
                        >
                            View Details
                        </Button>
                    </Link>
                </div>
            </Card>
        </motion.div>
    );
};

export default PromptCard;