import Link from 'next/link'
import { Users, Crown, MapPin, Calendar, ArrowRight, Heart, Award, BookOpen } from 'lucide-react'

export default function PeoplePage() {
  const peopleCategories = [
    {
      icon: Crown,
      title: 'Traditional Leaders',
      description: 'Chiefs, elders, and traditional leaders who guided the Luo community through history.',
      count: 25
    },
    {
      icon: Award,
      title: 'Political Leaders',
      description: 'Politicians, activists, and leaders who shaped Luo political history and representation.',
      count: 30
    },
    {
      icon: BookOpen,
      title: 'Cultural Figures',
      description: 'Artists, musicians, writers, and cultural ambassadors who preserved and promoted Luo heritage.',
      count: 20
    },
    {
      icon: Heart,
      title: 'Community Heroes',
      description: 'Everyday people who made significant contributions to their communities and Luo society.',
      count: 40
    }
  ]

  const featuredPeople = [
    {
      name: 'Jaramogi Oginga Odinga',
      title: 'Former Vice President of Kenya',
      village: 'Bondo, Siaya County',
      clan: 'Jo-Karachuonyo',
      birthYear: 1911,
      deathYear: 1994,
      description: 'A prominent Kenyan politician and nationalist who played a crucial role in Kenya\'s independence struggle.',
      image: '/api/placeholder/200/250'
    },
    {
      name: 'Grace Ogot',
      title: 'Author & Cultural Preservationist',
      village: 'Asembo, Siaya County',
      clan: 'Jo-Ugenya',
      birthYear: 1930,
      deathYear: 2015,
      description: 'One of Kenya\'s most celebrated authors, known for preserving Luo culture through literature.',
      image: '/api/placeholder/200/250'
    },
    {
      name: 'Tom Mboya',
      title: 'Trade Unionist & Politician',
      village: 'Kendu Bay, Homa Bay County',
      clan: 'Jo-Kabondo',
      birthYear: 1930,
      deathYear: 1969,
      description: 'A charismatic leader who championed workers\' rights and played a key role in Kenya\'s early independence politics.',
      image: '/api/placeholder/200/250'
    }
  ]

  const recentAdditions = [
    {
      name: 'Mary Anyango',
      title: 'Community Elder',
      village: 'Kisumu',
      addedDate: '2024-01-15'
    },
    {
      name: 'Peter Ochieng',
      title: 'Cultural Musician',
      village: 'Migori',
      addedDate: '2024-01-12'
    },
    {
      name: 'Sarah Adhiambo',
      title: 'Traditional Healer',
      village: 'Siaya',
      addedDate: '2024-01-10'
    },
    {
      name: 'James Okoth',
      title: 'Community Leader',
      village: 'Homa Bay',
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
              Notable Luo People
            </h1>
            <p className="text-xl mb-8" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              Discover the remarkable individuals who have shaped Luo community history, from traditional leaders 
              to modern-day heroes who continue to inspire us.
            </p>
          </div>
        </div>
      </section>

      {/* People Categories */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Explore by Category</h2>
          <p className="section-subtitle">
            Learn about different types of influential people in Luo history
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {peopleCategories.map((category, index) => (
              <div key={index} className="card">
                <div className="card-body text-center">
                  <div className="feature-icon" style={{ margin: '0 auto 1rem' }}>
                    <category.icon size={24} />
                  </div>
                  <h3 className="card-title">{category.title}</h3>
                  <p className="card-text">{category.description}</p>
                  <div style={{ marginTop: '1rem' }}>
                    <span style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: '700', 
                      color: 'var(--primary-color)' 
                    }}>
                      {category.count}
                    </span>
                    <span style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--text-light)', 
                      display: 'block' 
                    }}>
                      people
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured People */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Featured People</h2>
          <p className="section-subtitle">
            Meet some of the most influential figures in Luo community history
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPeople.map((person, index) => (
              <div key={index} className="card">
                <div style={{ 
                  height: '250px', 
                  background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Users size={64} color="white" />
                </div>
                <div className="card-body">
                  <h3 className="card-title">{person.name}</h3>
                  <p style={{ 
                    color: 'var(--primary-color)', 
                    fontWeight: '600', 
                    marginBottom: '0.5rem' 
                  }}>
                    {person.title}
                  </p>
                  
                  <div className="space-y-2" style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={16} color="var(--text-light)" />
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                        {person.village}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Users size={16} color="var(--text-light)" />
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                        {person.clan}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={16} color="var(--text-light)" />
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                        {person.birthYear} - {person.deathYear}
                      </span>
                    </div>
                  </div>
                  
                  <p className="card-text">{person.description}</p>
                  
                  <Link href={`/people/${person.name.toLowerCase().replace(/\s+/g, '-')}`} 
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

      {/* Recent Additions */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="section-title">Recently Added</h2>
              <p className="section-subtitle">
                Latest additions to our community archive
              </p>
              
              <div className="space-y-4">
                {recentAdditions.map((person, index) => (
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
                        <Users size={24} color="white" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                          {person.name}
                        </h4>
                        <p style={{ 
                          color: 'var(--primary-color)', 
                          fontSize: '0.875rem', 
                          fontWeight: '600',
                          marginBottom: '0.25rem' 
                        }}>
                          {person.title}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <MapPin size={14} color="var(--text-light)" />
                          <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                            {person.village}
                          </span>
                          <span style={{ color: 'var(--text-light)' }}>•</span>
                          <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                            Added {new Date(person.addedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Link href={`/people/${person.name.toLowerCase().replace(/\s+/g, '-')}`} 
                            className="btn btn-outline">
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              
              
              
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-gradient" style={{ color: 'white' }}>
        <div className="container text-center">
          <h2 className="section-title" style={{ color: 'white' }}>
            Honor Our Community Heroes
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Explore the lives and legacies of Luo community members across generations.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link href="/people" className="btn btn-outline" style={{ 
              borderColor: 'white', 
              color: 'white' 
            }}>
              Browse People
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
