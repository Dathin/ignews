import { loadStripe } from '@stripe/stripe-js';
const { NEXT_PUBLIC_STRIPE_PUBLIC_KEY } = process.env;

export async function getStripeJs(){
    return  await loadStripe(NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
}