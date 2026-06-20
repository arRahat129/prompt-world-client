'use server'

import { serverFetch } from "../core/server"

export const getReviewsByPromptId = async (promptId) => {
    if (!promptId) {
        return [];
    }

    return serverFetch(`/api/reviews?promptId=${promptId}`);
}