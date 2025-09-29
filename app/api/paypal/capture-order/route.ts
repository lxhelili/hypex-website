import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { orderID } = await request.json()
    
    const accessToken = await getPayPalAccessToken()
    
    const response = await fetch(
      `${getPayPalBaseURL()}/v2/checkout/orders/${orderID}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        }
      }
    )

    const captureData = await response.json()
    
    // Process successful payment
    if (captureData.status === 'COMPLETED') {
      await fulfillOrder(captureData)
    }
    
    return NextResponse.json(captureData)
    
  } catch (error) {
    console.error('PayPal capture failed:', error)
    return NextResponse.json(
      { error: 'Failed to capture PayPal order' },
      { status: 500 }
    )
  }
}

async function fulfillOrder(captureData: any) {
  try {
    // Example order fulfillment logic
    const orderData = {
      orderID: captureData.id,
      status: captureData.status,
      payerEmail: captureData.payer?.email_address,
      amount: captureData.purchase_units[0]?.payments?.captures[0]?.amount,
      timestamp: new Date().toISOString(),
    }

    console.log('PayPal order fulfilled:', orderData)
    
    // Here you would typically:
    // 1. Send confirmation email to customer
    // 2. Fulfill the order (deliver social media services, activate subscriptions, etc.)
    // 3. Update your database
    // 4. Send notification to your team
    
  } catch (error) {
    console.error('Order fulfillment error:', error)
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