"use client";

import React, { useState } from "react";
import {
    Button,
    Modal,
    TextArea
} from "@heroui/react";
import { FiFlag } from "react-icons/fi";
import { createReport } from "@/lib/actions/reports";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ReportButton = ({ promptId }) => {
    const [reportType, setReportType] = useState("");
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const router = useRouter();

    const handleReset = () => {
        setReason("");
        setReportType("");
        setErrorMsg("");
    };

    const handleFormSubmit = async () => {
        setErrorMsg("");

        if (!reportType) {
            setErrorMsg("Please select a valid report classification type.");
            return;
        }

        if (!reason.trim()) {
            setErrorMsg("Please fill out the detailed explanation context.");
            return;
        }

        setLoading(true);

        try {
            const response = await createReport({
                promptId,
                reportType,
                reason: reason.trim()
            });

            if (response?.success) {
                toast.success('Reported Successfully!')
                handleReset();
                router.push(`/prompts/${promptId}`);

                const nativeCloseButton = document.querySelector(
                    "[data-modal-close-trigger]"
                );

                if (nativeCloseButton) nativeCloseButton.click();
            } else {
                setErrorMsg(
                    response?.message ||
                    "Something went wrong registering report mapping."
                );
            }
        } catch (err) {
            console.error(err);
            setErrorMsg(
                "An unexpected failure occurred processing database transmission."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal>
            <Button
                isIconOnly
                variant="light"
                className="group rounded-2xl border border-red-200 dark:border-red-900/40 bg-white dark:bg-slate-900 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 shadow-lg hover:shadow-red-500/20 transition-all duration-300"
            >
                <FiFlag
                    size={16}
                    className="group-hover:scale-110 transition-transform"
                />
            </Button>

            <Modal.Backdrop variant="blur">
                <Modal.Container>
                    <Modal.Dialog className="max-w-lg w-full mx-auto overflow-hidden rounded-3xl border border-sky-200 dark:border-sky-900/40 bg-white dark:bg-slate-950 shadow-2xl">

                        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-sky-400 via-cyan-400 to-blue-500" />

                        <Modal.CloseTrigger
                            data-modal-close-trigger
                            onClick={handleReset}
                        />

                        <Modal.Header className="pb-2">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-sky-500 to-blue-600 shadow-lg shadow-sky-500/25">
                                    <FiFlag
                                        size={22}
                                        className="text-white"
                                    />
                                </div>

                                <div>
                                    <Modal.Heading className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                        Report Prompt
                                    </Modal.Heading>

                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                        Help us maintain quality by reporting inappropriate content.
                                    </p>
                                </div>
                            </div>
                        </Modal.Header>

                        <Modal.Body className="space-y-5 pt-2">

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Violation Category
                                </label>

                                <select
                                    value={reportType}
                                    onChange={(e) => setReportType(e.target.value)}
                                    className="w-full rounded-2xl border border-sky-200 dark:border-sky-900/40 bg-sky-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 px-4 py-3 text-sm outline-none transition-all focus:border-sky-500 dark:focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15"
                                >
                                    <option value="">
                                        Select report category
                                    </option>

                                    <option value="Spam">
                                        Spam / Excessive Posting
                                    </option>

                                    <option value="Broken Content">
                                        Broken Content / Injection Failure
                                    </option>

                                    <option value="Inappropriate">
                                        Inappropriate / Offensive Language
                                    </option>

                                    <option value="Copyright">
                                        Copyright / Intellectual Property
                                    </option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Detailed Context
                                </label>

                                <TextArea
                                    variant="bordered"
                                    placeholder="Explain what is wrong with this prompt and provide supporting details..."
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    rows={4}
                                    className="w-full"
                                />
                            </div>

                            {errorMsg && (
                                <div className="rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 px-4 py-3">
                                    <p className="text-sm font-medium text-red-600 dark:text-red-400">
                                        {errorMsg}
                                    </p>
                                </div>
                            )}
                        </Modal.Body>

                        <Modal.Footer className="flex justify-end gap-3 pt-4">

                            <Button
                                variant="light"
                                disabled={loading}
                                onClick={handleReset}
                                className="rounded-2xl border border-sky-200 dark:border-sky-900/40 bg-sky-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-sky-950/30 px-5"
                            >
                                Cancel
                            </Button>

                            <Button
                                isLoading={loading}
                                onPress={handleFormSubmit}
                                className="rounded-2xl bg-linear-to-r from-sky-500 via-cyan-500 to-blue-600 text-white font-semibold px-6 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-300"
                            >
                                Submit Report
                            </Button>

                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default ReportButton;