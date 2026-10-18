import { useState, type FormEvent } from 'react'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { stripePromise, type PaymentStatus } from '../lib/stripe'

type DonationPaymentProps = {
  clientSecret: string
  amount: number
  onStatus: (status: PaymentStatus) => void
}

function PaymentForm({ amount, onStatus }: Omit<DonationPaymentProps, 'clientSecret'>) {
  const stripe = useStripe()
  const elements = useElements()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!stripe || !elements || isSubmitting) return

    setIsSubmitting(true)
    setErrorMessage('')

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/?donation=return#payment`,
      },
      redirect: 'if_required',
    })

    if (result.error) {
      setErrorMessage(result.error.message || 'Payment could not be completed. Please try again.')
      setIsSubmitting(false)
      return
    }

    if (result.paymentIntent?.status === 'succeeded') {
      onStatus('succeeded')
    } else {
      onStatus('processing')
    }
    setIsSubmitting(false)
  }

  return (
    <form className="stripe-payment-form" onSubmit={handleSubmit}>
      <PaymentElement options={{ layout: { type: 'accordion', defaultCollapsed: false } }} />
      {errorMessage && <p className="payment-error" role="alert">{errorMessage}</p>}
      <div className="payment-actions">
        <button className="button button-primary donation-submit" type="submit" disabled={!stripe || !elements || isSubmitting}>
          {isSubmitting ? 'Processing...' : `Pay ₱${amount.toLocaleString('en-PH')}`}
        </button>
      </div>
    </form>
  )
}

export default function DonationPayment({ clientSecret, amount, onStatus }: DonationPaymentProps) {
  if (!stripePromise) return null

  return (
    <section className="payment-panel" aria-label="Secure donation checkout">
      <p className="eyebrow">Secure checkout</p>
      <h3>Choose a payment method</h3>
      <p className="payment-method-note">Stripe securely displays the payment methods available for this donation. Depending on your Stripe account settings and eligibility, this can include cards, GCash, Maya, or wallet QR flows.</p>
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: 'flat',
            variables: {
              colorPrimary: '#245b43',
              colorText: '#1d3026',
              colorBackground: '#ffffff',
              borderRadius: '3px',
              fontFamily: 'DM Sans, sans-serif',
            },
          },
        }}
      >
        <PaymentForm amount={amount} onStatus={onStatus} />
      </Elements>
    </section>
  )
}
