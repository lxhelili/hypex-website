'use client'

import { useState } from 'react'
import { DollarSign, TrendingUp, Clock, BarChart3, Link as LinkIcon, ShoppingCart, Wallet, ChevronDown, ChevronUp } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const PartnerPage = () => {
  const [salesCount, setSalesCount] = useState(50)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    promotionMethods: [] as string[]
  })

  const commissionPerSale = 5
  const monthlyEarnings = salesCount * commissionPerSale
  const yearlyEarnings = monthlyEarnings * 12

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Attraktive Provisionen',
      description: '5€ Provision pro Bestellung'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Cookie-Laufzeit: 30 Tage',
      description: 'Lange Attribution für Ihre Empfehlungen'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Sofort aktiv',
      description: 'Keine Freigabe nötig – direkt starten'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Echtzeit-Dashboard',
      description: 'Tracking & Statistiken jederzeit einsehbar'
    }
  ]

  const steps = [
    {
      number: '1',
      title: 'Link teilen',
      description: 'Erstellen Sie Ihren individuellen Link für Produkte oder die Startseite.',
      icon: <LinkIcon className="w-6 h-6" />
    },
    {
      number: '2',
      title: 'Klicks & Käufe',
      description: '30 Tage Cookie-Laufzeit – Käufe werden automatisch zugeordnet.',
      icon: <ShoppingCart className="w-6 h-6" />
    },
    {
      number: '3',
      title: 'Geld verdienen',
      description: 'Pro Bestellung erhalten Sie fix 5€ – transparent im Dashboard.',
      icon: <Wallet className="w-6 h-6" />
    }
  ]

  const testimonials = [
    {
      initials: 'LK',
      name: 'Lena K.',
      text: 'Mit meinem Instagram-Kanal verdiene ich im Schnitt 250€ im Monat – komplett passiv.'
    },
    {
      initials: 'DM',
      name: 'Dennis M.',
      text: 'Ein Link in meinem YouTube-Video reicht: jeden Monat ~100 Bestellungen → 500€.'
    },
    {
      initials: 'SR',
      name: 'Sophie R.',
      text: 'Ich teile nur den Hauptlink im Profil – die 5€ pro Bestellung summieren sich schnell.'
    }
  ]

  const earningExamples = [
    { sales: 20, earnings: 100 },
    { sales: 50, earnings: 250 },
    { sales: 100, earnings: 500 },
    { sales: 200, earnings: 1000 }
  ]

  const faqs = [
    {
      question: 'Wie schnell kann ich starten?',
      answer: 'Sofort. Nach der Registrierung ist Ihr Account aktiv – Links können direkt genutzt werden.'
    },
    {
      question: 'Wie werden Verkäufe getrackt?',
      answer: 'Über Cookies (30 Tage) und eine serverseitige Zuordnung im Checkout. Ihr Dashboard zeigt alles transparent.'
    },
    {
      question: 'Wie hoch ist die Provision?',
      answer: 'Fix 5€ pro Bestellung – unabhängig von der Produktanzahl.'
    }
  ]

  const promotionOptions = [
    'Social Media (Instagram, TikTok, YouTube, etc.)',
    'Eigene Webseite oder Blog',
    'Community/Gruppe (z. B. WhatsApp/Telegram/Discord)',
    'Freunde & Bekannte',
    'Sonstiges'
  ]

  const handleCheckboxChange = (option: string) => {
    setFormData(prev => ({
      ...prev,
      promotionMethods: prev.promotionMethods.includes(option)
        ? prev.promotionMethods.filter(m => m !== option)
        : [...prev.promotionMethods, option]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Partner registration:', formData)
    alert('Vielen Dank für Ihre Registrierung! Wir werden uns bald bei Ihnen melden.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Sofort startklar
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="gradient-text">Partner werden</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Einfach registrieren und direkt loslegen
            </p>
          </div>

          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Ihre Vorteile als Partner
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-4 text-[#8924e9]">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                Jetzt kostenlos registrieren
              </h2>
              <p className="text-center text-gray-600 mb-8">Sofort startklar</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ihr Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Max Mustermann"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8924e9] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    E-Mail-Adresse <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ihre@email.de"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8924e9] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Firma (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ihre Firma GmbH"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8924e9] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Website/Social Media (optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://ihre-website.de"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8924e9] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Wie möchten Sie unsere Produkte bewerben? <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    {promotionOptions.map((option, index) => (
                      <label key={index} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.promotionMethods.includes(option)}
                          onChange={() => handleCheckboxChange(option)}
                          className="w-5 h-5 text-[#8924e9] border-gray-300 rounded focus:ring-[#8924e9]"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                  {formData.promotionMethods.length === 0 && (
                    <p className="text-sm text-gray-500 mt-2">Bitte wählen Sie mindestens eine Option aus.</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={formData.promotionMethods.length === 0}
                  className="w-full bg-[#ed07f6] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#d406db] transition-all hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Registrierung abschließen
                </button>

                <p className="text-sm text-gray-500 text-center">
                  Mit der Registrierung akzeptieren Sie unsere Datenschutzbestimmungen.
                </p>

                <p className="text-center text-gray-600">
                  Bereits Partner?{' '}
                  <a href="#" className="text-[#8924e9] font-semibold hover:underline">
                    Hier anmelden
                  </a>
                </p>
              </form>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              So funktioniert's
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#8924e9] to-[#ed07f6] rounded-full text-white text-2xl font-bold mb-4">
                      {step.number}
                    </div>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4 text-[#8924e9]">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-[#8924e9] to-[#ed07f6]"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Verdienstrechner
              </h2>
              
              <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Bestellungen pro Monat: {salesCount}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={salesCount}
                    onChange={(e) => setSalesCount(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ed07f6]"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>0</span>
                    <span>500</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 mb-6">
                  <p className="text-center text-gray-600 mb-2">
                    x {commissionPerSale}€ pro Bestellung
                  </p>
                  <p className="text-xs text-center text-gray-500 mb-4">
                    Beispielrechnung – tatsächliche Ergebnisse können variieren.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Geschätzter Monatsverdienst</p>
                      <p className="text-3xl font-bold text-[#8924e9]">€{monthlyEarnings}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Geschätzter Jahresverdienst</p>
                      <p className="text-3xl font-bold text-[#ed07f6]">€{yearlyEarnings}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {earningExamples.map((example, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 text-center shadow-md">
                      <p className="text-sm text-gray-600 mb-1">{example.sales} Bestellungen/Monat</p>
                      <p className="text-xl font-bold text-[#8924e9]">€{example.earnings}/Monat</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Partner-Stimmen
            </h2>
            <p className="text-center text-sm text-gray-500 mb-12">
              Hinweis: Erfahrungswerte einzelner Partner – keine Garantien.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#8924e9] to-[#ed07f6] rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                FAQ – Häufige Fragen
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-all"
                    >
                      <span className="font-semibold text-gray-900">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-[#8924e9]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PartnerPage
