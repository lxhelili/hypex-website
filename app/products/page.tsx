'use client'

import { useState, useMemo } from 'react'
import { ShoppingCart, Search, Filter, Zap } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PaymentModal from '../components/PaymentModal'

type Product = {
  id: string
  name: string
  category: 'social' | 'abo' | 'ebay' | 'fortnite'
  platform: string
  amount?: string
  duration?: string
  price: number
  originalPrice?: number
  availability: 'available' | 'limited' | 'sold-out'
  featured?: boolean
  requiresInfo?: boolean
  socialLink?: string
}

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest')
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean
    item: any
  }>({
    isOpen: false,
    item: null
  })

  const products: Product[] = [
    // Instagram
    { id: 'ig-10k', name: 'Instagram Follower', category: 'social', platform: 'Instagram', amount: '10.000', price: 39.99, originalPrice: 59.99, availability: 'available', featured: true },
    
    // TikTok
    { id: 'tt-10k', name: 'TikTok Follower', category: 'social', platform: 'TikTok', amount: '10.000', price: 39.99, originalPrice: 59.99, availability: 'available', featured: true },
    
    // Snapchat
    { id: 'sc-100k', name: 'Snapchat Account', category: 'social', platform: 'Snapchat', amount: '100k Snapscore', price: 24.99, originalPrice: 34.99, availability: 'limited' },
    { id: 'sc-500k', name: 'Snapchat Account', category: 'social', platform: 'Snapchat', amount: '500k Snapscore', price: 39.99, originalPrice: 54.99, availability: 'available' },
    { id: 'sc-1m', name: 'Snapchat Account', category: 'social', platform: 'Snapchat', amount: '1M Snapscore', price: 49.99, originalPrice: 69.99, availability: 'available' },
    
    // Twitch
    { id: 'tw-10k', name: 'Twitch Follower', category: 'social', platform: 'Twitch', amount: '10.000', price: 29.99, originalPrice: 44.99, availability: 'available' },
    
    // Kick
    { id: 'kk-10k', name: 'Kick Follower', category: 'social', platform: 'Kick', amount: '10.000', price: 29.99, originalPrice: 44.99, availability: 'available' },
    
    // LinkedIn
    { id: 'li-10k', name: 'LinkedIn Follower', category: 'social', platform: 'LinkedIn', amount: '10.000', price: 199.99, originalPrice: 299.99, availability: 'limited', featured: true },
    
    // YouTube
    { id: 'yt-10k', name: 'YouTube Abonnenten', category: 'social', platform: 'YouTube', amount: '10.000', price: 49.99, originalPrice: 74.99, availability: 'available' },
    
    // Discord
    { id: 'dc-10k', name: 'Discord Member', category: 'social', platform: 'Discord', amount: '10.000', price: 29.99, originalPrice: 44.99, availability: 'available' },
    
    // Telegram
    { id: 'tg-10k', name: 'Telegram Member', category: 'social', platform: 'Telegram', amount: '10.000', price: 29.99, originalPrice: 44.99, availability: 'available' },
    
    // Abos
    { id: 'spotify-12m', name: 'Spotify Individual', category: 'abo', platform: 'Spotify', duration: '12 Monate', price: 39.99, originalPrice: 119.88, availability: 'available', featured: true },
    { id: 'crunchyroll-12m', name: 'Crunchyroll Mega Fan', category: 'abo', platform: 'Crunchyroll', duration: '12 Monate', price: 34.99, originalPrice: 99.99, availability: 'available' },
    { id: 'capcut-12m', name: 'CapCut Pro', category: 'abo', platform: 'CapCut', duration: '12 Monate', price: 44.99, originalPrice: 89.99, availability: 'available' },
    { id: 'canva-12m', name: 'Canva Pro', category: 'abo', platform: 'Canva', duration: '12 Monate', price: 29.99, originalPrice: 109.99, availability: 'available', featured: true },
    { id: 'duolingo-12m', name: 'Duolingo Plus', category: 'abo', platform: 'Duolingo', duration: '12 Monate', price: 29.99, originalPrice: 83.88, availability: 'available' },
    { id: 'youtube-premium-12m', name: 'YouTube Premium', category: 'abo', platform: 'YouTube', duration: '12 Monate', price: 49.99, originalPrice: 131.88, availability: 'available' },
    
    // eBay Services
    { id: 'ebay-views', name: 'eBay Aufrufe', category: 'ebay', platform: 'eBay', amount: 'Individuell', price: 0, availability: 'available', requiresInfo: true },
    { id: 'ebay-hearts', name: 'eBay Herzen', category: 'ebay', platform: 'eBay', amount: 'Beobachtungsliste', price: 0, availability: 'available', requiresInfo: true },
    { id: 'ebay-carts', name: 'eBay Warenkörbe', category: 'ebay', platform: 'eBay', amount: 'Individuell', price: 0, availability: 'available', requiresInfo: true },
    
    // Fortnite
    { id: 'fortnite-vbucks', name: 'Fortnite V-Bucks', category: 'fortnite', platform: 'Fortnite', amount: 'Individuell', price: 0, availability: 'available', requiresInfo: true },
  ]

  const categories = [
    { id: 'all', name: 'Alle Produkte', count: products.length },
    { id: 'social', name: 'Social Media', count: products.filter(p => p.category === 'social').length },
    { id: 'abo', name: 'Abonnements', count: products.filter(p => p.category === 'abo').length },
    { id: 'ebay', name: 'eBay Services', count: products.filter(p => p.category === 'ebay').length },
    { id: 'fortnite', name: 'Fortnite', count: products.filter(p => p.category === 'fortnite').length },
  ]

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.amount?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort
    const sorted = [...filtered]
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price)
      case 'newest':
      default:
        return sorted
    }
  }, [selectedCategory, searchQuery, sortBy])

  const handlePurchase = (product: Product) => {
    if (product.requiresInfo) {
      window.location.href = '/#contact'
      return
    }

    setPaymentModal({
      isOpen: true,
      item: {
        name: `${product.platform} - ${product.amount || product.duration}`,
        description: product.name,
        price: product.price,
        platform: product.platform,
        service: product.amount || product.duration,
        socialLink: product.socialLink
      }
    })
  }

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'available':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">✓ Verfügbar</span>
      case 'limited':
        return <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">⚠ Begrenzt</span>
      case 'sold-out':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">✗ Ausverkauft</span>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="gradient-text">Alle Produkte</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Entdecke unser komplettes Sortiment an Premium-Services
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Produkte durchsuchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8924e9] focus:border-transparent outline-none"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8924e9] focus:border-transparent outline-none appearance-none bg-white"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.count})
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8924e9] focus:border-transparent outline-none appearance-none bg-white"
              >
                <option value="newest">Neueste zuerst</option>
                <option value="price-low">Preis: Niedrig → Hoch</option>
                <option value="price-high">Preis: Hoch → Niedrig</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{product.platform}</h3>
                      <p className="text-sm text-gray-600">{product.name}</p>
                    </div>
                    {product.featured && (
                      <span className="bg-[#ed07f6] text-white text-xs px-2 py-1 rounded-full font-semibold">
                        ⭐ Top
                      </span>
                    )}
                  </div>
                  
                  {getAvailabilityBadge(product.availability)}
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-2">
                      {product.amount || product.duration}
                    </p>
                    
                    {product.requiresInfo ? (
                      <p className="text-2xl font-bold text-[#8924e9]">Preis auf Anfrage</p>
                    ) : (
                      <div>
                        {product.originalPrice && (
                          <p className="text-gray-400 line-through text-sm">
                            {product.originalPrice.toFixed(2)}€
                          </p>
                        )}
                        <p className="text-3xl font-bold text-[#8924e9]">
                          {product.price.toFixed(2)}€
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handlePurchase(product)}
                    disabled={product.availability === 'sold-out'}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                      product.availability === 'sold-out'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : product.requiresInfo
                        ? 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105'
                        : 'bg-[#ed07f6] hover:bg-[#d406db] text-white hover:scale-105'
                    }`}
                  >
                    {product.availability === 'sold-out' ? (
                      <>✗ Ausverkauft</>
                    ) : product.requiresInfo ? (
                      <>
                        <Zap className="w-5 h-5" />
                        <span>Anfrage senden</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        <span>In den Warenkorb</span>
                      </>
                    )}
                  </button>

                  {product.category === 'social' && !product.requiresInfo && product.availability !== 'sold-out' && (
                    <button
                      onClick={() => {
                        const link = prompt(`Bitte geben Sie Ihren ${product.platform} Link ein:`)
                        if (link) {
                          handlePurchase({ ...product, socialLink: link })
                        }
                      }}
                      className="w-full mt-2 py-2 text-sm text-[#8924e9] border border-[#8924e9] rounded-lg hover:bg-purple-50 transition-all"
                    >
                      🚀 Express Checkout
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">Keine Produkte gefunden</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="mt-4 px-6 py-3 bg-[#ed07f6] text-white rounded-lg hover:bg-[#d406db] transition-all"
              >
                Filter zurücksetzen
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ isOpen: false, item: null })}
        item={paymentModal.item}
      />
    </div>
  )
}

export default ProductsPage
