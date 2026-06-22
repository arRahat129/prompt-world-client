'use server';

import { serverMutation } from "../core/server";

export const createPayment = async (payInfo) => {
    console.log(payInfo);
    return serverMutation('/api/payments', payInfo);
}