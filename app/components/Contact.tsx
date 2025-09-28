'use client'

import { useState } from 'react'
import { Send, MessageCircle, Mail, Clock, CheckCircle, Loader } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const services = [
    'Instagram Services',
    'TikTok Services', 
    'Twitch Services',
    'Premium Abos (12 Monate)',
    'Google Maps Bewertungen',
    'Google Knowledge Panel',
    'Telegram Services',
    'Discord Services',
    'Beratung / Sonstiges'
  ]

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Telegram',
      description: 'Sofortige Antwort',
      contact: '@HypexSupport',
      link: 'https://t.me/HypexSupport',
      color: 'from-blue-500 to-cyan-600',
      available: '24/7 verfügbar'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp', 
      description: 'Direkter Chat',
      contact: '+49 xxx xxx xxxx',
      link: 'https://wa.me/49xxxxxxxxx',
      color: 'from-green-500 to-emerald-600',
      available: '24/7 verfügbar'
    },
    {
      icon: Mail,
      title: 'E-Mail',
      description: 'Detaillierte Anfragen',
      contact: 'support@hypex.de',
      link: 'mailto:support@hypex.de',
      color: 'from-purple-500 to-pink-600',
      available: 'Antwort in 2-4h'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', service: '', message: '' })

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Kontakt & Support</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hast du Fragen oder benötigst du Hilfe? Unser Support-Team ist 24/7 für dich da. 
            Kontaktiere uns über deinen bevorzugten Kanal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Direkter Kontakt
            </h3>

            <div className="space-y-6 mb-10">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                      <method.icon className="w-7 h-7" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-900 text-lg">{method.title}</h4>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                          {method.available}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-1">{method.description}</p>
                      <p className="font-semibold text-primary-600">{method.contact}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary-600" />
                Schnelle Links
              </h4>
              
              <div className="space-y-3">
                <a
                  href="https://t.me/HypexChannel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-900">📢 Telegram Channel</span>
                  <span className="text-blue-600 text-sm">News & Updates</span>
                </a>
                
                <a
                  href="https://instagram.com/hypex.ask"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-900">📸 Instagram Ask</span>
                  <span className="text-pink-600 text-sm">Fragen stellen</span>
                </a>
                
                <a
                  href="https://g.page/hypex-reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-900">⭐ Google Maps</span>
                  <span className="text-green-600 text-sm">Bewertung abgeben</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Nachricht senden
            </h3>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Nachricht gesendet!</h4>
                  <p className="text-gray-600">
                    Vielen Dank für deine Nachricht. Wir melden uns innerhalb von 2-4 Stunden bei dir.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Dein vollständiger Name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                      placeholder="deine@email.de"
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                      Service
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    >
                      <option value="">Service auswählen (optional)</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nachricht *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none"
                      placeholder="Beschreibe dein Anliegen oder stelle deine Frage..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 rounded-lg font-semibold transition-all duration-300 hover:from-primary-700 hover:to-secondary-700 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Wird gesendet...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Nachricht senden</span>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Mit dem Absenden stimmst du unserer Datenschutzerklärung zu.
                    Wir antworten normalerweise innerhalb von 2-4 Stunden.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Response Time Promise */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white rounded-2xl px-8 py-6 shadow-lg">
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-green-600" />
              <div className="text-left">
                <div className="font-bold text-gray-900">2 Stunden</div>
                <div className="text-sm text-gray-600">E-Mail Antwortzeit</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-8 h-8 text-blue-600" />
              <div className="text-left">
                <div className="font-bold text-gray-900">5 Minuten</div>
                <div className="text-sm text-gray-600">Telegram/WhatsApp</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-purple-600" />
              <div className="text-left">
                <div className="font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Support verfügbar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact