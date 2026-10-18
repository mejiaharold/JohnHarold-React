import { useEffect, useState } from 'react'
import DonationPayment from '../components/DonationPayment'
import { getReturnedPaymentStatus, stripePaymentsReady, type PaymentStatus } from '../lib/stripe'

const amountFromSession = () => {
  const amount = Number(sessionStorage.getItem('oksyo-donation-amount'))
  return Number.isSafeInteger(amount) && amount >= 100 && amount <= 1_000_000 ? amount : null
}

export default function PaymentPage() {
  const [amount] = useState(amountFromSession)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null)

  useEffect(() => {
    let isMounted = true
    const returnedFromStripe = new URLSearchParams(window.location.search).has('payment_intent_client_secret')

    async function prepareCheckout() {
      if (!amount) {
        setErrorMessage('Choose a donation amount before opening checkout.')
        setIsLoading(false)
        return
      }

      if (!stripePaymentsReady) {
        setErrorMessage('Online payments are not configured. Add Stripe test keys to the local environment.')
        setIsLoading(false)
        return
      }

      try {
        if (returnedFromStripe) {
          const status = await getReturnedPaymentStatus()
          if (isMounted && status) setPaymentStatus(status)
          window.history.replaceState({}, document.title, `${window.location.pathname}#payment`)
          return
        }

        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount }),
        })
        const result = await response.json() as { clientSecret?: string; error?: string }
        if (!response.ok || !result.clientSecret) {
          throw new Error(result.error || 'Unable to start checkout. Please try again.')
        }
        if (isMounted) setClientSecret(result.clientSecret)
      } catch (error) {
        if (isMounted) setErrorMessage(error instanceof Error ? error.message : 'Unable to start checkout. Please try again.')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    void prepareCheckout()
    return () => { isMounted = false }
  }, [amount])

  return (
    <section className="checkout-page">
      <div className="checkout-topline">
        <a className="checkout-back" href="#donate"><span aria-hidden="true">←</span> Back to donation</a>
        <span className="checkout-secure-label">Secure checkout by Stripe</span>
      </div>
      <header className="checkout-heading">
        <p className="eyebrow">Your contribution</p>
        <h1>Complete your gift.</h1>
        <p>Your payment details are entered directly into Stripe's secure payment form.</p>
      </header>
      <div className="checkout-layout">
        <aside className="checkout-summary">
          <p className="eyebrow">One-time donation</p>
          <p className="checkout-amount">{amount === null ? '—' : `₱${amount.toLocaleString('en-PH')}`}</p>
          <p className="checkout-summary-copy">Your contribution supports nourishing food and practical meal support for children and families.</p>
          <div className="checkout-summary-rule" />
          <p className="checkout-summary-note">Oksyo does not receive or store your card details.</p>
        </aside>
        <section className="checkout-card" aria-label="Payment details">
          {isLoading && <p className="checkout-loading" role="status">Preparing secure payment options...</p>}
          {errorMessage && <p className="payment-error" role="alert">{errorMessage}</p>}
          {paymentStatus === 'succeeded' && (
            <div className="checkout-result payment-success" role="status">
              <h2>Thank you for your donation.</h2>
              <p>Stripe confirmed your payment. Your support helps bring nourishing food to local families.</p>
              <a className="button button-primary" href="#home">Return home</a>
            </div>
          )}
          {paymentStatus === 'processing' && (
            <div className="checkout-result" role="status">
              <h2>Your payment is processing.</h2>
              <p>Some wallet payments take a little time to confirm. Please avoid submitting the payment again.</p>
              <a className="text-link" href="#home">Return home</a>
            </div>
          )}
          {paymentStatus === 'failed' && <p className="payment-error" role="alert">The payment was not completed. Return to donations to try again.</p>}
          {!isLoading && !errorMessage && !paymentStatus && clientSecret && amount !== null && (
            <DonationPayment clientSecret={clientSecret} amount={amount} onStatus={setPaymentStatus} />
          )}
          {(!amount || paymentStatus === 'failed') && (
            <a className="button button-primary checkout-return" href="#donate">Choose donation amount</a>
          )}
        </section>
      </div>
    </section>
  )
}
