import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
})

export async function POST(request: NextRequest) {
  try {
    const { items, customerEmail, metadata } = await request.json()

    // Determine the base URL for redirects
    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'

    // Validate items
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Keine Artikel im Warenkorb' },
        { status: 400 }
      )
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'sepa_debit'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            description: item.description || '',
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity || 1,
      })),
      mode: 'payment',
      customer_email: customerEmail || undefined,
      metadata: {
        ...metadata,
        product_name: items[0]?.name || 'Unknown Product',
        product_type: metadata?.platform || 'social_media',
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/#preise`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    })

    return NextResponse.json({ 
      sessionId: session.id, 
      url: session.url 
    })
  } catch (error: any) {
    console.error('Stripe checkout session creation failed:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: error.message 
      },
      { status: 500 }
    )
  }
}