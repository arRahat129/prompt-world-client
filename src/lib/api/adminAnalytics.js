'use server'

import { serverFetch } from "../core/server"

export const adminAnalytics = async () => {
    return serverFetch('/api/admin/analytics');
}