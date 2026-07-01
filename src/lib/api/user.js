'use server';

import { serverFetch } from "../core/server";

export const allUsers = async (queryString = "") => {
    const path = queryString ? `/api/user?${queryString}` : '/api/user';
    const result = await serverFetch(path);
    return result;
}

export const getSingleUser = async (userId) => {
    if (!userId) {
        console.error("getSingleUser was invoked without a valid userId argument.");
        return null;
    }

    const path = `/api/user/${userId}`;

    try {
        const result = await serverFetch(path);
        return result;
    } catch (error) {
        console.error(`Error fetching individual user payload for ID [${userId}]:`, error);
        return null;
    }
}