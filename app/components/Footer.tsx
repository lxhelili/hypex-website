"use client";

import {
  MessageCircle,
  Mail,
  Instagram,
  MapPin,
  CreditCard,
  Shield,
  Clock,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Social Media", href: "#social-media" },
    { name: "Premium Abos", href: "#abo-services" },
    { name: "Google Services", href: "#google-services" },
    { name: "Preise", href: "#social-media" },
    { name: "FAQ", href: "#faq" },
    { name: "Kontakt", href: "#contact" },
  ];

  const legalLinks = [
    { name: "Impressum", href: "/impressum" },
    { name: "AGB", href: "/agb" },
    { name: "Datenschutz", href: "/datenschutz" },
    { name: "Widerruf", href: "/widerruf" },
  ];

  const socialLinks = [
    {
      name: "Telegram Channel",
      icon: MessageCircle,
      href: "https://t.me/HypexChannel",
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram Ask",
      icon: Instagram,
      href: "https://instagram.com/hypex.ask",
      color: "hover:text-pink-400",
    },
    {
      name: "Google Maps",
      icon: MapPin,
      href: "https://g.page/hypex-reviews",
      color: "hover:text-green-400",
    },
    {
      name: "Support E-Mail",
      icon: Mail,
      href: "mailto:support@hypex.cloud",
      color: "hover:text-purple-400",
    },
  ];

  const paymentMethods = [
    { name: "Visa", icon: "💳" },
    { name: "Mastercard", icon: "💳" },
    { name: "PayPal", icon: "🅿️" },
    { name: "SEPA", icon: "🏦" },
    { name: "Bitcoin", icon: "₿" },
  ];

  const trustBadges = [
    {
      icon: Shield,
      text: "SSL Verschlüsselt",
      subtext: "256-bit Sicherheit",
    },
    {
      icon: Clock,
      text: "24/7 Support",
      subtext: "Immer erreichbar",
    },
    {
      icon: CreditCard,
      text: "Sichere Zahlung",
      subtext: "Alle Methoden",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">
                <span className="gradient-text">Hypex</span>
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Dein vertrauensvoller Partner für digitales Wachstum. Social
                Media Services, Premium Abos und Google Optimierung - alles aus
                einer Hand.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="space-y-3">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <badge.icon className="w-5 h-5 text-primary-400" />
                  <div>
                    <div className="font-medium text-sm">{badge.text}</div>
                    <div className="text-gray-400 text-xs">{badge.subtext}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-bold text-lg mb-6">Kontakt & Support</h4>
            <div className="space-y-4">
              <div>
                <div className="font-medium text-primary-400 mb-2">
                  24/7 Support verfügbar
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <a
                    href="https://t.me/HypexSupport"
                    className="block hover:text-white transition-colors duration-200"
                  >
                    📱 Telegram: @HypexSupport
                  </a>
                  <a
                    href="https://wa.me/49xxxxxxxxx"
                    className="block hover:text-white transition-colors duration-200"
                  >
                    💬 WhatsApp: +49 xxx xxx xxxx
                  </a>
                  <a
                    href="mailto:support@hypex.cloud"
                    className="block hover:text-white transition-colors duration-200"
                  >
                    ✉️ E-Mail: support@hypex.cloud
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <div className="font-medium text-primary-400 mb-2">
                  Antwortzeiten
                </div>
                <div className="text-sm text-gray-300 space-y-1">
                  <div>Telegram/WhatsApp: &lt; 5 Min</div>
                  <div>E-Mail: &lt; 2 Stunden</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social & Payment */}
          <div>
            <h4 className="font-bold text-lg mb-6">Social Media</h4>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200 ${social.color}`}
                >
                  <social.icon className="w-4 h-4" />
                  <span className="text-xs font-medium">
                    {social.name.split(" ")[0]}
                  </span>
                </a>
              ))}
            </div>

            <h5 className="font-medium text-sm mb-4">Zahlungsmethoden</h5>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 bg-gray-800 px-3 py-2 rounded text-xs"
                >
                  <span>{method.icon}</span>
                  <span>{method.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="border-t border-gray-700">
        <div className="container-custom py-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <h5 className="font-semibold text-yellow-400 mb-3 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Wichtiger Disclaimer
            </h5>
            <p className="text-gray-300 text-sm leading-relaxed">
              Hypex steht in keiner Verbindung zu Instagram, TikTok, Spotify,
              Google, Netflix, Disney+, Amazon Prime Video, Crunchyroll,
              YouTube, Telegram, Discord, Twitch oder anderen erwähnten
              Plattformen. Alle Markennamen, Logos und Warenzeichen gehören den
              jeweiligen Rechteinhabern. Unsere Services sind unabhängige
              Dienstleistungen und werden nicht von den genannten Unternehmen
              unterstützt, gesponsert oder anderweitig genehmigt.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Hypex. Alle Rechte vorbehalten.
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="text-gray-400 text-sm">
              Made with ❤️ in Deutschland
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
