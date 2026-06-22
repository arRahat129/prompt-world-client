"use client";

import React, { useState } from "react";
import { Table, Button, Modal, Input } from "@heroui/react";
import { FiCheck, FiX, FiTrash2, FiStar, FiMail, FiLayers } from "react-icons/fi";
import toast from "react-hot-toast";
import { approvePrompt, deletePromptAdmin, rejectPrompt } from "@/lib/actions/prompts";
import { toggleFeaturePrompt } from "@/lib/actions/featured";


export default function AdminPromptsTable({ initialPrompts }) {
    const [prompts, setPrompts] = useState(initialPrompts);

    // Action State Handlers
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [selectedPromptId, setSelectedPromptId] = useState(null);
    const [rejectionFeedback, setRejectionFeedback] = useState("");
    const [processingId, setProcessingId] = useState(null);

    const handleApprove = async (id) => {
        setProcessingId(id);
        try {
            const res = await approvePrompt(id);
            if (res.success) {
                setPrompts(prev => prev.map(p => p._id === id ? { ...p, status: "approved" } : p));
                toast.success("Prompt layout asset approved for public indexing.");
            } else {
                toast.error(res.message || "Failed to complete approval state.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to complete approval status modifications.");
        } finally {
            setProcessingId(null);
        }
    };

    const openRejectSequence = (id) => {
        setSelectedPromptId(id);
        setRejectionFeedback("");
        setIsRejectModalOpen(true);
    };

    const handleRejectSubmit = async () => {
        if (!rejectionFeedback.trim()) {
            return toast.error("Please provide validation rejection feedback logs.");
        }

        setProcessingId(selectedPromptId);
        setIsRejectModalOpen(false);
        try {
            const res = await rejectPrompt(selectedPromptId, rejectionFeedback);
            if (res.success) {
                setPrompts(prev => prev.map(p => p._id === selectedPromptId ? { ...p, status: "rejected" } : p));
                toast.success("Prompt layout rejected. Feedback dispatched to creator profile.");
            } else {
                toast.error(res.message || "Failed to process asset rejection.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to process asset rejection execution state.");
        } finally {
            setProcessingId(null);
            setSelectedPromptId(null);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to completely purge this configuration asset?")) return;

        setProcessingId(id);
        try {
            const res = await deletePromptAdmin(id);
            if (res.success) {
                setPrompts(prev => prev.filter(p => p._id !== id));
                toast.success("Asset configuration permanently erased.");
            } else {
                toast.error(res.message || "Failed to complete data entity scrub.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Purge instruction stack failed to execute.");
        } finally {
            setProcessingId(null);
        }
    };

    const handleToggleFeature = async (id, currentFeaturedState) => {
        setProcessingId(id);
        const targetState = !currentFeaturedState;
        try {
            const res = await toggleFeaturePrompt(id, targetState);
            if (res.success) {
                setPrompts(prev => prev.map(p => p._id === id ? { ...p, isFeatured: targetState } : p));
                toast.success(targetState ? "Asset configuration promoted to workspace showcase features grid." : "Showcase state demoted.");
            } else {
                toast.error(res.message || "Failed to synchronize featured status.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Showcase allocation mutation processing halted.");
        } finally {
            setProcessingId(null);
        }
    };

    if (!prompts || prompts.length === 0) {
        return (
            <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl">
                <p className="text-sm text-zinc-500">No active prompts submitted in system index repository tracking indexes.</p>
            </div>
        );
    }

    return (
        <div className="shadow-xl rounded-xl p-4 border border-zinc-900/60 overflow-x-auto w-full">
            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="System Administration Prompts Repository Dashboard Matrix">
                        <Table.Header>
                            <Table.Column isRowHeader width={240} className="border-b border-zinc-800 font-medium text-xs uppercase h-12 text-left px-4">Prompt Identity</Table.Column>
                            <Table.Column className="border-b border-zinc-800 font-medium text-xs uppercase h-12 text-left px-4">Creator / Owner</Table.Column>
                            <Table.Column className="border-b border-zinc-800 font-medium text-xs uppercase h-12 text-left px-4">Specs & Stack</Table.Column>
                            <Table.Column className="border-b border-zinc-800 font-medium text-xs uppercase h-12 text-left px-4">Tier Metrics</Table.Column>
                            <Table.Column className="border-b border-zinc-800 font-medium text-xs uppercase h-12 text-left px-4">Status Indicator</Table.Column>
                            <Table.Column align="end" className="border-b border-zinc-800 font-medium text-xs uppercase h-12 text-right px-4">Administrative Actions Controls</Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {prompts.map((prompt) => (
                                <Table.Row key={prompt._id} className="hover:bg-zinc-900/40 border-b border-zinc-900/50 transition-colors">
                                    <Table.Cell className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={prompt.thumbnail || "/placeholder.png"}
                                                alt=""
                                                className="w-10 h-10 object-cover rounded-lg bg-zinc-900 border border-zinc-800 shrink-0"
                                            />
                                            <div className="flex flex-col min-w-0 max-w-44">
                                                <span className="font-semibold text-sm truncate block text-zinc-200">{prompt.title}</span>
                                                <span className="text-[10px] tracking-wide text-zinc-500 uppercase mt-0.5">{prompt.category}</span>
                                            </div>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell className="py-4 px-4">
                                        <div className="flex flex-col text-xs space-y-0.5">
                                            <span className="font-medium text-zinc-300 flex items-center gap-1">
                                                {prompt.creatorName}
                                            </span>
                                            <span className="text-[10px] opacity-50 flex items-center gap-1 text-zinc-400">
                                                <FiMail size={10} /> {prompt.creatorEmail}
                                            </span>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell className="py-4 px-4">
                                        <div className="flex flex-wrap gap-1.5 max-w-36">
                                            <span className="bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-[10px] text-zinc-300 font-medium capitalize">
                                                {prompt.aiTool}
                                            </span>
                                            <span className="bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-[10px] text-zinc-400 capitalize">
                                                {prompt.difficulty}
                                            </span>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell className="py-4 px-4">
                                        <div className="flex flex-col text-[11px] text-zinc-400 space-y-0.5 font-medium">
                                            <span className="capitalize flex items-center gap-1">
                                                Visibility: <span className={prompt.visibility === "public" ? "text-blue-400" : "text-amber-500"}>{prompt.visibility}</span>
                                            </span>
                                            <span>Usage Actions Count: {prompt.copyCount || 0}</span>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell className="py-4 px-4 text-sm">
                                        <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-semibold border ${prompt.status === 'approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                            prompt.status === 'rejected' ? 'bg-danger/10 text-danger border-danger/20' :
                                                'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                            }`}>
                                            {prompt.status || 'pending'}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell className="py-4 px-4">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <Button
                                                size="sm"
                                                variant="light"
                                                disabled={processingId !== null}
                                                className={`min-w-8 w-8 h-8 p-0 hover:bg-zinc-800/80 rounded-lg ${prompt.isFeatured ? 'text-amber-400 bg-amber-500/5' : 'text-zinc-500'}`}
                                                onClick={() => handleToggleFeature(prompt._id, prompt.isFeatured)}
                                            >
                                                <FiStar size={14} className={prompt.isFeatured ? "fill-amber-400" : ""} />
                                            </Button>

                                            {prompt.status !== 'approved' && (
                                                <Button
                                                    size="sm"
                                                    variant="light"
                                                    disabled={processingId !== null}
                                                    className="text-green-500 hover:bg-green-950/20 min-w-8 w-8 h-8 p-0 rounded-lg"
                                                    onClick={() => handleApprove(prompt._id)}
                                                >
                                                    <FiCheck size={14} />
                                                </Button>
                                            )}

                                            {prompt.status !== 'rejected' && (
                                                <Button
                                                    size="sm"
                                                    variant="light"
                                                    disabled={processingId !== null}
                                                    className="text-warning hover:bg-warning-950/20 min-w-8 w-8 h-8 p-0 rounded-lg"
                                                    onClick={() => openRejectSequence(prompt._id)}
                                                >
                                                    <FiX size={14} />
                                                </Button>
                                            )}

                                            <Button
                                                size="sm"
                                                variant="light"
                                                disabled={processingId !== null}
                                                isLoading={processingId === prompt._id}
                                                className="text-zinc-500 hover:text-danger hover:bg-danger-950/20 min-w-8 w-8 h-8 p-0 rounded-lg"
                                                onClick={() => handleDelete(prompt._id)}
                                            >
                                                <FiTrash2 size={14} />
                                            </Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>

            <Modal isOpen={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)}>
                <Modal.Backdrop variant="blur">
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-[420px] bg-zinc-950 border border-zinc-900 rounded-xl">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Icon className="bg-warning/10 text-warning border border-warning/20">
                                    <FiLayers className="size-5" />
                                </Modal.Icon>
                                <Modal.Heading>Provide Rejection Feedback</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body className="space-y-3">
                                <p className="text-xs text-zinc-400 leading-relaxed">
                                    State explicit design architecture modifications or policy context violations explaining why this configuration set failed processing verification standards.
                                </p>
                                <Input
                                    label="Rejection Comments Log"
                                    placeholder="e.g., Structure lacks efficient PyTorch input requirements or input schema values..."
                                    variant="bordered"
                                    className="w-full text-sm"
                                    value={rejectionFeedback}
                                    onChange={(e) => setRejectionFeedback(e.target.value)}
                                />
                            </Modal.Body>
                            <Modal.Footer className="flex gap-2">
                                <Button
                                    variant="secondary"
                                    className="w-full text-xs font-semibold h-10"
                                    onClick={() => setIsRejectModalOpen(false)}
                                >
                                    Dismiss Execution
                                </Button>
                                <Button
                                    color="danger"
                                    className="w-full text-xs font-semibold h-10 bg-red-600 hover:bg-red-500"
                                    onClick={handleRejectSubmit}
                                >
                                    Log Failure Status
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
}