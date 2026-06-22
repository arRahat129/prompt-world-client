'use server';

import { serverMutation } from "../core/server";

export const toggleFeaturePrompt = async (promptId, isFeatured) => {
    return serverMutation(`/api/prompts/${promptId}/feature`, { isFeatured }, "POST");
};