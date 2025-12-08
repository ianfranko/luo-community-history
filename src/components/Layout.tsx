'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { usePathname } from 'next/navigation'

type NavigationItem = {
  name: string
  href: string
  icon?: React.ElementType
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const mainNavigation: NavigationItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/Gallery' },
    { name: 'Blogs', href: '/BlogList' },
    { name: 'Drama', href: '/Drama' },
  ]

  const topNavigation: NavigationItem[] = [
    { name: 'Luo Market', href: '/shop', icon: ShoppingBag },
    { name: 'Mentorship', href: '/mentorship' },
    { name: 'Games', href: '/games' },
  ]

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

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
        {/* Top Bar */}
        <div style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--text-white)',
          padding: '0.5rem 0',
          fontSize: '0.875rem'
        }}>
          <div className="container">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {/* Shop */}
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                {topNavigation.filter(item => item.name === 'Shop').map((item) => {
                  const isActive = pathname?.startsWith(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        color: 'var(--text-white)',
                        textDecoration: 'none',
                        fontWeight: isActive ? '600' : '400',
                        opacity: isActive ? 1 : 0.9
                      }}
                      className="top-nav-link hover:opacity-100 transition-opacity"
                    >
                      {item.icon && <item.icon size={16} />}
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </div>

              {/* Right Side - Mentorship & Games */}
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                {topNavigation.filter(item => item.name !== 'Shop').map((item) => {
                  const isActive = pathname?.startsWith(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        color: 'var(--text-white)',
                        textDecoration: 'none',
                        fontWeight: isActive ? '600' : '400',
                        opacity: isActive ? 1 : 0.9
                      }}
                      className="top-nav-link hover:opacity-100 transition-opacity"
                    >
                      {item.icon && <item.icon size={16} />}
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Bar */}
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '4rem'
          }}>
            {/* Logo */}
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
              }}
            >
              <Image
                src="/LLNLOGO.svg"
                alt="Luo League of Nations Logo"
                width={32}
                height={32}
                style={{ objectFit: 'contain' }}
              />
              <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-dark)' }}>
                Luo League of Nations
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="header-nav" aria-label="Primary navigation">
              <div className="desktop-nav-links">
                {mainNavigation.map((item) => {
                  const isActive =
                    item.href === '/'
                      ? pathname === item.href
                      : pathname?.startsWith(item.href)

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                    >
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </nav>

            {/* Hamburger menu button */}
            <button
              className="menu-toggle"
              style={{
                padding: '0.5rem',
                color: 'var(--text-dark)',
                border: 'none',
                background: 'none',
                cursor: 'pointer'
              }}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Navigation Dropdown */}
        {isMenuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            className="mobile-nav"
          >
            <div style={{
              padding: '1rem'
            }} className="flex flex-col gap-2 md:flex-row md:justify-center md:gap-4 md:flex-wrap">
              {[...mainNavigation, ...topNavigation].map((item) => {
                const isActive =
                  item.href === '/'
                    ? pathname === item.href
                    : pathname?.startsWith(item.href)

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`nav-link-mobile ${isActive ? 'nav-link-active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    {item.icon && <item.icon size={18} />}
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </nav>
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
                <Image
                  src="/lln.svg"
                  alt="Luo League of Nations Logo"
                  width={32}
                  height={32}
                  style={{ objectFit: 'contain' }}
                />
                <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>Luo League of Nations</span>
              </div>
              <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
                Preserving and sharing the rich cultural heritage and history of the Luo people for future generations.
              </p>
            </div>

            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><Link href="/culture">Culture</Link></li>
                <li><Link href="/people">Notable People</Link></li>
                <li><Link href="/places">Historical Places</Link></li>
                <li><Link href="/events">Events</Link></li>
                <li><Link href="/Gallery">Gallery</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Community</h3>
              <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 Luo League of Nations. All rights reserved.</p>
          </div>
        </div>
      </footer>


    </div>
  )
}

