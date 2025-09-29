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