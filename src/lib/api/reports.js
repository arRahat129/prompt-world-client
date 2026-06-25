'use server';

import { serverFetch } from "../core/server"

export const getReportsAll = async (params = {}) => {
    try {
        const { page, perPage } = params;

        // Dynamically append pagination parameters if passed from the components
        const querySegments = [];
        if (page) querySegments.push(`page=${page}`);
        if (perPage) querySegments.push(`perPage=${perPage}`);

        const queryString = querySegments.length ? `?${querySegments.join('&')}` : '';

        // Handled via your central protected core fetch engine
        const response = await serverFetch(`/api/reports${queryString}`);
        return response;
    } catch (error) {
        console.error("Failed to execute administrative report retrieval pipeline:", error);
        // Returning a structural layout to prevent frontend map/destructuring breakages
        return { total: 0, reports: [], error: true, message: "Pipeline extraction anomaly." };
    }
};