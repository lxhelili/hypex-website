'use client'

import { Sparkles, Zap, Code, Palette, Smartphone, Rocket, CheckCircle, ArrowRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'

const WebDesignPage = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'KI-Powered Design',
      description: 'Modernste KI-Technologie für einzigartige, maßgeschneiderte Websites'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Blitzschnell',
      description: 'Schnelle Entwicklung ohne Kompromisse bei Qualität und Performance'
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Responsive Design',
      description: 'Perfekte Darstellung auf allen Geräten – Desktop, Tablet, Mobile'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Modernste Technologie',
      description: 'Next.js, React, Tailwind CSS und weitere cutting-edge Technologies'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Individuelles Design',
      description: 'Unique Designs, die perfekt zu Ihrer Marke passen'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'SEO-Optimiert',
      description: 'Optimiert für Suchmaschinen und maximale Sichtbarkeit'
    }
  ]

  const services = [
    {
      title: 'Landing Pages',
      description: 'Konversionsoptimierte Landing Pages, die Ihre Besucher in Kunden verwandeln',
      features: [
        'Responsive Design',
        'Call-to-Action Optimierung',
        'A/B Testing Ready',
        'Analytics Integration'
      ],
      popular: false
    },
    {
      title: 'E-Commerce Websites',
      description: 'Vollständige Online-Shop-Lösungen mit Zahlungsintegration',
      features: [
        'Produkt-Management',
        'Warenkorb & Checkout',
        'Payment-Integration',
        'Bestellverwaltung'
      ],
      popular: true
    },
    {
      title: 'Corporate Websites',
      description: 'Professionelle Unternehmenswebsites für einen starken ersten Eindruck',
      features: [
        'Multi-Page Layout',
        'Content Management',
        'Team-Seiten',
        'Kontaktformulare'
      ],
      popular: false
    },
    {
      title: 'Portfolio Websites',
      description: 'Beeindruckende Portfolios für Kreative, Künstler und Freelancer',
      features: [
        'Galerie-Funktionen',
        'Projekt-Showcases',
        'Blog-Integration',
        'Social Media Links'
      ],
      popular: false
    }
  ]

  const process = [
    {
      step: '1',
      title: 'Anfrage & Beratung',
      description: 'Kontaktieren Sie uns mit Ihren Anforderungen und Wünschen'
    },
    {
      step: '2',
      title: 'Konzept & Planung',
      description: 'Wir erstellen ein maßgeschneidertes Konzept für Ihr Projekt'
    },
    {
      step: '3',
      title: 'Design & Entwicklung',
      description: 'Unser Team bringt Ihre Vision mit modernster Technologie zum Leben'
    },
    {
      step: '4',
      title: 'Review & Launch',
      description: 'Nach Ihrem Feedback launchen wir Ihre perfekte Website'
    }
  ]

  const benefits = [
    'Moderne, zeitgemäße Designs',
    'Schnelle Ladezeiten',
    'Mobile-First Ansatz',
    'SEO-Optimierung inklusive',
    'Sicherer & zuverlässiger Code',
    'Nachhaltige Wartung',
    'Analytics & Tracking',
    'Support nach Launch'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full text-sm font-semibold text-[#8924e9] mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Powered by AI Technology</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              <span className="gradient-text">Website Design</span>
              <br />
              <span className="text-gray-900">der Zukunft</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Custom Websites mit der neuesten KI-Technologie – 
              einzigartig, modern und perfekt auf Ihre Bedürfnisse zugeschnitten
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/#contact"
                className="inline-flex items-center space-x-2 bg-[#ed07f6] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#d406db] transition-all hover:scale-105 shadow-lg"
              >
                <span>Jetzt Anfrage stellen</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center space-x-2 bg-white text-[#8924e9] px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all border-2 border-[#8924e9]"
              >
                <span>Mehr erfahren</span>
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Warum Hypex Web Design?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-4 text-[#8924e9]">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Unsere Web Design Services
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Von Landing Pages bis zu kompletten E-Commerce-Lösungen – wir realisieren Ihr digitales Projekt
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all relative ${
                    service.popular ? 'ring-2 ring-[#ed07f6]' : ''
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#ed07f6] text-white px-4 py-2 rounded-full text-sm font-semibold">
                      ⭐ Beliebt
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Process Section */}
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              So läuft's ab
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#8924e9] to-[#ed07f6] rounded-full text-white text-2xl font-bold mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-[#8924e9]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-20">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Was Sie erhalten
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white rounded-lg p-4 shadow-md">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Info */}
          <section className="mb-20">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Individuelle Preisgestaltung
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Jedes Projekt ist einzigartig. Kontaktieren Sie uns für ein maßgeschneidertes Angebot, 
                das perfekt zu Ihren Anforderungen und Ihrem Budget passt.
              </p>
              <div className="inline-block bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-8">
                <p className="text-lg font-semibold text-gray-900 mb-2">Preis auf Anfrage</p>
                <p className="text-gray-600">Transparente Abrechnung, keine versteckten Kosten</p>
              </div>
              <a
                href="/#contact"
                className="inline-flex items-center space-x-2 bg-[#ed07f6] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#d406db] transition-all hover:scale-105 shadow-lg"
              >
                <span>Kostenloses Erstgespräch</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </section>

          {/* CTA Section */}
          <section>
            <div className="bg-gradient-to-r from-[#8924e9] to-[#ed07f6] rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white">
              <Sparkles className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Bereit für Ihre neue Website?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Lassen Sie uns gemeinsam Ihre Vision verwirklichen. 
                Kontaktieren Sie uns noch heute für ein unverbindliches Beratungsgespräch.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/#contact"
                  className="inline-flex items-center space-x-2 bg-white text-[#8924e9] px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg"
                >
                  <span>Jetzt Kontakt aufnehmen</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link
                  href="/products"
                  className="inline-flex items-center space-x-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#8924e9] transition-all"
                >
                  <span>Andere Services ansehen</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default WebDesignPage
