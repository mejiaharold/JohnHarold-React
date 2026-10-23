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

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/?donation=return#payment`,
        },
        redirect: 'if_required',
      })

      if (result.error) {
        setErrorMessage(result.error.message || 'Payment could not be completed. Please try again.')
        return
      }

      if (result.paymentIntent?.status === 'succeeded') {
        onStatus('succeeded')
      } else {
        onStatus('processing')
      }
    } catch {
      setErrorMessage('Payment could not be completed. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="stripe-payment-form" onSubmit={handleSubmit} aria-busy={isSubmitting}>
      <PaymentElement options={{ wallets: { link: 'never' } }} />
      {errorMessage && <p className="payment-error" role="alert">{errorMessage}</p>}
      <div className="payment-actions">
        <button className={`button button-primary donation-submit${isSubmitting ? ' is-processing' : ''}`} type="submit" disabled={!stripe || !elements || isSubmitting}>
          {isSubmitting && <span className="payment-spinner" aria-hidden="true" />}
          <span>{isSubmitting ? 'Processing payment...' : `Pay ₱${amount.toLocaleString('en-PH')}`}</span>
        </button>
        {isSubmitting && <p className="payment-progress" role="status">Please wait while Stripe securely processes your payment. Do not close this page.</p>}
      </div>
    </form>
  )
}

export default function DonationPayment({ clientSecret, amount, onStatus }: DonationPaymentProps) {
  if (!stripePromise) return null

  return (
    <section className="payment-panel" aria-label="Secure donation checkout">
      <p className="eyebrow">Secure checkout</p>
      <h3>Input your Payment Information</h3>
      <p className="payment-method-note">     </p>
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
        }}
      >
        <PaymentForm amount={amount} onStatus={onStatus} />
      </Elements>
    </section>
  )
}
