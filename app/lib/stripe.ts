import { loadStripe } from '@stripe/stripe-js'

let stripePromise: Promise<any>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

export interface CheckoutItem {
  name: string
  description: string
  price: number
  quantity?: number
  images?: string[]
}

export interface CheckoutSession {
  items: CheckoutItem[]
  customerEmail?: string
  metadata?: Record<string, string>
  paymentMethod?: 'stripe' | 'paypal'
}

// Create Stripe checkout session
export async function createStripeCheckoutSession(session: CheckoutSession) {
  try {
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    })

    if (!response.ok) {
      throw new Error('Failed to create checkout session')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

// Create PayPal order
export async function createPayPalOrder(session: CheckoutSession) {
  try {
    const response = await fetch('/api/paypal/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    })

    if (!response.ok) {
      throw new Error('Failed to create PayPal order')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating PayPal order:', error)
    throw error
  }
}

// Redirect to Stripe checkout
export async function redirectToStripeCheckout(sessionId: string) {
  try {
    const stripe = await getStripe()
    
    if (!stripe) {
      throw new Error('Stripe failed to load')
    }

    const { error } = await stripe.redirectToCheckout({ sessionId })
    
    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error)
    throw error
  }
}

// Backward compatibility alias
export const redirectToCheckout = redirectToStripeCheckout

// Universal checkout function that handles both Stripe and PayPal
export async function createCheckoutSession(session: CheckoutSession) {
  if (session.paymentMethod === 'paypal') {
    return createPayPalOrder(session)
  } else {
    return createStripeCheckoutSession(session)
  }
}

// Predefined products for easy checkout
export const PRODUCTS = {
  INSTAGRAM_FOLLOWERS_1K: {
    name: 'Instagram Follower - 1.000',
    description: 'Erhalte 1.000 echte Instagram Follower innerhalb von 30 Minuten',
    price: 9.99,
    images: ['/images/instagram-followers.jpg'],
  },
  INSTAGRAM_FOLLOWERS_5K: {
    name: 'Instagram Follower - 5.000',
    description: 'Erhalte 5.000 echte Instagram Follower innerhalb von 60 Minuten',
    price: 39.99,
    images: ['/images/instagram-followers.jpg'],
  },
  INSTAGRAM_LIKES_1K: {
    name: 'Instagram Likes - 1.000',
    description: '1.000 Instagram Likes für deine Posts',
    price: 4.99,
    images: ['/images/instagram-likes.jpg'],
  },
  TIKTOK_FOLLOWERS_1K: {
    name: 'TikTok Follower - 1.000',
    description: 'Erhalte 1.000 echte TikTok Follower',
    price: 12.99,
    images: ['/images/tiktok-followers.jpg'],
  },
  TIKTOK_LIKES_1K: {
    name: 'TikTok Likes - 1.000',
    description: '1.000 TikTok Likes für deine Videos',
    price: 5.99,
    images: ['/images/tiktok-likes.jpg'],
  },
  SPOTIFY_PREMIUM_12M: {
    name: 'Spotify Premium - 12 Monate',
    description: 'Spotify Premium Account für 12 Monate - Upgrade oder neuer Account',
    price: 29.99,
    images: ['/images/spotify-premium.jpg'],
  },
  YOUTUBE_PREMIUM_12M: {
    name: 'YouTube Premium - 12 Monate',
    description: 'YouTube Premium Account für 12 Monate',
    price: 39.99,
    images: ['/images/youtube-premium.jpg'],
  },
  GOOGLE_MAPS_REVIEWS_10: {
    name: 'Google Maps Bewertungen - 10 Stück',
    description: '10 authentische 5-Sterne Google Maps Bewertungen für dein Business',
    price: 49.99,
    images: ['/images/google-maps-reviews.jpg'],
  },
  GOOGLE_KNOWLEDGE_PANEL_BUSINESS: {
    name: 'Google Knowledge Panel - Business',
    description: 'Professionelles Google Knowledge Panel für dein Unternehmen',
    price: 299.99,
    images: ['/images/google-knowledge-panel.jpg'],
  },
  GOOGLE_KNOWLEDGE_PANEL_PERSONAL: {
    name: 'Google Knowledge Panel - Personal',
    description: 'Professionelles Google Knowledge Panel für Privatpersonen',
    price: 199.99,
    images: ['/images/google-knowledge-panel.jpg'],
  }
} as const

export type ProductKey = keyof typeof PRODUCTS

// Service categories for easy filtering
export const SERVICE_CATEGORIES = {
  SOCIAL_MEDIA: 'social_media',
  SUBSCRIPTIONS: 'subscriptions',
  GOOGLE_SERVICES: 'google_services'
} as const

// Payment method types
export const PAYMENT_METHODS = {
  STRIPE: 'stripe',
  PAYPAL: 'paypal'
} as const