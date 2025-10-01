'use client'

import { useState } from 'react'
import { MessageCircle, Send, CheckCircle } from 'lucide-react'

export default function SupportForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    order_id: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [ticketId, setTicketId] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/tickets/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setTicketId(data.ticket_id)
        setFormData({ name: '', email: '', subject: '', message: '', order_id: '' })
      } else {
        setError(data.error || 'Fehler beim Senden')
      }
    } catch (err) {
      setError('Verbindungsfehler. Bitte versuche es erneut.')
    }

    setLoading(false)
  }

  if (success) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Ticket erstellt!</h3>
        <p className="text-gray-600 mb-4">
          Deine Nachricht wurde erfolgreich gesendet.
        </p>
        <div className="bg-white rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">Deine Ticket-Nummer:</p>
          <p className="text-xl font-mono font-bold text-[#8924e9]">{ticketId}</p>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Wir melden uns innerhalb von 24 Stunden bei dir per E-Mail.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="bg-[#ed07f6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d406db] transition-all"
        >
          Weitere Nachricht senden
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#8924e9] to-[#ed07f6] rounded-2xl mb-4">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Support kontaktieren</h2>
        <p className="text-gray-600">Wir helfen dir gerne weiter!</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ed07f6] focus:border-transparent transition-all"
            placeholder="Max Mustermann"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            E-Mail *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ed07f6] focus:border-transparent transition-all"
            placeholder="max@example.com"
            required
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Bestellnummer (optional)
        </label>
        <input
          type="text"
          value={formData.order_id}
          onChange={(e) => setFormData({...formData, order_id: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ed07f6] focus:border-transparent transition-all"
          placeholder="ORD-123456789"
          disabled={loading}
        />
        <p className="text-xs text-gray-500 mt-1">
          Falls sich deine Anfrage auf eine Bestellung bezieht
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Betreff *
        </label>
        <select
          value={formData.subject}
          onChange={(e) => setFormData({...formData, subject: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ed07f6] focus:border-transparent transition-all"
          required
          disabled={loading}
        >
          <option value="">Wähle ein Thema</option>
          <option value="Bestellung nicht erhalten">Bestellung nicht erhalten</option>
          <option value="Rückerstattung">Rückerstattung anfordern</option>
          <option value="Technisches Problem">Technisches Problem</option>
          <option value="Account-Problem">Account-Problem</option>
          <option value="Produktfrage">Frage zum Produkt</option>
          <option value="Allgemeine Frage">Allgemeine Frage</option>
          <option value="Sonstiges">Sonstiges</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Nachricht *
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ed07f6] focus:border-transparent transition-all resize-none"
          rows={6}
          placeholder="Beschreibe dein Anliegen so detailliert wie möglich..."
          required
          disabled={loading}
        />
        <p className="text-xs text-gray-500 mt-1">
          Je mehr Details du uns gibst, desto schneller können wir dir helfen
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#ed07f6] text-white py-4 rounded-lg font-semibold hover:bg-[#d406db] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Wird gesendet...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Ticket absenden</span>
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        * Pflichtfelder · Wir antworten innerhalb von 24 Stunden
      </p>
    </form>
  )
}