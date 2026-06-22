"use client";

import React, { useState } from "react";
import { Table, Button } from "@heroui/react";
import Link from "next/link";
import { FiEdit2, FiTrash2, FiCopy, FiInbox, FiPlus, FiEye } from "react-icons/fi";
import toast from "react-hot-toast";

export default function PromptsTable({ initialPrompts }) {
    const [prompts, setPrompts] = useState(initialPrompts || "");
    const [isDeleting, setIsDeleting] = useState(null);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to permanently remove this prompt configuration?")) return;

        setIsDeleting(id);
        try {
            setPrompts(prompts.filter(p => p._id !== id));
            toast.success("Prompt layout purged successfully.");
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleting(null);
        }
    };

    if (prompts.length === 0) {
        return (
            <div className="flex flex-col items-center border border-zinc-900 justify-center p-12 text-center space-y-5">
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center">
                    <FiInbox size={20} />
                </div>
                <div className="space-y-1">
                    <p className="font-medium text-base">No prompt assets found</p>
                    <p className="text-zinc-500 text-sm max-w-sm">
                        You have not submitted any prompt configuration templates to the system index yet.
                    </p>
                </div>
                <Link href={"/dashboard/creator/my-prompts/add-prompts"}>
                    <Button
                        className="bg-white text-black font-medium hover:bg-zinc-200 rounded-lg px-5 transition-colors h-10 text-sm flex items-center gap-2"
                    >
                        <FiPlus size={16} /> Add Prompt Now
                    </Button>
                </Link>
            </div>
        );
    }

    const approvedPrompts = prompts.filter(p => p.status !== 'pending');
    const pendingPrompts = prompts.filter(p => p.status === 'pending');

    const renderRow = (prompt, isPending) => (
        <Table.Row key={prompt._id} className="hover:bg-zinc-900/40 transition-colors border-b border-zinc-900/50">
            <Table.Cell className="py-4 px-4 text-sm">
                <span className="font-semibold truncate max-w-60 block">{prompt.title}</span>
            </Table.Cell>
            <Table.Cell className="py-4 px-4 text-sm">
                <span className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded text-xs text-zinc-300 capitalize">
                    {prompt.category}
                </span>
            </Table.Cell>
            <Table.Cell className="py-4 px-4 text-sm">
                <span className="font-medium text-xs flex items-center gap-1">
                    {prompt.aiTool}
                </span>
            </Table.Cell>
            <Table.Cell className="py-4 px-4 text-sm">
                <span className={`text-xs font-semibold ${prompt.difficulty === 'pro' ? 'text-purple-400' :
                    prompt.difficulty === 'intermediate' ? 'text-amber-400' : 'text-blue-400'
                    }`}>
                    {prompt.difficulty}
                </span>
            </Table.Cell>
            <Table.Cell className="py-4 px-4 text-sm">
                {isPending ? (
                    <span className="text-xs bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded capitalize font-medium">
                        Pending
                    </span>
                ) : (
                    <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded capitalize font-medium">
                        Approved
                    </span>
                )}
            </Table.Cell>
            <Table.Cell className="py-4 px-4 text-sm">
                <div className="flex items-center gap-1 text-xs text-zinc-400">
                    <FiCopy size={12} className="text-zinc-600" />
                    <span>{prompt.copyCount || 0}</span>
                </div>
            </Table.Cell>
            <Table.Cell className="py-4 px-4 text-sm">
                <div className="flex items-center justify-end gap-2">
                    <Button
                        size="sm"
                        variant="light"
                        className="text-zinc-400 hover:bg-zinc-800 min-w-8 w-8 h-8 p-0"
                        onClick={() => window.location.href = `/dashboard/creator/prompts/view/${prompt._id}`}
                    >
                        <FiEye size={14} />
                    </Button>
                    <Button
                        size="sm"
                        variant="light"
                        className="text-zinc-400 hover:bg-zinc-800 min-w-8 w-8 h-8 p-0"
                        onClick={() => window.location.href = `/dashboard/creator/prompts/edit/${prompt._id}`}
                    >
                        <FiEdit2 size={14} />
                    </Button>
                    <Button
                        size="sm"
                        variant="light"
                        isLoading={isDeleting === prompt._id}
                        className="text-zinc-500 hover:text-danger hover:bg-danger-950/20 min-w-8 w-8 h-8 p-0"
                        onClick={() => handleDelete(prompt._id)}
                    >
                        <FiTrash2 size={14} />
                    </Button>
                </div>
            </Table.Cell>
        </Table.Row>
    );

    const tableHeaderStructure = (
        <Table.Header>
            <Table.Column width={280} className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-left px-4">Prompt Specs</Table.Column>
            <Table.Column className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-left px-4">Category</Table.Column>
            <Table.Column className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-left px-4">Target Tool</Table.Column>
            <Table.Column className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-left px-4">Difficulty</Table.Column>
            <Table.Column className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-left px-4">Status</Table.Column>
            <Table.Column className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-left px-4">Usage</Table.Column>
            <Table.Column align="end" className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-right px-4">Actions</Table.Column>
        </Table.Header>
    );

    return (
        <div className="space-y-8 max-w-full">
            {approvedPrompts.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center gap-2 px-1">
                        <h2 className="text-sm font-semibold tracking-wide uppercase text-zinc-400">Approved Prompts</h2>
                        <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full font-medium">
                            {approvedPrompts.length}
                        </span>
                    </div>
                    <div className="shadow-xl rounded-xl p-4 border border-zinc-900/60 overflow-x-auto">
                        <Table aria-label="Approved prompts index record set">
                            <Table.ScrollContainer>
                                <Table.Content>
                                    <Table.Header>
                                        <Table.Column isRowHeader width={280} className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-left px-4">Prompt Specs</Table.Column>
                                        <Table.Column className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-left px-4">Category</Table.Column>
                                        <Table.Column className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-left px-4">Target Tool</Table.Column>
                                        <Table.Column className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-left px-4">Difficulty</Table.Column>
                                        <Table.Column className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-left px-4">Status</Table.Column>
                                        <Table.Column className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-left px-4">Usage</Table.Column>
                                        <Table.Column align="end" className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-right px-4">Actions</Table.Column>
                                    </Table.Header>
                                    <Table.Body>
                                        {approvedPrompts.map((prompt) => renderRow(prompt, false))}
                                    </Table.Body>
                                </Table.Content>
                            </Table.ScrollContainer>
                        </Table>
                    </div>
                </div>
            )}

            {pendingPrompts.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center gap-2 px-1">
                        <h2 className="text-sm font-semibold tracking-wide uppercase text-zinc-400">Pending Review</h2>
                        <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-medium">
                            {pendingPrompts.length}
                        </span>
                    </div>
                    <div className="shadow-xl rounded-xl p-4 border border-zinc-900/60 overflow-x-auto">
                        <Table aria-label="Pending prompt confirmation queue">
                            <Table.ScrollContainer>
                                <Table.Content>
                                    <Table.Header>
                                        <Table.Column isRowHeader width={280} className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-left px-4">Prompt Specs</Table.Column>
                                        <Table.Column className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-left px-4">Category</Table.Column>
                                        <Table.Column className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-left px-4">Target Tool</Table.Column>
                                        <Table.Column className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-left px-4">Difficulty</Table.Column>
                                        <Table.Column className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-left px-4">Status</Table.Column>
                                        <Table.Column className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-left px-4">Usage</Table.Column>
                                        <Table.Column align="end" className="border-b border-zinc-800 font-medium text-xs tracking-wider uppercase h-12 text-right px-4">Actions</Table.Column>
                                    </Table.Header>
                                    <Table.Body>
                                        {pendingPrompts.map((prompt) => renderRow(prompt, true))}
                                    </Table.Body>
                                </Table.Content>
                            </Table.ScrollContainer>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    );
}