'use server';

import { protectedFetch, serverFetch } from "../core/server";

export const allUsers = async() => {
    const result = await protectedFetch('/api/user');
    return result;
}