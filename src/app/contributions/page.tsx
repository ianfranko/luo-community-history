'use client'

import { useState, useEffect, useCallback } from 'react'
import { Heart, BookOpen, Camera, FileText, Users, History, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface Contribution {
  id: string
  title: string
  content: string
  type: string
  status: string
  createdAt: string
  user: {
    id: string
    name: string
  }
}

export default function ContributionsPage() {
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [typeFilter, setTypeFilter] = useState<string>('')

  const fetchContributions = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (filter !== 'all') {
        params.append('status', filter)
      }
      if (typeFilter) {
        params.append('type', typeFilter)
      }

      const response = await fetch(`/api/contributions?${params}`)
      const data = await response.json()
      setContributions(data.contributions || [])
    } catch (error) {
      console.error('Error fetching contributions:', error)
    } finally {
      setIsLoading(false)
    }
  }, [filter, typeFilter])

  useEffect(() => {
    fetchContributions()
  }, [fetchContributions])

  

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'story':
        return BookOpen
      case 'memory':
        return Heart
      case 'tradition':
        return History
      case 'photo':
        return Camera
      case 'document':
        return FileText
      case 'correction':
        return Users
      default:
        return BookOpen
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return CheckCircle
      case 'rejected':
        return XCircle
      case 'pending':
        return AlertCircle
      default:
        return AlertCircle
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'var(--secondary-color)'
      case 'rejected':
        return '#ef4444'
      case 'pending':
        return 'var(--primary-color)'
      default:
        return 'var(--text-light)'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'story':
        return 'Personal Story'
      case 'memory':
        return 'Family Memory'
      case 'tradition':
        return 'Cultural Tradition'
      case 'photo':
        return 'Historical Photo'
      case 'document':
        return 'Historical Document'
      case 'correction':
        return 'Correction or Addition'
      default:
        return type
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="text-5xl font-bold mb-6">
              Community Contributions
            </h1>
            <p className="text-xl mb-8" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              Explore the stories, memories, and knowledge shared by community members 
              to preserve Luo history and culture.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="section bg-white">
        <div className="container">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Filter Contributions</h3>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Status
                  </label>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as 'all' | 'pending' | 'approved' | 'rejected')}
                    style={{
                      padding: '0.5rem',
                      border: '1px solid var(--border-color)',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="all">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Type
                  </label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    style={{
                      padding: '0.5rem',
                      border: '1px solid var(--border-color)',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="">All Types</option>
                    <option value="story">Personal Story</option>
                    <option value="memory">Family Memory</option>
                    <option value="tradition">Cultural Tradition</option>
                    <option value="photo">Historical Photo</option>
                    <option value="document">Historical Document</option>
                    <option value="correction">Correction or Addition</option>
                  </select>
                </div>
              </div>
              
              <Link href="/contribute" className="btn btn-primary">
                <Heart size={20} />
                Share Your Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contributions List */}
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
              <p style={{ marginTop: '1rem', color: 'var(--text-light)' }}>Loading contributions...</p>
            </div>
          )}

          {!isLoading && contributions.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <Heart size={64} color="var(--text-light)" />
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '1rem', marginBottom: '0.5rem' }}>
                No contributions found
              </h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
                Be the first to share your story and contribute to Luo community history.
              </p>
              <Link href="/contribute" className="btn btn-primary">
                <Heart size={20} />
                Share Your Story
              </Link>
            </div>
          )}

          {!isLoading && contributions.length > 0 && (
            <div className="space-y-6">
              {contributions.map((contribution) => {
                const TypeIcon = getTypeIcon(contribution.type)
                const StatusIcon = getStatusIcon(contribution.status)

                return (
                  <div key={contribution.id} className="card">
                    <div className="card-body">
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <div style={{ 
                          width: '60px', 
                          height: '60px', 
                          background: 'var(--bg-gradient)', 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <TypeIcon size={24} color="white" />
                        </div>
                        
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
                              {contribution.title}
                            </h3>
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '0.25rem',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '1rem',
                              backgroundColor: getStatusColor(contribution.status),
                              color: 'white',
                              fontSize: '0.75rem',
                              fontWeight: '600'
                            }}>
                              <StatusIcon size={12} />
                              {contribution.status}
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <span style={{ 
                              fontSize: '0.875rem', 
                              color: 'var(--primary-color)', 
                              fontWeight: '600' 
                            }}>
                              {getTypeLabel(contribution.type)}
                            </span>
                            <span style={{ color: 'var(--text-light)' }}>•</span>
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                              by {contribution.user.name}
                            </span>
                            <span style={{ color: 'var(--text-light)' }}>•</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Clock size={14} color="var(--text-light)" />
                              <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                                {new Date(contribution.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          
                          <p style={{ 
                            color: 'var(--text-light)', 
                            lineHeight: '1.6',
                            marginBottom: '1rem'
                          }}>
                            {contribution.content.length > 200 
                              ? contribution.content.substring(0, 200) + '...'
                              : contribution.content
                            }
                          </p>
                          
                          <Link 
                            href={`/contributions/${contribution.id}`}
                            className="btn btn-outline"
                          >
                            Read Full Story
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-gradient" style={{ color: 'white' }}>
        <div className="container text-center">
          <h2 className="section-title" style={{ color: 'white' }}>
            Share Your Story
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Every story matters. Help us preserve Luo community history by sharing your memories, 
            traditions, and knowledge with future generations.
          </p>
          
          <Link href="/contribute" className="btn" style={{ 
            backgroundColor: 'white', 
            color: 'var(--primary-color)',
            border: '2px solid white',
            marginTop: '2rem'
          }}>
            <Heart size={20} />
            Contribute Now
          </Link>
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
