import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import { FiEdit2, FiEye, FiTrash2 } from 'react-icons/fi';

const ActionButtons = ({ prompt, isDeleting, handleDelete, user }) => (
    <div className="flex items-center gap-1.5">
        <Link href={`/prompts/${prompt._id}`}>
            <Button
                size="sm"
                variant="light"
                className="text-zinc-400 hover:text-blue-500 hover:bg-blue-500/10 min-w-8 w-8 h-8 p-0"
            >
                <FiEye size={14} />
            </Button>
        </Link>
        <Button
            size="sm"
            variant="light"
            className="text-zinc-400 hover:text-blue-500 hover:bg-blue-500/10 min-w-8 w-8 h-8 p-0"
            onClick={() => window.location.href = `/dashboard/${user?.role}/prompts/edit/${prompt._id}`}
        >
            <FiEdit2 size={14} />
        </Button>
        <Button
            size="sm"
            variant="light"
            isLoading={isDeleting === prompt._id}
            className="text-zinc-400 hover:text-danger hover:bg-danger-950/20 min-w-8 w-8 h-8 p-0"
            onClick={() => handleDelete(prompt._id)}
        >
            <FiTrash2 size={14} />
        </Button>
    </div>
);

export default ActionButtons;