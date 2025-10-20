'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Search, BookOpen, Users, MapPin, Calendar, Heart } from 'lucide-react'
import SearchModal from './SearchModal'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/', icon: BookOpen },
    { name: 'Culture', href: '/culture', icon: Heart },
    { name: 'People', href: '/people', icon: Users },
    { name: 'Places', href: '/places', icon: MapPin },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Contribute', href: '/contribute', icon: BookOpen },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-light)' }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'var(--bg-white)', 
        boxShadow: 'var(--shadow-lg)', 
        position: 'sticky', 
        top: 0, 
        zIndex: 50 
      }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            height: '4rem' 
          }}>
            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                width: '2rem', 
                height: '2rem', 
                background: 'var(--bg-gradient)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <BookOpen size={20} color="white" />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-dark)' }}>
                Luo Community History
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav style={{ display: 'none' }} className="md:flex">
              <div style={{ display: 'flex', gap: '2rem' }}>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="nav-link"
                  >
                    <item.icon size={16} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Search Button */}
            <div style={{ display: 'none' }} className="md:flex">
              <button 
                onClick={() => setIsSearchOpen(true)}
                style={{ 
                  padding: '0.5rem', 
                  color: 'var(--text-dark)', 
                  border: 'none', 
                  background: 'none',
                  cursor: 'pointer'
                }}
              >
                <Search size={20} />
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              style={{ 
                display: 'block', 
                padding: '0.5rem', 
                color: 'var(--text-dark)', 
                border: 'none', 
                background: 'none',
                cursor: 'pointer'
              }}
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div style={{ 
            display: 'block', 
            backgroundColor: 'var(--bg-white)', 
            borderTop: '1px solid var(--border-color)' 
          }} className="md:hidden">
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    padding: '0.75rem', 
                    color: 'var(--text-dark)', 
                    textDecoration: 'none',
                    borderRadius: '0.5rem',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon size={16} />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div style={{ padding: '0.75rem' }}>
                <button 
                  onClick={() => {
                    setIsSearchOpen(true)
                    setIsMenuOpen(false)
                  }}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    color: 'var(--text-dark)', 
                    border: 'none', 
                    background: 'none',
                    cursor: 'pointer',
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Search size={16} />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ 
                  width: '2rem', 
                  height: '2rem', 
                  background: 'var(--bg-gradient)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <BookOpen size={20} color="white" />
                </div>
                <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>Luo Community History</span>
              </div>
              <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
                Preserving and sharing the rich cultural heritage and history of the Luo community for future generations.
              </p>
            </div>
            
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><Link href="/culture">Culture</Link></li>
                <li><Link href="/people">Notable People</Link></li>
                <li><Link href="/places">Historical Places</Link></li>
                <li><Link href="/events">Events</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Community</h3>
              <ul>
                <li><Link href="/contribute">Contribute</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 Luo Community History. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  )
}

