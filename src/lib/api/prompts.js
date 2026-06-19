'use server'

import { serverFetch } from "../core/server"

export const getPrompts = async () => {
    return serverFetch(`/api/prompts`);
}

export const filterPrompts = async (query) => {
  const result = await serverFetch(`/api/prompts?${query.toString()}`);

  return result;
};

export const getCreatorPrompts = async (creatorId, status = 'approved') => {
    return serverFetch(`/api/prompts?creatorId=${creatorId}&status${status}`);
}

// export const getCreatorPrompts = async (creatorId, status = 'approved') => {
//     const res = await fetch(`${baseUrl}/api/prompts?${creatorId}&status=${status}`);
//     return res.json();
// }