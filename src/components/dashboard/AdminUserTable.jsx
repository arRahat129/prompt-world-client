"use client";

import React, { useState } from "react";
import {
    Table,
    TableScrollContainer,
    TableContent,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Button,
    Pagination
} from "@heroui/react";
import { FiTrash2, FiMail, FiShield } from "react-icons/fi";
import toast from "react-hot-toast";
import { changeUserRole, deleteUserAdmin } from "@/lib/actions/user";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminUsersTable({ initialUsers = [], total = 0, currentPage = 1 }) {
    const router = useRouter();
    const [users, setUsers] = useState(initialUsers);
    const [processingId, setProcessingId] = useState(null);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(total / itemsPerPage) || 1;

    const startItem = total === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, total);
    const safeUsers = Array.isArray(users) ? users : [];

    const [prevInitialUsers, setPrevInitialUsers] = useState(initialUsers);
    if (initialUsers !== prevInitialUsers) {
        setUsers(initialUsers);
        setPrevInitialUsers(initialUsers);
    }

    const handlePageChange = (newPageNumber) => {
        router.push(`?page=${newPageNumber}`, { scroll: false });
    };

    const getPageNumbers = () => {
        const pages = [];
        pages.push(1);
        if (currentPage > 3) {
            pages.push("ellipsis");
        }
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        if (currentPage < totalPages - 2) {
            pages.push("ellipsis");
        }
        if (totalPages > 1) {
            pages.push(totalPages);
        }
        return pages;
    };

    const handleRoleChange = async (id, newRole) => {
        setProcessingId(id);
        try {
            const res = await changeUserRole(id, newRole);
            if (res.success) {
                setUsers(prev => prev.map(u => u._id === id ? { ...u, role: newRole } : u));
                toast.success(`User role updated to ${newRole} successfully.`);
            } else {
                toast.error(res.message || "Failed to update user role authorization layer.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to complete role mutation sequence.");
        } finally {
            setProcessingId(null);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!confirm("Are you sure you want to completely purge this user profile identity?")) return;

        setProcessingId(id);
        try {
            const res = await deleteUserAdmin(id);
            if (res.success) {
                setUsers(prev => prev.filter(u => u._id !== id));
                toast.success("User profile successfully purged from master registries.");
            } else {
                toast.error(res.message || "Failed to complete data identity scrub.");
            }
        } catch (error) {
            console.error(error);
            toast.error("User execution stack failed to complete cleanly.");
        } finally {
            setProcessingId(null);
        }
    };

    if (safeUsers.length === 0) {
        return (
            <div className="text-center py-20 border border-dashed border-primary/20 rounded-3xl bg-primary/5">
                <p className="text-sm text-default-500">No managed user accounts located.</p>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden rounded-3xl border border-default-200 dark:border-default-100/10 bg-background shadow-xl backdrop-blur-sm flex flex-col p-2 gap-4">
            <div className="hidden lg:block">
                <Table aria-label="System Identity Management Matrix Grid">
                    <TableScrollContainer>
                        <TableContent>
                            <TableHeader>
                                <TableColumn isRowHeader className="bg-content2/50 border-b border-default-200 dark:border-default-100/10 font-semibold text-xs uppercase h-14 text-left px-4 text-primary tracking-wider">
                                    User Information
                                </TableColumn>
                                <TableColumn className="bg-content2/50 border-b border-default-200 dark:border-default-100/10 font-semibold text-xs uppercase h-14 text-left px-4 text-primary tracking-wider">
                                    Contact Gateway
                                </TableColumn>
                                <TableColumn className="bg-content2/50 border-b border-default-200 dark:border-default-100/10 font-semibold text-xs uppercase h-14 text-left px-4 text-primary tracking-wider">
                                    Authorization Role
                                </TableColumn>
                                <TableColumn className="bg-transparent border-b border-zinc-800 font-medium text-xs uppercase h-12 text-right px-4 text-default-600 dark:text-default-400">
                                    Administrative Management
                                </TableColumn>
                            </TableHeader>

                            <TableBody>
                                {safeUsers.map((user) => (
                                    <TableRow key={user?._id} className="border-b border-default-200/60 dark:border-default-100/5 hover:bg-primary/5 duration-300 transition-colors">
                                        <TableCell className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-11 h-11 overflow-hidden rounded-xl bg-primary/10 border border-primary/20 shrink-0 shadow-md">
                                                    <Image
                                                        src={user?.image || "https://ibb.co.com/TMqqVCvt"}
                                                        alt=""
                                                        fill
                                                        sizes="40px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-col min-w-0 max-w-44">
                                                    <span className="font-semibold text-sm truncate block text-foreground">{user?.name}</span>
                                                    <span className="text-[10px] tracking-wide text-default-500 uppercase mt-0.5">ID: {user?._id}</span>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="py-4 px-4">
                                            <div className="flex flex-col text-xs space-y-0.5">
                                                <span className="text-default-600 dark:text-default-400 flex items-center gap-1">
                                                    <FiMail size={12} /> {user?.email}
                                                </span>
                                            </div>
                                        </TableCell>

                                        <TableCell className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <FiShield
                                                    size={12}
                                                    className={
                                                        user?.role === "admin"
                                                            ? "text-red-400"
                                                            : user?.role === "creator"
                                                                ? "text-emerald-400"
                                                                : "text-default-500"
                                                    }
                                                />
                                                <select
                                                    value={user?.role || "user"}
                                                    disabled={processingId !== null}
                                                    onChange={(e) => handleRoleChange(user?._id, e.target.value)}
                                                    className="bg-content2 border border-default-200 dark:border-default-100/10 text-foreground shadow-sm text-xs rounded-lg px-2 py-1 outline-none focus:border-zinc-700 cursor-pointer disabled:opacity-50"
                                                >
                                                    <option value="user">User</option>
                                                    <option value="creator">Creator</option>
                                                    <option value="admin">Administrator</option>
                                                </select>
                                            </div>
                                        </TableCell>

                                        <TableCell className="py-4 px-4">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Button
                                                    size="sm"
                                                    variant="light"
                                                    isDisabled={processingId !== null}
                                                    isLoading={processingId === user?._id}
                                                    className="text-default-500 hover:text-danger hover:bg-danger-950/20 min-w-8 w-8 h-8 p-0 rounded-lg data-[hover=true]:text-red-400"
                                                    onClick={() => handleDeleteUser(user?._id)}
                                                >
                                                    {processingId !== user?._id && <FiTrash2 size={14} />}
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </TableContent>
                    </TableScrollContainer>
                </Table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
                {safeUsers.map((user) => (
                    <div key={user?._id} className="bg-content1 border border-default-200 dark:border-default-100/10 shadow-lg hover:shadow-blue-500/10 hover:border-primary/30 rounded-xl p-4 flex flex-col gap-4 hover:border-zinc-800 transition-colors">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="relative w-11 h-11 overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 shrink-0">
                                    <Image
                                        src={user?.image || "https://ibb.co.com/TMqqVCvt"}
                                        alt=""
                                        fill
                                        sizes="44px"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="font-semibold text-sm text-foreground truncate">{user?.name}</span>
                                    <span className="text-[10px] tracking-wide text-default-500 mt-0.5 truncate">ID: {user?._id}</span>
                                </div>
                            </div>
                            <Button
                                size="sm"
                                variant="light"
                                isDisabled={processingId !== null}
                                isLoading={processingId === user?._id}
                                className="text-default-500 hover:text-danger hover:bg-danger-950/20 min-w-8 w-8 h-8 p-0 rounded-lg shrink-0 data-[hover=true]:text-red-400"
                                onClick={() => handleDeleteUser(user?._id)}
                            >
                                {processingId !== user?._id && <FiTrash2 size={14} />}
                            </Button>
                        </div>

                        <div className="flex flex-col gap-2.5 pt-1 border-t border-zinc-900/60">
                            <div className="flex items-center justify-between gap-2 text-xs">
                                <span className="text-default-500 flex items-center gap-1 shrink-0"><FiMail size={12} /> Contact</span>
                                <span className="text-default-600 dark:text-default-400 truncate text-right">{user?.email}</span>
                            </div>

                            <div className="flex items-center justify-between gap-2 text-xs">
                                <span className="text-default-500 flex items-center gap-1 shrink-0">
                                    <FiShield
                                        size={12}
                                        className={
                                            user?.role === "admin"
                                                ? "text-red-400"
                                                : user?.role === "creator"
                                                    ? "text-emerald-400"
                                                    : "text-default-500"
                                        }
                                    />
                                    Authority
                                </span>
                                <select
                                    value={user?.role || "user"}
                                    disabled={processingId !== null}
                                    onChange={(e) => handleRoleChange(user?._id, e.target.value)}
                                    className="bg-content2 border border-default-200 dark:border-default-100/10 text-foreground shadow-sm text-xs rounded-lg px-2.5 py-1 outline-none focus:border-zinc-700 cursor-pointer disabled:opacity-50"
                                >
                                    <option value="user">User</option>
                                    <option value="creator">Creator</option>
                                    <option value="admin">Administrator</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100 dark:border-zinc-900 w-full px-2 mt-2">
                <Pagination.Summary className="text-xs font-medium text-zinc-500 font-mono order-2 sm:order-1">
                    Showing {startItem}-{endItem} of {total} user records
                </Pagination.Summary>

                <div className="order-1 sm:order-2">
                    <Pagination className="flex flex-col items-center">
                        <Pagination.Content className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/80">

                            <Pagination.Item>
                                <Pagination.Previous
                                    isDisabled={currentPage === 1}
                                    onPress={() => handlePageChange(currentPage - 1)}
                                    className="text-xs font-bold px-3 h-8 gap-1 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800"
                                >
                                    <Pagination.PreviousIcon />
                                    <span>Prev</span>
                                </Pagination.Previous>
                            </Pagination.Item>

                            {getPageNumbers().map((p, i) =>
                                p === "ellipsis" ? (
                                    <Pagination.Item key={`ellipsis-${i}`}>
                                        <Pagination.Ellipsis className="text-zinc-400" />
                                    </Pagination.Item>
                                ) : (
                                    <Pagination.Item key={p}>
                                        <Pagination.Link
                                            isActive={p === currentPage}
                                            onPress={() => handlePageChange(p)}
                                            className={`h-8 w-8 text-xs font-mono font-bold rounded-lg flex items-center justify-center transition-all ${p === currentPage
                                                    ? "bg-emerald-600 text-white shadow-xs"
                                                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800"
                                                }`}
                                        >
                                            {p}
                                        </Pagination.Link>
                                    </Pagination.Item>
                                )
                            )}

                            <Pagination.Item>
                                <Pagination.Next
                                    isDisabled={currentPage === totalPages}
                                    onPress={() => handlePageChange(currentPage + 1)}
                                    className="text-xs font-bold px-3 h-8 gap-1 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800"
                                >
                                    <span>Next</span>
                                    <Pagination.NextIcon />
                                </Pagination.Next>
                            </Pagination.Item>

                        </Pagination.Content>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}