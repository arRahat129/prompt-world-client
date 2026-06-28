"use client";

import React, { useState } from 'react';
import { Button } from '@heroui/react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import ActionButtons from './promptsTableComponent/ActionButtons';
import { deletePromptCreator } from '@/lib/actions/prompts';

export default function FeedbackDisplay({ initialFeedbacks }) {
    console.log(initialFeedbacks);
    const [feedbacksList, setFeedbacksList] = useState(initialFeedbacks || []);
    const [isDeleting, setIsDeleting] = useState(null);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to permanently remove this prompt configuration?")) return;

        setIsDeleting(id);
        try {
            const response = await deletePromptCreator(id);

            if (response?.success) {
                setFeedbacksList(prev => prev.filter(item => item.promptId !== id));
                toast.success("Prompt configuration permanently purged.");
            } else {
                toast.error(response?.message || "Failed to remove the prompt template.");
            }
        } catch (error) {
            console.error("Error executing prompt layout removal:", error);
            toast.error("An unexpected server communication error occurred.");
        } finally {
            setIsDeleting(null);
        }
    };

    if (feedbacksList.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 p-16 text-center">
                <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">
                    Account Status Clean
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                    You currently have no active moderation notices or warnings on your assets.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="hidden lg:block bg-white dark:bg-slate-900 rounded-3xl shadow-lg overflow-hidden border border-slate-100 dark:border-slate-800">
                <table className="w-full">
                    <thead className="bg-slate-800 dark:bg-slate-950 text-white">
                        <tr>
                            <th className="px-5 py-4 text-left">Asset Info</th>
                            <th className="px-5 py-4 text-left">Issue Category</th>
                            <th className="px-5 py-4 text-left">Admin Notice Message</th>
                            <th className="px-5 py-4 text-left">Issued At</th>
                            <th className="px-5 py-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="w-full align-middle">
                        {feedbacksList.map((item) => (
                            <tr
                                key={item._id}
                                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                            >
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={item.promptThumbnail}
                                            alt={item.promptTitle}
                                            className="w-14 h-14 rounded-lg object-cover bg-slate-100"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                                                {item.promptTitle}
                                            </h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                                                {item.promptCategory} • {item.promptAiTool}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-semibold">
                                        {item.reportType}
                                    </span>
                                </td>
                                <td className="px-5 py-4 max-w-sm">
                                    <p className="text-sm text-slate-600 dark:text-slate-300 break-words">
                                        {item.message}
                                    </p>
                                </td>
                                <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                                    {new Date(item.feedbackCreatedAt).toLocaleString()}
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex justify-center">
                                        {/* Integrating ActionButtons here cleanly */}
                                        <ActionButtons
                                            prompt={item.prompt}
                                            isDeleting={isDeleting}
                                            handleDelete={handleDelete}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE & TABLET CARD GRID VIEW */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-5">
                {feedbacksList.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col justify-between"
                    >
                        <div>
                            <div className="relative">
                                <img
                                    src={item.promptThumbnail}
                                    alt={item.promptTitle}
                                    className="h-44 w-full object-cover bg-slate-100"
                                />
                                <span className="absolute top-3 right-3 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                                    {item.reportType}
                                </span>
                            </div>

                            <div className="p-5 space-y-3">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 line-clamp-1">
                                        {item.promptTitle}
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                                        Category: {item.promptCategory} • Engine: {item.promptAiTool}
                                    </p>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60">
                                    <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-1">
                                        Admin Action Log
                                    </p>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 break-words">
                                        {item.message}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="px-5 pb-5 pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-50 dark:border-slate-800/50 mt-auto">
                            <p className="text-xs text-slate-400">
                                {new Date(item.feedbackCreatedAt).toLocaleString()}
                            </p>
                            <div className="w-full sm:w-auto flex justify-end">
                                {/* Integrating ActionButtons here cleanly */}
                                <ActionButtons
                                    prompt={item.prompt}
                                    isDeleting={isDeleting}
                                    handleDelete={handleDelete}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}