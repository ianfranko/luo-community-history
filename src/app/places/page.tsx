import Link from 'next/link'
import { MapPin, Home, Mountain, TreePine, ArrowRight, Search, Calendar } from 'lucide-react'

export default function PlacesPage() {
  const placeTypes = [
    {
      icon: Home,
      title: 'Villages & Settlements',
      description: 'Traditional Luo villages and modern settlements that hold historical significance.',
      count: 45
    },
    {
      icon: Mountain,
      title: 'Sacred Sites',
      description: 'Sacred hills, rocks, and natural landmarks that are important to Luo spirituality.',
      count: 20
    },
    {
      icon: TreePine,
      title: 'Historical Landmarks',
      description: 'Significant locations, monuments, and places that mark important events in Luo history.',
      count: 15
    },
    {
      icon: MapPin,
      title: 'Migration Routes',
      description: 'Ancient paths and routes taken by Luo people during their historical migrations.',
      count: 8
    }
  ]

  const featuredPlaces = [
    {
      name: 'Rusinga Island',
      type: 'Sacred Site',
      county: 'Homa Bay County',
      description: 'An important island in Lake Victoria with rich archaeological sites and cultural significance to the Luo community.',
      significance: 'Archaeological site with evidence of early Luo settlement and fishing traditions.',
      coordinates: '-0.4167, 34.1667'
    },
    {
      name: 'Kisumu City',
      type: 'Modern Settlement',
      county: 'Kisumu County',
      description: 'The major urban center of the Luo community, known as the "City of the Lake" and a hub of Luo culture and commerce.',
      significance: 'Economic and cultural center of the Luo community in Kenya.',
      coordinates: '-0.0917, 34.7681'
    },
    {
      name: 'Got Ramogi',
      type: 'Sacred Hill',
      county: 'Siaya County',
      description: 'A sacred hill named after Ramogi, the legendary founder of the Luo people, with deep cultural and spiritual significance.',
      significance: 'Traditional religious site and symbol of Luo identity and origin.',
      coordinates: '-0.1000, 34.2500'
    }
  ]

  const recentPlaces = [
    {
      name: 'Kendu Bay',
      type: 'Village',
      county: 'Homa Bay',
      addedDate: '2024-01-15'
    },
    {
      name: 'Bondo',
      type: 'Town',
      county: 'Siaya',
      addedDate: '2024-01-12'
    },
    {
      name: 'Migori',
      type: 'Town',
      county: 'Migori',
      addedDate: '2024-01-10'
    },
    {
      name: 'Yala',
      type: 'Village',
      county: 'Siaya',
      addedDate: '2024-01-08'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="text-5xl font-bold mb-6">
              Historical Places
            </h1>
            <p className="text-xl mb-8" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              Explore the significant locations, villages, and landmarks that hold special meaning 
              in Luo community history and culture.
            </p>
          </div>
        </div>
      </section>

      {/* Place Types */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Explore by Type</h2>
          <p className="section-subtitle">
            Discover different categories of places important to Luo history
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {placeTypes.map((type, index) => (
              <div key={index} className="card">
                <div className="card-body text-center">
                  <div className="feature-icon" style={{ margin: '0 auto 1rem' }}>
                    <type.icon size={24} />
                  </div>
                  <h3 className="card-title">{type.title}</h3>
                  <p className="card-text">{type.description}</p>
                  <div style={{ marginTop: '1rem' }}>
                    <span style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: '700', 
                      color: 'var(--primary-color)' 
                    }}>
                      {type.count}
                    </span>
                    <span style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--text-light)', 
                      display: 'block' 
                    }}>
                      places
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Places */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Featured Places</h2>
          <p className="section-subtitle">
            Discover some of the most significant locations in Luo history
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPlaces.map((place, index) => (
              <div key={index} className="card">
                <div style={{ 
                  height: '200px', 
                  background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MapPin size={48} color="white" />
                </div>
                <div className="card-body">
                  <h3 className="card-title">{place.name}</h3>
                  <p style={{ 
                    color: 'var(--primary-color)', 
                    fontWeight: '600', 
                    marginBottom: '0.5rem' 
                  }}>
                    {place.type}
                  </p>
                  
                  <div className="space-y-2" style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={16} color="var(--text-light)" />
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                        {place.county}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={16} color="var(--text-light)" />
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                        {place.coordinates}
                      </span>
                    </div>
                  </div>
                  
                  <p className="card-text">{place.description}</p>
                  
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '0.75rem', 
                    backgroundColor: 'var(--bg-light)', 
                    borderRadius: '0.5rem' 
                  }}>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--text-dark)', 
                      fontWeight: '600', 
                      marginBottom: '0.25rem' 
                    }}>
                      Historical Significance:
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                      {place.significance}
                    </p>
                  </div>
                  
                  <Link href={`/places/${place.name.toLowerCase().replace(/\s+/g, '-')}`} 
                        className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Learn More
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Additions & Search */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="section-title">Recently Added</h2>
              <p className="section-subtitle">
                Latest places added to our historical archive
              </p>
              
              <div className="space-y-4">
                {recentPlaces.map((place, index) => (
                  <div key={index} className="card">
                    <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ 
                        width: '60px', 
                        height: '60px', 
                        background: 'var(--bg-gradient)', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}>
                        <MapPin size={24} color="white" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                          {place.name}
                        </h4>
                        <p style={{ 
                          color: 'var(--primary-color)', 
                          fontSize: '0.875rem', 
                          fontWeight: '600',
                          marginBottom: '0.25rem' 
                        }}>
                          {place.type}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <MapPin size={14} color="var(--text-light)" />
                          <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                            {place.county}
                          </span>
                          <span style={{ color: 'var(--text-light)' }}>•</span>
                          <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                            Added {new Date(place.addedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Link href={`/places/${place.name.toLowerCase().replace(/\s+/g, '-')}`} 
                            className="btn btn-outline">
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Add a Place</h3>
                  <p className="card-text">
                    Know of a significant place in Luo history? Share its story and help us preserve 
                    its importance for future generations.
                  </p>
                  <Link href="/contribute" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    <MapPin size={20} />
                    Share Location
                  </Link>
                </div>
              </div>
              
              <div className="card" style={{ marginTop: '1.5rem' }}>
                <div className="card-body">
                  <h3 className="card-title">Search Places</h3>
                  <p className="card-text">
                    Looking for a specific place? Search by name, county, or type.
                  </p>
                  <div style={{ marginTop: '1rem' }}>
                    <input
                      type="text"
                      placeholder="Search places..."
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid var(--border-color)',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        marginBottom: '0.5rem'
                      }}
                    />
                    <button className="btn btn-primary" style={{ width: '100%' }}>
                      <Search size={16} />
                      Search
                    </button>
                  </div>
                </div>
              </div>

              <div className="card" style={{ marginTop: '1.5rem' }}>
                <div className="card-body">
                  <h3 className="card-title">Interactive Map</h3>
                  <p className="card-text">
                    Explore Luo historical places on an interactive map to see their locations 
                    and learn about their significance.
                  </p>
                  <Link href="/places/map" className="btn btn-outline" style={{ marginTop: '1rem' }}>
                    View Map
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="section bg-white">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">88+</span>
              <span className="stat-label">Historical Places</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">45+</span>
              <span className="stat-label">Villages & Towns</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">20+</span>
              <span className="stat-label">Sacred Sites</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">8+</span>
              <span className="stat-label">Migration Routes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-gradient" style={{ color: 'white' }}>
        <div className="container text-center">
          <h2 className="section-title" style={{ color: 'white' }}>
            Preserve Our Places
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Every place has a story. Help us document the locations that are important to Luo history 
            and ensure they are remembered for generations to come.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link href="/contribute" className="btn" style={{ 
              backgroundColor: 'white', 
              color: 'var(--primary-color)',
              border: '2px solid white'
            }}>
              <MapPin size={20} />
              Add a Place
            </Link>
            <Link href="/places/map" className="btn btn-outline" style={{ 
              borderColor: 'white', 
              color: 'white' 
            }}>
              Explore Map
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
