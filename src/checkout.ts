import { loadStripe, Stripe } from '@stripe/stripe-js';

interface LineItem {
    price: string;
    quantity: number;
}

interface CheckoutProps {
    lineItems: LineItem[];
}

let stripePromise: Promise<Stripe | null> | null = null;

const getStripe = (): Promise<Stripe | null> => {
    const apiKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
    if (!stripePromise) {
        stripePromise = loadStripe(apiKey);
    }
    return stripePromise;
};

export async function checkout({ lineItems }: CheckoutProps): Promise<void> {
    const stripe = await getStripe();

    if (!stripe) {
        throw new Error('Stripe has not been initialized properly');
    }

    await stripe.redirectToCheckout({
        mode: 'payment',
        lineItems,
        successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: window.location.origin,
    });
}
