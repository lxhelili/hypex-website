'use client'

import { useState } from 'react'
import { MapPin, Award, Star, Users, TrendingUp, Shield, ChevronRight, Play } from 'lucide-react'

const GoogleServices = () => {
  const [activeTab, setActiveTab] = useState<'maps' | 'gkp'>('maps')

  const mapsFeatures = [
    'Mehr lokale Sichtbarkeit',
    'Höhere Vertrauenswürdigkeit',
    'Bessere Conversion-Rate',
    'Stärkung der Online-Reputation',
    'Erhöhte Klickrate in Google Maps'
  ]

  const gkpFeatures = [
    'Professionelle Online-Präsenz',
    'Erhöhte Glaubwürdigkeit',
    'Bessere Auffindbarkeit',
    'Schutz vor Nachahmern',
    'Direkte Kontaktmöglichkeiten'
  ]

  const testimonials = [
    {
      type: 'Restaurant',
      before: '3.2 ⭐ (12 Bewertungen)',
      after: '4.7 ⭐ (127 Bewertungen)',
      result: '+315% mehr Reservierungen'
    },
    {
      type: 'Anwaltskanzlei',
      before: 'Kein Knowledge Panel',
      after: 'Vollständiges GKP',
      result: '+280% mehr Anfragen'
    },
    {
      type: 'Fitness Studio',
      before: '3.8 ⭐ (45 Bewertungen)',
      after: '4.8 ⭐ (203 Bewertungen)',
      result: '+190% Neumitglieder'
    }
  ]

  return (
    <section id="google-services" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Google Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stärke deine Online-Präsenz mit authentischen Google Maps Bewertungen und 
            professionellen Knowledge Panels für Unternehmen und Privatpersonen.
          </p>
        </div>

        {/* Service Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 rounded-2xl p-2">
            <button
              onClick={() => setActiveTab('maps')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'maps'
                  ? 'bg-white text-primary-600 shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span>Google Maps Bewertungen</span>
            </button>
            <button
              onClick={() => setActiveTab('gkp')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'gkp'
                  ? 'bg-white text-primary-600 shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Award className="w-5 h-5" />
              <span>Knowledge Panel (GKP)</span>
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'maps' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <MapPin className="w-4 h-4" />
                <span>Google Maps Optimierung</span>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Mehr Reichweite & Vertrauen für dein Business
              </h3>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Authentische 5-Sterne Bewertungen verbessern deine lokale Sichtbarkeit drastisch. 
                Mehr Kunden finden dich und vertrauen deinem Unternehmen.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {mapsFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Google Maps Bewertungen</h4>
                    <p className="text-gray-600 text-sm">Authentische 5-Sterne Reviews</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">ab 4.99€</div>
                    <div className="text-gray-500 text-sm">pro Bewertung</div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:from-primary-700 hover:to-secondary-700 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2">
                <span>Jetzt Google Maps optimieren</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
                {/* Mock Google Maps Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      HX
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Hypex Business</h4>
                      <p className="text-gray-600 text-sm">Digital Marketing Agentur</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="font-semibold">4.9</span>
                    <span className="text-gray-600">(247 Bewertungen)</span>
                  </div>

                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Maria S.</span> · vor 2 Tagen
                      <p className="mt-1">&quot;Fantastischer Service! Hypex hat unsere Online-Präsenz revolutioniert...&quot;</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Thomas K.</span> · vor 1 Woche  
                      <p className="mt-1">&quot;Professionell und zuverlässig. Absolute Empfehlung!&quot;</p>
                    </div>
                  </div>
                </div>

                {/* Before/After Indicator */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  +235 Reviews
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gkp' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Award className="w-4 h-4" />
                <span>Knowledge Panel Setup</span>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Professionelle Google Knowledge Panels
              </h3>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Erstelle ein professionelles Knowledge Panel für dein Unternehmen oder deine Person. 
                Erhöhe deine Glaubwürdigkeit und Sichtbarkeit in den Google-Suchergebnissen.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {gkpFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Pricing Options */}
              <div className="space-y-4 mb-8">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">Business GKP</h4>
                      <p className="text-gray-600 text-sm">Für Unternehmen & Marken</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">299€</div>
                      <div className="text-gray-500 text-sm">einmalig</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">Personal GKP</h4>
                      <p className="text-gray-600 text-sm">Für Privatpersonen</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">199€</div>
                      <div className="text-gray-500 text-sm">einmalig</div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:from-primary-700 hover:to-secondary-700 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2">
                <span>Knowledge Panel erstellen</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right Visual - Mock Knowledge Panel */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm mx-auto">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl">
                      HX
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Hypex</h3>
                    <p className="text-gray-600 text-sm">Digital Marketing Unternehmen</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">Übersicht</h4>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        Hypex ist eine führende Digital Marketing Agentur, spezialisiert auf Social Media Wachstum und Online-Präsenz...
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">Gegründet</h4>
                      <p className="text-gray-600 text-xs">2020</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">Hauptsitz</h4>
                      <p className="text-gray-600 text-xs">Deutschland</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">Website</h4>
                      <p className="text-blue-600 text-xs">hypex.de</p>
                    </div>
                  </div>
                </div>

                {/* Verified Badge */}
                <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-2 rounded-full">
                  <Shield className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Stories */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Erfolgsgeschichten unserer Kunden
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <div className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    {testimonial.type}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 text-sm mb-1">Vorher</h4>
                    <p className="text-gray-900 font-medium">{testimonial.before}</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-700 text-sm mb-1">Nachher</h4>
                    <p className="text-gray-900 font-medium">{testimonial.after}</p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800 text-sm">{testimonial.result}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GoogleServices