'use server';

import { serverFetch } from "../core/server";

export const allPayments = async() => {
    return serverFetch('/api/payments');
}