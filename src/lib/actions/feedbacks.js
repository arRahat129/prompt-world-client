'use server';

import { serverMutation } from "../core/server"

export const createFeedback = async (feedbackPayload) => {
    return await serverMutation('/api/feedback', feedbackPayload, "POST");
};