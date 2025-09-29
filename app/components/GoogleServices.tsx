"use client";

import { MapPin, Building2, User, Eye, Star, ShoppingCart } from "lucide-react";
import { useState } from "react";
import PaymentModal from "./PaymentModal";

const GoogleServices = () => {
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    item: any;
  }>({
    isOpen: false,
    item: null,
  });

  const handlePurchase = (service: any) => {
    setPaymentModal({
      isOpen: true,
      item: {
        name: service.name,
        description: service.description,
        price: service.price,
        platform: service.category,
        service: service.name,
      },
    });
  };

  // Google Logo SVG
  const GoogleLogo = () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );

  // Correct eBay Logo SVG
  const EbayLogo = () => (
    <svg viewBox="0 0 300 120" className="w-32 h-16">
      <g>
        <path
          fill="#E53238"
          d="M62.6 57.5c-13.9 0-21.9 7.5-21.9 18.7 0 10.7 7.1 17.6 19.4 17.6 11.7 0 19.2-6.2 19.2-16.4v-3.5H63.1c0 4.2-2.7 6.8-6.4 6.8-3.7 0-6.2-2.7-6.2-7.2s2.4-7.2 6.2-7.2c3 0 5 1.5 5.9 3.9h9.6c-1.3-7.7-7.9-12.7-17.2-12.7H62.6z"
        />
        <path
          fill="#0064D2"
          d="M111.5 35.7h-9.6v55H111.5v-19.9c0-8.4 3.9-13.2 11.3-13.2 6.8 0 10 3.7 10 11.3v21.8h9.6v-24.3c0-11-6.4-17.6-16.4-17.6-6.3 0-10.9 2.4-14.5 7.2V35.7z"
        />
        <path
          fill="#F5AF02"
          d="M178.4 57.5c-12.6 0-21.1 7.1-21.1 18.7 0 11.3 8.5 18.7 21.1 18.7 7.7 0 13.9-3 17.4-8l-7.5-4.5c-2 3-5 4.5-9.6 4.5-5.8 0-10.1-3.3-10.9-8.8h28.9c.1-1.2.3-2.4.3-3.9.1-11.6-8-16.7-18.6-16.7zm-10.8 14.8c.9-5.1 4.7-8 10.2-8 5.3 0 8.8 3 9.6 8h-19.8z"
        />
        <path
          fill="#86B817"
          d="M238.2 57.5c-6.8 0-11.8 2.8-15.4 8l7.5 4.5c2-2.8 4.5-4.5 8.5-4.5 4.7 0 7.9 2.4 7.9 6.8v1.2h-9.2c-11 0-16.5 4.5-16.5 11.9 0 7.5 5.3 12 13.9 12 6.2 0 10.7-2.2 13.5-6.4v5.7h9.6V69.5c0-9.6-6.8-14.8-19.8-14.8v2.8zm7.9 26.8c0 5-3.9 7.9-10 7.9-4.2 0-6.9-1.7-6.9-5 0-3.3 2.7-5 6.9-5h10v2z"
        />
        <path
          fill="#E53238"
          d="M295.8 57.5c-6.2 0-10.6 2.6-13.5 6.9l7.5 4.4c1.5-2.6 3.7-3.9 6.8-3.9 4.1 0 6.8 2.1 6.8 5.7v1.2h-8.5c-10.6 0-15.9 4.4-15.9 11.4 0 7.1 5.1 11.7 13.2 11.7 5.8 0 10.3-2.1 12.9-6.2v5.4h9.2V69.5c0-9.2-6.5-14.8-18.5-14.8v2.8zm6.8 26c0 4.7-3.7 7.5-9.6 7.5-4 0-6.5-1.6-6.5-4.7 0-3.2 2.6-4.7 6.5-4.7h9.6v1.9z"
        />
      </g>
    </svg>
  );

  return (
    <section id="google-services" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Google & eBay Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Steigere deine Online-Präsenz mit professionellen Google und eBay
            Services. Für mehr Sichtbarkeit und Vertrauen bei deiner Zielgruppe.
          </p>
        </div>

        {/* Google Maps Reviews */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <GoogleLogo />
              <span className="text-3xl font-bold text-gray-900 ml-3">
                Maps Bewertungen
              </span>
            </div>
            <p className="text-gray-600">
              Echte 5-Sterne Bewertungen für dein Business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { amount: "10 Bewertungen", price: 49.99 },
              { amount: "25 Bewertungen", price: 99.99 },
              { amount: "50 Bewertungen", price: 179.99 },
            ].map((pkg, index) => (
              <div
                key={index}
                className="service-card text-center hover:scale-105 transition-all duration-300"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 p-3 mb-4 shadow-lg">
                    <GoogleLogo />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {pkg.amount}
                  </h4>
                  <div className="flex items-center justify-center space-x-1 text-yellow-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-4xl font-bold text-[#8924e9] mb-2">
                    {pkg.price.toFixed(2)}€
                  </div>
                  <p className="text-sm text-gray-600">Einmalige Zahlung</p>
                </div>

                <ul className="space-y-2 mb-6 text-left">
                  <li className="flex items-center text-sm text-gray-700">
                    <span className="text-[#ed07f6] mr-2">✓</span>
                    Echte Google Accounts
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <span className="text-[#ed07f6] mr-2">✓</span>
                    5-Sterne Bewertungen
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <span className="text-[#ed07f6] mr-2">✓</span>
                    Mit Kommentaren
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <span className="text-[#ed07f6] mr-2">✓</span>
                    Lieferung in 3-7 Tagen
                  </li>
                </ul>

                <button
                  onClick={() =>
                    handlePurchase({
                      name: `${pkg.amount} - Google Maps`,
                      description: `${pkg.amount} für Google Maps`,
                      price: pkg.price,
                      category: "Google Maps",
                    })
                  }
                  className="w-full bg-[#ed07f6] text-white py-3 rounded-lg font-semibold hover:bg-[#d406db] transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Jetzt kaufen</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Google Knowledge Panels */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <GoogleLogo />
              <span className="text-3xl font-bold text-gray-900 ml-3">
                Knowledge Panel
              </span>
            </div>
            <p className="text-gray-600">
              Professionelles Knowledge Panel für dein Business oder dich
              persönlich
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="service-card hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 p-3 mb-4 shadow-lg">
                  <Building2 className="w-10 h-10 text-[#4285F4]" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  Business Panel
                </h4>
                <p className="text-gray-600 text-sm">
                  Für Unternehmen & Marken
                </p>
              </div>

              <div className="mb-6 text-center">
                <div className="text-4xl font-bold text-[#8924e9] mb-2">
                  299.99€
                </div>
                <p className="text-sm text-gray-600">Einmalig</p>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-[#ed07f6] mr-2 mt-1">✓</span>
                  <span>Vollständiges Knowledge Panel Setup</span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-[#ed07f6] mr-2 mt-1">✓</span>
                  <span>Firmeninformationen & Logo</span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-[#ed07f6] mr-2 mt-1">✓</span>
                  <span>Social Media Verlinkungen</span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-[#ed07f6] mr-2 mt-1">✓</span>
                  <span>Wikipedia-Style Beschreibung</span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-[#ed07f6] mr-2 mt-1">✓</span>
                  <span>Permanente Sichtbarkeit</span>
                </li>
              </ul>

              <button
                onClick={() =>
                  handlePurchase({
                    name: "Google Knowledge Panel - Business",
                    description:
                      "Professionelles Knowledge Panel für Unternehmen",
                    price: 299.99,
                    category: "Google Knowledge Panel",
                  })
                }
                className="w-full bg-[#ed07f6] text-white py-3 rounded-lg font-semibold hover:bg-[#d406db] transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Jetzt kaufen</span>
              </button>
            </div>

            <div className="service-card hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 p-3 mb-4 shadow-lg">
                  <User className="w-10 h-10 text-[#EA4335]" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  Private Panel
                </h4>
                <p className="text-gray-600 text-sm">Für Privatpersonen</p>
              </div>

              <div className="mb-6 text-center">
                <div className="text-4xl font-bold text-[#8924e9] mb-2">
                  199.99€
                </div>
                <p className="text-sm text-gray-600">Einmalig</p>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-[#ed07f6] mr-2 mt-1">✓</span>
                  <span>Persönliches Knowledge Panel</span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-[#ed07f6] mr-2 mt-1">✓</span>
                  <span>Profilbild & Biografie</span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-[#ed07f6] mr-2 mt-1">✓</span>
                  <span>Social Media Profile</span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-[#ed07f6] mr-2 mt-1">✓</span>
                  <span>Beruf & Achievements</span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-[#ed07f6] mr-2 mt-1">✓</span>
                  <span>Permanente Sichtbarkeit</span>
                </li>
              </ul>

              <button
                onClick={() =>
                  handlePurchase({
                    name: "Google Knowledge Panel - Private",
                    description:
                      "Professionelles Knowledge Panel für Privatpersonen",
                    price: 199.99,
                    category: "Google Knowledge Panel",
                  })
                }
                className="w-full bg-[#ed07f6] text-white py-3 rounded-lg font-semibold hover:bg-[#d406db] transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Jetzt kaufen</span>
              </button>
            </div>
          </div>
        </div>

        {/* eBay Services */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              eBay Services
            </h3>
            <p className="text-gray-600">
              Steigere die Sichtbarkeit deiner eBay-Angebote
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Aufrufe",
                icon: Eye,
                price: "ab 4.99€",
                priceNum: 4.99,
                description: "Steigere die Aufrufe deiner eBay-Angebote",
                features: [
                  "Echte Besucher",
                  "Schnelle Lieferung",
                  "Verschiedene Pakete",
                ],
                color: "#E53238",
                bgGradient: "from-red-50 to-red-100",
              },
              {
                name: "Beobachtungsliste",
                icon: Star,
                price: "ab 6.99€",
                priceNum: 6.99,
                description: "Mehr Nutzer auf deiner Beobachtungsliste",
                features: [
                  "Echte eBay User",
                  "Erhöht Interesse",
                  "Besseres Ranking",
                ],
                color: "#0064D2",
                bgGradient: "from-blue-50 to-blue-100",
              },
              {
                name: "Warenkorb-Anzeige",
                icon: ShoppingCart,
                price: "ab 5.99€",
                priceNum: 5.99,
                description: "Erhöhe die Warenkorb-Hinzufügungen",
                features: [
                  "Echte Accounts",
                  "Steigert Verkäufe",
                  "Sofortige Lieferung",
                ],
                color: "#F5AF02",
                bgGradient: "from-yellow-50 to-yellow-100",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="service-card hover:scale-105 transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${service.bgGradient} p-3 mb-4 shadow-lg`}
                  >
                    <service.icon
                      className="w-10 h-10"
                      style={{ color: service.color }}
                    />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {service.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="mb-6 text-center">
                  <div className="text-3xl font-bold text-[#8924e9]">
                    {service.price}
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-center text-sm text-gray-700"
                    >
                      <span className="text-[#ed07f6] mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() =>
                    handlePurchase({
                      name: `eBay ${service.name}`,
                      description: service.description,
                      price: service.priceNum,
                      category: "eBay Services",
                    })
                  }
                  className="w-full bg-[#ed07f6] text-white py-3 rounded-lg font-semibold hover:bg-[#d406db] transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Anfrage stellen</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 text-center">
          <h4 className="text-2xl font-bold text-gray-900 mb-4">
            🎯 Individuelle Anfragen möglich!
          </h4>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            Du brauchst ein individuelles Paket oder hast spezielle Wünsche?
            Kontaktiere uns und wir erstellen dir ein maßgeschneidertes Angebot!
          </p>
          <a
            href="#contact"
            className="inline-flex items-center space-x-2 bg-[#ed07f6] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#d406db] transition-all duration-300 hover:scale-105"
          >
            <span>Jetzt Kontakt aufnehmen</span>
          </a>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ isOpen: false, item: null })}
        item={paymentModal.item}
      />
    </section>
  );
};

export default GoogleServices;
