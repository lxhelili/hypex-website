"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, Mail, Home } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = searchParams.get("session_id");
    setSessionId(session);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4d006a] to-[#8924e9] flex items-center justify-center">
        <div className="text-white text-xl">Bestellung wird verarbeitet...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4d006a] to-[#8924e9] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          <div className="mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Zahlung erfolgreich! 🎉
            </h1>
            <p className="text-lg text-gray-600">
              Vielen Dank für deine Bestellung!
            </p>
          </div>

          {sessionId && (
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <p className="text-sm text-gray-600 mb-2">Bestellnummer</p>
              <p className="font-mono text-lg font-bold text-gray-900 break-all">
                {sessionId.substring(8, 20).toUpperCase()}
              </p>
            </div>
          )}

          <div className="space-y-6 mb-8 text-left">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Was passiert jetzt?
            </h2>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  1. E-Mail Bestätigung
                </h3>
                <p className="text-sm text-gray-600">
                  Du erhältst in wenigen Minuten eine Bestätigungs-E-Mail mit
                  allen Details zu deiner Bestellung.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  2. Bestellung wird bearbeitet
                </h3>
                <p className="text-sm text-gray-600">
                  Wir beginnen sofort mit der Bearbeitung. Bei digitalen
                  Produkten erfolgt die Lieferung innerhalb von 24 Stunden.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  3. Service Aktivierung
                </h3>
                <p className="text-sm text-gray-600">
                  Nach Bearbeitung erhältst du alle notwendigen Informationen
                  zur Nutzung deines Services.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-blue-900 mb-2">
              📧 Wichtig: E-Mail überprüfen
            </h3>
            <p className="text-sm text-blue-800">
              Bitte überprüfe auch deinen Spam-Ordner, falls die Bestätigung
              nicht in deinem Posteingang erscheint.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              className="w-full bg-[#ed07f6] text-white py-4 rounded-xl font-semibold hover:bg-[#d406db] transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5" />
              <span>Zurück zur Startseite</span>
            </Link>

            <Link
              href="/#social-media"
              className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Package className="w-5 h-5" />
              <span>Weitere Produkte ansehen</span>
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              Fragen zu deiner Bestellung?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://t.me/HypexSupport"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Telegram Support
              </a>
              <a
                href="mailto:support@hypex.cloud"
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                E-Mail Support
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-white/80 text-sm">
          <p>Deine Zahlung wurde sicher über Stripe verarbeitet.</p>
          <p className="mt-2">
            Eine Rechnung findest du in deiner Bestätigungs-E-Mail.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-[#4d006a] to-[#8924e9] flex items-center justify-center">
          <div className="text-white text-xl">Laden...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
