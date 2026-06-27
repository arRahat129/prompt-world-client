'use server';

import { serverMutation } from "../core/server";
import { getUserSession } from "../core/session";

export const createPayment = async (planId) => {
    try {
        const user = await getUserSession();

        if (!user || !user.id) {
            return { success: false, message: "Unauthorized profile context." };
        }

        const payload = {
            userId: user.id,
            planId: planId,
            email: user.email
        };

        // console.log("Dispatching valid backend payload:", payload);
        return await serverMutation('/api/payments', payload);
    } catch (error) {
        console.error("Payment action execution failure:", error);
        return { success: false, message: error.message || "Internal server transition error." };
    }
}