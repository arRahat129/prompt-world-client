"use client";
import { createFeedback } from "@/lib/actions/feedbacks";
import { Envelope } from "@gravity-ui/icons";
import { Button, Description, Input, Label, Modal, Surface, TextArea, TextField } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";

const ResolveReportBtn = ({ reportId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const message = formData.get("message")?.toString();

        if (!message || !message.trim()) return;

        try {
            setIsSubmitting(true);

            const response = await createFeedback({
                reportId,
                message: message.trim()
            });

            if (response?.success) {
                setIsOpen(false);
                toast.success(`Successfully send the message to the Creator.`)
            } else {
                toast.error("Feedback action response failed:", response?.message);
            }
        } catch (error) {
            toast.error("Error submitting report resolution feedback:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <Button onClick={() => setIsOpen(true)} className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium transition shadow-sm text-center">
                Resolve
            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <Envelope className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Resolve Report & Issue Feedback</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Provide feedback or a warning message to the content creator regarding this report.
                            </p>
                        </Modal.Header>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <Modal.Body className="p-6">
                                <Surface variant="default">
                                    <TextField className="w-full" name="message">
                                        <Label>Message</Label>
                                        <TextArea className={'w-full'} placeholder="Write your message here..." rows={5} />
                                        <Description>Maximum 500 characters</Description>
                                    </TextField>
                                </Surface>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button slot="close" variant="secondary">
                                    Cancel
                                </Button>
                                <Button type="submit">Send Feedback</Button>
                            </Modal.Footer>
                        </form>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default ResolveReportBtn;