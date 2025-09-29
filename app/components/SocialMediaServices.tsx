'use client'

import { useState } from 'react'
import { Users, ShoppingCart } from 'lucide-react'
import PaymentModal from './PaymentModal'

const SocialMediaServices = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean
    item: any
  }>({
    isOpen: false,
    item: null
  })

  const services = [
    {
      platform: 'Instagram',
      // Instagram gradient colors
      color: 'from-[#833AB4] via-[#E1306C] to-[#FD1D1D]',
      bgColor: 'from-[#833AB4]/10 to-[#FD1D1D]/10',
      packages: [
        { amount: '5.000 Follower', price: 14.99 },
        { amount: '10.000 Follower', price: 27.99 },
        { amount: '25.000 Follower', price: 54.99 },
      ],
      featured: true,
    },
    {
      platform: 'Facebook',
      // Facebook blue
      color: 'from-[#1877F2] to-[#0C63D4]',
      bgColor: 'from-[#1877F2]/10 to-[#0C63D4]/10',
      packages: [
        { amount: '5.000 Follower', price: 14.99 },
        { amount: '10.000 Follower', price: 27.99 },
        { amount: '25.000 Follower', price: 54.99 },
      ],
      featured: false,
    },
    {
      platform: 'TikTok',
      // TikTok colors
      color: 'from-[#00F2EA] via-[#FF0050] to-[#000000]',
      bgColor: 'from-[#00F2EA]/10 to-[#FF0050]/10',
      packages: [
        { amount: '5.000 Follower', price: 14.99 },
        { amount: '10.000 Follower', price: 27.99 },
        { amount: '25.000 Follower', price: 54.99 },
      ],
      featured: true,
    },
    {
      platform: 'Kick',
      // Kick green
      color: 'from-[#53FC18] to-[#3FBD11]',
      bgColor: 'from-[#53FC18]/10 to-[#3FBD11]/10',
      packages: [
        { amount: '5.000 Follower', price: 14.99 },
        { amount: '10.000 Follower', price: 27.99 },
        { amount: '25.000 Follower', price: 54.99 },
      ],
      featured: false,
    },
    {
      platform: 'Twitch',
      // Twitch purple
      color: 'from-[#9146FF] to-[#772CE8]',
      bgColor: 'from-[#9146FF]/10 to-[#772CE8]/10',
      packages: [
        { amount: '5.000 Follower', price: 14.99 },
        { amount: '10.000 Follower', price: 27.99 },
        { amount: '25.000 Follower', price: 54.99 },
      ],
      featured: false,
    },
    {
      platform: 'Telegram',
      // Telegram blue
      color: 'from-[#0088CC] to-[#006BA6]',
      bgColor: 'from-[#0088CC]/10 to-[#006BA6]/10',
      packages: [
        { amount: '5.000 Member', price: 7.99 },
        { amount: '10.000 Member', price: 12.99 },
        { amount: '25.000 Member', price: 24.99 },
      ],
      featured: false,
    },
  ]

  const handlePurchase = (platform: string, pkg: any) => {
    setPaymentModal({
      isOpen: true,
      item: {
        name: `${platform} - ${pkg.amount}`,
        description: `${pkg.amount} für ${platform}`,
        price: pkg.price,
        platform: platform,
        service: pkg.amount
      }
    })
  }

  // Platform logos as SVG
  const platformLogos: Record<string, JSX.Element> = {
    Instagram: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="url(#instagram-gradient)">
        <defs>
          <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#833AB4" />
            <stop offset="50%" stopColor="#E1306C" />
            <stop offset="100%" stopColor="#FD1D1D" />
          </linearGradient>
        </defs>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    Facebook: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    TikTok: (
      <svg viewBox="0 0 24 24" className="w-12 h-12">
        <defs>
          <linearGradient id="tiktok-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F2EA" />
            <stop offset="100%" stopColor="#FF0050" />
          </linearGradient>
        </defs>
        <path fill="url(#tiktok-gradient)" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
    Kick: (
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#53FC18] to-[#3FBD11] flex items-center justify-center text-white font-bold text-2xl">
        K
      </div>
    ),
    Twitch: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#9146FF">
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
      </svg>
    ),
    Telegram: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#0088CC">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  }

  return (
    <section id="social-media" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Social Media Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Steigere deine Reichweite und dein Engagement auf allen wichtigen Plattformen. 
            Schnell, sicher und diskret – für maximalen Erfolg in den sozialen Medien.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((platform, index) => (
            <div
              key={platform.platform}
              className={`relative service-card group ${
                platform.featured ? 'lg:scale-105 ring-2 ring-[#ed07f6]/20' : ''
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Featured Badge */}
              {platform.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#ed07f6] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10">
                  ⭐ Beliebt
                </div>
              )}

              {/* Platform Header */}
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${platform.bgColor} p-3 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {platformLogos[platform.platform]}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{platform.platform}</h3>
              </div>

              {/* Packages List */}
              <div className="space-y-3 mb-8">
                {platform.packages.map((pkg, pkgIndex) => (
                  <div
                    key={pkgIndex}
                    className={`bg-gradient-to-r ${platform.bgColor} hover:shadow-md rounded-xl p-4 transition-all duration-200 border border-gray-100 ${
                      hoveredCard === index ? 'transform translate-x-2' : ''
                    }`}
                    style={{ transitionDelay: `${pkgIndex * 50}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-[#8924e9]" />
                        <span className="font-semibold text-gray-900">{pkg.amount}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-[#8924e9]">{pkg.price.toFixed(2)}€</span>
                        <button
                          onClick={() => handlePurchase(platform.platform, pkg)}
                          className="bg-[#ed07f6] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#d406db] transition-all duration-200 hover:scale-105 flex items-center space-x-1 shadow-md hover:shadow-lg"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Kaufen</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Info */}
              <div className={`bg-gradient-to-r ${platform.bgColor} rounded-lg p-3 text-center border border-gray-100`}>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-[#8924e9]">✓</span> Sofortige Lieferung · 
                  <span className="font-semibold text-[#8924e9]"> ✓</span> 100% Sicher · 
                  <span className="font-semibold text-[#8924e9]"> ✓</span> 24/7 Support
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center items-center gap-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">Sofortige Lieferung</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">100% Sicher</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#ed07f6] rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">Geld-zurück-Garantie</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ isOpen: false, item: null })}
        item={paymentModal.item}
      />
    </section>
  )
}

export default SocialMediaServices