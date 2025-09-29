import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { items, customerEmail } = await request.json()
    
    const totalAmount = items.reduce((sum: number, item: any) => 
      sum + (item.price * (item.quantity || 1)), 0
    ).toFixed(2)

    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: `order_${Date.now()}`,
        amount: {
          currency_code: 'EUR',
          value: totalAmount,
          breakdown: {
            item_total: {
              currency_code: 'EUR',
              value: totalAmount
            }
          }
        },
        items: items.map((item: any) => ({
          name: item.name,
          description: item.description,
          unit_amount: {
            currency_code: 'EUR',
            value: item.price.toFixed(2)
          },
          quantity: item.quantity || 1,
          category: 'DIGITAL_GOODS'
        }))
      }],
      payer: {
        email_address: customerEmail
      }
    }

    const accessToken = await getPayPalAccessToken()
    
    const response = await fetch(`${getPayPalBaseURL()}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderData)
    })

    const order = await response.json()
    return NextResponse.json({ orderID: order.id })
    
  } catch (error) {
    console.error('PayPal order creation failed:', error)
    return NextResponse.json(
      { error: 'Failed to create PayPal order' },
      { status: 500 }
    )
  }
}

async function getPayPalAccessToken() {
  const response = await fetch(`${getPayPalBaseURL()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-Language': 'en_US',
      'Authorization': `Basic ${Buffer.from(
        `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    body: 'grant_type=client_credentials'
  })

  const data = await response.json()
  return data.access_token
}

function getPayPalBaseURL() {
  return process.env.NODE_ENV === 'production'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com'
}