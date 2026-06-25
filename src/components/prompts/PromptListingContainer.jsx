"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";
import PromptCard from "./PromptCard";

export default function PromptListingContainer({ prompts = [], total = 0, filters }) {
    const router = useRouter();

    const [page, setPage] = useState(filters.page || 1);
    const itemsPerPage = 12;
    const totalPages = Math.ceil(total / itemsPerPage) || 1;

    const handlePageChange = (newPageNumber) => {
        setPage(newPageNumber);

        const sp = new URLSearchParams();
        sp.set("status", "approved");
        if (filters.search) sp.set("search", filters.search);
        if (filters.category) sp.set("category", filters.category);
        if (filters.aiTool) sp.set("aiTool", filters.aiTool);
        if (filters.difficulty) sp.set("difficulty", filters.difficulty);
        sp.set("page", newPageNumber.toString());

        router.push(`?${sp.toString()}`, { scroll: true });
    };

    const getPageNumbers = () => {
        const pages = [];
        pages.push(1);
        if (page > 3) {
            pages.push("ellipsis");
        }
        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        if (page < totalPages - 2) {
            pages.push("ellipsis");
        }
        if (totalPages > 1) {
            pages.push(totalPages);
        }
        return pages;
    };

    const startItem = total === 0 ? 0 : (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, total);

    if (!prompts || prompts.length === 0) {
        return (
            <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                <p className="text-sm text-zinc-400 dark:text-zinc-500">No active prompts discovered in directory repository.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {prompts.map((promptItem) => (
                    <PromptCard key={promptItem._id} prompt={promptItem} />
                ))}
            </div>

            <div className="pt-4 flex flex-col items-center justify-center gap-4 w-full border-t border-zinc-100 dark:border-zinc-900">
                <Pagination className="w-full max-w-2xl flex flex-col items-center gap-3">

                    <Pagination.Summary className="text-xs font-medium text-zinc-500 font-mono">
                        Showing {startItem}-{endItem} of {total} prompt matrices
                    </Pagination.Summary>

                    <Pagination.Content className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/80">

                        <Pagination.Item>
                            <Pagination.Previous
                                isDisabled={page === 1}
                                onPress={() => handlePageChange(page - 1)}
                                className="text-xs font-bold px-3 h-8 gap-1 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800"
                            >
                                <Pagination.PreviousIcon />
                                <span>Prev</span>
                            </Pagination.Previous>
                        </Pagination.Item>

                        {getPageNumbers().map((p, i) =>
                            p === "ellipsis" ? (
                                <Pagination.Item key={`ellipsis-${i}`}>
                                    <Pagination.Ellipsis className="text-zinc-400" />
                                </Pagination.Item>
                            ) : (
                                <Pagination.Item key={p}>
                                    <Pagination.Link
                                        isActive={p === page}
                                        onPress={() => handlePageChange(p)}
                                        className={`h-8 w-8 text-xs font-mono font-bold rounded-lg flex items-center justify-center transition-all ${p === page
                                                ? "bg-emerald-600 text-white shadow-xs"
                                                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800"
                                            }`}
                                    >
                                        {p}
                                    </Pagination.Link>
                                </Pagination.Item>
                            )
                        )}

                        <Pagination.Item>
                            <Pagination.Next
                                isDisabled={page === totalPages}
                                onPress={() => handlePageChange(page + 1)}
                                className="text-xs font-bold px-3 h-8 gap-1 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800"
                            >
                                <span>Next</span>
                                <Pagination.NextIcon />
                            </Pagination.Next>
                        </Pagination.Item>

                    </Pagination.Content>
                </Pagination>
            </div>
        </div>
    );
}