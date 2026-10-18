import { loadStripe } from '@stripe/stripe-js'

export type PaymentStatus = 'succeeded' | 'processing' | 'failed'

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
export const stripePromise = publishableKey ? loadStripe(publishableKey) : null
export const stripePaymentsReady = Boolean(stripePromise)

export async function getReturnedPaymentStatus(): Promise<PaymentStatus | null> {
  const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret')
  if (!clientSecret || !stripePromise) return null

  const stripe = await stripePromise
  if (!stripe) return null

  const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret)
  if (error || !paymentIntent) return 'failed'
  if (paymentIntent.status === 'succeeded') return 'succeeded'
  if (paymentIntent.status === 'processing') return 'processing'
  return 'failed'
}