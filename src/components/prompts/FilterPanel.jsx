"use client";

import { useState } from "react";
import { Form, TextField, Label, Input, Select, ListBox, Button } from "@heroui/react";
import { FiSearch, FiSliders, FiRefreshCw, FiLayers, FiCpu, FiAward } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterPanel() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initialize state cleanly from active search query params
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [category, setCategory] = useState(searchParams.get("category") || "");
    const [aiTool, setAiTool] = useState(searchParams.get("aiTool") || "");
    const [difficulty, setDifficulty] = useState(searchParams.get("difficulty") || "");

    const handleApplyFilters = (e) => {
        if (e) {
            e.preventDefault();
        }

        const params = new URLSearchParams();
        if (search) {
            params.set("search", search);
        }
        if (category) {
            params.set("category", category);
        }
        if (aiTool) {
            params.set("aiTool", aiTool);
        }
        if (difficulty) {
            params.set("difficulty", difficulty);
        }

        router.push(`/prompts?${params.toString()}`);
    };

    const handleReset = () => {
        setSearch("");
        setCategory("");
        setAiTool("");
        setDifficulty("");
        router.push("/prompts");
    };

    // Design token styling sync
    const textInputClass = "w-full border border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 rounded-lg h-12 px-3 text-sm outline-none transition-all bg-transparent";
    const selectBoxClass = "w-full";
    const triggerClasses = "w-full flex items-center justify-between border border-zinc-200 dark:border-zinc-800 h-12 rounded-lg px-3 transition-all text-sm outline-none data-[focused=true]:border-zinc-400 dark:data-[focused=true]:border-zinc-600 bg-transparent";
    const popoverClasses = "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-lg shadow-xl p-1";
    const listItemClasses = "flex items-center justify-between p-2 rounded-md cursor-pointer text-sm outline-none data-[focused=true]:bg-zinc-100 dark:data-[focused=true]:bg-zinc-800 text-zinc-900 dark:text-zinc-100";

    return (
        <Form onSubmit={handleApplyFilters} className="w-full border border-zinc-200 dark:border-zinc-900 rounded-xl p-6 bg-white dark:bg-zinc-950/20 shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end w-full">

                {/* Search Text Field */}
                <TextField className="flex flex-col gap-1 w-full">
                    <Label className="text-zinc-700 dark:text-zinc-400 font-medium text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <FiSearch size={12} /> Search Title
                    </Label>
                    <Input
                        placeholder="Search keyword..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={textInputClass}
                    />
                </TextField>

                {/* Category Dropdown */}
                <Select
                    className={selectBoxClass}
                    selectedKey={category}
                    onSelectionChange={(key) => setCategory(key)}
                    placeholder="All Categories"
                >
                    <Label className="text-zinc-700 dark:text-zinc-400 font-medium text-xs uppercase tracking-wider flex items-center gap-1.5 mb-1">
                        <FiLayers size={12} /> Category
                    </Label>
                    <Select.Trigger className={triggerClasses}>
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className={popoverClasses}>
                        <ListBox className="outline-none">
                            <ListBox.Item id="" className={listItemClasses} textValue="All Categories">
                                <span className="font-medium text-zinc-500 dark:text-zinc-400">All Categories</span>
                            </ListBox.Item>
                            <ListBox.Item id="development" className={listItemClasses} textValue="Development">Development & Code</ListBox.Item>
                            <ListBox.Item id="copywriting" className={listItemClasses} textValue="Copywriting">Copywriting & Design</ListBox.Item>
                            <ListBox.Item id="marketing" className={listItemClasses} textValue="Marketing">Growth Marketing</ListBox.Item>
                            <ListBox.Item id="productivity" className={listItemClasses} textValue="Productivity">Workplace Productivity</ListBox.Item>
                        </ListBox>
                    </Select.Popover>
                </Select>

                {/* AI Tool Dropdown */}
                <Select
                    className={selectBoxClass}
                    selectedKey={aiTool}
                    onSelectionChange={(key) => setAiTool(key)}
                    placeholder="All Models"
                >
                    <Label className="text-zinc-700 dark:text-zinc-400 font-medium text-xs uppercase tracking-wider flex items-center gap-1.5 mb-1">
                        <FiCpu size={12} /> Target AI Tool
                    </Label>
                    <Select.Trigger className={triggerClasses}>
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className={popoverClasses}>
                        <ListBox className="outline-none">
                            <ListBox.Item id="" className={listItemClasses} textValue="All Models">
                                <span className="font-medium text-zinc-500 dark:text-zinc-400">All Models</span>
                            </ListBox.Item>
                            <ListBox.Item id="gpt4" className={listItemClasses} textValue="ChatGPT">ChatGPT / GPT-4o</ListBox.Item>
                            <ListBox.Item id="claude" className={listItemClasses} textValue="Claude">Claude 3.5 Sonnet</ListBox.Item>
                            <ListBox.Item id="gemini" className={listItemClasses} textValue="Gemini">Gemini Pro</ListBox.Item>
                            <ListBox.Item id="midjourney" className={listItemClasses} textValue="Midjourney">Midjourney</ListBox.Item>
                        </ListBox>
                    </Select.Popover>
                </Select>

                {/* Difficulty Dropdown */}
                <Select
                    className={selectBoxClass}
                    selectedKey={difficulty}
                    onSelectionChange={(key) => setDifficulty(key)}
                    placeholder="All Levels"
                >
                    <Label className="text-zinc-700 dark:text-zinc-400 font-medium text-xs uppercase tracking-wider flex items-center gap-1.5 mb-1">
                        <FiAward size={12} /> Difficulty
                    </Label>
                    <Select.Trigger className={triggerClasses}>
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className={popoverClasses}>
                        <ListBox className="outline-none">
                            <ListBox.Item id="" className={listItemClasses} textValue="All Levels">
                                <span className="font-medium text-zinc-500 dark:text-zinc-400">All Levels</span>
                            </ListBox.Item>
                            <ListBox.Item id="beginner" className={listItemClasses} textValue="Beginner">Beginner</ListBox.Item>
                            <ListBox.Item id="intermediate" className={listItemClasses} textValue="Intermediate">Intermediate</ListBox.Item>
                            <ListBox.Item id="pro" className={listItemClasses} textValue="Pro">Pro</ListBox.Item>
                        </ListBox>
                    </Select.Popover>
                </Select>
            </div>

            {/* Submissions Control Panel Strip */}
            <div className="flex justify-end gap-2 pt-2 width-full">
                <Button
                    type="button"
                    onClick={handleReset}
                    className="border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg px-4 font-medium h-10 bg-transparent text-xs hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                    startContent={<FiRefreshCw size={12} />}
                >
                    Reset Filter
                </Button>
                <Button
                    type="submit"
                    className="font-medium bg-sky-500 hover:bg-sky-600 text-white rounded-lg px-5 h-10 text-xs transition-colors shadow-sm"
                    startContent={<FiSliders size={12} />}
                >
                    Apply Filter
                </Button>
            </div>
        </Form>
    );
}