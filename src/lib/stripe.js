import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'user_pro': 'price_1TkoK6F0NtNAg1PIJYgRoj6U',
    'creator_pro': 'price_1Tl3tCF0NtNAg1PI0nHwp728'
}