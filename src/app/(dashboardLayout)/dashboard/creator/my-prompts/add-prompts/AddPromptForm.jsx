"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Form,
    Fieldset,
    TextField,
    Label,
    Input,
    TextArea,
    FieldError,
    Select,
    ListBox,
    Button,
} from "@heroui/react";
import { FiArrowLeft, FiLayers, FiCpu, FiTag, FiFileText, FiImage } from "react-icons/fi";
import { useSession } from "@/lib/auth-client";
import { createPrompt } from "@/lib/actions/prompts";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

export default function AddPromptForm() {
    const [errors, setErrors] = useState({});
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const { data: session, ispending } = useSession();
    console.log(session?.user);

    if (ispending) {
        return;
    }

    const user = session?.user || "";

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const apiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setThumbnailUrl(result.data.url);
                toast.success("Thumbnail uploaded successfully!");
            } else {
                toast.error("Failed to upload image.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("An error occurred during upload.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Client-side validation mirroring your schema structure
        const newErrors = {};
        if (!data.title) newErrors.title = "Prompt title is required";
        if (!data.description) newErrors.description = "Short description is required";
        if (!data.content) newErrors.content = "Prompt raw text content is required";
        if (!data.category) newErrors.category = "Category selection is required";
        if (!data.aiTool) newErrors.aiTool = "Target AI tool configuration is required";

        console.log("Validation errors:", newErrors);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const finalThumbnail = thumbnailUrl || "https://i.ibb.co.com/4gWyv3X/prompt-Sample.png";

        const payload = {
            ...data,
            thumbnail: finalThumbnail,
            copyCount: 0,
            status: "approved",
            creatorId: user?.id,
            creatorEmail: user?.email,
            creatorName: user?.name,
            creatorImage: user?.image,
        };

        // console.log("--- New Prompt Submission Form Values ---");
        // console.log(payload);
        // console.log("-----------------------------------------");

        const res = await createPrompt(payload);
        // console.log(res)
        if (res.insertedId) {
            toast.success("Prompt saved successfully!");
            redirect("/dashboard/creator/my-prompts");
        }
    };

    // Strict design token synchronization from your reference styling templates
    const textInputClass = "w-full border border-zinc-800 focus:border-zinc-600 rounded-lg h-12 px-3 text-sm placeholder:text-gray-500 outline-none transition-all";
    const textAreaClass = "w-full border border-zinc-800 focus:border-zinc-600 rounded-lg p-3 text-sm placeholder:text-gray-500 outline-none transition-all";

    const selectBoxClass = "w-full";
    const triggerClasses = "w-full flex items-center justify-between border border-zinc-800 h-12 rounded-lg px-3 transition-all text-sm outline-none data-[focused=true]:border-zinc-600 data-[invalid=true]:border-danger";
    const popoverClasses = "border border-zinc-800 rounded-lg shadow-xl p-1";
    const listItemClasses = "flex items-center justify-between p-2 rounded-md cursor-pointer text-sm outline-none data-[focused=true]:bg-gray-400";

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto border border-zinc-900 rounded-xl p-8 shadow-2xl space-y-6">

                {/* BACK LINK */}
                <Link href={`/dashboard/creator`} className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-white transition">
                    <FiArrowLeft /> Back to Dashboard
                </Link>

                {/* Form Header block */}
                <div className="border-b border-zinc-800 pb-6">
                    <h1 className="text-2xl font-semibold tracking-tight">Create New Prompt</h1>
                    <p className="text-zinc-700 8ark:text-zinc-400 text-sm mt-1">
                        Fill out the details below to submit your prompt to the marketplace directory.
                    </p>
                </div>

                {/* Hero UI Main Form Handler */}
                <Form onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior='aria'>

                    {/* SECTION 1: Meta Information */}
                    <Fieldset className="space-y-6 w-full">
                        <legend className="text-lg font-medium text-zinc-700 dark:text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
                            Prompt Information
                        </legend>

                        <TextField name="title" isInvalid={!!errors.title} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-800 dark:text-zinc-400 font-medium text-sm">Prompt Title</Label>
                            <Input placeholder="e.g. Expert Web Development Code Assistant" className={textInputClass} />
                            {errors.title && <FieldError className="text-xs text-danger mt-1">{errors.title}</FieldError>}
                        </TextField>

                        <div className="flex flex-col gap-2 w-full">
                            <Label className="text-zinc-800 dark:text-zinc-400 font-medium text-sm flex items-center gap-1.5">
                                <FiImage size={14} className="text-zinc-500" /> Prompt Thumbnail
                            </Label>
                            <div className="flex items-center gap-4 p-4  border border-zinc-800 rounded-lg">
                                <label className="w-16 h-16 border border-dashed border-zinc-700 hover:border-zinc-500 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden shrink-0">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    {thumbnailUrl ? (
                                        <Image
                                            src={thumbnailUrl}
                                            alt="Thumbnail preview"
                                            fill
                                            sizes="64px"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <span className="text-zinc-500 text-xl font-light">+</span>
                                    )}
                                </label>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        {isUploading ? "Uploading to ImgBB..." : "Upload cover layout"}
                                    </span>
                                    <span className="text-xs text-zinc-600">Supports PNG, JPG or WEBP formats</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category Selection */}
                            <Select className={selectBoxClass} name="category" isInvalid={!!errors.category}>
                                <Label className="text-zinc-700 dark:text-zinc-400 font-medium text-sm mb-1 flex items-center gap-1.5">
                                    <FiLayers size={14} className="text-zinc-500" /> Category
                                </Label>
                                <Select.Trigger className={triggerClasses}>
                                    <Select.Value className="" />
                                    <Select.Indicator />
                                </Select.Trigger>
                                {errors.category && <span className="text-xs text-danger mt-1">{errors.category}</span>}
                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="development" className={listItemClasses} textValue="Development & Code">Development & Code</ListBox.Item>
                                        <ListBox.Item id="copywriting" className={listItemClasses} textValue="Copywriting & Design">Copywriting & Design</ListBox.Item>
                                        <ListBox.Item id="marketing" className={listItemClasses} textValue="Growth Marketing">Growth Marketing</ListBox.Item>
                                        <ListBox.Item id="productivity" className={listItemClasses} textValue="Workplace Productivity">Workplace Productivity</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            {/* AI Tool Target */}
                            <Select className={selectBoxClass} name="aiTool" isInvalid={!!errors.aiTool}>
                                <Label className="text-zinc-700 dark:text-zinc-400 font-medium text-sm mb-1 flex items-center gap-1.5">
                                    <FiCpu size={14} className="text-zinc-500" /> Target AI Tool
                                </Label>
                                <Select.Trigger className={triggerClasses}>
                                    <Select.Value className="" />
                                    <Select.Indicator />
                                </Select.Trigger>
                                {errors.aiTool && <span className="text-xs text-danger mt-1">{errors.aiTool}</span>}
                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="gpt4" className={listItemClasses} textValue="ChatGPT / GPT-4o">ChatGPT / GPT-4o</ListBox.Item>
                                        <ListBox.Item id="claude" className={listItemClasses} textValue="Claude 3.5 Sonnet">Claude 3.5 Sonnet</ListBox.Item>
                                        <ListBox.Item id="gemini" className={listItemClasses} textValue="Gemini Pro">Gemini Pro</ListBox.Item>
                                        <ListBox.Item id="midjourney" className={listItemClasses} textValue="Midjourney">Midjourney</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* TAGS INPUT */}
                        <TextField name="tags" className="flex flex-col gap-1 w-full relative">
                            <Label className="text-zinc-800 dark:text-zinc-400 font-medium text-sm flex items-center gap-1.5">
                                <FiTag size={14} className="text-zinc-500" /> Tags
                            </Label>
                            <Input
                                placeholder="coding, nextjs, tailwind (comma separated)"
                                className={textInputClass}
                            />
                        </TextField>
                    </Fieldset>

                    {/* SECTION 2: Configuration & Code Elements */}
                    <Fieldset className="space-y-6 w-full">
                        <legend className="text-lg font-medium text-zinc-700 dark:text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
                            Prompt Structure Details
                        </legend>

                        <TextField name="description" isInvalid={!!errors.description} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-800 dark:text-zinc-400 font-medium text-sm">Short Description</Label>
                            <TextArea
                                placeholder="Summarize what this prompt generates and its key target configurations..."
                                rows={3}
                                className={textAreaClass}
                            />
                            {errors.description && <FieldError className="text-xs text-danger mt-1">{errors.description}</FieldError>}
                        </TextField>

                        <TextField name="content" isInvalid={!!errors.content} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-800 dark:text-zinc-400 font-medium text-sm flex items-center gap-1.5">
                                <FiFileText size={14} className="text-zinc-500" /> Prompt Raw Text
                            </Label>
                            <TextArea
                                placeholder="Paste your complete engineered system prompt string block context here..."
                                rows={5}
                                className={`${textAreaClass} font-mono`}
                            />
                            {errors.content && <FieldError className="text-xs text-danger mt-1">{errors.content}</FieldError>}
                        </TextField>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            {/* Difficulty Config Selector */}
                            <Select className={selectBoxClass} name="difficulty" defaultValue={'beginner'}>
                                <Label className="text-zinc-700 dark:text-zinc-400 font-medium text-sm mb-1 block">Difficulty Level</Label>
                                <Select.Trigger className={triggerClasses}>
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="beginner" className={listItemClasses} textValue="Beginner">Beginner</ListBox.Item>
                                        <ListBox.Item id="intermediate" className={listItemClasses} textValue="Intermediate">Intermediate</ListBox.Item>
                                        <ListBox.Item id="pro" className={listItemClasses} textValue="Pro">Pro</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            {/* Visibility Config Selector */}
                            <Select className={selectBoxClass} name="visibility" defaultValue={'public'}>
                                <Label className="text-zinc-700 dark:text-zinc-400 font-medium text-sm mb-1 block">Visibility Setting</Label>
                                <Select.Trigger className={triggerClasses}>
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="public" className={listItemClasses} textValue="Public Marketplace">Public Marketplace</ListBox.Item>
                                        <ListBox.Item id="private" className={listItemClasses} textValue="Private Scope">Private</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>
                    </Fieldset>

                    {/* Form Actions Layout Blocks */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800 w-full">
                        <Button
                            type="reset"
                            variant="outline"
                            className="border-zinc-800 dark:border-zinc-200 text-zinc-700 dark:text-zinc-300 rounded-lg px-6 font-medium h-11"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="font-semibold rounded-lg px-6 transition-colors h-11"
                        >
                            Save Prompt
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}