import AdminUsersTable from '@/components/dashboard/AdminUserTable';
import { allUsers } from '@/lib/api/user';
import React from 'react';

const AllUsers = async ({ searchParams }) => {
    const sParams = await searchParams;
    const page = parseInt(sParams.page) || 1;
    const perPage = 10;

    const queryString = `page=${page}&perPage=${perPage}`;
    const responseData = await allUsers(queryString) || { total: 0, users: [] };

    const users = responseData?.users ?? (Array.isArray(responseData) ? responseData : []);
    console.log(users);
    const total = responseData?.total ?? users.length;
    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="relative overflow-hidden rounded-3xl border border-default-200 dark:border-default-100/10 bg-content1 p-8 shadow-xl">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500" />

                <div className="flex flex-col gap-3">
                    <div className="inline-flex items-center w-fit px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase">
                        User Management
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                        System Directories
                    </h1>

                    <p className="text-default-500 text-sm md:text-base">
                        Total active identities registered:
                        <span className="ml-2 font-bold text-primary">
                            {total}
                        </span>
                    </p>
                </div>
            </div>

            <AdminUsersTable
                initialUsers={users}
                total={total}
                currentPage={page}
            />
        </div>
    );
}

export default AllUsers;