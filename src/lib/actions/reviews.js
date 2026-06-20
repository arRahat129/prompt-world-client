'use server';

import { serverMutation } from "../core/server";

export const createReview = async (reviewData) => {
    try {
        const response = await serverMutation('/api/reviews', reviewData, "POST");
        return response;
    } catch (error) {
        console.error("Failed to execute review creation mutation:", error);
        return { success: false, message: "Network synchronization error." };
    }
}

export const updateReview = async (reviewData) => {
    return serverMutation('/api/reviews', reviewData, 'PATCH');
}