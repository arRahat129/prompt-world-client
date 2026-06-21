'use server'

import { serverFetch } from "../core/server"

export const getReviewsByPromptId = async (promptId) => {
    if (!promptId) {
        return [];
    }

    return serverFetch(`/api/reviews?promptId=${promptId}`);
}

export const getReviewsByUserId = async (userId) => {
    if (!userId) {
        return [];
    }

    const response = await serverFetch(`/api/reviews/user/${userId}`);
    
    return response || [];
}