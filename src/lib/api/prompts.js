'use server'

import { serverFetch } from "../core/server"

export const getPrompts = async () => {
    return serverFetch(`/api/prompts`);
}

export const getSinglePrompt = async (promptId) => {
    return serverFetch(`/api/prompts/${promptId}`);
}

export const filterPrompts = async (query) => {
    const result = await serverFetch(`/api/prompts?${query.toString()}`);

    return result;
};

export const getCreatorPrompts = async (creatorId) => {
    return serverFetch(`/api/prompts?creatorId=${creatorId}`);
}

export const getPlatformStats = async () => {
    try {
        const response = await serverFetch('/api/platform-stats');
        if (response?.success) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error("Failed to execute getPlatformStats action:", error);
        return null;
    }
}

export const getLeaderboard = async () => {
    return serverFetch(`/api/creators/leaderboard`);
}

// export const getCreatorPrompts = async (creatorId, status = 'approved') => {
//     const res = await fetch(`${baseUrl}/api/prompts?${creatorId}&status=${status}`);
//     return res.json();
// }