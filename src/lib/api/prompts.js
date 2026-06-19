'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getCreatorPrompts = async (creatorId, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/prompts?${creatorId}&status=${status}`);
    return res.json();
}