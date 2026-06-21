import { serverMutation } from "../core/server";

export const createBookmark = async (bookmarkData) => {
    return serverMutation("/api/bookmarks", bookmarkData, "POST");
};