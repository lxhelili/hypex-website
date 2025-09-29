import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import PayPalProvider from './components/PayPalProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hypex - Dein Partner für Reichweite, Abos & Google Sichtbarkeit',
  description: 'Follower & Likes für Instagram, TikTok, Twitch & mehr. Premium-Abos für 12 Monate. Google Maps Bewertungen & Knowledge Panels für Business & Privat.',
  keywords: 'Instagram Follower, TikTok Likes, Twitch Abos, Social Media Marketing, Google Maps Bewertungen, Premium Abos, Spotify, Netflix',
  authors: [{ name: 'Hypex Team' }],
  creator: 'Hypex',
  publisher: 'Hypex',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://hypex.de',
    title: 'Hypex - Dein Partner für Reichweite, Abos & Google Sichtbarkeit',
    description: 'Follower & Likes für Instagram, TikTok, Twitch & mehr. Premium-Abos für 12 Monate. Google Maps Bewertungen & Knowledge Panels.',
    siteName: 'Hypex',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hypex - Social Media Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hypex - Dein Partner für Reichweite, Abos & Google Sichtbarkeit',
    description: 'Follower & Likes für Instagram, TikTok, Twitch & mehr. Premium-Abos für 12 Monate.',
    images: ['/og-image.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#667eea" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <PayPalProvider>
          {children}
        </PayPalProvider>
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}