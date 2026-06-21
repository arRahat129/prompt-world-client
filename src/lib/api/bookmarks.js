import { serverFetch } from "../core/server";

export const getUserBookmarks = async (userId) => {
    console.log(userId)
    try {
        return await serverFetch(`/api/bookmarks?userId=${userId}`);
    } catch (error) {
        console.error("Failed fetching collection records:", error);
        return [];
    }
};