"use client";

import React, { useState } from 'react';
import { Button, Card, Spinner } from "@heroui/react";
import { FiTrash2, FiExternalLink, FiBookmark } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { createBookmark } from '@/lib/actions/bookmarks';
import Link from 'next/link';

export default function BookmarksDisplay({ initialBookmarks, user }) {
    // console.log(initialBookmarks, user);
    const router = useRouter();

    const [bookmarks, setBookmarks] = useState(initialBookmarks || []);
    // console.log(bookmarks)
    const [isRemovingId, setIsRemovingId] = useState(null);

    const handleRemoveBookmark = async (item) => {
        setIsRemovingId(item.promptId);
        try {
            const res = await createBookmark({
                promptId: item.promptId,
                userId: user?._id,
            });

            if (res.success && !res.isBookmarked) {
                toast.success(`${item.promptTitle} has been Removed from your bookmarks`);
                setBookmarks(prev => prev.filter(b => b.promptId !== item.promptId));
                router.refresh();
            } else {
                toast.error("Failed to update template item configuration.");
            }
        } catch (error) {
            console.error("Removal link processing fault:", error);
            toast.error("Network communication error.");
        } finally {
            setIsRemovingId(null);
        }
    };

    if (bookmarks.length === 0) {
        return (
            <div className="w-full min-h-[40vh] flex flex-col items-center justify-center text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-zinc-400">
                    <FiBookmark size={22} />
                </div>
                <div className="space-y-1">
                    <h3 className="text-md font-bold">No saved configurations</h3>
                    <p className="text-sm text-zinc-700 dark:text-zinc-400 max-w-xs">Bookmarks you add while browsing prompt setups will appear listed here.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bookmarks.map((item) => (
                <Card
                    key={item._id}
                    className="border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                    <div className="p-6 space-y-4 overflow-hidden flex-1 flex flex-col justify-between">

                        {/* Header Structure */}
                        <Card.Header className="p-0 flex flex-col items-start gap-1 w-full truncate">
                            <Card.Title>
                                {item.promptTitle}
                            </Card.Title>
                            <Card.Description className="text-xs line-clamp-2 leading-relaxed m-0 p-0">
                                {item.promptDescription || "No detailed context overview provided for this entry."}
                            </Card.Description>
                        </Card.Header>

                        <Card.Content className="p-0 bg-transparent">
                            <div className="flex flex-col min-w-0 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/60 p-3 rounded-xl">
                                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-0.5">
                                    Created By
                                </span>
                                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                                    {item.creatorName || "Anonymous Creator"}
                                </span>
                                <span className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
                                    {item.creatorEmail || "No contact email provided"}
                                </span>
                            </div>
                        </Card.Content>
                    </div>

                    {/* Lower Card Action Bar Footer */}
                    <Card.Footer className="px-6 py-4 bg-zinc-50/50 dark:bg-zinc-900/20 border-t border-zinc-100 dark:border-zinc-900/60 flex items-center justify-between gap-3">
                        <Button
                            size="sm"
                            variant="danger"
                            disabled={isRemovingId !== null}
                            onClick={() => handleRemoveBookmark(item)}
                            className="font-medium px-3 rounded-lg"
                        >
                            {isRemovingId === item.promptId ? <Spinner size="sm" color="current" /> : <FiTrash2 size={14} />} Remove
                        </Button>

                        <Link href={`/prompts/${item.promptId}`}>
                            <Button
                                size="sm"
                                variant="outline"
                                className="font-medium px-4 rounded-lg shadow-xs"
                            >
                                <FiExternalLink size={14} /> View Details
                            </Button>
                        </Link>
                    </Card.Footer>
                </Card>
            ))}
        </div>
    );
}