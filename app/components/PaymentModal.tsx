'use client'

import { useState } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { createCheckoutSession, redirectToCheckout } from '../lib/stripe'
import { X, CreditCard, Shield, Loader } from 'lucide-react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  item: {
    name: string
    description: string
    price: number
    platform: string
    service: string
  } | null
}

export default function PaymentModal({ isOpen, onClose, item }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe')
  const [loading, setLoading] = useState(false)
  const [customerEmail, setCustomerEmail] = useState('')

  if (!isOpen || !item) return null

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
        },
        paymentMethod: 'stripe'
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
    if (!customerEmail) {
      alert('Bitte gib deine E-Mail-Adresse ein')
      return Promise.reject('Email required')
    }

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
      if (data.error) {
        throw new Error(data.error)
      }
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
      } else {
        throw new Error('Payment not completed')
      }
    } catch (error) {
      console.error('PayPal capture failed:', error)
      alert('Zahlung fehlgeschlagen. Bitte versuche es erneut.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
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
              className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 rounded-lg font-semibold transition-all duration-300 hover:from-primary-700 hover:to-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading && <Loader className="w-5 h-5 animate-spin" />}
              <span>
                {loading ? 'Wird weitergeleitet...' : `${item.price.toFixed(2)}€ mit Stripe bezahlen`}
              </span>
            </button>
          )}

          {paymentMethod === 'paypal' && customerEmail && (
            <div className="paypal-buttons-container">
              <PayPalButtons
                style={{
                  layout: 'vertical',
                  color: 'blue',
                  shape: 'rect',
                  label: 'pay',
                  height: 50
                }}
                createOrder={createPayPalOrder}
                onApprove={async (data) => {
                  await capturePayPalOrder(data.orderID)
                }}
                onError={(error) => {
                  console.error('PayPal error:', error)
                  alert('PayPal Zahlung fehlgeschlagen')
                }}
                onCancel={() => {
                  console.log('PayPal payment cancelled')
                }}
              />
            </div>
          )}

          {paymentMethod === 'paypal' && !customerEmail && (
            <div className="text-center py-4 text-gray-500">
              Bitte gib deine E-Mail-Adresse ein, um mit PayPal zu bezahlen
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="mt-6 flex items-center space-x-2 text-sm text-gray-600">
          <Shield className="w-4 h-4" />
          <span>SSL-verschlüsselt und DSGVO-konform</span>
        </div>

        {/* Trust Indicators */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-gray-500">
          <div className="text-center">
            <div className="font-semibold">✓ Sofortige Lieferung</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">✓ 24/7 Support</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">✓ 100% Sicher</div>
          </div>
        </div>
      </div>
    </div>
  )
}