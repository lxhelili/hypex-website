'use client'

import { CheckCircle, Zap, Shield, Clock, MessageCircle, HeadphonesIcon } from 'lucide-react'

const WhyHypex = () => {
  const features = [
    {
      icon: Zap,
      title: 'Social Media growth in minutes',
      description: 'Follower, Likes und Views werden innerhalb weniger Minuten nach der Bestellung geliefert.',
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    {
      icon: Shield,
      title: 'Abos: Upgrade or new account',
      description: 'Wähle zwischen Account-Upgrade (mit deinen Daten) oder einem komplett neuen Premium-Account.',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: CheckCircle,
      title: 'Google Services for business & private',
      description: 'Professionelle Google Maps Bewertungen und Knowledge Panels für Unternehmen und Privatpersonen.',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: HeadphonesIcon,
      title: 'Support 24/7 via Telegram & WhatsApp',
      description: 'Unser Support-Team ist rund um die Uhr über Telegram und WhatsApp für dich erreichbar.',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: Clock,
      title: 'Discreet & secure',
      description: 'Alle Services werden diskret und sicher abgewickelt. Deine Daten sind bei uns in sicheren Händen.',
      color: 'from-gray-500 to-slate-600',
      bgColor: 'bg-gray-50',
      iconColor: 'text-gray-600'
    }
  ]

  const stats = [
    { number: '50K+', label: 'Zufriedene Kunden' },
    { number: '1M+', label: 'Gelieferte Follower' },
    { number: '99.9%', label: 'Uptime Garantie' },
    { number: '24/7', label: 'Support verfügbar' }
  ]

  return (
    <section id="why-hypex" className="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Warum <span className="gradient-text">Hypex</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Wir sind dein vertrauensvoller Partner für digitales Wachstum. 
            Schnell, sicher und professionell – das ist unser Versprechen.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                </div>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none`}></div>
            </div>
          ))}

          {/* Special Trust Card */}
          <div className="md:col-span-2 lg:col-span-3">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">
                Vertrauen durch Transparenz
              </h3>
              <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                Über 50.000 zufriedene Kunden vertrauen bereits auf unsere Services. 
                Werde Teil der Hypex-Community und erlebe digitales Wachstum auf einem neuen Level.
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-8">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span className="font-semibold">SSL Verschlüsselt</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">DSGVO Konform</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">Deutscher Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-12">
            Hypex in Zahlen
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Bereit für digitales Wachstum?
            </h3>
            <p className="text-gray-600 mb-6">
              Starte noch heute und erlebe, wie Hypex deine Online-Präsenz auf das nächste Level bringt.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:from-primary-700 hover:to-secondary-700 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Jetzt starten</span>
              </button>
              
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 flex items-center justify-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Beratung anfordern</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyHypex