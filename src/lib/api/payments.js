'use server';

import { protectedFetch } from "../core/server";

export const allPayments = async() => {
    return protectedFetch('/api/payments');
}