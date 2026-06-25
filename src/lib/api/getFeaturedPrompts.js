'use server';

import { serverFetch } from "../core/server";

export const getFeaturedPrompts = async () => {
    return serverFetch('/api/featured-prompts');
}