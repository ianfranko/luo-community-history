'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Heart, BookOpen, Camera, FileText, Users, History, Clock, CheckCircle, XCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Contribution {
  id: string
  title: string
  content: string
  type: string
  status: string
  notes?: string
  createdAt: string
  updatedAt: string
  user: {
    id: string
    name: string
    email: string
  }
}

export default function ContributionDetailPage() {
  const params = useParams()
  const [contribution, setContribution] = useState<Contribution | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchContribution(params.id as string)
    }
  }, [params.id])

  const fetchContribution = async (id: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/contributions/${id}`)
      if (response.ok) {
        const data = await response.json()
        setContribution(data)
      } else {
        console.error('Contribution not found')
      }
    } catch (error) {
      console.error('Error fetching contribution:', error)
    } finally {
      setIsLoading(false)
    }
  }

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

  if (isLoading) {
    return (
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
        <p style={{ marginTop: '1rem', color: 'var(--text-light)' }}>Loading contribution...</p>
      </div>
    )
  }

  if (!contribution) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <Heart size={64} color="var(--text-light)" />
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '1rem', marginBottom: '0.5rem' }}>
          Contribution Not Found
        </h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
          The contribution you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/contributions" className="btn btn-primary">
          <ArrowLeft size={20} />
          Back to Contributions
        </Link>
      </div>
    )
  }

  const TypeIcon = getTypeIcon(contribution.type)
  const StatusIcon = getStatusIcon(contribution.status)

  return (
    <>
      {/* Header */}
      <section className="section bg-white">
        <div className="container">
          <Link 
            href="/contributions" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              color: 'var(--primary-color)', 
              textDecoration: 'none',
              marginBottom: '1rem'
            }}
          >
            <ArrowLeft size={20} />
            Back to Contributions
          </Link>

          <div className="card">
            <div className="card-body">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: 'var(--bg-gradient)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <TypeIcon size={32} color="white" />
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', margin: 0 }}>
                      {contribution.title}
                    </h1>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.25rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '1rem',
                      backgroundColor: getStatusColor(contribution.status),
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      <StatusIcon size={16} />
                      {contribution.status}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <span style={{ 
                      fontSize: '1rem', 
                      color: 'var(--primary-color)', 
                      fontWeight: '600' 
                    }}>
                      {getTypeLabel(contribution.type)}
                    </span>
                    <span style={{ color: 'var(--text-light)' }}>•</span>
                    <span style={{ fontSize: '1rem', color: 'var(--text-light)' }}>
                      by {contribution.user.name}
                    </span>
                    <span style={{ color: 'var(--text-light)' }}>•</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={16} color="var(--text-light)" />
                      <span style={{ fontSize: '1rem', color: 'var(--text-light)' }}>
                        {new Date(contribution.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ 
                padding: '2rem', 
                backgroundColor: 'var(--bg-light)', 
                borderRadius: '0.75rem',
                marginBottom: '2rem'
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Story Content
                </h2>
                <div style={{ 
                  lineHeight: '1.8', 
                  fontSize: '1.125rem',
                  color: 'var(--text-dark)'
                }}>
                  {contribution.content.split('\n').map((paragraph, index) => (
                    <p key={index} style={{ marginBottom: '1rem' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {contribution.notes && (
                <div style={{ 
                  padding: '1.5rem', 
                  backgroundColor: 'white', 
                  borderRadius: '0.75rem',
                  border: '1px solid var(--border-color)',
                  marginBottom: '2rem'
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Additional Notes
                  </h3>
                  <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>
                    {contribution.notes}
                  </p>
                </div>
              )}

              {/* Contribution Info */}
              <div style={{ 
                padding: '1.5rem', 
                backgroundColor: 'white', 
                borderRadius: '0.75rem',
                border: '1px solid var(--border-color)'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Contribution Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>Contributor:</span>
                    <span style={{ marginLeft: '0.5rem', color: 'var(--text-light)' }}>
                      {contribution.user.name}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>Type:</span>
                    <span style={{ marginLeft: '0.5rem', color: 'var(--text-light)' }}>
                      {getTypeLabel(contribution.type)}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>Submitted:</span>
                    <span style={{ marginLeft: '0.5rem', color: 'var(--text-light)' }}>
                      {new Date(contribution.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>Last Updated:</span>
                    <span style={{ marginLeft: '0.5rem', color: 'var(--text-light)' }}>
                      {new Date(contribution.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-gradient" style={{ color: 'white' }}>
        <div className="container text-center">
          <h2 className="section-title" style={{ color: 'white' }}>
            Inspired to Share?
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Join our community of contributors and help preserve Luo history for future generations.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link href="/contribute" className="btn" style={{ 
              backgroundColor: 'white', 
              color: 'var(--primary-color)',
              border: '2px solid white'
            }}>
              <Heart size={20} />
              Share Your Story
            </Link>
            <Link href="/contributions" className="btn btn-outline" style={{ 
              borderColor: 'white', 
              color: 'white' 
            }}>
              Browse All Contributions
            </Link>
          </div>
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
