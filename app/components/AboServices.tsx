'use client'

import { useState } from 'react'
import { Music, Play, Tv, Star, Shield, RefreshCw, UserPlus, ShoppingCart } from 'lucide-react'

const AboServices = () => {
  const [selectedOption, setSelectedOption] = useState<'upgrade' | 'new'>('upgrade')

  const services = [
    {
      name: 'Spotify Premium',
      icon: Music,
      color: 'from-green-500 to-emerald-600',
      originalPrice: '9.99€/Monat',
      ourPrice: '29.99€',
      duration: '12 Monate',
      features: ['Ad-freies Musik-Streaming', 'Offline-Wiedergabe', 'Unbegrenzte Skips', 'Höchste Audioqualität'],
      logo: '🎵',
      popular: true
    },
    {
      name: 'YouTube Premium',
      icon: Play,
      color: 'from-red-500 to-pink-600',
      originalPrice: '11.99€/Monat',
      ourPrice: '39.99€',
      duration: '12 Monate',
      features: ['Werbefrei auf YouTube', 'YouTube Music inklusive', 'Hintergrund-Wiedergabe', 'Offline-Downloads'],
      logo: '📺',
      popular: false
    },
    {
      name: 'Disney+',
      icon: Star,
      color: 'from-blue-500 to-indigo-600',
      originalPrice: '8.99€/Monat',
      ourPrice: '24.99€',
      duration: '12 Monate',
      features: ['Disney, Marvel & Star Wars', 'Pixar Originale', '4K Ultra HD', 'Bis zu 4 Geräte gleichzeitig'],
      logo: '🏰',
      popular: false
    },
    {
      name: 'Amazon Prime Video',
      icon: Tv,
      color: 'from-orange-500 to-yellow-600',
      originalPrice: '8.99€/Monat',
      ourPrice: '24.99€',
      duration: '12 Monate',
      features: ['Prime Video Originals', 'Filme & Serien', 'Prime Shipping inklusive', 'Prime Music inklusive'],
      logo: '📦',
      popular: false
    },
    {
      name: 'Crunchyroll',
      icon: Play,
      color: 'from-purple-500 to-pink-600',
      originalPrice: '7.99€/Monat',
      ourPrice: '19.99€',
      duration: '12 Monate',
      features: ['Anime & Manga', 'Simulcast-Episoden', 'Werbefrei streamen', 'Offline-Viewing'],
      logo: '🍜',
      popular: false
    }
  ]

  const calculateSavings = (originalMonthly: string, ourPrice: string) => {
    const original = parseFloat(originalMonthly.replace('€/Monat', '')) * 12
    const our = parseFloat(ourPrice.replace('€', ''))
    return Math.round(original - our)
  }

  return (
    <section id="abo-services" className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Premium Abos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            12 Monate Premium für einen Bruchteil des Preises. Wähle zwischen Account-Upgrade 
            oder komplett neuen Accounts – wir liefern sofort.
          </p>

          {/* Option Toggle */}
          <div className="inline-flex bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            <button
              onClick={() => setSelectedOption('upgrade')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedOption === 'upgrade'
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <RefreshCw className="w-5 h-5 inline mr-2" />
              Account Upgrade
            </button>
            <button
              onClick={() => setSelectedOption('new')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedOption === 'new'
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UserPlus className="w-5 h-5 inline mr-2" />
              Neuer Account
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={service.name}
              className={`relative service-card group ${
                service.popular ? 'lg:scale-105 ring-2 ring-primary-500/20' : ''
              }`}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  ⭐ Beliebt
                </div>
              )}

              {/* Service Header */}
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {service.logo}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                
                {/* Price Comparison */}
                <div className="space-y-2">
                  <div className="text-gray-500 line-through text-sm">
                    Normal: {service.originalPrice} × 12 = {(parseFloat(service.originalPrice.replace('€/Monat', '')) * 12).toFixed(2)}€
                  </div>
                  <div className="text-3xl font-bold text-primary-600">
                    {service.ourPrice}
                  </div>
                  <div className="text-green-600 font-semibold text-sm">
                    Spare {calculateSavings(service.originalPrice, service.ourPrice)}€!
                  </div>
                  <div className="text-gray-600 text-sm">{service.duration}</div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Option Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                {selectedOption === 'upgrade' ? (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RefreshCw className="w-4 h-4 text-primary-600" />
                      <span className="font-semibold text-gray-900">Account Upgrade</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Wir upgraden deinen bestehenden Account. 
                      <br />
                      <span className="font-medium">Benötigt: E-Mail + Passwort</span>
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <UserPlus className="w-4 h-4 text-primary-600" />
                      <span className="font-semibold text-gray-900">Neuer Account</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Komplett neuer Premium-Account wird geliefert.
                      <br />
                      <span className="font-medium">Sofort einsatzbereit</span>
                    </p>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:from-primary-700 hover:to-secondary-700 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2 group">
                <ShoppingCart className="w-5 h-5" />
                <span>Jetzt kaufen</span>
              </button>
            </div>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">100% Sicher</h3>
            <p className="text-gray-600 text-sm">
              Alle Accounts sind legal erworben und 100% sicher in der Nutzung.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <RefreshCw className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Sofort verfügbar</h3>
            <p className="text-gray-600 text-sm">
              Account-Daten werden innerhalb weniger Minuten nach Zahlung geliefert.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">12 Monate Garantie</h3>
            <p className="text-gray-600 text-sm">
              Volle Laufzeit garantiert oder Geld-zurück bei Problemen.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboServices