'use client'

import { useState } from 'react'
import { Heart, Users, Eye, MessageCircle, Share2, Video, Zap, ShoppingCart } from 'lucide-react'
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
      icon: '📸',
      color: 'from-pink-500 to-purple-600',
      services: [
        { name: 'Follower', icon: Users, price: 'ab 9.99€', priceNum: 9.99, description: '1000 echte Instagram Follower' },
        { name: 'Likes', icon: Heart, price: 'ab 4.99€', priceNum: 4.99, description: '1000 Instagram Likes' },
        { name: 'Story Views', icon: Eye, price: 'ab 2.99€', priceNum: 2.99, description: '1000 Story Views' },
        { name: 'Reels Views', icon: Video, price: 'ab 3.99€', priceNum: 3.99, description: '1000 Reels Views' },
        { name: 'Kommentare', icon: MessageCircle, price: 'ab 7.99€', priceNum: 7.99, description: '50 Instagram Kommentare' },
      ],
      featured: true,
    },
    {
      platform: 'TikTok',
      icon: '🎵',
      color: 'from-red-500 to-pink-600',
      services: [
        { name: 'Follower', icon: Users, price: 'ab 12.99€', priceNum: 12.99, description: '1000 TikTok Follower' },
        { name: 'Likes', icon: Heart, price: 'ab 5.99€', priceNum: 5.99, description: '1000 TikTok Likes' },
        { name: 'Video Views', icon: Video, price: 'ab 3.99€', priceNum: 3.99, description: '10000 Video Views' },
        { name: 'Live Likes', icon: Zap, price: 'ab 8.99€', priceNum: 8.99, description: '500 Live Likes' },
        { name: 'Shares', icon: Share2, price: 'ab 6.99€', priceNum: 6.99, description: '500 Video Shares' },
      ],
      featured: true,
    },
    {
      platform: 'Twitch',
      icon: '🎮',
      color: 'from-purple-500 to-indigo-600',
      services: [
        { name: 'Follower', icon: Users, price: 'ab 15.99€', priceNum: 15.99, description: '500 Twitch Follower' },
        { name: 'Channel Views', icon: Eye, price: 'ab 7.99€', priceNum: 7.99, description: '10000 Channel Views' },
        { name: 'Abos', icon: Heart, price: 'ab 25.99€', priceNum: 25.99, description: '100 Twitch Abonnenten' },
      ],
      featured: false,
    },
    {
      platform: 'Telegram',
      icon: '✈️',
      color: 'from-blue-500 to-cyan-600',
      services: [
        { name: 'Channel-Member', icon: Users, price: 'ab 8.99€', priceNum: 8.99, description: '500 Channel Member' },
        { name: 'Gruppen-Member', icon: Users, price: 'ab 10.99€', priceNum: 10.99, description: '500 Gruppen Member' },
      ],
      featured: false,
    },
    {
      platform: 'Discord',
      icon: '🎯',
      color: 'from-indigo-500 to-purple-600',
      services: [
        { name: 'Server-Member', icon: Users, price: 'ab 14.99€', priceNum: 14.99, description: '500 Server Member' },
        { name: 'Boosts', icon: Zap, price: 'ab 19.99€', priceNum: 19.99, description: '10 Server Boosts' },
      ],
      featured: false,
    },
  ]

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
                platform.featured ? 'lg:scale-105 ring-2 ring-primary-500/20' : ''
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Featured Badge */}
              {platform.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  ⭐ Beliebt
                </div>
              )}

              {/* Platform Header */}
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${platform.color} text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {platform.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{platform.platform}</h3>
              </div>

              {/* Services List */}
              <div className="space-y-4 mb-8">
                {platform.services.map((service, serviceIndex) => (
                  <div
                    key={service.name}
                    className={`group/service bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 ${
                      hoveredCard === index ? 'transform translate-x-2' : ''
                    }`}
                    style={{ transitionDelay: `${serviceIndex * 50}ms` }}
                  >
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center space-x-3">
                        <service.icon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">{service.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-primary-600 font-semibold">{service.price}</span>
                        <button
                          onClick={() => handlePurchase(platform.platform, service)}
                          className="bg-primary-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-1"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          <span className="hidden sm:inline">Kaufen</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button 
                onClick={() => {
                  // Show modal with first service as default
                  const firstService = platform.services[0]
                  handlePurchase(platform.platform, firstService)
                }}
                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:from-primary-700 hover:to-secondary-700 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2 group"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Alle {platform.platform} Services</span>
              </button>

              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${platform.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none`}></div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-gray-50 rounded-2xl p-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Sofortige Lieferung</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">100% Sicher</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">24/7 Support</span>
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