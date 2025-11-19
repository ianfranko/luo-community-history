import Image from 'next/image'
import Link from 'next/link'
import { Users, Heart, ArrowRight, History } from 'lucide-react'

export default function Home() {
  const galleryItems = [
    {
      image: '/Fishermen-on-Lake-Victoria-in-Uganda.webp',
      title: 'Documentary Films',
      description: 'Explore the fascinating history of the Luo community, from ancient traditions to modern developments.'
    },
    {
      image: '/hero.jpeg',
      title: 'Plays and Theatre',
      description: 'Discover the unique cultural practices, traditions, and values that define the Luo community.'
    },
    {
      image: '/Kodhek Argwins.png',
      title: 'Notable People',
      description: 'Learn about influential Luo leaders, elders, and community members who shaped our history.'
    },
    {
      image: '/Guerrier_Luo.jpeg',
      title: 'Historical Places',
      description: 'Visit significant locations and landmarks that hold cultural and historical importance.'
    },
    {
      image: '/Kenia-Lake_Victoria-Fischer.webp',
      title: 'Community Events',
      description: 'Stay updated on cultural events, celebrations, and important community gatherings.'
    },
    {
      image: '/fishinf at the lake.avif',
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

  const featuredStories = [
    {
      title: 'The Origins of Luo Migration',
      description: 'Explore the fascinating journey of the Luo people and their settlement patterns across East Africa.',
      href: '/culture',
      image: '/657152Ew0bLSIn.jpg'
    },
    {
      title: 'Traditional Luo Ceremonies',
      description: 'Learn about the rich ceremonial traditions that mark important life events in Luo culture.',
      href: '/culture',
      image: '/Fishermen-on-Lake-Victoria-in-Uganda.webp'
    },
    {
      title: 'JoAlego',
      description: 'Discover the rich culture of the JoAlego, and their journey to their current settlement.',
      href: '/people',
      image: '/Kenia-Lake_Victoria-Fischer.webp'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="text-5xl font-bold mb-6">
            Celebrating the Legacy, Empowering the Future
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
      <section className="section bg-white" style={{ padding: '1rem 0' }}>
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

      {/* Gallery  Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Community Gallery</h2>
          <p className="section-subtitle">
            Photos, videos, and stories from our community events and activities
          </p>
          
          <div className="feature-grid">
            {galleryItems.map((item, index) => (
              <div key={index} className="feature-card">
                <div className="gallery-card-image">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-description">{item.description}</p>
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
            {featuredStories.map((story) => {
              const Icon = story
              return (
                <div className="card" key={story.title}>
                  <div
                    style={{
                      position: 'relative',
                      height: '200px',
                      width: '100%',
                      borderRadius: '12px 12px 0 0',
                      overflow: 'hidden'
                    }}
                  >
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      
                    </div>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{story.title}</h3>
                    <p className="card-text">{story.description}</p>
                    <Link href={story.href} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                      Read More
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              )
            })}
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
