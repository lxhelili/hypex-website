'use client'

import { Suspense } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import SocialMediaServices from './components/SocialMediaServices'
import AboServices from './components/AboServices'
import GoogleServices from './components/GoogleServices'
import WhyHypex from './components/WhyHypex'
import CustomerReviews from './components/CustomerReviews'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="spinner"></div></div>}>
        <Header />
        <main>
          <HeroSection />
          <SocialMediaServices />
          <AboServices />
          <GoogleServices />
          <WhyHypex />
          <CustomerReviews />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </Suspense>
    </div>
  )
}
