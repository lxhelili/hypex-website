'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, Clock, Shield, CreditCard, RefreshCw, MapPin } from 'lucide-react'

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  const faqData = [
    {
      category: 'Abos',
      icon: RefreshCw,
      color: 'from-blue-500 to-indigo-600',
      questions: [
        {
          question: 'Was ist der Unterschied zwischen Upgrade und neuem Account?',
          answer: 'Bei einem Upgrade verwenden wir deine bestehenden Login-Daten (E-Mail + Passwort) und aktivieren Premium für deinen Account. Bei einem neuen Account erhältst du komplett neue Login-Daten für einen bereits aktivierten Premium-Account. Beide Optionen funktionieren 12 Monate lang.'
        },
        {
          question: 'Was benötige ich für ein Account-Upgrade?',
          answer: 'Für ein Upgrade benötigst du nur deine E-Mail-Adresse und dein aktuelles Passwort des jeweiligen Services (Spotify, Netflix, etc.). Diese Daten werden sicher übertragen und nur für die Aktivierung verwendet.'
        },
        {
          question: 'Wie schnell wird mein Abo aktiviert?',
          answer: 'Account-Upgrades werden innerhalb von 5-30 Minuten nach Zahlungseingang aktiviert. Neue Accounts werden sofort nach der Zahlung per E-Mail zugestellt. In seltenen Fällen kann es bis zu 2 Stunden dauern.'
        },
        {
          question: 'Was passiert nach 12 Monaten?',
          answer: 'Nach 12 Monaten läuft das Premium-Abo ab und der Account kehrt zur kostenlosen Version zurück. Du kannst dann entscheiden, ob du ein neues 12-Monats-Abo bei uns erwerben oder selbst bezahlen möchtest.'
        }
      ]
    },
    {
      category: 'Social Media',
      icon: HelpCircle,
      color: 'from-pink-500 to-purple-600',
      questions: [
        {
          question: 'Wie schnell bekomme ich meine Follower/Likes?',
          answer: 'Die meisten Social Media Services (Follower, Likes, Views) werden innerhalb von 5-60 Minuten geliefert. Je nach Paketgröße kann es bei sehr großen Bestellungen (50K+ Follower) bis zu 24 Stunden dauern, da wir für Authentizität sorgen.'
        },
        {
          question: 'Sind die Follower und Likes echt?',
          answer: 'Ja, wir verwenden ausschließlich echte, aktive Profile. Alle Follower haben Profilbilder, Biografien und eigene Inhalte. Bot-Profile oder Fake-Accounts werden nicht verwendet, da diese schnell von den Plattformen erkannt und entfernt werden.'
        },
        {
          question: 'Kann mein Account gesperrt werden?',
          answer: 'Nein, unsere Methoden sind 100% sicher und verstoßen nicht gegen die Nutzungsbedingungen der Plattformen. Wir simulieren organisches Wachstum und halten uns an alle Richtlinien. Über 50.000 Kunden ohne einen einzigen Sperrfall.'
        },
        {
          question: 'Was ist, wenn Follower wieder verschwinden?',
          answer: 'Sollten innerhalb von 30 Tagen Follower oder Likes verschwinden (was sehr selten vorkommt), ersetzen wir diese kostenlos. Wir bieten eine 30-Tage-Nachfüll-Garantie auf alle Social Media Services.'
        }
      ]
    },
    {
      category: 'Google Services',
      icon: MapPin,
      color: 'from-green-500 to-emerald-600',
      questions: [
        {
          question: 'Wie funktionieren Google Maps Bewertungen?',
          answer: 'Wir platzieren authentische 5-Sterne Bewertungen von echten Google-Accounts auf deinem Google My Business Profil. Alle Bewertungen enthalten individuellen Text und stammen von verschiedenen Standorten für maximale Authentizität.'
        },
        {
          question: 'Was ist ein Google Knowledge Panel (GKP)?',
          answer: 'Ein Knowledge Panel ist die Informationsbox, die rechts in den Google-Suchergebnissen erscheint, wenn nach deinem Namen oder Unternehmen gesucht wird. Es zeigt wichtige Informationen, Bilder und Links und erhöht deine Glaubwürdigkeit erheblich.'
        },
        {
          question: 'Wie lange dauert die Einrichtung eines Knowledge Panels?',
          answer: 'Die Einrichtung eines Knowledge Panels dauert in der Regel 2-4 Wochen. Wir erstellen zuerst alle notwendigen Grundlagen (Wikipedia-Eintrag, Pressemeldungen, etc.) und reichen dann bei Google die Verifizierung ein.'
        },
        {
          question: 'Sind Google Services legal?',
          answer: 'Ja, alle unsere Google Services sind völlig legal. Wir verwenden ausschließlich echte Accounts und befolgen alle Google-Richtlinien. Knowledge Panels werden über den offiziellen Google-Verifizierungsprozess erstellt.'
        }
      ]
    },
    {
      category: 'Zahlung & Sicherheit',
      icon: CreditCard,
      color: 'from-yellow-500 to-orange-600',
      questions: [
        {
          question: 'Welche Zahlungsmethoden akzeptiert ihr?',
          answer: 'Wir akzeptieren alle gängigen Zahlungsmethoden: Kreditkarte (Visa, Mastercard), PayPal, SEPA-Lastschrift, Sofortüberweisung, Giropay und Bitcoin. Alle Zahlungen werden über sichere, verschlüsselte Verbindungen abgewickelt.'
        },
        {
          question: 'Sind meine Daten sicher?',
          answer: 'Absolut! Wir sind DSGVO-konform und verwenden SSL-Verschlüsselung für alle Datenübertragungen. Kundendaten werden niemals an Dritte weitergegeben und nach Abschluss des Auftrags sicher gelöscht.'
        },
        {
          question: 'Gibt es eine Geld-zurück-Garantie?',
          answer: 'Ja, wir bieten eine 14-Tage Geld-zurück-Garantie. Solltest du nicht zufrieden sein oder der Service nicht wie beschrieben funktionieren, erstatten wir den vollen Betrag zurück.'
        },
        {
          question: 'Kann ich eine Rechnung erhalten?',
          answer: 'Selbstverständlich! Nach jeder Zahlung erhältst du automatisch eine ordnungsgemäße Rechnung per E-Mail. Diese kann für steuerliche Zwecke oder Buchhaltung verwendet werden.'
        }
      ]
    }
  ]

  const toggleFAQ = (categoryIndex: number, questionIndex: number) => {
    const faqId = categoryIndex * 100 + questionIndex
    setOpenFAQ(openFAQ === faqId ? null : faqId)
  }

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Häufige <span className="gradient-text">Fragen</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hier findest du Antworten auf die wichtigsten Fragen zu unseren Services. 
            Solltest du weitere Fragen haben, kontaktiere uns gerne direkt.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-gray-50 rounded-2xl p-8">
              {/* Category Header */}
              <div className="flex items-center space-x-4 mb-8">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} text-white`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{category.category}</h3>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const faqId = categoryIndex * 100 + questionIndex
                  const isOpen = openFAQ === faqId

                  return (
                    <div
                      key={questionIndex}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
                    >
                      <button
                        onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                      >
                        <span className="font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        <div className="flex-shrink-0">
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                      </button>

                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        } overflow-hidden`}
                      >
                        <div className="px-6 pb-4 border-t border-gray-100">
                          <p className="text-gray-600 leading-relaxed pt-4">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Support */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Noch Fragen? Wir helfen gerne!
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Unser Support-Team ist 24/7 für dich da. Kontaktiere uns über Telegram, WhatsApp oder E-Mail.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-100 hover:scale-105 flex items-center justify-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>24/7 Support</span>
              </button>
              
              <button className="border border-white border-opacity-50 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-white hover:bg-opacity-10 hover:scale-105 flex items-center justify-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Sofortige Hilfe</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ