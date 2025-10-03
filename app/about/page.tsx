'use client'

import { Shield, Users, Heart, Award, CreditCard, Lock, CheckCircle, Star } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'

const AboutPage = () => {
  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Qualität',
      description: 'Wir bieten nur Premium-Dienste an, die unseren hohen Qualitätsstandards entsprechen.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Sicherheit',
      description: 'Der Schutz Ihrer Daten und eine sichere Zahlungsabwicklung haben für uns höchste Priorität.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Kundenservice',
      description: 'Unser engagiertes Support-Team steht Ihnen bei Fragen und Problemen zur Seite.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Gemeinschaft',
      description: 'Wir schaffen eine Gemeinschaft von Nutzern, die das Beste aus Premium-Diensten herausholen.'
    }
  ]

  const protectionFeatures = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Käuferschutz',
      description: 'Umfassender Schutz bei jedem Einkauf mit Geld-zurück-Garantie'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Sichere Zahlung',
      description: 'SSL-verschlüsselte Transaktionen und geprüfte Zahlungsmethoden'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Datenschutz',
      description: 'Ihre persönlichen Daten werden nach höchsten Standards geschützt'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Premium-Garantie',
      description: 'Wir garantieren die Qualität und Echtheit aller Angebote'
    }
  ]

  const paymentMethods = [
    { name: 'Visa', logo: '💳' },
    { name: 'Mastercard', logo: '💳' },
    { name: 'PayPal', logo: '💰' },
    { name: 'Apple Pay', logo: '🍎' },
    { name: 'Google Pay', logo: '🔵' },
    { name: 'Klarna', logo: '🛍️' }
  ]

  const socialLinks = [
    { name: 'LinkedIn', url: '#', icon: '💼' },
    { name: 'Telegram', url: '#', icon: '✈️' },
    { name: 'Crunchbase', url: '#', icon: '🚀' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="gradient-text">Über Hypex</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ihr vertrauenswürdiger Partner für Premium Digital Services
            </p>
          </div>

          {/* Who We Are */}
          <section className="mb-20">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Wer wir sind</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Hypex ist Ihr vertrauenswürdiger Anbieter für Premium-Digital-Services. Wir haben uns darauf spezialisiert, 
                hochwertige Social-Media-Dienste, Streaming-Abonnements und weitere digitale Lösungen anzubieten, 
                die Ihre Online-Präsenz auf das nächste Level bringen.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Mit jahrelanger Erfahrung in der digitalen Branche verstehen wir die Bedürfnisse unserer Kunden 
                und liefern stets erstklassige Ergebnisse. Unser Ziel ist es, Ihnen den Zugang zu Premium-Services 
                so einfach und sicher wie möglich zu machen.
              </p>
            </div>
          </section>

          {/* Google Reviews */}
          <section className="mb-20">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-xl p-8 md:p-12 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">4.9 von 5 Sternen</h3>
              <p className="text-gray-600 mb-4">Basierend auf über 1.000 Google-Bewertungen</p>
              <a 
                href="https://www.google.com/search?q=hypex+bewertungen" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#ed07f6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d406db] transition-all"
              >
                Bewertungen ansehen
              </a>
            </div>
          </section>

          {/* Social Media Listing */}
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Folgen Sie uns
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="text-4xl mb-3">{social.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900">{social.name}</h3>
                </a>
              ))}
            </div>
          </section>

          {/* Values */}
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Unsere Werte
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Diese Grundsätze leiten uns bei allem, was wir tun
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-4 text-[#8924e9]">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Protection Section */}
          <section className="mb-20">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                Ihr Schutz hat Priorität
              </h2>
              <p className="text-center text-xl text-gray-600 mb-12">
                Käuferschutz auf höchstem Niveau
              </p>
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                Bei Hypex steht Ihre Sicherheit an erster Stelle. Wir bieten umfassenden Schutz bei jedem Einkauf.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {protectionFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center text-[#8924e9]">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Payment Methods */}
          <section className="mb-20">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                Flexible Zahlungsoptionen
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Wir bieten Ihnen verschiedene sichere Zahlungsmöglichkeiten für ein reibungsloses Einkaufserlebnis
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center hover:shadow-md transition-all"
                  >
                    <div className="text-3xl mb-2">{method.logo}</div>
                    <p className="text-sm font-semibold text-gray-700">{method.name}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mb-2" />
                  <p className="text-sm font-semibold text-gray-700">Sofortige Zahlungsbestätigung</p>
                </div>
                <div className="flex flex-col items-center">
                  <Lock className="w-6 h-6 text-blue-500 mb-2" />
                  <p className="text-sm font-semibold text-gray-700">Höchste Sicherheitsstandards</p>
                </div>
                <div className="flex flex-col items-center">
                  <Shield className="w-6 h-6 text-purple-500 mb-2" />
                  <p className="text-sm font-semibold text-gray-700">Keine versteckten Gebühren</p>
                </div>
                <div className="flex flex-col items-center">
                  <Award className="w-6 h-6 text-[#ed07f6] mb-2" />
                  <p className="text-sm font-semibold text-gray-700">Zahlungsgarantie bei jedem Kauf</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section>
            <div className="bg-gradient-to-r from-[#8924e9] to-[#ed07f6] rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Bereit, Premium-Dienste zu entdecken?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Durchstöbern Sie unser Angebot an hochwertigen digitalen Mitgliedschaften und finden Sie das perfekte Produkt für Ihre Bedürfnisse.
              </p>
              <Link 
                href="/products"
                className="inline-block bg-white text-[#8924e9] px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg hover:shadow-xl"
              >
                Unsere Produkte entdecken
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AboutPage
