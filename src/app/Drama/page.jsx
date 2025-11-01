import Link from 'next/link'
import { Film, Theater, Tv, Users, Award, TrendingUp, ArrowRight, BookOpen, Calendar } from 'lucide-react'

export default function DramaPage() {
  const dramaCategories = [
    {
      icon: Theater,
      title: 'Traditional Theatre',
      description: 'Experience authentic Luo storytelling through traditional theatrical performances that preserve our cultural narratives.',
      productions: 12,
      slug: 'traditional-theatre'
    },
    {
      icon: Tv,
      title: 'Television Series',
      description: 'Modern Luo drama series broadcast on television, bringing contemporary stories to screens across East Africa.',
      productions: 8,
      slug: 'television-series'
    },
    {
      icon: Film,
      title: 'Film Productions',
      description: 'Feature films and documentaries that showcase Luo culture, history, and modern life experiences.',
      productions: 15,
      slug: 'film-productions'
    },
    {
      icon: Users,
      title: 'Community Theatre',
      description: 'Grassroots theatrical productions performed by local groups, celebrating community stories and experiences.',
      productions: 20,
      slug: 'community-theatre'
    }
  ]

  const featuredProductions = [
    {
      title: 'Duol Miaha (Return Home)',
      description: 'A compelling drama about a young professional returning to his village, exploring the tension between modern life and traditional values.',
      category: 'Television Series',
      year: '2023',
      duration: '12 episodes',
      language: 'Dholuo with subtitles'
    },
    {
      title: 'Nyar Nam (Daughter of the Lake)',
      description: 'A theatrical performance celebrating the connection between Luo people and Lake Victoria, featuring traditional music and dance.',
      category: 'Traditional Theatre',
      year: '2024',
      duration: '90 minutes',
      language: 'Dholuo'
    },
    {
      title: 'Tero Buru (Preserving Heritage)',
      description: 'Documentary-style drama following three generations as they navigate cultural preservation in a rapidly changing world.',
      category: 'Film Productions',
      year: '2023',
      duration: '110 minutes',
      language: 'Mixed (Dholuo/English)'
    }
  ]

  const notableArtists = [
    {
      name: 'Omondi Ojwang',
      role: 'Playwright & Director',
      notable: 'Pioneer of modern Luo theatre'
    },
    {
      name: 'Akinyi Odhiambo',
      role: 'Actress & Producer',
      notable: 'Multiple award winner'
    },
    {
      name: 'Tom Mboya Cultural Troupe',
      role: 'Theatre Group',
      notable: 'Active since 1975'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="text-5xl font-bold mb-6">
              Luo Drama & Performing Arts
            </h1>
            <p className="text-xl mb-8" style={{ maxWidth: '700px', margin: '0 auto 2rem' }}>
              Explore the vibrant world of Luo drama, from traditional theatrical performances 
              to modern television series and films that celebrate our culture and tell our stories.
            </p>
          </div>
        </div>
      </section>

      {/* About Luo Drama Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ alignItems: 'center' }}>
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                About Luo Drama
              </h2>
              <div className="space-y-4">
                <p style={{ color: 'var(--text-dark)', lineHeight: '1.8', marginBottom: '1rem' }}>
                  Luo drama has deep roots in traditional storytelling, where oral narratives were 
                  performed by skilled storytellers (jothum) during community gatherings. These 
                  performances combined spoken word, music, dance, and mime to convey moral lessons, 
                  historical events, and cultural values.
                </p>
                <p style={{ color: 'var(--text-dark)', lineHeight: '1.8', marginBottom: '1rem' }}>
                  Modern Luo drama has evolved while maintaining its cultural essence. Today, Luo 
                  theatre groups, television productions, and films continue to serve as powerful 
                  mediums for cultural preservation, social commentary, and entertainment.
                </p>
                <p style={{ color: 'var(--text-dark)', lineHeight: '1.8' }}>
                  From community performances in village squares to professionally produced television 
                  series, Luo drama remains a vital part of cultural identity, bridging generations 
                  and keeping the Dholuo language alive.
                </p>
              </div>
            </div>
            <div className="card">
              <div style={{ 
                height: '300px', 
                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <Theater size={120} color="white" style={{ opacity: 0.3, position: 'absolute' }} />
                <Film size={80} color="white" />
              </div>
              <div className="card-body">
                <h3 className="card-title">Key Elements of Luo Drama</h3>
                <ul style={{ listStyleType: 'none', padding: 0, marginTop: '1rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--primary-color)', fontSize: '1.5rem' }}>•</span>
                    <span>Storytelling through music and dance</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--primary-color)', fontSize: '1.5rem' }}>•</span>
                    <span>Use of Dholuo language and proverbs</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--primary-color)', fontSize: '1.5rem' }}>•</span>
                    <span>Cultural themes and moral lessons</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--primary-color)', fontSize: '1.5rem' }}>•</span>
                    <span>Community participation and engagement</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drama Categories */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Drama Categories</h2>
          <p className="section-subtitle">
            Explore different forms of Luo dramatic expression
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dramaCategories.map((category, index) => (
              <div key={index} className="card">
                <div className="card-body">
                  <div className="feature-icon" style={{ margin: '0 0 1rem 0' }}>
                    <category.icon size={24} />
                  </div>
                  <h3 className="card-title">{category.title}</h3>
                  <p className="card-text">{category.description}</p>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginTop: '1rem' 
                  }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                      {category.productions} productions
                    </span>
                    <Link href={`/Drama/${category.slug}`} className="btn btn-primary">
                      View
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Productions */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Productions</h2>
          <p className="section-subtitle">
            Discover acclaimed Luo drama productions that showcase our cultural heritage
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProductions.map((production, index) => (
              <div key={index} className="card">
                <div style={{ 
                  height: '200px', 
                  background: index === 0 
                    ? 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))'
                    : index === 1
                    ? 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))'
                    : 'linear-gradient(135deg, var(--accent-color), var(--primary-color))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {index === 0 ? <Tv size={48} color="white" /> : 
                   index === 1 ? <Theater size={48} color="white" /> : 
                   <Film size={48} color="white" />}
                </div>
                <div className="card-body">
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '0.5rem' 
                  }}>
                    <span style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--primary-color)', 
                      fontWeight: '600' 
                    }}>
                      {production.category}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                      {production.year}
                    </span>
                  </div>
                  <h3 className="card-title">{production.title}</h3>
                  <p className="card-text">{production.description}</p>
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                      <span style={{ color: 'var(--text-light)' }}>Duration:</span>
                      <span style={{ color: 'var(--text-dark)' }}>{production.duration}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--text-light)' }}>Language:</span>
                      <span style={{ color: 'var(--text-dark)' }}>{production.language}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traditional Drama Elements */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Traditional Drama Elements</h2>
          <p className="section-subtitle">
            Core components that define authentic Luo dramatic performances
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Sigana (Musical Performance)</h3>
                <p className="card-text">
                  Traditional musical performances featuring drums (bul), nyatiti (lyre), and orutu (one-string fiddle) 
                  that accompany dramatic narratives and enhance storytelling.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Dudu (Dance-Drama)</h3>
                <p className="card-text">
                  Choreographed movements that tell stories through dance, often depicting historical events, 
                  hunting expeditions, or courtship rituals central to Luo culture.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Pakruok (Oral Poetry)</h3>
                <p className="card-text">
                  Poetic recitations and praise poetry performed by skilled orators, celebrating heroes, 
                  ancestors, and significant community events.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Wend (Storytelling)</h3>
                <p className="card-text">
                  Narrative performances by jothum (storytellers) who use voice modulation, gestures, 
                  and audience participation to bring tales to life.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Miel (Costuming)</h3>
                <p className="card-text">
                  Traditional attire and adornments including animal skins, beaded ornaments, and 
                  ceremonial dress that authenticate performances.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Luongo (Comedy)</h3>
                <p className="card-text">
                  Humorous sketches and satirical performances that provide social commentary 
                  while entertaining audiences with wit and clever wordplay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notable Artists */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Notable Drama Artists</h2>
          <p className="section-subtitle">
            Celebrating the talents who bring Luo stories to life
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notableArtists.map((artist, index) => (
              <div key={index} className="card">
                <div className="card-body text-center">
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}>
                    <Users size={40} color="white" />
                  </div>
                  <h3 className="card-title">{artist.name}</h3>
                  <p style={{ 
                    color: 'var(--primary-color)', 
                    fontWeight: '600', 
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem' 
                  }}>
                    {artist.role}
                  </p>
                  <p className="card-text">{artist.notable}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Luo Drama Impact</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Active Theatre Groups</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Productions Annually</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15</span>
              <span className="stat-label">TV Series</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">25+</span>
              <span className="stat-label">Award-Winning Films</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-gradient" style={{ color: 'white' }}>
        <div className="container text-center">
          <h2 className="section-title" style={{ color: 'white' }}>
            Experience Luo Drama
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Discover performances, watch productions, and support Luo dramatic arts
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link href="/Drama/upcoming-shows" className="btn btn-outline" style={{ 
              borderColor: 'white', 
              color: 'white' 
            }}>
              <Calendar size={20} />
              Upcoming Shows
            </Link>
            <Link href="/contribute" className="btn btn-outline" style={{ 
              borderColor: 'white', 
              color: 'white' 
            }}>
              <BookOpen size={20} />
              Share Your Story
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

