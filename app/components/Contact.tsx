'use client'

import { useState } from 'react'
import { MessageCircle, Send, Phone } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      alert('Nachricht erfolgreich gesendet! Wir melden uns in Kürze.')
      setFormData({ name: '', email: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Telegram Support',
      description: '24/7 Verfügbar',
      link: process.env.TELEGRAM_SUPPORT || 'https://t.me/HypexSupport',
      color: 'from-blue-500 to-blue-600',
      cta: 'Telegram öffnen'
    },
    {
      icon: Phone,
      title: 'WhatsApp Support',
      description: 'Schnelle Antworten',
      link: process.env.WHATSAPP_SUPPORT || 'https://wa.me/49xxxxxxxxx',
      color: 'from-green-500 to-green-600',
      cta: 'WhatsApp öffnen'
    }
  ]

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Kontakt & Support</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hast du Fragen? Unser Team ist 24/7 für dich da und antwortet innerhalb weniger Minuten.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Methods */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Direkter Kontakt</h3>
            
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
                    <h4 className="font-semibold text-gray-900 text-lg">{method.title}</h4>
                    <p className="text-gray-600">{method.description}</p>
                  </div>
                  <button className="bg-[#ed07f6] text-white px-6 py-2 rounded-full font-medium hover:bg-[#d406db] transition-colors">
                    {method.cta}
                  </button>
                </div>
              </a>
            ))}

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mt-8">
              <h4 className="font-semibold text-gray-900 mb-3">⚡ Schnelle Hilfe garantiert</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#ed07f6] rounded-full"></span>
                  <span>Antwortzeit: &lt; 5 Minuten</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#ed07f6] rounded-full"></span>
                  <span>24/7 Support verfügbar</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#ed07f6] rounded-full"></span>
                  <span>Deutschsprachiges Team</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Schreib uns eine Nachricht</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ed07f6] focus:border-transparent transition-all"
                  placeholder="Dein Name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  E-Mail *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ed07f6] focus:border-transparent transition-all"
                  placeholder="deine@email.de"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nachricht *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ed07f6] focus:border-transparent transition-all resize-none"
                  placeholder="Wie können wir dir helfen?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#ed07f6] text-white py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-[#d406db] hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    <span>Wird gesendet...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Nachricht senden</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact