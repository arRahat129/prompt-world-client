import EditPromptModal from '@/components/modals/EditPromptModal';
import { useSession } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FiEdit2, FiEye, FiTrash2 } from 'react-icons/fi';

const ActionButtons = ({ prompt, isDeleting, handleDelete }) => {
    const { data: session } = useSession();
    const user = session?.user;
    console.log({ user, prompt });

    const router = useRouter();

    const [isEditOpen, setIsEditOpen] = useState(false);

    const isOwner = user?.id === prompt?.creatorId;

    const handleUpdateSuccess = () => {
        router.push(`/dashboard/${user?.role}/my-prompts`);
    };

    return (
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

            {isOwner ? (
                <Button
                    size="sm"
                    variant="light"
                    onClick={() => setIsEditOpen(true)}
                    className="text-zinc-400 hover:text-blue-500 hover:bg-blue-500/10 min-w-8 w-8 h-8 p-0"
                >
                    <FiEdit2 size={14} />
                </Button>
            ) : (
                <Button
                    size="sm"
                    variant="light"
                    isDisabled
                    className="text-zinc-300 dark:text-zinc-700 cursor-not-allowed min-w-8 w-8 h-8 p-0"
                >
                    <FiEdit2 size={14} />
                </Button>
            )}

            {isOwner ? (
                <Button
                    size="sm"
                    variant="light"
                    isLoading={isDeleting === prompt._id}
                    className="text-zinc-400 hover:text-danger hover:bg-danger-950/20 min-w-8 w-8 h-8 p-0"
                    onClick={() => handleDelete(prompt._id)}
                >
                    <FiTrash2 size={14} />
                </Button>
            ) : (
                <Button
                    size="sm"
                    variant="light"
                    isDisabled
                    className="text-zinc-300 dark:text-zinc-700 cursor-not-allowed min-w-8 w-8 h-8 p-0"
                >
                    <FiTrash2 size={14} />
                </Button>
            )}

            {isEditOpen && (
                <EditPromptModal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    prompt={prompt}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}
        </div>
    )
};

export default ActionButtons;