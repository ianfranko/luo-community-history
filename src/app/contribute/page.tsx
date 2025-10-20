import ContributionForm from '@/components/ContributionForm'
import { Heart, BookOpen, Camera, FileText, Users, History } from 'lucide-react'

export default function ContributePage() {
  const contributionTypes = [
    {
      icon: BookOpen,
      title: 'Personal Stories',
      description: 'Share your personal experiences, family stories, or childhood memories from the Luo community.'
    },
    {
      icon: History,
      title: 'Historical Knowledge',
      description: 'Contribute historical facts, events, or information about Luo culture and traditions.'
    },
    {
      icon: Camera,
      title: 'Photos & Documents',
      description: 'Upload historical photos, documents, or artifacts that tell our community\'s story.'
    },
    {
      icon: FileText,
      title: 'Cultural Traditions',
      description: 'Document traditional practices, ceremonies, customs, or rituals that are part of our heritage.'
    },
    {
      icon: Users,
      title: 'Family Memories',
      description: 'Share stories about family members, ancestors, or community elders who have shaped our history.'
    },
    {
      icon: Heart,
      title: 'Corrections & Additions',
      description: 'Help improve existing content by providing corrections, additional details, or clarifications.'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="text-5xl font-bold mb-6">
              Share Your Story
            </h1>
            <p className="text-xl mb-8" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              Help preserve Luo community history by contributing your stories, memories, photos, and knowledge. 
              Every contribution helps build a richer picture of our heritage.
            </p>
          </div>
        </div>
      </section>

      {/* Contribution Types */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Ways to Contribute</h2>
          <p className="section-subtitle">
            There are many ways you can help preserve and share Luo community history
          </p>
          
          <div className="feature-grid">
            {contributionTypes.map((type, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <type.icon size={24} />
                </div>
                <h3 className="feature-title">{type.title}</h3>
                <p className="feature-description">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contribution Form */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContributionForm />
            </div>
            
            <div className="space-y-6">
              {/* Guidelines */}
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Submission Guidelines</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>•</span>
                      <span>Ensure all information is accurate and factual</span>
                    </li>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>•</span>
                      <span>Respect privacy and cultural sensitivity</span>
                    </li>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>•</span>
                      <span>Provide sources when possible</span>
                    </li>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>•</span>
                      <span>Use respectful language and tone</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>•</span>
                      <span>All submissions will be reviewed before publishing</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Info */}
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Need Help?</h3>
                  <p className="card-text">
                    If you have questions about contributing or need assistance with your submission, 
                    please don&apos;t hesitate to reach out to us.
                  </p>
                  <button className="btn btn-outline" style={{ marginTop: '1rem' }}>
                    Contact Support
                  </button>
                </div>
              </div>

              {/* Recent Contributions */}
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Recent Contributions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                        Traditional Luo Wedding Ceremony
                      </h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                        Shared by Maria Achieng
                      </p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                        Childhood Memories from Kisumu
                      </h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                        Shared by John Ochieng
                      </p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                        Family Migration Story
                      </h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                        Shared by Sarah Anyango
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
