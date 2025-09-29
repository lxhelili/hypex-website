# 💳 Complete Stripe & PayPal Integration Guide

## 🚀 Overview

This guide will walk you through fully integrating both Stripe and PayPal payment systems into your Hypex landing page for maximum conversion and payment flexibility.

## 📋 Table of Contents

1. [Stripe Integration](#stripe-integration)
2. [PayPal Integration](#paypal-integration)
3. [Enhanced Payment Component](#enhanced-payment-component)
4. [Webhook Configuration](#webhook-configuration)
5. [Testing & Validation](#testing--validation)
6. [Production Deployment](#production-deployment)

---

## 🔵 Stripe Integration

### Step 1: Stripe Account Setup

1. **Create Stripe Account**
   ```
   Visit: https://dashboard.stripe.com/register
   Complete business verification
   ```

2. **Get API Keys**
   ```
   Dashboard → Developers → API Keys
   Copy: Publishable Key & Secret Key
   ```

3. **Update Environment Variables**
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
   STRIPE_SECRET_KEY=sk_test_51...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### Step 2: Enhanced Stripe Checkout API

The checkout API is already configured in `/app/api/stripe/checkout/route.ts`. Here's what it supports:

**Features:**
- Multiple payment methods (Cards, SEPA, etc.)
- Custom metadata for order tracking
- Automatic tax calculation
- Promotion codes
- Customer information collection

**Usage Example:**
```typescript
const session = await createCheckoutSession({
  items: [{
    name: 'Instagram Follower - 1K',
    description: '1000 echte Instagram Follower',
    price: 9.99,
    quantity: 1
  }],
  customerEmail: 'user@example.com',
  metadata: {
    platform: 'Instagram',
    service: 'Follower',
    type: 'social_media'
  }
})
```

### Step 3: Webhook Configuration

1. **Create Webhook Endpoint**
   ```
   Dashboard → Developers → Webhooks
   Endpoint URL: https://your-domain.com/api/stripe/webhook
   ```

2. **Select Events**
   ```
   ✅ checkout.session.completed
   ✅ payment_intent.succeeded
   ✅ payment_intent.payment_failed
   ✅ invoice.payment_succeeded
   ```

3. **Get Webhook Secret**
   ```
   Copy the webhook signing secret
   Add to STRIPE_WEBHOOK_SECRET in .env.local
   ```

---

## 🟡 PayPal Integration

### Step 1: PayPal Developer Setup

1. **Create PayPal Developer Account**
   ```
   Visit: https://developer.paypal.com
   Create app in sandbox/live environment
   ```

2. **Get Client Credentials**
   ```
   Copy: Client ID & Client Secret
   Add to environment variables
   ```

### Step 2: Install PayPal SDK

```bash
npm install @paypal/react-paypal-js
```

### Step 3: PayPal Provider Setup

Create PayPal wrapper component:

```typescript
// app/components/PayPalProvider.tsx
'use client'

import { PayPalScriptProvider } from '@paypal/react-paypal-js'

interface PayPalProviderProps {
  children: React.ReactNode
}

export default function PayPalProvider({ children }: PayPalProviderProps) {
  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: 'EUR',
    intent: 'capture',
    components: 'buttons,funding-eligibility'
  }

  return (
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  )
}
```

### Step 4: PayPal API Routes

Create PayPal order creation and capture endpoints:

```typescript
// app/api/paypal/create-order/route.ts
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
```

```typescript
// app/api/paypal/capture-order/route.ts
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
  // Implement order fulfillment logic
  console.log('PayPal order fulfilled:', captureData)
}

// ... helper functions from create-order route
```

---

## 🎯 Enhanced Payment Component

Create a unified payment component that supports both Stripe and PayPal:

```typescript
// app/components/PaymentModal.tsx
'use client'

import { useState } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { createCheckoutSession, redirectToCheckout } from '../lib/stripe'
import { X, CreditCard, Shield } from 'lucide-react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  item: {
    name: string
    description: string
    price: number
    platform: string
    service: string
  }
}

export default function PaymentModal({ isOpen, onClose, item }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe')
  const [loading, setLoading] = useState(false)
  const [customerEmail, setCustomerEmail] = useState('')

  const handleStripePayment = async () => {
    if (!customerEmail) {
      alert('Bitte gib deine E-Mail-Adresse ein')
      return
    }

    setLoading(true)
    try {
      const session = await createCheckoutSession({
        items: [item],
        customerEmail,
        metadata: {
          platform: item.platform,
          service: item.service,
          type: 'social_media'
        }
      })

      await redirectToCheckout(session.sessionId)
    } catch (error) {
      console.error('Stripe payment failed:', error)
      alert('Zahlung fehlgeschlagen. Bitte versuche es erneut.')
    } finally {
      setLoading(false)
    }
  }

  const createPayPalOrder = async () => {
    try {
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [item],
          customerEmail
        })
      })

      const data = await response.json()
      return data.orderID
    } catch (error) {
      console.error('PayPal order creation failed:', error)
      throw error
    }
  }

  const capturePayPalOrder = async (orderID: string) => {
    try {
      const response = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderID })
      })

      const captureData = await response.json()
      
      if (captureData.status === 'COMPLETED') {
        // Redirect to success page
        window.location.href = `/success?payment=paypal&order=${orderID}`
      }
    } catch (error) {
      console.error('PayPal capture failed:', error)
      alert('Zahlung fehlgeschlagen. Bitte versuche es erneut.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bestellung abschließen</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
            <p className="text-2xl font-bold text-primary-600 mt-2">{item.price.toFixed(2)}€</p>
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            E-Mail-Adresse *
          </label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="deine@email.de"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Zahlungsmethode wählen
          </label>
          
          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod('stripe')}
              className={`w-full p-4 border-2 rounded-lg transition-all duration-200 ${
                paymentMethod === 'stripe'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6 text-primary-600" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Kreditkarte / SEPA</div>
                  <div className="text-sm text-gray-600">Sicher mit Stripe</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('paypal')}
              className={`w-full p-4 border-2 rounded-lg transition-all duration-200 ${
                paymentMethod === 'paypal'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
                  P
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">PayPal</div>
                  <div className="text-sm text-gray-600">Schnell und sicher</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Payment Buttons */}
        <div className="space-y-4">
          {paymentMethod === 'stripe' && (
            <button
              onClick={handleStripePayment}
              disabled={loading || !customerEmail}
              className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 rounded-lg font-semibold transition-all duration-300 hover:from-primary-700 hover:to-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Wird weitergeleitet...' : `${item.price.toFixed(2)}€ mit Stripe bezahlen`}
            </button>
          )}

          {paymentMethod === 'paypal' && customerEmail && (
            <div className="paypal-buttons-container">
              <PayPalButtons
                style={{
                  layout: 'vertical',
                  color: 'blue',
                  shape: 'rect',
                  label: 'pay'
                }}
                createOrder={createPayPalOrder}
                onApprove={async (data) => {
                  await capturePayPalOrder(data.orderID)
                }}
                onError={(error) => {
                  console.error('PayPal error:', error)
                  alert('PayPal Zahlung fehlgeschlagen')
                }}
              />
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="mt-6 flex items-center space-x-2 text-sm text-gray-600">
          <Shield className="w-4 h-4" />
          <span>SSL-verschlüsselt und DSGVO-konform</span>
        </div>
      </div>
    </div>
  )
}
```

---

## 🔧 Integration into Existing Components

Update the SocialMediaServices component to use the new payment modal:

```typescript
// Update SocialMediaServices.tsx
import PaymentModal from './PaymentModal'

// Add state for payment modal
const [paymentModal, setPaymentModal] = useState<{
  isOpen: boolean
  item: any
}>({
  isOpen: false,
  item: null
})

// Update handlePurchase function
const handlePurchase = (platform: string, service: any) => {
  setPaymentModal({
    isOpen: true,
    item: {
      name: `${platform} ${service.name}`,
      description: service.description,
      price: service.priceNum,
      platform: platform,
      service: service.name
    }
  })
}

// Add modal to component JSX
return (
  <section>
    {/* ... existing JSX ... */}
    
    <PaymentModal
      isOpen={paymentModal.isOpen}
      onClose={() => setPaymentModal({ isOpen: false, item: null })}
      item={paymentModal.item}
    />
  </section>
)
```

---

## 🎯 Testing & Validation

### Stripe Test Cards
```
Successful Payment: 4242 4242 4242 4242
Declined Payment: 4000 0000 0000 0002
3D Secure: 4000 0027 6000 3184
```

### PayPal Sandbox
```
Use PayPal sandbox accounts for testing
Create test buyer and seller accounts
```

### Testing Checklist
- [ ] Stripe payment flow
- [ ] PayPal payment flow  
- [ ] Webhook handling
- [ ] Email confirmations
- [ ] Error handling
- [ ] Mobile responsiveness

---

## 🚀 Production Deployment

### Final Steps

1. **Switch to Live Keys**
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=live_client_id
   ```

2. **Configure Live Webhooks**
   ```
   Update webhook URLs to production domain
   Test webhook delivery
   ```

3. **Enable PayPal Live Mode**
   ```
   Switch PayPal app to live environment
   Update API endpoints
   ```

4. **Test Everything**
   ```
   Complete test transactions
   Verify order fulfillment
   Check email notifications
   ```

---

## 📊 Success Metrics

Track these KPIs after integration:

- **Conversion Rate**: % of visitors who complete purchase
- **Payment Success Rate**: % of initiated payments that complete
- **Payment Method Preference**: Stripe vs PayPal usage
- **Average Order Value**: Revenue per transaction
- **Cart Abandonment Rate**: % who start but don't complete

---

This comprehensive integration gives your customers maximum payment flexibility while ensuring secure, reliable transactions through both Stripe and PayPal platforms.