'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Zap } from 'lucide-react'
import Link from 'next/link'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Startseite', href: '#hero' },
    { name: 'Social Media', href: '#social-media' },
    { name: 'Abos', href: '#abo-services' },
    { name: 'Google Services', href: '#google-services' },
    { name: 'Preise', href: '#social-media' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Kontakt', href: '#contact' },
  ]

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    
    // Close mobile menu if open
    setIsOpen(false)
    
    // Handle special cases
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
    // Find the target element
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      const headerHeight = 80 // Account for fixed header
      const targetPosition = targetElement.offsetTop - headerHeight
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-transparent'
    }`}>
      <nav className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            href="#hero" 
            className="flex items-center space-x-2 group"
            onClick={(e) => handleSmoothScroll(e, '#hero')}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-primary-600 to-secondary-600 p-2 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className={`text-2xl font-bold transition-all duration-300 ${
              isScrolled ? 'gradient-text' : 'text-white text-shadow'
            }`}>
              Hypex
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className={`font-medium transition-all duration-300 relative group cursor-pointer ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-primary-600' 
                    : 'text-white hover:text-white/80 text-shadow'
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="btn-primary inline-flex items-center cursor-pointer"
            >
              Jetzt starten
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled 
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                : 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors cursor-pointer font-medium"
                >
                  {item.name}
                </a>
              ))}
              <div className="px-4 pt-4">
                <a
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, '#contact')}
                  className="btn-primary w-full text-center inline-block cursor-pointer"
                >
                  Jetzt starten
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header