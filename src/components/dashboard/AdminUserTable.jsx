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
    Button
} from "@heroui/react";
import { FiTrash2, FiMail, FiShield } from "react-icons/fi";
import toast from "react-hot-toast";
import { changeUserRole, deleteUserAdmin } from "@/lib/actions/user";

export default function AdminUsersTable({ initialUsers }) {
    const [users, setUsers] = useState(initialUsers);
    const [processingId, setProcessingId] = useState(null);

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

    if (!users || users.length === 0) {
        return (
            <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl">
                <p className="text-sm text-zinc-500">No managed user accounts located within core directory indexes.</p>
            </div>
        );
    }

    return (
        <div className="shadow-xl rounded-xl p-4 border border-zinc-900/60 w-full bg-zinc-950">
            <Table aria-label="System Identity Management Matrix Grid">
                <TableScrollContainer>
                    <TableContent>
                        <TableHeader>
                            {/* FIXED: Re-added the isRowHeader prop below for screen-reader structure */}
                            <TableColumn isRowHeader className="bg-transparent border-b border-zinc-800 font-medium text-xs uppercase h-12 text-left px-4 text-zinc-400">
                                User Information
                            </TableColumn>
                            <TableColumn className="bg-transparent border-b border-zinc-800 font-medium text-xs uppercase h-12 text-left px-4 text-zinc-400">
                                Contact Gateway
                            </TableColumn>
                            <TableColumn className="bg-transparent border-b border-zinc-800 font-medium text-xs uppercase h-12 text-left px-4 text-zinc-400">
                                Authorization Role
                            </TableColumn>
                            <TableColumn className="bg-transparent border-b border-zinc-800 font-medium text-xs uppercase h-12 text-right px-4 text-zinc-400">
                                Administrative Management
                            </TableColumn>
                        </TableHeader>

                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user?._id} className="hover:bg-zinc-900/40 border-b border-zinc-900/50 transition-colors">
                                    {/* User Identity Column */}
                                    <TableCell className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={user?.image || "https://ibb.co.com/TMqqVCvt"}
                                                alt=""
                                                className="w-10 h-10 object-cover rounded-lg bg-zinc-900 border border-zinc-800 shrink-0"
                                            />
                                            <div className="flex flex-col min-w-0 max-w-44">
                                                <span className="font-semibold text-sm truncate block text-zinc-200">{user?.name}</span>
                                                <span className="text-[10px] tracking-wide text-zinc-500 uppercase mt-0.5">ID: {user?._id}</span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Email Column */}
                                    <TableCell className="py-4 px-4">
                                        <div className="flex flex-col text-xs space-y-0.5">
                                            <span className="text-zinc-400 flex items-center gap-1">
                                                <FiMail size={12} /> {user?.email}
                                            </span>
                                        </div>
                                    </TableCell>

                                    {/* Role Selection Column */}
                                    <TableCell className="py-4 px-4">
                                        <div className="flex items-center gap-2">
                                            <FiShield
                                                size={12}
                                                className={
                                                    user?.role === "admin"
                                                        ? "text-red-400"
                                                        : user?.role === "creator"
                                                            ? "text-emerald-400"
                                                            : "text-zinc-500"
                                                }
                                            />
                                            <select
                                                value={user?.role || "user"}
                                                disabled={processingId !== null}
                                                onChange={(e) => handleRoleChange(user?._id, e.target.value)}
                                                className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs rounded-lg px-2 py-1 outline-none focus:border-zinc-700 cursor-pointer disabled:opacity-50"
                                            >
                                                <option value="user">User</option>
                                                <option value="creator">Creator</option>
                                                <option value="admin">Administrator</option>
                                            </select>
                                        </div>
                                    </TableCell>

                                    {/* Action Row Controls */}
                                    <TableCell className="py-4 px-4">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <Button
                                                size="sm"
                                                variant="light"
                                                isDisabled={processingId !== null}
                                                isLoading={processingId === user?._id}
                                                className="text-zinc-500 hover:text-danger hover:bg-danger-950/20 min-w-8 w-8 h-8 p-0 rounded-lg data-[hover=true]:text-red-400"
                                                onClick={() => handleDeleteUser(user?._id)}
                                            >
                                                {!processingId && <FiTrash2 size={14} />}
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
    );
}