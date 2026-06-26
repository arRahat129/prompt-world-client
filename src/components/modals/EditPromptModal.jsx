"use client";

import React, { useState } from "react";
import { Modal, Button, Input, TextArea, Select, ListBox } from "@heroui/react";
import { updatePrompt } from "@/lib/actions/prompts";
import toast from "react-hot-toast";

export default function EditPromptModal({ isOpen, onClose, prompt, onUpdateSuccess }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [title, setTitle] = useState(prompt?.title || "");
    const [category, setCategory] = useState(prompt?.category || "development");
    const [aiTool, setAiTool] = useState(prompt?.aiTool || "chatgpt");
    const [tags, setTags] = useState(prompt?.tags || "");
    const [description, setDescription] = useState(prompt?.description || "");
    const [content, setContent] = useState(prompt?.content || "");
    const [difficulty, setDifficulty] = useState(prompt?.difficulty || "beginner");
    const [visibility, setVisibility] = useState(prompt?.visibility || "public");
    const [thumbnail, setThumbnail] = useState(prompt?.thumbnail || "");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const payload = {
                title,
                category,
                aiTool,
                tags,
                description,
                content,
                difficulty,
                visibility,
                thumbnail
            };

            const response = await updatePrompt(prompt._id, payload);

            if (response?.success) {
                toast.success("Prompt asset updated successfully!, Wait for ADMIN to approve!!");
                onUpdateSuccess?.();
                onClose();
            } else {
                setError(response?.message || "Failed to update prompt matrix.");
                toast.error("An unexpected network error occurred.");
                console.error(err);
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Modal.Backdrop variant="blur">
                <Modal.Container size="2xl">
                    <Modal.Dialog>
                        <form onSubmit={handleSubmit} className="w-full">

                            <Modal.Header>
                                <Modal.Heading className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                                    Edit Prompt Matrix
                                </Modal.Heading>
                            </Modal.Header>

                            <Modal.Body className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                                {error && (
                                    <div className="p-3 text-xs font-medium text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
                                        {error}
                                    </div>
                                )}

                                {/* Row 1: Title & Tags */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Prompt Title</label>
                                        <Input
                                            placeholder="e.g., Photographic Architectural Concrete Tile Texture"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                            variant="bordered"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Tags (Comma Separated)</label>
                                        <Input
                                            placeholder="architecture, brutalist, minimal"
                                            value={tags}
                                            onChange={(e) => setTags(e.target.value)}
                                            required
                                            variant="bordered"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Category & Target AI Tool */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Category</label>
                                        <Select selectedKey={category} onSelectionChange={(key) => setCategory(key)} placeholder="Select Category" variant="bordered">
                                            <Select.Trigger className="w-full border border-zinc-200 dark:border-zinc-800 h-10 rounded-lg px-3 text-sm"><Select.Value /><Select.Indicator /></Select.Trigger>
                                            <Select.Popover className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-lg p-1 shadow-xl">
                                                <ListBox className="outline-none">
                                                    <ListBox.Item id="development" textValue="Development & Code" className="p-2 rounded-md text-sm text-zinc-900 dark:text-zinc-100">Development & Code</ListBox.Item>
                                                    <ListBox.Item id="copywriting" textValue="Copywriting & Design" className="p-2 rounded-md text-sm text-zinc-900 dark:text-zinc-100">Copywriting & Design</ListBox.Item>
                                                    <ListBox.Item id="marketing" textValue="Growth Marketing" className="p-2 rounded-md text-sm text-zinc-900 dark:text-zinc-100">Growth Marketing</ListBox.Item>
                                                    <ListBox.Item id="productivity" textValue="Workplace Productivity" className="p-2 rounded-md text-sm text-zinc-900 dark:text-zinc-100">Workplace Productivity</ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Target AI Tool</label>
                                        <Select selectedKey={aiTool} onSelectionChange={(key) => setAiTool(key)} placeholder="Select AI Tool" variant="bordered">
                                            <Select.Trigger className="w-full border border-zinc-200 dark:border-zinc-800 h-10 rounded-lg px-3 text-sm"><Select.Value /><Select.Indicator /></Select.Trigger>
                                            <Select.Popover className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-lg p-1 shadow-xl">
                                                <ListBox className="outline-none">
                                                    <ListBox.Item id="chatgpt" textValue="ChatGPT / GPT-4o" className="p-2 rounded-md text-sm text-zinc-900 dark:text-zinc-100">ChatGPT / GPT-4o</ListBox.Item>
                                                    <ListBox.Item id="claude" textValue="Claude 3.5 Sonnet" className="p-2 rounded-md text-sm text-zinc-900 dark:text-zinc-100">Claude 3.5 Sonnet</ListBox.Item>
                                                    <ListBox.Item id="gemini" textValue="Gemini Pro" className="p-2 rounded-md text-sm text-zinc-900 dark:text-zinc-100">Gemini Pro</ListBox.Item>
                                                    <ListBox.Item id="midjourney" textValue="Midjourney" className="p-2 rounded-md text-sm text-zinc-900 dark:text-zinc-100">Midjourney</ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>
                                    </div>
                                </div>

                                {/* Row 3: Difficulty & Visibility Setting */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Difficulty Level</label>
                                        <Select selectedKey={difficulty} onSelectionChange={(key) => setDifficulty(key)} placeholder="Select Difficulty" variant="bordered">
                                            <Select.Trigger className="w-full border border-zinc-200 dark:border-zinc-800 h-10 rounded-lg px-3 text-sm"><Select.Value /><Select.Indicator /></Select.Trigger>
                                            <Select.Popover className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-lg p-1 shadow-xl">
                                                <ListBox className="outline-none">
                                                    <ListBox.Item id="beginner" textValue="Beginner" className="p-2 rounded-md text-sm text-zinc-900 dark:text-zinc-100">Beginner</ListBox.Item>
                                                    <ListBox.Item id="intermediate" textValue="Intermediate" className="p-2 rounded-md text-sm text-zinc-900 dark:text-zinc-100">Intermediate</ListBox.Item>
                                                    <ListBox.Item id="pro" textValue="Pro" className="p-2 rounded-md text-sm text-zinc-900 dark:text-zinc-100">Pro</ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Visibility Setting</label>
                                        <Select selectedKey={visibility} onSelectionChange={(key) => setVisibility(key)} placeholder="Select Visibility" variant="bordered">
                                            <Select.Trigger className="w-full border border-zinc-200 dark:border-zinc-800 h-10 rounded-lg px-3 text-sm"><Select.Value /><Select.Indicator /></Select.Trigger>
                                            <Select.Popover className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-lg p-1 shadow-xl">
                                                <ListBox className="outline-none">
                                                    <ListBox.Item id="public" textValue="Public Marketplace" className="p-2 rounded-md text-sm text-zinc-900 dark:text-zinc-100">Public Marketplace</ListBox.Item>
                                                    <ListBox.Item id="private" textValue="Private" className="p-2 rounded-md text-sm text-zinc-900 dark:text-zinc-100">Private</ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>
                                    </div>
                                </div>

                                {/* Thumbnail field */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Thumbnail Image URL</label>
                                    <Input
                                        placeholder="https://i.ibb.co/..."
                                        value={thumbnail}
                                        onChange={(e) => setThumbnail(e.target.value)}
                                        required
                                        variant="bordered"
                                    />
                                </div>

                                {/* Descriptions & Content Textareas */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Short Description</label>
                                    <TextArea
                                        placeholder="Summarize what this prompt achieves..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                        variant="primary"
                                        rows={2}
                                        fullWidth
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Prompt Content</label>
                                    <TextArea
                                        placeholder="Paste prompt instructions here..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                        variant="primary"
                                        rows={4}
                                        fullWidth
                                    />
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="light" className="text-zinc-500 font-medium" onPress={onClose} isDisabled={isLoading}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white font-medium shadow-sm" isLoading={isLoading}>
                                    Update Prompt
                                </Button>
                            </Modal.Footer>

                        </form>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}