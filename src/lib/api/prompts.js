'use server'

import { serverFetch } from "../core/server"

export const getCreatorPrompts = async (creatorId, status = 'active') => {
    return serverFetch(`/api/prompts?creatorId=${creatorId}&status${status}`);
}

// export const getCreatorPrompts = async (creatorId, status = 'active') => {
//     const res = await fetch(`${baseUrl}/api/prompts?${creatorId}&status=${status}`);
//     return res.json();
// }