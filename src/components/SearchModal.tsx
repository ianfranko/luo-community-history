'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, BookOpen, Users, MapPin, Calendar, FileText } from 'lucide-react'
import Link from 'next/link'

interface SearchResult {
  articles?: any[]
  people?: any[]
  places?: any[]
  events?: any[]
  contributions?: any[]
  totalResults: number
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'all' | 'articles' | 'people' | 'places' | 'events'>('all')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const search = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(null)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Search error:', error)
      setResults(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    search(query)
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      search(value)
    }, 300)

    return () => clearTimeout(timeoutId)
  }

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'articles':
        return BookOpen
      case 'people':
        return Users
      case 'places':
        return MapPin
      case 'events':
        return Calendar
      case 'contributions':
        return FileText
      default:
        return Search
    }
  }

  const getResultUrl = (item: any, type: string) => {
    switch (type) {
      case 'articles':
        return `/culture/${item.slug}`
      case 'people':
        return `/people/${item.name.toLowerCase().replace(/\s+/g, '-')}`
      case 'places':
        return `/places/${item.name.toLowerCase().replace(/\s+/g, '-')}`
      case 'events':
        return `/events/${item.id}`
      case 'contributions':
        return `/contributions/${item.id}`
      default:
        return '#'
    }
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '10vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Search size={20} color="var(--text-light)" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleQueryChange}
              placeholder="Search history, culture, people, places..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '1rem',
                padding: '0.5rem 0'
              }}
            />
          </form>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '0.5rem'
            }}
          >
            <X size={20} color="var(--text-light)" />
          </button>
        </div>

        {/* Content */}
        <div style={{ maxHeight: '60vh', overflow: 'auto' }}>
          {isLoading && (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                border: '2px solid var(--border-color)',
                borderTop: '2px solid var(--primary-color)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto'
              }} />
              <p style={{ marginTop: '1rem', color: 'var(--text-light)' }}>Searching...</p>
            </div>
          )}

          {!isLoading && results && (
            <>
              {/* Results Summary */}
              <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <p style={{ color: 'var(--text-light)' }}>
                  Found {results.totalResults} results for "{query}"
                </p>
              </div>

              {/* Results */}
              <div style={{ padding: '1rem' }}>
                {results.articles && results.articles.length > 0 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '600', 
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <BookOpen size={20} color="var(--primary-color)" />
                      Articles ({results.articles.length})
                    </h3>
                    <div className="space-y-2">
                      {results.articles.map((article, index) => (
                        <Link
                          key={index}
                          href={getResultUrl(article, 'articles')}
                          style={{
                            display: 'block',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            textDecoration: 'none',
                            color: 'inherit',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--bg-light)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white'
                          }}
                        >
                          <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                            {article.title}
                          </h4>
                          <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                            {article.excerpt || article.content.substring(0, 100) + '...'}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {results.people && results.people.length > 0 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '600', 
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Users size={20} color="var(--primary-color)" />
                      People ({results.people.length})
                    </h3>
                    <div className="space-y-2">
                      {results.people.map((person, index) => (
                        <Link
                          key={index}
                          href={getResultUrl(person, 'people')}
                          style={{
                            display: 'block',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            textDecoration: 'none',
                            color: 'inherit',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--bg-light)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white'
                          }}
                        >
                          <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                            {person.name}
                          </h4>
                          <p style={{ fontSize: '0.875rem', color: 'var(--primary-color)' }}>
                            {person.title}
                          </p>
                          <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                            {person.village} • {person.clan}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {results.places && results.places.length > 0 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '600', 
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <MapPin size={20} color="var(--primary-color)" />
                      Places ({results.places.length})
                    </h3>
                    <div className="space-y-2">
                      {results.places.map((place, index) => (
                        <Link
                          key={index}
                          href={getResultUrl(place, 'places')}
                          style={{
                            display: 'block',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            textDecoration: 'none',
                            color: 'inherit',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--bg-light)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white'
                          }}
                        >
                          <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                            {place.name}
                          </h4>
                          <p style={{ fontSize: '0.875rem', color: 'var(--primary-color)' }}>
                            {place.type}
                          </p>
                          <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                            {place.county}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {results.events && results.events.length > 0 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '600', 
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Calendar size={20} color="var(--primary-color)" />
                      Events ({results.events.length})
                    </h3>
                    <div className="space-y-2">
                      {results.events.map((event, index) => (
                        <Link
                          key={index}
                          href={getResultUrl(event, 'events')}
                          style={{
                            display: 'block',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            textDecoration: 'none',
                            color: 'inherit',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--bg-light)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white'
                          }}
                        >
                          <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                            {event.title}
                          </h4>
                          <p style={{ fontSize: '0.875rem', color: 'var(--primary-color)' }}>
                            {event.type}
                          </p>
                          <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                            {event.location} • {new Date(event.date).toLocaleDateString()}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {results.totalResults === 0 && (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <Search size={48} color="var(--text-light)" />
                    <p style={{ marginTop: '1rem', color: 'var(--text-light)' }}>
                      No results found for "{query}"
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                      Try different keywords or check your spelling
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {!isLoading && !results && query && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <Search size={48} color="var(--text-light)" />
              <p style={{ marginTop: '1rem', color: 'var(--text-light)' }}>
                Start typing to search...
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
