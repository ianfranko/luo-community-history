'use client'

import { useState, useEffect } from 'react'
import { Search, BookOpen, Users, MapPin, Calendar, FileText, ArrowRight, Filter } from 'lucide-react'
import Link from 'next/link'

interface SearchResult {
  articles?: any[]
  people?: any[]
  places?: any[]
  events?: any[]
  contributions?: any[]
  totalResults: number
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'all' | 'articles' | 'people' | 'places' | 'events' | 'contributions'>('all')
  const [searchType, setSearchType] = useState<string>('')

  useEffect(() => {
    // Get query from URL params
    const urlParams = new URLSearchParams(window.location.search)
    const searchQuery = urlParams.get('q')
    if (searchQuery) {
      setQuery(searchQuery)
      search(searchQuery)
    }
  }, [])

  const search = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(null)
      return
    }

    setIsLoading(true)
    try {
      const params = new URLSearchParams({ q: searchQuery })
      if (searchType) {
        params.append('type', searchType)
      }
      
      const response = await fetch(`/api/search?${params}`)
      const data = await response.json()
      setResults(data)
      
      // Update URL
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery)}`)
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
    setQuery(e.target.value)
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

  const renderResults = (items: any[], type: string, title: string) => {
    if (!items || items.length === 0) return null

    const Icon = getResultIcon(type)

    return (
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-body">
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Icon size={20} color="var(--primary-color)" />
            {title} ({items.length})
          </h3>
          
          <div className="space-y-4">
            {items.map((item, index) => (
              <Link
                key={index}
                href={getResultUrl(item, type)}
                style={{
                  display: 'block',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border-color)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-light)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '1.125rem' }}>
                  {item.title || item.name}
                </h4>
                
                {type === 'people' && (
                  <>
                    <p style={{ fontSize: '0.875rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>
                      {item.title}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                      {item.village} • {item.clan}
                    </p>
                  </>
                )}
                
                {type === 'places' && (
                  <>
                    <p style={{ fontSize: '0.875rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>
                      {item.type}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                      {item.county}
                    </p>
                  </>
                )}
                
                {type === 'events' && (
                  <>
                    <p style={{ fontSize: '0.875rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>
                      {item.type}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                      {item.location} • {new Date(item.date).toLocaleDateString()}
                    </p>
                  </>
                )}
                
                {(type === 'articles' || type === 'contributions') && (
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                    {item.excerpt || item.content?.substring(0, 150) + '...'}
                  </p>
                )}
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  marginTop: '0.5rem',
                  color: 'var(--primary-color)',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  <span>Learn more</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="text-5xl font-bold mb-6">
              Search Luo History
            </h1>
            <p className="text-xl mb-8" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              Discover articles, people, places, events, and community contributions about Luo history and culture.
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="search-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ position: 'relative', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input
                  type="text"
                  value={query}
                  onChange={handleQueryChange}
                  placeholder="Search history, culture, people, places..."
                  className="search-input"
                  style={{ flex: 1 }}
                />
                <button type="submit" className="search-button">
                  <Search size={20} color="white" />
                </button>
              </div>
              
              {/* Search Filters */}
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                marginTop: '1rem', 
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <button
                  type="button"
                  onClick={() => setSearchType('')}
                  className={`btn ${searchType === '' ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '0.875rem' }}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType('articles')}
                  className={`btn ${searchType === 'articles' ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '0.875rem' }}
                >
                  Articles
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType('people')}
                  className={`btn ${searchType === 'people' ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '0.875rem' }}
                >
                  People
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType('places')}
                  className={`btn ${searchType === 'places' ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '0.875rem' }}
                >
                  Places
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType('events')}
                  className={`btn ${searchType === 'events' ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '0.875rem' }}
                >
                  Events
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="section">
        <div className="container">
          {isLoading && (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                border: '3px solid var(--border-color)',
                borderTop: '3px solid var(--primary-color)',
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
              <div style={{ 
                padding: '1.5rem', 
                backgroundColor: 'white', 
                borderRadius: '0.75rem', 
                boxShadow: 'var(--shadow)',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Search Results
                </h2>
                <p style={{ color: 'var(--text-light)' }}>
                  Found {results.totalResults} results for "{query}"
                </p>
              </div>

              {/* Results */}
              <div>
                {renderResults(results.articles, 'articles', 'Articles')}
                {renderResults(results.people, 'people', 'People')}
                {renderResults(results.places, 'places', 'Places')}
                {renderResults(results.events, 'events', 'Events')}
                {renderResults(results.contributions, 'contributions', 'Community Contributions')}

                {results.totalResults === 0 && (
                  <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <Search size={64} color="var(--text-light)" />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '1rem', marginBottom: '0.5rem' }}>
                      No results found
                    </h3>
                    <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
                      No results found for "{query}". Try different keywords or check your spelling.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <Link href="/culture" className="btn btn-primary">
                        Browse Culture
                      </Link>
                      <Link href="/people" className="btn btn-outline">
                        Browse People
                      </Link>
                      <Link href="/places" className="btn btn-outline">
                        Browse Places
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {!isLoading && !results && !query && (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <Search size={64} color="var(--text-light)" />
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '1rem', marginBottom: '0.5rem' }}>
                Start Your Search
              </h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
                Enter a search term above to discover articles, people, places, and events related to Luo history and culture.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/culture" className="btn btn-primary">
                  Explore Culture
                </Link>
                <Link href="/people" className="btn btn-outline">
                  Meet People
                </Link>
                <Link href="/places" className="btn btn-outline">
                  Visit Places
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
