'use client'

import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import PaymentModal from './PaymentModal'

const AboServices = () => {
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean
    item: any
  }>({
    isOpen: false,
    item: null
  })

  const subscriptions = [
    {
      name: 'Spotify Premium',
      duration: '12 Monate',
      price: 39.99,
      originalPrice: 119.88,
      color: 'from-[#1DB954] to-[#1ed760]',
      bgColor: 'from-[#1DB954]/10 to-[#1ed760]/10',
      features: [
        'Werbefrei streamen',
        'Offline-Modus',
        'Höchste Audioqualität',
        'Unbegrenzte Skips'
      ],
      badge: 'Bestseller',
      logo: (
        <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#1DB954">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      )
    },
    {
      name: 'Disney Plus',
      type: 'Shared Profil',
      duration: '12 Monate',
      price: 29.99,
      originalPrice: 89.99,
      color: 'from-[#0063e5] to-[#0483ee]',
      bgColor: 'from-[#0063e5]/10 to-[#0483ee]/10',
      features: [
        '4K Ultra HD',
        'Bis zu 4 Geräte gleichzeitig',
        'Disney, Marvel & Star Wars',
        'Shared Account'
      ],
      badge: 'Beliebt',
      logo: (
        <div className="flex items-center justify-center space-x-1">
          <span className="text-2xl font-bold text-[#0063e5]" style={{ fontFamily: 'Arial, sans-serif' }}>
            Disney
          </span>
          <span className="text-3xl font-bold text-[#0063e5]">+</span>
        </div>
      )
    },
    {
      name: 'Crunchyroll',
      type: 'Mega Fan',
      duration: '12 Monate',
      price: 32.99,
      originalPrice: 99.99,
      color: 'from-[#F47521] to-[#f68838]',
      bgColor: 'from-[#F47521]/10 to-[#f68838]/10',
      features: [
        'Mega Fan Tier',
        'Offline-Viewing',
        'Simulcast Anime',
        'Werbefrei'
      ],
      logo: (
        <div className="w-10 h-10 rounded-lg bg-[#F47521] flex items-center justify-center text-white font-bold text-xl">
          CR
        </div>
      )
    },
    {
      name: 'YouTube Premium',
      duration: '12 Monate',
      price: 42.99,
      originalPrice: 143.88,
      color: 'from-[#FF0000] to-[#cc0000]',
      bgColor: 'from-[#FF0000]/10 to-[#cc0000]/10',
      features: [
        'YouTube & Music Premium',
        'Werbefrei auf allen Geräten',
        'Hintergrund-Wiedergabe',
        'Offline-Downloads'
      ],
      badge: 'Premium',
      logo: (
        <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#FF0000">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ]

  const handlePurchase = (subscription: any) => {
    setPaymentModal({
      isOpen: true,
      item: {
        name: `${subscription.name}${subscription.type ? ` ${subscription.type}` : ''} - ${subscription.duration}`,
        description: subscription.features.join(' · '),
        price: subscription.price,
        platform: 'Subscription',
        service: subscription.name
      }
    })
  }

  return (
    <section id="abo-services" className="section-padding bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Premium Abos - 12 Monate</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Spare bis zu <span className="font-bold text-[#ed07f6]">70%</span> bei Premium-Abonnements! 
            Sofortige Lieferung und voller Zugriff für 12 Monate.
          </p>
        </div>

        {/* Subscriptions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {subscriptions.map((subscription, index) => (
            <div
              key={index}
              className="relative service-card group hover:scale-105 transition-all duration-300"
            >
              {/* Badge */}
              {subscription.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#ed07f6] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10">
                  {subscription.badge}
                </div>
              )}

              {/* Logo */}
              <div className="text-center mb-6 pt-2">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${subscription.bgColor} p-3 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {subscription.logo}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{subscription.name}</h3>
                {subscription.type && (
                  <p className="text-sm text-gray-600 font-medium">{subscription.type}</p>
                )}
                <p className="text-sm text-gray-500">{subscription.duration}</p>
              </div>

              {/* Pricing */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {subscription.originalPrice && (
                    <span className="text-gray-400 line-through text-lg">
                      {subscription.originalPrice.toFixed(2)}€
                    </span>
                  )}
                  <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">
                    -{Math.round((1 - subscription.price / subscription.originalPrice) * 100)}%
                  </span>
                </div>
                <div className="text-4xl font-bold text-[#8924e9] mb-1">
                  {subscription.price.toFixed(2)}€
                </div>
                <div className="text-sm text-gray-600">
                  nur {(subscription.price / 12).toFixed(2)}€/Monat
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {subscription.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-2">
                    <span className="text-[#ed07f6] mt-1">✓</span>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handlePurchase(subscription)}
                className="w-full bg-[#ed07f6] text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-[#d406db] hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Jetzt kaufen</span>
              </button>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-16 max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">🚀</div>
              <h4 className="font-semibold text-gray-900 mb-1">Sofortige Lieferung</h4>
              <p className="text-sm text-gray-600">Account-Daten direkt nach Zahlungseingang</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🔒</div>
              <h4 className="font-semibold text-gray-900 mb-1">100% Sicher</h4>
              <p className="text-sm text-gray-600">Sichere Zahlung & Datenschutz garantiert</p>
            </div>
            <div>
              <div className="text-3xl mb-2">💬</div>
              <h4 className="font-semibold text-gray-900 mb-1">24/7 Support</h4>
              <p className="text-sm text-gray-600">Bei Fragen sind wir immer für dich da</p>
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

export default AboServices