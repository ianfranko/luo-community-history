import Link from 'next/link'
import { Calendar, Users, MapPin, Clock, ArrowRight, Heart, Music, Award, Globe } from 'lucide-react'

export default function EventsPage() {
  const eventTypes = [
    {
      icon: Heart,
      title: 'Cultural Celebrations',
      description: 'Traditional festivals, ceremonies, and cultural events that bring the community together.',
      count: 25
    },
    {
      icon: Music,
      title: 'Music & Arts',
      description: 'Musical performances, art exhibitions, and cultural shows celebrating Luo heritage.',
      count: 18
    },
    {
      icon: Award,
      title: 'Historical Commemorations',
      description: 'Events marking important historical moments and honoring community heroes.',
      count: 12
    },
    {
      icon: Globe,
      title: 'Community Gatherings',
      description: 'Social events, meetings, and gatherings that strengthen community bonds.',
      count: 30
    }
  ]

  const upcomingEvents = [
    {
      title: 'Luo Cultural Festival 2024',
      date: '2024-03-15',
      time: '10:00 AM',
      location: 'Kisumu City',
      type: 'Cultural Celebration',
      description: 'Annual celebration of Luo culture featuring traditional music, dance, food, and crafts.',
      organizer: 'Luo Cultural Association'
    },
    {
      title: 'Traditional Marriage Ceremony',
      date: '2024-02-28',
      time: '8:00 AM',
      location: 'Bondo, Siaya County',
      type: 'Traditional Ceremony',
      description: 'Traditional Luo marriage ceremony showcasing ancient customs and traditions.',
      organizer: 'Ochieng Family'
    },
    {
      title: 'Community Elders Meeting',
      date: '2024-02-20',
      time: '2:00 PM',
      location: 'Migori Town',
      type: 'Community Gathering',
      description: 'Monthly meeting of community elders to discuss cultural preservation and community issues.',
      organizer: 'Luo Elders Council'
    }
  ]

  const pastEvents = [
    {
      title: 'Luo Heritage Exhibition',
      date: '2024-01-15',
      location: 'Nairobi National Museum',
      type: 'Cultural Event',
      description: 'Exhibition showcasing Luo artifacts, traditional crafts, and cultural history.'
    },
    {
      title: 'Traditional Dance Competition',
      date: '2024-01-10',
      location: 'Homa Bay County',
      type: 'Cultural Celebration',
      description: 'Annual traditional dance competition featuring various Luo dance styles.'
    },
    {
      title: 'Community Clean-up Day',
      date: '2024-01-05',
      location: 'Kisumu City',
      type: 'Community Service',
      description: 'Community initiative to clean and beautify public spaces in Kisumu.'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="text-5xl font-bold mb-6">
              Community Events
            </h1>
            <p className="text-xl mb-8" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              Stay connected with the Luo community through cultural events, celebrations, 
              and gatherings that bring us together and preserve our heritage.
            </p>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Event Categories</h2>
          <p className="section-subtitle">
            Discover different types of events in the Luo community
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventTypes.map((type, index) => (
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
                      events
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Upcoming Events</h2>
          <p className="section-subtitle">
            Join us for these upcoming community events and celebrations
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="card">
                <div style={{ 
                  height: '150px', 
                  background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Calendar size={48} color="white" />
                </div>
                <div className="card-body">
                  <h3 className="card-title">{event.title}</h3>
                  
                  <div className="space-y-2" style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={16} color="var(--text-light)" />
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock size={16} color="var(--text-light)" />
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                        {event.time}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={16} color="var(--text-light)" />
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                        {event.location}
                      </span>
                    </div>
                  </div>
                  
                  <p className="card-text">{event.description}</p>
                  
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '0.75rem', 
                    backgroundColor: 'var(--bg-light)', 
                    borderRadius: '0.5rem' 
                  }}>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--text-dark)', 
                      fontWeight: '600' 
                    }}>
                      Organized by: {event.organizer}
                    </p>
                  </div>
                  
                  <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Learn More
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events & Add Event */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="section-title">Recent Events</h2>
              <p className="section-subtitle">
                Look back at recent community events and celebrations
              </p>
              
              <div className="space-y-4">
                {pastEvents.map((event, index) => (
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
                        <Calendar size={24} color="white" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                          {event.title}
                        </h4>
                        <p style={{ 
                          color: 'var(--primary-color)', 
                          fontSize: '0.875rem', 
                          fontWeight: '600',
                          marginBottom: '0.25rem' 
                        }}>
                          {event.type}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Calendar size={14} color="var(--text-light)" />
                          <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span style={{ color: 'var(--text-light)' }}>•</span>
                          <MapPin size={14} color="var(--text-light)" />
                          <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                            {event.location}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Organize an Event</h3>
                  <p className="card-text">
                    Planning a cultural event or community gathering? Share it with the community 
                    and help us build a comprehensive calendar of Luo events.
                  </p>
                  <Link href="/contribute" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    <Calendar size={20} />
                    Add Event
                  </Link>
                </div>
              </div>
              
              <div className="card" style={{ marginTop: '1.5rem' }}>
                <div className="card-body">
                  <h3 className="card-title">Event Calendar</h3>
                  <p className="card-text">
                    View all upcoming events in a calendar format to see what&apos;s happening 
                    in the Luo community.
                  </p>
                  <Link href="/events/calendar" className="btn btn-outline" style={{ marginTop: '1rem' }}>
                    View Calendar
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="card" style={{ marginTop: '1.5rem' }}>
                <div className="card-body">
                  <h3 className="card-title">Event Notifications</h3>
                  <p className="card-text">
                    Stay updated with the latest events by subscribing to our event notifications.
                  </p>
                  <button className="btn btn-outline" style={{ marginTop: '1rem' }}>
                    <Users size={16} />
                    Subscribe
                  </button>
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
              <span className="stat-number">85+</span>
              <span className="stat-label">Community Events</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">25+</span>
              <span className="stat-label">Cultural Celebrations</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">18+</span>
              <span className="stat-label">Music & Arts Events</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">30+</span>
              <span className="stat-label">Community Gatherings</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-gradient" style={{ color: 'white' }}>
        <div className="container text-center">
          <h2 className="section-title" style={{ color: 'white' }}>
            Join Our Community Events
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Be part of the vibrant Luo community by participating in our cultural events, 
            celebrations, and gatherings that strengthen our bonds and preserve our heritage.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link href="/contribute" className="btn" style={{ 
              backgroundColor: 'white', 
              color: 'var(--primary-color)',
              border: '2px solid white'
            }}>
              <Calendar size={20} />
              Add Your Event
            </Link>
            <Link href="/events/calendar" className="btn btn-outline" style={{ 
              borderColor: 'white', 
              color: 'white' 
            }}>
              View All Events
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
