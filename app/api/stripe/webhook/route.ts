import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    console.log('Payment successful:', session.id)

    // Save order to Supabase
    try {
      const { data, error } = await supabaseAdmin.from('orders').insert({
        order_id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        customer_email: session.customer_email || 'unknown@example.com',
        customer_name: session.customer_details?.name || null,
        product_name: session.metadata?.product_name || 'Unknown Product',
        product_type: session.metadata?.product_type || 'social_media',
        amount: (session.amount_total || 0) / 100,
        currency: (session.currency || 'eur').toUpperCase(),
        status: 'completed',
        payment_method: 'stripe',
        payment_intent_id: session.payment_intent as string,
        metadata: session.metadata || {}
      })

      if (error) {
        console.error('Error saving order to database:', error)
      } else {
        console.log('Order saved successfully:', data)
        
        // TODO: Send confirmation email to customer
        // TODO: Fulfill the order (deliver service)
        // TODO: Send notification to admin
      }
    } catch (dbError) {
      console.error('Database error:', dbError)
    }
  }

  // Handle payment_intent.payment_failed event
  if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    console.log('Payment failed:', paymentIntent.id)
    
    // TODO: Log failed payment
    // TODO: Notify customer about failed payment
  }

  return NextResponse.json({ received: true })
}