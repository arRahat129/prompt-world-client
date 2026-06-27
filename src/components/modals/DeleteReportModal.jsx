'use client';

import { deleteReport } from '@/lib/actions/reports';
import { AlertDialog, Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa6';

const DeleteReportModal = ({ reportId, promptTitle }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            try {
                const response = await deleteReport(reportId);
                if (response?.success) {
                    toast.success(`The Report on the Prompt (${promptTitle}), is deleted successfully!`);
                    router.refresh();
                } else {
                    toast.error(response?.message || "Failed to delete report.");
                }
            } catch (error) {
                console.error("Error deleting report:", error);
                toast.error("An unexpected error occurred.");
            }
        });
    };

    return (
        <AlertDialog>
            <Button variant="danger" isIconOnly aria-label="Delete Report">
                <FaTrash className="w-4 h-4" />
            </Button>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-100">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete Report permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete the report for (<strong>{promptTitle}</strong>) and all of its data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                onClick={handleDelete}
                                isLoading={isPending}
                            >
                                {isPending ? "Deleting..." : "Delete Report"}
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default DeleteReportModal;