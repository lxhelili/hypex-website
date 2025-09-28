'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, MessageCircle, Mail, Clock, Download, ArrowRight } from 'lucide-react'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [sessionData, setSessionData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // You would typically fetch session data from your API here
      // For now, we'll use mock data
      setTimeout(() => {
        setSessionData({
          id: sessionId,
          customerEmail: 'customer@example.com',
          amount: 2999,
          currency: 'eur',
          status: 'complete'
        })
        setLoading(false)
      }, 1000)
    } else {
      setLoading(false)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Zahlungsbestätigung wird verarbeitet...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Zahlung erfolgreich!
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Vielen Dank für deine Bestellung bei Hypex. 
              Wir haben deine Zahlung erfolgreich erhalten und werden deine Bestellung sofort bearbeiten.
            </p>
          </div>

          {/* Order Details */}
          {sessionData && (
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Bestelldetails</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Bestellnummer:</span>
                  <span className="font-semibold text-gray-900">{sessionData.id.substring(0, 12)}...</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">E-Mail:</span>
                  <span className="font-semibold text-gray-900">{sessionData.customerEmail}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Betrag:</span>
                  <span className="font-semibold text-gray-900">
                    {(sessionData.amount / 100).toFixed(2)}€
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">Status:</span>
                  <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Bezahlt
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Was passiert als nächstes?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Bestellbestätigung</h3>
                  <p className="text-gray-600">
                    Du erhältst in wenigen Minuten eine Bestellbestätigung per E-Mail mit allen Details.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Bearbeitung</h3>
                  <p className="text-gray-600">
                    Unser Team beginnt sofort mit der Bearbeitung deiner Bestellung. 
                    Die meisten Services werden innerhalb von 5-30 Minuten geliefert.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Lieferung</h3>
                  <p className="text-gray-600">
                    Je nach Service erhältst du die Zugangsdaten per E-Mail oder siehst die Ergebnisse 
                    direkt auf deinen Social Media Profilen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Information */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Fragen oder Probleme?</h2>
            <p className="mb-6 opacity-90">
              Unser Support-Team ist 24/7 für dich da und hilft gerne bei allen Fragen rund um deine Bestellung.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="https://t.me/HypexSupport"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition-all duration-200"
              >
                <MessageCircle className="w-6 h-6" />
                <div>
                  <div className="font-semibold">Telegram</div>
                  <div className="text-sm opacity-90">Sofortige Antwort</div>
                </div>
              </a>

              <a
                href="https://wa.me/49xxxxxxxxx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition-all duration-200"
              >
                <MessageCircle className="w-6 h-6" />
                <div>
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-sm opacity-90">Direkter Chat</div>
                </div>
              </a>

              <a
                href="mailto:support@hypex.de"
                className="flex items-center space-x-3 bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition-all duration-200"
              >
                <Mail className="w-6 h-6" />
                <div>
                  <div className="font-semibold">E-Mail</div>
                  <div className="text-sm opacity-90">support@hypex.de</div>
                </div>
              </a>
            </div>
          </div>

          {/* Back to Homepage */}
          <div className="text-center mt-8">
            <a
              href="/"
              className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-50 hover:scale-105 shadow-lg"
            >
              <span>Zurück zur Startseite</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}