import { allUsers } from '@/lib/api/user';
import React from 'react';

const AllUsers = async () => {
    const users = await allUsers();
    console.log(users);
    return (
        <div>
            <h2>Users: {users.length}</h2>
        </div>
    );
};

export default AllUsers;