import 'dotenv/config'
import express from 'express'
import rateLimit from 'express-rate-limit'
import Stripe from 'stripe'

const app = express()
const port = Number(process.env.API_PORT) || 4242
const paymentMethodConfiguration = process.env.STRIPE_PAYMENT_METHOD_CONFIGURATION
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null

app.disable('x-powered-by')
app.use(express.json({ limit: '10kb' }))

const paymentIntentLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
})

app.post('/api/create-payment-intent', paymentIntentLimiter, async (request, response) => {
  const amountInPesos = Number(request.body?.amount)
  if (!Number.isSafeInteger(amountInPesos) || amountInPesos < 100 || amountInPesos > 1_000_000) {
    return response.status(400).json({ error: 'Enter a whole-peso amount between ₱100 and ₱1,000,000.' })
  }

  if (!stripe) {
    return response.status(503).json({ error: 'Online payments are not configured. Add Stripe test keys to the server environment.' })
  }

  try {
    const intent = await stripe.paymentIntents.create({
      amount: amountInPesos * 100,
      currency: 'php',
      ...(paymentMethodConfiguration && {
        payment_method_configuration: paymentMethodConfiguration,
      }),
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'always',
      },
      description: 'One-time donation to the Oksyo community feeding program',
      metadata: { program: 'oksyo-community-feeding' },
    })

    if (!intent.client_secret) {
      return response.status(502).json({ error: 'Stripe could not start this payment. Please try again.' })
    }

    return response.json({ clientSecret: intent.client_secret })
  } catch (error) {
    console.error('Unable to create Stripe PaymentIntent:', error instanceof Error ? error.message : 'Unknown error')
    return response.status(502).json({ error: 'Unable to start payment. Please try again.' })
  }
})

app.listen(port, () => {
  console.log(`Oksyo payment API listening on http://localhost:${port}`)
})
