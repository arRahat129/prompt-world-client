'use server';

import { serverFetch } from "../core/server";

export const allUsers = async (queryString = "") => {
    const path = queryString ? `/api/user?${queryString}` : '/api/user';
    const result = await serverFetch(path);
    return result;
}