'use server';

import { revalidatePath } from "next/cache";
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

        const result = await serverMutation('/api/payments', payload);

        if (result && result.success) {
            revalidatePath('/prompts/[id]', 'page'); 
            revalidatePath('/', 'layout'); 
        }

        return result;
    } catch (error) {
        console.error("Payment action execution failure:", error);
        return { success: false, message: error.message || "Internal server transition error." };
    }
}