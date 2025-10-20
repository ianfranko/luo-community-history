import Link from 'next/link'
import { Heart, BookOpen, Users, Calendar, ArrowRight, History, Globe } from 'lucide-react'

export default function CulturePage() {
  const culturalTopics = [
    {
      icon: Heart,
      title: 'Traditional Ceremonies',
      description: 'Explore the rich ceremonial traditions that mark important life events in Luo culture.',
      articles: 15,
      slug: 'traditional-ceremonies'
    },
    {
      icon: Users,
      title: 'Family & Kinship',
      description: 'Learn about Luo family structures, kinship systems, and social organization.',
      articles: 12,
      slug: 'family-kinship'
    },
    {
      icon: BookOpen,
      title: 'Language & Proverbs',
      description: 'Discover the beauty of Dholuo language, proverbs, and oral traditions.',
      articles: 25,
      slug: 'language-proverbs'
    },
    {
      icon: History,
      title: 'Migration Stories',
      description: 'Trace the journey of Luo people across East Africa and their settlement patterns.',
      articles: 18,
      slug: 'migration-stories'
    },
    {
      icon: Globe,
      title: 'Beliefs & Spirituality',
      description: 'Understand traditional Luo beliefs, spiritual practices, and worldview.',
      articles: 20,
      slug: 'beliefs-spirituality'
    },
    {
      icon: Calendar,
      title: 'Festivals & Celebrations',
      description: 'Experience the vibrant festivals and celebrations that bring the community together.',
      articles: 8,
      slug: 'festivals-celebrations'
    }
  ]

  const featuredArticles = [
    {
      title: 'The Significance of Luo Naming Ceremonies',
      excerpt: 'Discover the deep cultural meaning behind traditional Luo naming ceremonies and their importance in community life.',
      category: 'Traditional Ceremonies',
      readTime: '5 min read',
      publishedDate: '2024-01-15'
    },
    {
      title: 'Dholuo Proverbs: Wisdom Through Generations',
      excerpt: 'Explore the rich collection of Luo proverbs and their role in teaching moral values and life lessons.',
      category: 'Language & Proverbs',
      readTime: '7 min read',
      publishedDate: '2024-01-12'
    },
    {
      title: 'Luo Traditional Marriage Customs',
      excerpt: 'Learn about the intricate process of Luo traditional marriage, from courtship to wedding celebrations.',
      category: 'Traditional Ceremonies',
      readTime: '8 min read',
      publishedDate: '2024-01-10'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="text-5xl font-bold mb-6">
              Luo Culture & Traditions
            </h1>
            <p className="text-xl mb-8" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              Explore the rich cultural heritage of the Luo community, from ancient traditions to modern practices 
              that continue to shape our identity today.
            </p>
          </div>
        </div>
      </section>

      {/* Cultural Topics Grid */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Explore Cultural Topics</h2>
          <p className="section-subtitle">
            Dive deep into different aspects of Luo culture and traditions
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {culturalTopics.map((topic, index) => (
              <div key={index} className="card">
                <div className="card-body">
                  <div className="feature-icon" style={{ margin: '0 0 1rem 0' }}>
                    <topic.icon size={24} />
                  </div>
                  <h3 className="card-title">{topic.title}</h3>
                  <p className="card-text">{topic.description}</p>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginTop: '1rem' 
                  }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                      {topic.articles} articles
                    </span>
                    <Link href={`/culture/${topic.slug}`} className="btn btn-primary">
                      Explore
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Featured Articles</h2>
          <p className="section-subtitle">
            Discover the most popular and recent articles about Luo culture
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <div key={index} className="card">
                <div style={{ 
                  height: '200px', 
                  background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <BookOpen size={48} color="white" />
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
                      {article.category}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="card-title">{article.title}</h3>
                  <p className="card-text">{article.excerpt}</p>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginTop: '1rem' 
                  }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                      {new Date(article.publishedDate).toLocaleDateString()}
                    </span>
                    <Link href="/culture/article" className="btn btn-primary">
                      Read More
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Heritage Stats */}
      <section className="section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">200+</span>
              <span className="stat-label">Cultural Articles</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">150+</span>
              <span className="stat-label">Traditional Proverbs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Ceremonial Practices</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">25+</span>
              <span className="stat-label">Cultural Festivals</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-gradient" style={{ color: 'white' }}>
        <div className="container text-center">
          <h2 className="section-title" style={{ color: 'white' }}>
            Share Your Cultural Knowledge
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Do you have stories, traditions, or cultural knowledge to share? Help us preserve Luo culture for future generations.
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
            <Link href="/culture/traditions" className="btn btn-outline" style={{ 
              borderColor: 'white', 
              color: 'white' 
            }}>
              Explore Traditions
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
