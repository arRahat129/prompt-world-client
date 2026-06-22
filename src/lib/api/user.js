'use server';

import { serverFetch } from "../core/server";

export const allUsers = async() => {
    const result = await serverFetch('/api/user');
    return result;
}