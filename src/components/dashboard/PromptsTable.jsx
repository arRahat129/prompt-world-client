"use client";

import React, { useState } from "react";
import { Table, Button, Card } from "@heroui/react";
import Link from "next/link";
import { FiEdit2, FiTrash2, FiCopy, FiInbox, FiPlus, FiEye, FiCpu } from "react-icons/fi";
import toast from "react-hot-toast";
import RenderCardGrid from "./promptsTableComponent/RenderCardGrid";
import ActionButtons from "./promptsTableComponent/ActionButtons";
import { deletePromptCreator } from "@/lib/actions/prompts";

export default function PromptsTable({ initialPrompts, user }) {
    const [prompts, setPrompts] = useState(initialPrompts || "");
    const [isDeleting, setIsDeleting] = useState(null);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to permanently remove this prompt configuration?")) return;

        setIsDeleting(id);
        try {
            const response = await deletePromptCreator(id);
            
            if (response?.success) {
                setPrompts(prevPrompts => prevPrompts.filter(p => p._id !== id));
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

    if (prompts.length === 0) {
        return (
            <div className="flex flex-col items-center border border-zinc-200 dark:border-zinc-800 justify-center p-12 text-center space-y-5 rounded-2xl">
                <div className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400">
                    <FiInbox size={20} />
                </div>
                <div className="space-y-1">
                    <p className="font-semibold text-base text-zinc-900 dark:text-zinc-100">No prompt assets found</p>
                    <p className="text-zinc-500 text-sm max-w-sm">
                        You have not submitted any prompt configuration templates to the system index yet.
                    </p>
                </div>
                <Link href={`/dashboard/${user?.role}/my-prompts/add-prompts`}>
                    <Button
                        className="bg-zinc-900 text-white dark:bg-white dark:text-black font-medium hover:opacity-90 rounded-lg px-5 h-10 text-sm flex items-center gap-2"
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
                <span className="bg-blue-50 dark:bg-blue-950/95 border border-zinc-800 px-2 py-1 rounded text-xs text-zinc-800 dark:text-zinc-300 capitalize">
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
                <div className="flex justify-end">
                    <ActionButtons prompt={prompt} isDeleting={isDeleting} handleDelete={handleDelete} />
                </div>
            </Table.Cell>
        </Table.Row>
    );


    return (
        <div className="space-y-10 max-w-full">
            {approvedPrompts.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <h2 className="text-xs font-bold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">Approved Prompts</h2>
                        <span className="text-xs font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-0.5 rounded-full">
                            {approvedPrompts.length}
                        </span>
                    </div>

                    <div className="hidden lg:block border border-blue-500/10 rounded-2xl overflow-hidden">
                        <Table aria-label="Approved prompts index record set" className="bg-transparent shadow-none">
                            <Table.ScrollContainer>
                                <Table.Content className="bg-transparent">
                                    <Table.Header>
                                        <Table.Column isRowHeader width={280} className="border-b border-blue-500/10 font-bold text-xs tracking-wider uppercase h-12 text-left px-4 text-zinc-400">Prompt Specs</Table.Column>
                                        <Table.Column className="border-b border-blue-500/10 font-bold text-xs tracking-wider uppercase h-12 text-left px-4 text-zinc-400">Category</Table.Column>
                                        <Table.Column className="border-b border-blue-500/10 font-bold text-xs tracking-wider uppercase h-12 text-left px-4 text-zinc-400">Target Tool</Table.Column>
                                        <Table.Column className="border-b border-blue-500/10 font-bold text-xs tracking-wider uppercase h-12 text-left px-4 text-zinc-400">Difficulty</Table.Column>
                                        <Table.Column className="border-b border-blue-500/10 font-bold text-xs tracking-wider uppercase h-12 text-left px-4 text-zinc-400">Status</Table.Column>
                                        <Table.Column className="border-b border-blue-500/10 font-bold text-xs tracking-wider uppercase h-12 text-left px-4 text-zinc-400">Usage</Table.Column>
                                        <Table.Column align="end" className="border-b border-blue-500/10 font-bold text-xs tracking-wider uppercase h-12 text-right px-4 text-zinc-400">Actions</Table.Column>
                                    </Table.Header>
                                    <Table.Body className="bg-transparent">
                                        {approvedPrompts.map((prompt) => renderRow(prompt, false))}
                                    </Table.Body>
                                </Table.Content>
                            </Table.ScrollContainer>
                        </Table>
                    </div>

                    <RenderCardGrid
                        items={approvedPrompts}
                        isPendingSet={false}
                        isDeleting={isDeleting}
                        handleDelete={handleDelete}
                    />
                </div>
            )}

            {pendingPrompts.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <h2 className="text-xs font-bold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">Pending Review</h2>
                        <span className="text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-full">
                            {pendingPrompts.length}
                        </span>
                    </div>

                    {/* Desktop Matrix View */}
                    <div className="hidden lg:block border border-blue-500/10 rounded-2xl overflow-hidden">
                        <Table aria-label="Pending prompt confirmation queue" className="bg-transparent shadow-none">
                            <Table.ScrollContainer>
                                <Table.Content className="bg-transparent">
                                    <Table.Header>
                                        <Table.Column isRowHeader width={280} className="border-b border-blue-500/10 font-bold text-xs tracking-wider uppercase h-12 text-left px-4 text-zinc-400">Prompt Specs</Table.Column>
                                        <Table.Column className="border-b border-blue-500/10 font-bold text-xs tracking-wider uppercase h-12 text-left px-4 text-zinc-400">Category</Table.Column>
                                        <Table.Column className="border-b border-blue-500/10 font-bold text-xs tracking-wider uppercase h-12 text-left px-4 text-zinc-400">Target Tool</Table.Column>
                                        <Table.Column className="border-b border-blue-500/10 font-bold text-xs tracking-wider uppercase h-12 text-left px-4 text-zinc-400">Difficulty</Table.Column>
                                        <Table.Column className="border-b border-blue-500/10 font-bold text-xs tracking-wider uppercase h-12 text-left px-4 text-zinc-400">Status</Table.Column>
                                        <Table.Column className="border-b border-blue-500/10 font-bold text-xs tracking-wider uppercase h-12 text-left px-4 text-zinc-400">Usage</Table.Column>
                                        <Table.Column align="end" className="border-b border-blue-500/10 font-bold text-xs tracking-wider uppercase h-12 text-right px-4 text-zinc-400">Actions</Table.Column>
                                    </Table.Header>
                                    <Table.Body className="bg-transparent">
                                        {pendingPrompts.map((prompt) => renderRow(prompt, true))}
                                    </Table.Body>
                                </Table.Content>
                            </Table.ScrollContainer>
                        </Table>
                    </div>

                    <RenderCardGrid
                        items={pendingPrompts}
                        isPendingSet={true}
                        isDeleting={isDeleting}
                        handleDelete={handleDelete}
                    />
                </div>
            )}
        </div>
    );
}