import AdminUsersTable from '@/components/dashboard/AdminUserTable';
import { allUsers } from '@/lib/api/user';
import React from 'react';

const AllUsers = async () => {
    const users = await allUsers();
    console.log(users);
    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
                    System Directories
                </h1>
                <p className="text-sm text-zinc-500">
                    Total active identities registered: <span className="text-zinc-300 font-semibold">{users.length}</span>
                </p>
            </div>

            {/* Render the admin table component with full role change and delete states */}
            <AdminUsersTable initialUsers={users} />
        </div>
    );
};

export default AllUsers;