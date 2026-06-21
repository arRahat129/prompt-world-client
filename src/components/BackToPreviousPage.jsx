"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@heroui/react";
import { FaArrowLeft } from "react-icons/fa6";
import Link from 'next/link';

const BackToPreviousPage = ({ fallbackHref = "/prompts" }) => {
    const router = useRouter();

    const handleBackClick = (e) => {
        e.preventDefault();
        // Check if there is browser history to go back to, otherwise drop to fallback link
        if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
        } else {
            router.push(fallbackHref);
        }
    };

    return (
        <Link href={fallbackHref}>
            <Button
                onClick={handleBackClick}
                size="sm"
                variant="outline"
                className="text-xs text-zinc-800 dark:text-zinc-400 hover:font-bold transition-all px-0 bg-transparent min-w-0 h-auto gap-2"
            >
                <FaArrowLeft size={14} /> Back to previous page
            </Button>
        </Link>
    );
};

export default BackToPreviousPage;