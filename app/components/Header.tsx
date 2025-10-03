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
    { name: 'Startseite', href: '/', external: false },
    { name: 'Alle Produkte', href: '/products', external: false },
    { name: 'Über uns', href: '/about', external: true },
    { name: 'Partner werden', href: '/partner', external: false },
    { name: 'Web Design', href: '/webdesign', external: false },
    { name: 'FAQ', href: '/#faq', external: false },
    { name: 'Kontakt', href: '/#contact', external: false },
  ]

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle smooth scroll for homepage anchors
    if (!href.startsWith('/#')) return
    
    e.preventDefault()
    setIsOpen(false)
    
    if (href === '/#hero' || href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
    const targetId = href.replace('/#', '')
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      const headerHeight = 80
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
        : 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
    }`}>
      <nav className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8924e9] to-[#ed07f6] rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-[#8924e9] to-[#ed07f6] p-2 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold gradient-text">
              Hypex
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              item.external ? (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gray-700 hover:text-[#8924e9] transition-all duration-300 relative group cursor-pointer"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8924e9] to-[#ed07f6] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="font-medium text-gray-700 hover:text-[#8924e9] transition-all duration-300 relative group cursor-pointer"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8924e9] to-[#ed07f6] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/#contact"
              onClick={(e) => handleSmoothScroll(e, '/#contact')}
              className="bg-[#ed07f6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d406db] transition-all hover:scale-105 inline-flex items-center cursor-pointer"
            >
              Jetzt starten
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                item.external ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-gray-700 hover:text-[#8924e9] hover:bg-gray-50 transition-colors cursor-pointer font-medium"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      handleSmoothScroll(e, item.href)
                      setIsOpen(false)
                    }}
                    className="block px-4 py-3 text-gray-700 hover:text-[#8924e9] hover:bg-gray-50 transition-colors cursor-pointer font-medium"
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <div className="px-4 pt-4">
                <Link
                  href="/#contact"
                  onClick={(e) => {
                    handleSmoothScroll(e, '/#contact')
                    setIsOpen(false)
                  }}
                  className="bg-[#ed07f6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d406db] transition-all w-full text-center inline-block cursor-pointer"
                >
                  Jetzt starten
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
