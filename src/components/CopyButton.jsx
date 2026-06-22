'use client';

import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const CopyButton = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            toast.success('Prompt Content Copied to Clipboard');
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <Button
            size="sm"
            variant="outline"
            className="border-zinc-800 dark:border-zinc-200 font-medium rounded-lg text-xs gap-1.5 transition-all"
            onClick={handleCopy}
        >
            {copied ? (
                <>
                    <FiCheck size={13} className="text-emerald-500" />
                    <span className="text-emerald-500">Copied</span>
                </>
            ) : (
                <>
                    <FiCopy size={13} />
                    <span>Copy</span>
                </>
            )}
        </Button>
    );
};

export default CopyButton;