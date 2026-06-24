'use server'

import { serverFetch } from "../core/server"

export const creatorAnalytics = async () => {
    return serverFetch('/api/creator/analytics');
}