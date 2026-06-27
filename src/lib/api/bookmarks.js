'use server';

import { serverFetch } from "../core/server";

export const getUserBookmarks = async (userId) => {
    // console.log(userId)
    try {
        return await serverFetch(`/api/bookmarks?userId=${userId}`);
    } catch (error) {
        console.error("Failed fetching collection records:", error);
        return [];
    }
};

export const getCreatorPromptBookmarks = async () => {
    try {
        const response = await serverFetch('/api/creator/bookmarks');

        if (response && response.success) {
            return response.data;
        }

        return [];
    } catch (error) {
        console.error("Failed to fetch creator prompt bookmarks:", error);
        return [];
    }
};