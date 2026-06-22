'use server';

import { serverMutation } from "../core/server";

export const changeUserRole = async (id, role) => {
    try {
        return await serverMutation(`/api/user/${id}/role`, { role }, "PATCH");
    } catch (error) {
        console.error("Action error updating profile authorization mapping:", error);
        return { success: false, message: error.message };
    }
};

export const deleteUserAdmin = async (id) => {
    try {
        return await serverMutation(`/api/user/${id}`, {}, "DELETE");
    } catch (error) {
        console.error("Action error clearing system security identity context:", error);
        return { success: false, message: error.message };
    }
};