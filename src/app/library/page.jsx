import Link from 'next/link'
import { BookOpen, Library, FileText, Video, Music, Image, Download, Search, Users, Globe, Award, TrendingUp, ArrowRight, BookMarked, Headphones, Film, Newspaper, GraduationCap, Languages, History } from 'lucide-react'

export default function LibraryPage() {
  const libraryCategories = [
    {
      icon: BookOpen,
      title: 'Books & Literature',
      count: '250+',
      description: 'Comprehensive collection of books about Luo history, culture, traditions, and contemporary literature by Luo authors.',
      color: 'var(--primary-color)'
    },
    {
      icon: FileText,
      title: 'Research Papers',
      count: '180+',
      description: 'Academic research, theses, and scholarly articles covering anthropology, linguistics, and Luo studies.',
      color: 'var(--secondary-color)'
    },
    {
      icon: History,
      title: 'Historical Documents',
      count: '320+',
      description: 'Archived documents, manuscripts, letters, and historical records preserving Luo heritage.',
      color: 'var(--accent-color)'
    },
    {
      icon: Languages,
      title: 'Language Resources',
      count: '95+',
      description: 'Dholuo dictionaries, grammar guides, learning materials, and linguistic studies.',
      color: 'var(--primary-color)'
    },
    {
      icon: Newspaper,
      title: 'Publications & Articles',
      count: '400+',
      description: 'Newsletters, magazines, journals, and articles from Luo communities worldwide.',
      color: 'var(--secondary-color)'
    },
    {
      icon: Film,
      title: 'Video Archive',
      count: '150+',
      description: 'Documentary films, cultural performances, oral histories, and educational videos.',
      color: 'var(--accent-color)'
    },
    {
      icon: Headphones,
      title: 'Audio Collections',
      count: '200+',
      description: 'Traditional music, oral narratives, podcasts, and recorded interviews with elders.',
      color: 'var(--primary-color)'
    },
    {
      icon: Image,
      title: 'Photo Archives',
      count: '1000+',
      description: 'Historical photographs documenting Luo life, events, and cultural heritage over decades.',
      color: 'var(--secondary-color)'
    }
  ]

  const featuredCollections = [
    {
      title: 'Luo Oral Traditions',
      type: 'Audio & Text Collection',
      items: 45,
      description: 'Comprehensive collection of traditional stories, proverbs, and folklore passed down through generations.',
      featured: true
    },
    {
      title: 'Pre-Colonial History',
      type: 'Research Collection',
      items: 32,
      description: 'Academic works and historical documents about Luo kingdoms, migration patterns, and ancient traditions.',
      featured: true
    },
    {
      title: 'Contemporary Voices',
      type: 'Literary Collection',
      items: 68,
      description: 'Modern literature, poetry, and creative works by contemporary Luo writers and artists.',
      featured: true
    },
    {
      title: 'Dholuo Language Course',
      type: 'Educational Materials',
      items: 28,
      description: 'Complete language learning program with audio lessons, workbooks, and practice materials.',
      featured: false
    },
    {
      title: 'Cultural Ceremonies',
      type: 'Video Collection',
      items: 52,
      description: 'Documented traditional ceremonies including weddings, funerals, and community celebrations.',
      featured: false
    },
    {
      title: 'Luo Music Heritage',
      type: 'Audio Collection',
      items: 120,
      description: 'Traditional and modern Luo music, from nyatiti performances to contemporary Benga and Ohangla.',
      featured: false
    }
  ]

  const recentAdditions = [
    {
      title: 'The Journey of the Luo People',
      author: 'Dr. Bethwell Ogot',
      type: 'Book',
      date: 'Added 3 days ago',
      downloads: 342
    },
    {
      title: 'Dholuo-English Dictionary',
      author: 'Paul Ogola',
      type: 'Reference',
      date: 'Added 1 week ago',
      downloads: 567
    },
    {
      title: 'Traditional Marriage Ceremonies',
      author: 'Grace Achieng',
      type: 'Documentary',
      date: 'Added 2 weeks ago',
      downloads: 234
    },
    {
      title: 'Luo Proverbs and Their Meanings',
      author: 'John Omondi',
      type: 'Educational',
      date: 'Added 3 weeks ago',
      downloads: 423
    }
  ]

  const libraryFeatures = [
    {
      icon: Search,
      title: 'Advanced Search',
      description: 'Powerful search capabilities to find exactly what you need across all collections and formats.'
    },
    {
      icon: Download,
      title: 'Free Downloads',
      description: 'Download books, documents, and media for offline access and personal study.'
    },
    {
      icon: BookMarked,
      title: 'Personal Collections',
      description: 'Create custom collections, bookmark favorites, and track your reading progress.'
    },
    {
      icon: Users,
      title: 'Community Contributions',
      description: 'Submit your own materials to help grow and enrich our collective knowledge base.'
    }
  ]

  const impactStats = [
    { number: '2,000+', label: 'Resources Available' },
    { number: '25,000+', label: 'Monthly Downloads' },
    { number: '50+', label: 'Contributing Scholars' },
    { number: '15', label: 'Languages Covered' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="text-5xl font-bold mb-6">
              Luo Community Digital Library
            </h1>
            <p className="text-xl mb-8" style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
              The world's most comprehensive digital repository of Luo knowledge, culture, and heritage. 
              Explore thousands of books, documents, videos, and audio recordings preserving our collective history.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/search" className="btn btn-primary">
                <Search size={20} />
                Browse Library
              </Link>
              <Link href="/contribute" className="btn btn-outline">
                <BookOpen size={20} />
                Contribute Materials
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Library Statistics */}
      <section className="section bg-white">
        <div className="container">
          <div className="stats-grid">
            {impactStats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Library */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ alignItems: 'center' }}>
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                Preserving Knowledge for Future Generations
              </h2>
              <div className="space-y-4">
                <p style={{ color: 'var(--text-dark)', lineHeight: '1.8', marginBottom: '1rem' }}>
                  The Luo Community Digital Library is a groundbreaking initiative to digitize, preserve, 
                  and make accessible the vast wealth of knowledge, stories, and cultural heritage of the 
                  Luo people. Our collection spans centuries, from ancient oral traditions to contemporary 
                  scholarly works.
                </p>
                <p style={{ color: 'var(--text-dark)', lineHeight: '1.8', marginBottom: '1rem' }}>
                  Whether you're a student researching your heritage, a scholar studying Luo culture, 
                  a diaspora member reconnecting with your roots, or simply curious about the Luo 
                  people—our library provides free, open access to resources that would otherwise be 
                  difficult or impossible to find.
                </p>
                <p style={{ color: 'var(--text-dark)', lineHeight: '1.8' }}>
                  Every document, book, audio file, and video in our collection helps tell the story 
                  of who we are, where we came from, and where we're going. This is more than a library—
                  it's a living archive of Luo civilization.
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
                <Library size={120} color="white" style={{ opacity: 0.3, position: 'absolute' }} />
                <BookOpen size={80} color="white" />
              </div>
              <div className="card-body">
                <h3 className="card-title">Open Access Philosophy</h3>
                <p className="card-text">
                  All materials in the Luo Community Digital Library are free to access, download, 
                  and share. We believe knowledge should be accessible to everyone, regardless of 
                  location or economic status.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Library Categories */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-subtitle">
            Explore our diverse collection organized by format and subject matter
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {libraryCategories.map((category, index) => (
              <div key={index} className="card">
                <div style={{ 
                  height: '160px', 
                  background: `linear-gradient(135deg, ${category.color}, var(--secondary-color))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <category.icon size={56} color="white" />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.95)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                    color: category.color
                  }}>
                    {category.count}
                  </div>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{category.title}</h3>
                  <p className="card-text" style={{ marginBottom: '1rem' }}>
                    {category.description}
                  </p>
                  <button className="btn btn-outline" style={{ width: '100%' }}>
                    Browse Collection
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Collections</h2>
          <p className="section-subtitle">
            Curated collections highlighting the best of our library
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCollections.map((collection, index) => (
              <div key={index} className="card">
                <div style={{ 
                  height: '200px', 
                  background: index % 3 === 0 
                    ? 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))'
                    : index % 3 === 1
                    ? 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))'
                    : 'linear-gradient(135deg, var(--accent-color), var(--primary-color))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  color: 'white',
                  padding: '1.5rem',
                  textAlign: 'center'
                }}>
                  <Library size={64} style={{ marginBottom: '1rem', opacity: 0.9 }} />
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {collection.items}
                  </span>
                  <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                    Items
                  </span>
                </div>
                <div className="card-body">
                  <span style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--primary-color)', 
                    fontWeight: '600',
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}>
                    {collection.type}
                  </span>
                  <h3 className="card-title">{collection.title}</h3>
                  <p className="card-text" style={{ marginBottom: '1rem' }}>
                    {collection.description}
                  </p>
                  <button className="btn btn-primary" style={{ width: '100%' }}>
                    Explore Collection
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Additions */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Recently Added</h2>
          <p className="section-subtitle">
            New materials added to the library this month
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentAdditions.map((item, index) => (
              <div key={index} className="card">
                <div style={{ 
                  height: '180px', 
                  background: index % 2 === 0 
                    ? 'linear-gradient(135deg, var(--primary-color), var(--accent-color))'
                    : 'linear-gradient(135deg, var(--secondary-color), var(--primary-color))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.type === 'Book' && <BookOpen size={56} color="white" />}
                  {item.type === 'Reference' && <BookMarked size={56} color="white" />}
                  {item.type === 'Documentary' && <Film size={56} color="white" />}
                  {item.type === 'Educational' && <GraduationCap size={56} color="white" />}
                </div>
                <div className="card-body">
                  <span style={{ 
                    fontSize: '0.75rem', 
                    color: 'var(--primary-color)', 
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}>
                    {item.type}
                  </span>
                  <h3 className="card-title" style={{ fontSize: '1rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>
                    by {item.author}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-color)'
                  }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                      {item.date}
                    </span>
                    <span style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--primary-color)', 
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <Download size={14} />
                      {item.downloads}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Library Features */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Library Features</h2>
          <p className="section-subtitle">
            Tools and features to enhance your research and learning experience
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {libraryFeatures.map((feature, index) => (
              <div key={index} className="card">
                <div className="card-body">
                  <div className="feature-icon" style={{ margin: '0 0 1rem 0' }}>
                    <feature.icon size={24} />
                  </div>
                  <h3 className="card-title">{feature.title}</h3>
                  <p className="card-text">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use the Library */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">How to Use the Library</h2>
          <p className="section-subtitle">
            Getting started with the Luo Community Digital Library
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <div className="card-body text-center">
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '2rem',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  1
                </div>
                <div className="feature-icon" style={{ margin: '0 auto 1rem' }}>
                  <Search size={24} />
                </div>
                <h3 className="card-title">Search & Discover</h3>
                <p className="card-text">
                  Use our powerful search tools to find books, documents, videos, and audio by title, 
                  author, subject, or keyword. Browse by category or explore featured collections.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body text-center">
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '2rem',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  2
                </div>
                <div className="feature-icon" style={{ margin: '0 auto 1rem' }}>
                  <Download size={24} />
                </div>
                <h3 className="card-title">Access & Download</h3>
                <p className="card-text">
                  View materials online or download them for offline access. All resources are 
                  completely free. Create an account to save favorites and track your reading.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body text-center">
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-color), var(--primary-color))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '2rem',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  3
                </div>
                <div className="feature-icon" style={{ margin: '0 auto 1rem' }}>
                  <Users size={24} />
                </div>
                <h3 className="card-title">Share & Contribute</h3>
                <p className="card-text">
                  Share resources with your network and help grow the library by contributing your 
                  own materials, whether books, research papers, or multimedia content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contribute Section */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ 
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            color: 'white'
          }}>
            <div className="card-body" style={{ padding: '3rem', textAlign: 'center' }}>
              <Library size={64} style={{ margin: '0 auto 1.5rem', opacity: 0.9 }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Help Us Grow the Library
              </h2>
              <p style={{ fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '700px', margin: '0 auto 2rem', opacity: 0.95 }}>
                Do you have books, documents, recordings, or photographs that could enrich our collection? 
                Your contributions help preserve Luo heritage for future generations.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contribute" className="btn btn-outline" style={{ 
                  borderColor: 'white', 
                  color: 'white',
                  background: 'rgba(255, 255, 255, 0.1)'
                }}>
                  <BookOpen size={20} />
                  Submit Materials
                </Link>
                <Link href="/about" className="btn btn-outline" style={{ 
                  borderColor: 'white', 
                  color: 'white',
                  background: 'rgba(255, 255, 255, 0.1)'
                }}>
                  <Users size={20} />
                  Volunteer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-gradient" style={{ color: 'white' }}>
        <div className="container text-center">
          <h2 className="section-title" style={{ color: 'white' }}>
            Start Exploring Today
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', margin: '0 auto 2rem' }}>
            Thousands of resources waiting to be discovered. Whether you're researching your heritage, 
            learning Dholuo, or exploring Luo culture—begin your journey now.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link href="/search" className="btn btn-outline" style={{ 
              borderColor: 'white', 
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)'
            }}>
              <Search size={20} />
              Browse Library
            </Link>
            <Link href="/contribute" className="btn btn-outline" style={{ 
              borderColor: 'white', 
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)'
            }}>
              <BookOpen size={20} />
              Contribute
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}


