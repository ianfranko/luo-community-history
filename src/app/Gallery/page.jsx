import Link from 'next/link'
import { Image, Camera, Film, Users, Calendar, MapPin, ArrowRight, Download, Share2, Eye } from 'lucide-react'

export default function GalleryPage() {
  const galleryCategories = [
    {
      title: 'Cultural Festivals',
      count: 120,
      description: 'Vibrant celebrations of Luo traditions, music, dance, and ceremonies from around the world.',
      featured: true
    },
    {
      title: 'Community Projects',
      count: 85,
      description: 'Development initiatives including schools, health centers, and infrastructure improvements.',
      featured: true
    },
    {
      title: 'Educational Programs',
      count: 95,
      description: 'Workshops, seminars, mentorship sessions, and scholarship award ceremonies.',
      featured: false
    },
    {
      title: 'Youth Engagement',
      count: 70,
      description: 'Youth leadership programs, sports events, and cultural exchange activities.',
      featured: false
    },
    {
      title: 'Heritage Sites',
      count: 60,
      description: 'Historical locations, landmarks, and places of cultural significance to the Luo people.',
      featured: false
    },
    {
      title: 'Diaspora Events',
      count: 110,
      description: 'Gatherings, networking events, and cultural celebrations in diaspora communities.',
      featured: true
    },
    {
      title: 'Traditional Ceremonies',
      count: 55,
      description: 'Wedding ceremonies, naming rituals, and other important cultural celebrations.',
      featured: false
    },
    {
      title: 'Music & Dance',
      count: 90,
      description: 'Traditional and contemporary Luo musical performances and dance exhibitions.',
      featured: false
    },
    {
      title: 'Art & Crafts',
      count: 45,
      description: 'Traditional and modern Luo artwork, pottery, beadwork, and handicrafts.',
      featured: false
    }
  ]

  const featuredPhotos = [
    {
      title: 'Luo Cultural Festival 2024',
      category: 'Cultural Festivals',
      location: 'Kisumu, Kenya',
      date: 'August 2024',
      views: '15.2K',
      photos: 45
    },
    {
      title: 'New School Inauguration',
      category: 'Community Projects',
      location: 'Siaya County',
      date: 'July 2024',
      views: '8.5K',
      photos: 32
    },
    {
      title: 'Scholarship Awards Ceremony',
      category: 'Educational Programs',
      location: 'Nairobi, Kenya',
      date: 'June 2024',
      views: '12.8K',
      photos: 28
    },
    {
      title: 'Diaspora Reunion London',
      category: 'Diaspora Events',
      location: 'London, UK',
      date: 'September 2024',
      views: '9.3K',
      photos: 38
    },
    {
      title: 'Traditional Dance Performance',
      category: 'Music & Dance',
      location: 'Homa Bay',
      date: 'May 2024',
      views: '18.7K',
      photos: 52
    },
    {
      title: 'Youth Leadership Summit',
      category: 'Youth Engagement',
      location: 'Kisumu, Kenya',
      date: 'October 2024',
      views: '7.1K',
      photos: 41
    }
  ]

  const recentUploads = [
    {
      title: 'Lake Victoria Sunset',
      uploader: 'John Omondi',
      date: '2 days ago',
      likes: 234
    },
    {
      title: 'Traditional Pottery Making',
      uploader: 'Mary Akinyi',
      date: '5 days ago',
      likes: 187
    },
    {
      title: 'Community Health Center',
      uploader: 'Peter Otieno',
      date: '1 week ago',
      likes: 312
    },
    {
      title: 'Youth Football Tournament',
      uploader: 'Grace Adhiambo',
      date: '1 week ago',
      likes: 156
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="text-5xl font-bold mb-6">
              Photo Gallery
            </h1>
            <p className="text-xl mb-8" style={{ maxWidth: '700px', margin: '0 auto 2rem' }}>
              Explore our visual journey through thousands of photos capturing Luo culture, 
              community events, heritage sites, and moments that tell our story.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contribute" className="btn btn-primary">
                <Camera size={20} />
                Upload Photos
              </Link>
              <button className="btn btn-outline">
                <Share2 size={20} />
                Share Gallery
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Collections</h2>
          <p className="section-subtitle">
            Our most popular and recently updated photo albums
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPhotos.map((album, index) => (
              <div key={index} className="card" style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}>
                <div style={{ 
                  height: '250px', 
                  background: index % 3 === 0 
                    ? 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))'
                    : index % 3 === 1
                    ? 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))'
                    : 'linear-gradient(135deg, var(--accent-color), var(--primary-color))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Image size={80} color="white" style={{ opacity: 0.8 }} />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.95)',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                    color: 'var(--primary-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Camera size={16} />
                    {album.photos} Photos
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    background: 'rgba(0, 0, 0, 0.7)',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Eye size={16} />
                    {album.views} views
                  </div>
                </div>
                <div className="card-body">
                  <span style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--primary-color)', 
                    fontWeight: '600',
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}>
                    {album.category}
                  </span>
                  <h3 className="card-title">{album.title}</h3>
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-light)' }}>
                      <MapPin size={16} />
                      <span>{album.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-light)' }}>
                      <Calendar size={16} />
                      <span>{album.date}</span>
                    </div>
                  </div>
                  <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                    View Album
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Gallery Categories */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-subtitle">
            Explore photos organized by themes and topics
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryCategories.map((category, index) => (
              <div key={index} className="card">
                <div style={{ 
                  height: '180px', 
                  background: index % 3 === 0 
                    ? 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))'
                    : index % 3 === 1
                    ? 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))'
                    : 'linear-gradient(135deg, var(--accent-color), var(--primary-color))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Image size={60} color="white" style={{ opacity: 0.7 }} />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                    color: 'var(--primary-color)'
                  }}>
                    {category.count} Photos
                  </div>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{category.title}</h3>
                  <p className="card-text">{category.description}</p>
                  <button className="btn btn-outline" style={{ marginTop: '1rem', width: '100%' }}>
                    Browse Photos
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Uploads */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Recent Uploads</h2>
          <p className="section-subtitle">
            Newest additions to our community gallery
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentUploads.map((upload, index) => (
              <div key={index} className="card">
                <div style={{ 
                  height: '200px', 
                  background: index % 2 === 0 
                    ? 'linear-gradient(135deg, var(--primary-color), var(--accent-color))'
                    : 'linear-gradient(135deg, var(--secondary-color), var(--primary-color))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Camera size={48} color="white" style={{ opacity: 0.8 }} />
                </div>
                <div className="card-body">
                  <h3 className="card-title" style={{ fontSize: '1rem' }}>{upload.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>
                    by {upload.uploader}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-color)'
                  }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                      {upload.date}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--primary-color)', fontWeight: '600' }}>
                      ❤️ {upload.likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Contribute */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Contribute to Our Gallery</h2>
          <p className="section-subtitle">
            Help us document and preserve Luo heritage through photography
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <div className="card-body text-center">
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.5rem',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  1
                </div>
                <h3 className="card-title">Take Photos</h3>
                <p className="card-text">
                  Capture moments from cultural events, community gatherings, heritage sites, or daily life 
                  that showcase Luo traditions and community.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body text-center">
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.5rem',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  2
                </div>
                <h3 className="card-title">Upload & Tag</h3>
                <p className="card-text">
                  Upload your photos with detailed descriptions, locations, dates, and relevant tags to make 
                  them easy to discover and appreciate.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body text-center">
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-color), var(--primary-color))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.5rem',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  3
                </div>
                <h3 className="card-title">Share & Engage</h3>
                <p className="card-text">
                  Share your albums with the community, engage with other photographers, and help preserve 
                  our collective visual heritage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-gradient" style={{ color: 'white' }}>
        <div className="container text-center">
          <h2 className="section-title" style={{ color: 'white' }}>
            Every Photo Tells Our Story
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Join our community of photographers and help document Luo heritage for future generations
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link href="/contribute" className="btn btn-outline" style={{ 
              borderColor: 'white', 
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)'
            }}>
              <Camera size={20} />
              Upload Your Photos
            </Link>
            <Link href="/about" className="btn btn-outline" style={{ 
              borderColor: 'white', 
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)'
            }}>
              <Users size={20} />
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
