import Link from 'next/link'
import { Users, MapPin, Calendar, Heart, ArrowRight, History, Globe } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: History,
      title: 'Documentary Films',
      description: 'Explore the fascinating history of the Luo community, from ancient traditions to modern developments.'
    },
    {
      icon: Heart,
      title: 'Plays and Theatre',
      description: 'Discover the unique cultural practices, traditions, and values that define the Luo community.'
    },
    {
      icon: Users,
      title: 'Notable People',
      description: 'Learn about influential Luo leaders, elders, and community members who shaped our history.'
    },
    {
      icon: MapPin,
      title: 'Historical Places',
      description: 'Visit significant locations and landmarks that hold cultural and historical importance.'
    },
    {
      icon: Calendar,
      title: 'Community Events',
      description: 'Stay updated on cultural events, celebrations, and important community gatherings.'
    },
    {
      icon: Globe,
      title: 'Interviews',
      description: 'Listen to interviews with Luo leaders, elders, and community members.'
    }
  ]

  const stats = [
    { number: '200+', label: 'Historical Articles' },
    { number: '100+', label: 'Cultural Stories' },
    { number: '20+', label: 'Documentaries' },
    { number: '25+', label: 'Historical Places' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="text-5xl font-bold mb-6">
              Preserving Luo Community Heritage
            </h1>
            <p className="text-xl mb-8" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
            Awakening the Luo community to its full cultural, intellectual, and economic potential — restoring pride, unity, and purpose among our people.
              Join us in preserving and sharing our stories for future generations.
            </p>
            
            

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/culture" className="btn btn-primary">
                Explore Culture
                <ArrowRight size={20} />
              </Link>
              
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">View Gallery</h2>
          <p className="section-subtitle">
            Photos, videos, and stories from our community events and activities
          </p>
          
          <div className="feature-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <feature.icon size={24} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Featured Stories</h2>
          <p className="section-subtitle">
            Discover the most popular and recent additions to our community archive
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Featured Article 1 */}
            <div className="card">
              <div style={{ 
                height: '200px', 
                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <History size={48} color="white" />
              </div>
              <div className="card-body">
                <h3 className="card-title">The Origins of Luo Migration</h3>
                <p className="card-text">
                  Explore the fascinating journey of the Luo people and their settlement patterns across East Africa.
                </p>
                <Link href="/culture" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Read More
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Featured Article 2 */}
            <div className="card">
              <div style={{ 
                height: '200px', 
                background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Heart size={48} color="white" />
              </div>
              <div className="card-body">
                <h3 className="card-title">Traditional Luo Ceremonies</h3>
                <p className="card-text">
                  Learn about the rich ceremonial traditions that mark important life events in Luo culture.
                </p>
                <Link href="/culture" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Read More
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Featured Article 3 */}
            <div className="card">
              <div style={{ 
                height: '200px', 
                background: 'linear-gradient(135deg, var(--accent-color), var(--primary-color))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Users size={48} color="white" />
              </div>
              <div className="card-body">
                <h3 className="card-title"> Jo'Alego</h3>
                <p className="card-text">
                 Discover the rich culture of the Joalego, and their Journey to their current settlement.
                </p>
                <Link href="/people" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Read More
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section bg-gradient" style={{ color: 'white' }}>
        <div className="container text-center">
          <h2 className="section-title" style={{ color: 'white' }}>
            Be Part of Our Story
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Learn more about Luo community history and explore our resources
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link href="/about" className="btn btn-outline" style={{ 
              borderColor: 'white', 
              color: 'white' 
            }}>
              Learn More
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
