'use server'

import { serverMutation } from "../core/server"

export const createReport = async (reportPayload) => {
    return await serverMutation('/api/reports', reportPayload, "POST");
};