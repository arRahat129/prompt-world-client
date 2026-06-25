import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { PLAN_PRICE_ID, stripe } from '@/lib/stripe';
import { getUserSession } from '@/lib/core/session';

export async function POST(req) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        const formData = await req.formData();
        const planId = formData.get('plan_id');
        const priceId = PLAN_PRICE_ID[planId];

        if (!priceId) {
            return NextResponse.json(
                { error: `Invalid or missing Price ID for plan: ${planId}` },
                { status: 400 }
            );
        }

        const user = await getUserSession();

        if (user && user.plan !== 'user_free' && user.plan !== 'creator_free') {
            return NextResponse.redirect(`${origin}/plans/alreadyPaid`, 303);
        }

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            metadata: { planId },
            success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}&plan_id=${planId}`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}