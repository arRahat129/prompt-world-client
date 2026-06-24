'use server'

import { serverFetch } from "../core/server";

export const userAnalytics = async () => {
    return serverFetch('/api/user/analytics');
};