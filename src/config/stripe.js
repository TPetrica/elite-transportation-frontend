import { loadStripe } from "@stripe/stripe-js";

// Make sure to add your publishable key to your .env file
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default stripePromise;