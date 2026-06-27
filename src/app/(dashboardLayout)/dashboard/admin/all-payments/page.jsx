import { allPayments } from '@/lib/api/payments';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import React from 'react';

const AllPaymentsPage = async () => {
    const payments = await allPayments();
    // console.log(payments);
    return (
        <div className="p-6 min-h-screen">
            <div className="mb-4">
                <h1 className="text-xl font-bold">All Payments</h1>
            </div>

            <Table aria-label="Payments Ledger">
                <Table.ScrollContainer>
                    <Table.Content>
                        <Table.Header>
                            <Table.Column isRowHeader className="bg-zinc-400 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-400">Serial</Table.Column>
                            <Table.Column isRowHeader className="bg-zinc-400 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-400">Transaction ID</Table.Column>
                            <Table.Column className="bg-zinc-400 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-400">User Email</Table.Column>
                            <Table.Column className="bg-zinc-400 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-400">Plan Tier</Table.Column>
                            <Table.Column className="bg-zinc-400 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-400">Timestamp</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {payments.map((payment, idx) => (
                                <Table.Row key={payment._id} className="border-b border-zinc-800 hover:bg-zinc-900/40">
                                    <Table.Cell className="font-mono text-xs text-zinc-800 dark:text-zinc-400">{idx+1}</Table.Cell>
                                    <Table.Cell className="font-mono text-xs text-zinc-800 dark:text-zinc-400">{payment._id}</Table.Cell>
                                    <Table.Cell className="text-sm">{payment.email}</Table.Cell>
                                    <Table.Cell className="text-sm font-semibold uppercase">
                                        {payment.planId === 'creator_pro' ? (
                                            <span className="text-purple-800 dark:text-purple-400">Creator Pro</span>
                                        ) : payment.planId === 'user_pro' ? (
                                            <span className="text-green-800 dark:text-green-400">User Pro</span>
                                        ) : (
                                            <span className="text-zinc-800 dark:text-zinc-400">{payment.planId?.replace('_', ' ')}</span>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell className="text-sm text-zinc-800 dark:text-zinc-400">{payment.createdAt}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default AllPaymentsPage;