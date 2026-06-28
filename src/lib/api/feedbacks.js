'use server';

import { serverFetch } from "../core/server"

export const getFeedbacksByCreatorId = async (creatorId) => {
    return await serverFetch(`/api/feedback/creator/${creatorId}`);
}