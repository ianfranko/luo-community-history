'use client';
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const galleryItems = [
    {
      image: '/Fishermen-on-Lake-Victoria-in-Uganda.webp',
      description: 'Explore the fascinating history of the Luo community, from ancient traditions to modern developments.',
      alt: 'Luo fishermen casting their nets on Lake Victoria at sunrise',
      category: 'Heritage Films',
      location: 'Lake Victoria, Homa Bay',
      year: '1962 archive',
      ctaLabel: 'Watch Film',
      href: '/Gallery',
      title: 'Documentary Films'
    },
    {
      image: '/hero.jpeg',
      description: 'Discover the unique cultural practices, traditions, and values that define the Luo community.',
      alt: 'Actors performing a traditional Luo play on stage',
      category: 'Performance Arts',
      location: 'Nairobi National Theatre',
      year: '1978 revival',
      ctaLabel: 'View Script',
      href: '/culture',
      title: 'Plays and Theatre'
    },
    {
      image: '/Kodhek Argwins.png',
      description: 'Learn about influential Luo leaders, elders, and community members who shaped our history.',
      alt: 'Archival portrait of Argwings Kodhek',
      category: 'Community Voices',
      location: 'Kisumu & Alego',
      year: '1960s oral records',
      ctaLabel: 'View Profile',
      href: '/people',
      title: 'Community Voices'
    },
    {
      image: '/Guerrier_Luo.jpeg',
      description: 'Visit significant locations and landmarks that hold cultural and historical importance.',
      alt: 'Historic Luo warrior statue in Kisumu museum',
      category: 'Sites & Landmarks',
      location: 'Kisumu Museum',
      year: '1930s exhibit',
      ctaLabel: 'Explore Site',
      href: '/places',
      title: 'Sites & Landmarks'
    },

  ]

  const galleryThemes = ['All', ...new Set(galleryItems.map((item) => item.category))]

  const stats = [
    { number: '200+', label: 'Historical Articles' },
    { number: '100+', label: 'Cultural Stories' },
    { number: '20+', label: 'Documentaries' },
    { number: '25+', label: 'Historical Places' }
  ]

  const sectionLinks = [
    { href: '#gallery', label: 'Interviews & Polls' },
    { href: '#stories', label: 'Voices of Jopiny' },
  ]

  const valueProps = [
    {
      title: 'Archive Access',
      description: 'Digitised oral histories, ceremonies, and timelines ready to explore.',

    },
    {
      title: 'Community Voices',
      description: 'Stories curated with elders, scholars, and youth leaders.',

    },
    {
      title: 'Living Culture',
      description: 'Guides on language, music, crafts, and celebrations to keep traditions alive.',

    }
  ]

  const featuredStories = [
    {
      title: 'The Origins of Luo Migration',
      description: 'Explore the fascinating journey of the Luo people and their settlement patterns across East Africa.',
      href: '/culture',
      image: '/657152Ew0bLSIn.jpg',
      era: '15th Century',
      region: 'Lake Victoria Basin',
      format: 'Longform'
    },
    {
      title: 'Traditional Luo Ceremonies',
      description: 'Learn about the rich ceremonial traditions that mark important life events in Luo culture.',
      href: '/culture',
      image: '/Fishermen-on-Lake-Victoria-in-Uganda.webp',
      era: 'Generational',
      region: 'Siaya & Migori',
      format: 'Photo Essay'
    },
    {
      title: 'JoAlego',
      description: 'Discover the rich culture of the JoAlego, and their journey to their current settlement.',
      href: '/people',
      image: '/Kenia-Lake_Victoria-Fischer.webp',
      era: '20th Century',
      region: 'Alego-Kogelo',
      format: 'Audio + Transcript'
    }
  ]

  const testimonials = [
    {
      quote: 'This archive helped me trace my grandparents’ migration story and reconnect with relatives across the lake.',
      name: 'Pamela Auma',
      title: 'Community Historian, Oyugis'
    },
    {
      quote: 'Our learners finally have contemporary Luo heroes to study, not just footnotes in colonial texts.',
      name: 'Mr. Okoth',
      title: 'Teacher, Kisumu Day'
    },
    {
      quote: 'Recording my grandmother’s songs here means my children will always know their mother tongue.',
      name: 'Brian Oduor',
      title: 'Cultural Volunteer'
    }
  ]

  const voiceGalleryImages = [
    {
      image: '/hero.jpeg',
      alt: 'Community elder sharing traditional stories',
      caption: 'Preserving oral traditions for future generations'
    },
    {
      image: '/Fishermen-on-Lake-Victoria-in-Uganda.webp',
      alt: 'Fishermen on Lake Victoria',
      caption: 'Daily life and livelihoods of our people'
    },
    {
      image: '/657152Ew0bLSIn.jpg',
      alt: 'Traditional cultural ceremony',
      caption: 'Celebrating our rich cultural heritage'
    },
    {
      image: '/Guerrier_Luo.jpeg',
      alt: 'Historical Luo warrior',
      caption: 'Honoring our ancestors and their legacy'
    },
    {
      image: '/Kenia-Lake_Victoria-Fischer.webp',
      alt: 'Lake Victoria landscape',
      caption: 'The heart of our homeland'
    }
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % voiceGalleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + voiceGalleryImages.length) % voiceGalleryImages.length)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Wan JoLuo And We Are Proud
            </h1>
            <p className="text-xl mb-8" style={{ maxWidth: '700px', margin: '0 auto 3rem' }}>
              Awakening the Luo community to its full cultural, intellectual, and economic potential. Restoring unity, and purpose among our people.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/culture" className="btn btn-primary">
                Join Community
              </Link>
              <Link href="/Gallery" className="btn btn-primary">
                View Literature Archive
              </Link>
            </div>
            <nav style={{ marginTop: '2rem' }}>
              <ul style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.08em', listStyle: 'none', padding: 0 }}>
                {sectionLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} style={{ color: 'rgba(255,255,255,0.8)' }}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {/* Stats Section 
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
      </section>*/}



      {/* Community Archive Section */}
      <section className="section" id="gallery">
        <div className="container">
          <h2 className="section-title">Community Archive</h2>
          <p className="section-subtitle">
            Photos, videos, and stories from our community events and activities
          </p>
          <div
            className="feature-grid"
            style={{
              gap: '1.25rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'
            }}
          >
            {galleryItems.map((item, index) => (
              <article
                key={index}
                className="feature-card"
                style={{ padding: 0, overflow: 'hidden', maxWidth: '360px', margin: '0 auto' }}
              >
                <div
                  className="gallery-card-image"
                  style={{ position: 'relative', height: '200px', width: '100%' }}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      padding: '1rem',
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0) 100%)'
                    }}
                  >
                    <span
                      style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '999px',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        color: 'white',
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em'
                      }}
                    >

                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>
                      {item.location}
                    </span>
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      fontSize: '0.85rem',
                      color: 'var(--muted)',
                      marginBottom: '0.5rem'
                    }}
                  >
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>{item.year}</span>
                  </div>
                  <h3 className="feature-title" style={{ marginBottom: '0.35rem' }}>
                    {item.title}
                  </h3>
                  <p className="feature-description" style={{ marginBottom: '1rem' }}>
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    className="btn btn-link"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: 0,
                      fontWeight: 600
                    }}
                    aria-label={`${item.ctaLabel} for ${item.title}`}
                  >
                    {item.ctaLabel}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <Link href="/Gallery" className="btn btn-outline" style={{ fontSize: '0.9rem' }}>
              Submit Your Story
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="voices"
        className="section bg-cream"
      >
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Voice of the People</h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              Hear directly from elders, educators, and culture-bearers using this archive to preserve our heritage.
            </p>
          </div>



          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((voice) => (
              <blockquote
                key={voice.name}
                className="bg-white p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100"
              >
                <div className="mb-6 text-primary">
                  <Quote size={32} className="opacity-80" />
                </div>
                <p className="text-gray-700 italic text-lg mb-6 flex-grow leading-relaxed">
                  &quot;{voice.quote}&quot;
                </p>
                <div className="mt-auto border-t border-gray-100 pt-4">
                  <div className="font-bold text-gray-900 text-lg">{voice.name}</div>
                  <div className="text-sm text-primary font-medium uppercase tracking-wide">{voice.title}</div>
                </div>
              </blockquote>
            ))}
          </div>

          <div>

          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="section bg-white" id="stories">
        <div className="container">
          <h2 className="section-title">Featured Stories</h2>
          <p className="section-subtitle">
            Discover the most popular and recent additions to our community archive
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <div className="card" key={story.title}>
                <div
                  style={{
                    position: 'relative',
                    height: '200px',
                    width: '100%',
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
                      alignItems: 'flex-end',
                      justifyContent: 'flex-start',
                      padding: '1rem'
                    }}
                  >
                    <span style={{ color: 'white', fontSize: '0.85rem', letterSpacing: '0.08em' }}>{story.format}</span>
                  </div>
                </div>
                <div className="card-body">
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--muted)' }}>
                    <span>{story.era}</span>
                    <span>•</span>
                    <span>{story.region}</span>
                  </div>
                  <h3 className="card-title" style={{ marginTop: '0.5rem' }}>{story.title}</h3>
                  <p className="card-text">{story.description}</p>
                  <Link href={story.href} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Read More
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section bg-gradient" style={{ color: 'white' }}>
        <div
          className="container"
          style={{
            display: 'grid',
            gap: '2rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            alignItems: 'center'
          }}
        >
          <div>
            <p
              className="eyebrow"
              style={{
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: '0.12em',
                textAlign: 'left'
              }}
            >
              Community Call
            </p>
            <h2 className="section-title" style={{ color: 'white', textAlign: 'left' }}>
              Be Part of Our Story
            </h2>
            <p
              className="section-subtitle"
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'left',
                marginLeft: 0,
                marginRight: 0
              }}
            >
              Your support powers oral-history digitization, artifact curation, and hands-on workshops that keep Luo heritage accessible.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                marginTop: '1.5rem'
              }}
            >
              <Link
                href="/culture"
                className="btn btn-primary"
                aria-label="Support Luo culture digitization"
                style={{ backgroundColor: 'white', color: '#111', borderColor: 'white' }}
              >
                Support Digitization
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/about"
                className="btn btn-outline"
                aria-label="Learn more about our mission"
                style={{
                  borderColor: 'rgba(255,255,255,0.6)',
                  color: 'white',
                  backgroundColor: 'transparent'
                }}
              >
                Learn More
                <ArrowRight size={18} />
              </Link>
            </div>
            <span style={{ marginTop: '0.75rem', display: 'inline-block', color: 'rgba(255,255,255,0.85)' }}>
              Every contribution equips field teams with scanners, storage, and volunteer training.
            </span>
          </div>

          <div className="cta-card cta-card-gradient">
            <div className="cta-stat">1,000+</div>
            <p className="cta-label">Artifacts digitized with village archives</p>
            <p className="cta-body">Join 30+ volunteers safeguarding oral histories across Kenya and beyond.</p>
          </div>
        </div>
      </section>
    </>
  )
}
