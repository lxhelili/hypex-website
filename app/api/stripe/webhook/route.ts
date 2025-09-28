import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        
        // Handle successful payment
        console.log('Payment successful:', {
          sessionId: session.id,
          customerEmail: session.customer_email,
          amountTotal: session.amount_total,
          metadata: session.metadata,
        })

        // Here you would typically:
        // 1. Send confirmation email to customer
        // 2. Fulfill the order (deliver social media services, activate subscriptions, etc.)
        // 3. Update your database
        // 4. Send notification to your team

        // Example: Send to your order fulfillment system
        await fulfillOrder(session)
        break

      case 'payment_intent.payment_failed':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment failed:', paymentIntent.id)
        
        // Handle failed payment
        // Send notification email, update database, etc.
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
}

async function fulfillOrder(session: Stripe.Checkout.Session) {
  try {
    // Example order fulfillment logic
    const orderData = {
      sessionId: session.id,
      customerEmail: session.customer_email,
      amount: session.amount_total,
      currency: session.currency,
      metadata: session.metadata,
      customerDetails: session.customer_details,
      timestamp: new Date().toISOString(),
    }

    console.log('Order fulfilled:', orderData)
    
  } catch (error) {
    console.error('Order fulfillment error:', error)
  }
}