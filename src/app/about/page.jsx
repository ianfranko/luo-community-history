
import Link from 'next/link'
import { Users, Globe, Heart, Target, TrendingUp, ArrowRight, Award, Calendar, BookOpen, Map, Sparkles, HandHeart, GraduationCap } from 'lucide-react'
import Image from 'next/image'
import { image } from 'framer-motion/client'

export default function AboutPage() {
  const missionValues = [
    {
      icon: Globe,
      title: 'Global Unity',
      description: 'Connecting Luo communities across borders, fostering unity among the diaspora and homeland populations worldwide.'
    },
    {
      icon: Heart,
      title: 'Cultural Preservation',
      description: 'Safeguarding and promoting Luo traditions, language, and heritage for current and future generations.'
    },
    {
      icon: Users,
      title: 'Community Empowerment',
      description: 'Strengthening communities through economic development, education, and social support programs.'
    },
    {
      icon: BookOpen,
      title: 'Knowledge Sharing',
      description: 'Creating platforms for documenting, sharing, and learning from our collective history and experiences.'
    }
  ]

  const keyInitiatives = [
    {
      image : '/657152Ew0bLSIn.jpg',
      title: 'Education Programs',
      description: 'Scholarship programs, mentorship initiatives, and educational resources supporting Luo students globally.',
      impact: '500+ Scholars',
      color: 'var(--primary-color)'
    },
    {
      image: HandHeart,
      title: 'Community Development',
      description: 'Infrastructure projects, health initiatives, and economic empowerment programs in Luo regions.',
      impact: '50+ Projects',
      color: 'var(--secondary-color)'
    },
    {
      icon: Sparkles,
      title: 'Cultural Events',
      description: 'Annual festivals, cultural exhibitions, and celebrations that bring communities together worldwide.',
      impact: '20+ Events Yearly',
      color: 'var(--accent-color)'
    }
  ]

  const achievements = [
    {
      year: '2010',
      title: 'Foundation Established',
      description: 'Luo League of Nations was founded to unite Luo communities globally and preserve cultural heritage.'
    },
    {
      year: '2015',
      title: 'Education Fund Launched',
      description: 'Scholarship program established, supporting hundreds of students in pursuing higher education.'
    },
    {
      year: '2018',
      title: 'Cultural Center Opened',
      description: 'First dedicated Luo Cultural Center inaugurated, serving as a hub for cultural activities and education.'
    },
    {
      year: '2022',
      title: 'Digital Archive Project',
      description: 'Launched comprehensive digital platform to document and share Luo history, stories, and traditions.'
    },
    {
      year: '2024',
      title: 'Global Network Expansion',
      description: 'Established active chapters in 15 countries across Africa, Europe, North America, and Australia.'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="text-5xl font-bold mb-6">
              About Luo League of Nations
            </h1>
            <p className="text-xl mb-8" style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
              A global movement dedicated to uniting Luo communities worldwide, preserving our rich 
              cultural heritage, and empowering our people through education, development, and cultural exchange.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ alignItems: 'center' }}>
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                Who We Are
              </h2>
              <div className="space-y-4">
                <p style={{ color: 'var(--text-dark)', lineHeight: '1.8', marginBottom: '1rem' }}>
                  The Luo League of Nations is a premier international organization that brings together 
                  Luo people from across the globe. Founded on the principles of unity, cultural preservation, 
                  and community empowerment, we serve as a bridge connecting our homeland to the diaspora.
                </p>
                <p style={{ color: 'var(--text-dark)', lineHeight: '1.8', marginBottom: '1rem' }}>
                  We are more than just an organization—we are a family bound by shared heritage, language, 
                  and values. From the shores of Lake Victoria to major cities across six continents, our 
                  network spans the globe, ensuring that no matter where Luo people are, they remain connected 
                  to their roots.
                </p>
                <p style={{ color: 'var(--text-dark)', lineHeight: '1.8' }}>
                  Through cultural events, educational programs, development projects, and advocacy, we work 
                  tirelessly to uplift our communities, preserve our traditions, and create opportunities for 
                  future generations to thrive while staying connected to their heritage.
                </p>
              </div>
            </div>
            <div className="card">
            <div
  style={{
    height: '300px',
    background: "url('/luo_05.jpg') center/cover no-repeat",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  }}
>
              </div>
              <div className="card-body">
                <h3 className="card-title">Our Vision</h3>
                <p className="card-text" style={{ marginBottom: '1rem' }}>
                  To be the leading global platform for Luo unity, cultural preservation, and community 
                  development, ensuring our heritage thrives for generations to come.
                </p>
                <h3 className="card-title">Our Mission</h3>
                <p className="card-text">
                  To unite, empower, and celebrate Luo communities worldwide through cultural preservation, 
                  education, economic development, and fostering strong networks across the diaspora.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <p className="section-subtitle">
            The principles that guide everything we do
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {missionValues.map((value, index) => (
              <div key={index} className="card">
                <div className="card-body">
                  <div className="feature-icon" style={{ margin: '0 0 1rem 0' }}>
                    <value.icon size={24} />
                  </div>
                  <h3 className="card-title">{value.title}</h3>
                  <p className="card-text">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Initiatives */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Key Initiatives</h2>
          <p className="section-subtitle">
            Our flagship programs making real impact in Luo communities
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {keyInitiatives.map((initiative, index) => (
              <div key={index} className="card">
                <div style={{ 
                  height: '200px', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>

                </div>
                <div className="card-body">
                  <h3 className="card-title">{initiative.title}</h3>
                  <p className="card-text" style={{ marginBottom: '1rem' }}>
                    {initiative.description}
                  </p>
                  <div style={{ 
                    padding: '0.75rem', 
                    background: 'var(--bg-light)', 
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <span style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: 'bold', 
                      color: initiative.color 
                    }}>
                      {initiative.impact}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline of Achievements */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Our Journey</h2>
          <p className="section-subtitle">
            Major milestones in our mission to unite and empower Luo communities
          </p>
          
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {achievements.map((achievement, index) => (
              <div key={index} className="card" style={{ marginBottom: '1.5rem' }}>
                <div className="card-body">
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{
                      minWidth: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.25rem',
                      fontWeight: 'bold'
                    }}>
                      {achievement.year}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 className="card-title" style={{ marginBottom: '0.5rem' }}>
                        {achievement.title}
                      </h3>
                      <p className="card-text">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Impact</h2>
          <p className="section-subtitle">
            Numbers that tell the story of our global reach and community impact
          </p>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Countries with Active Chapters</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50,000+</span>
              <span className="stat-label">Community Members</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Scholarship Beneficiaries</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Development Projects</span>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Unique */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">What Makes Us Unique</h2>
          <p className="section-subtitle">
            The distinctive qualities that set the Luo League of Nations apart
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <div className="card-body">
                <div className="feature-icon" style={{ margin: '0 0 1rem 0' }}>
                  <Globe size={24} />
                </div>
                <h3 className="card-title">Global Network</h3>
                <p className="card-text">
                  The most extensive network of Luo communities worldwide, spanning from East Africa 
                  to Europe, North America, Australia, and beyond. We connect diaspora members with 
                  their homeland, ensuring cultural continuity across continents.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="feature-icon" style={{ margin: '0 0 1rem 0' }}>
                  <Target size={24} />
                </div>
                <h3 className="card-title">Action-Oriented</h3>
                <p className="card-text">
                  We don't just talk—we act. From building schools and health centers to providing 
                  scholarships and mentorship, every initiative is designed to create tangible, 
                  measurable impact in the lives of our community members.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="feature-icon" style={{ margin: '0 0 1rem 0' }}>
                  <Users size={24} />
                </div>
                <h3 className="card-title">Inclusive Leadership</h3>
                <p className="card-text">
                  Our leadership structure includes representatives from all Luo regions and diaspora 
                  communities, ensuring diverse voices are heard and all perspectives are considered 
                  in our decision-making processes.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="feature-icon" style={{ margin: '0 0 1rem 0' }}>
                  <Sparkles size={24} />
                </div>
                <h3 className="card-title">Cultural Innovation</h3>
                <p className="card-text">
                  While preserving tradition, we embrace innovation. Through digital platforms, 
                  modern media, and creative programming, we make Luo culture accessible and 
                  relevant to younger generations raised anywhere in the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="section bg-gradient" style={{ color: 'white' }}>
        <div className="container text-center">
          <h2 className="section-title" style={{ color: 'white' }}>
            Join the Luo League of Nations
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', margin: '0 auto 2rem' }}>
            Be part of a global movement preserving our heritage and building a brighter future 
            for Luo communities worldwide. Together, we are stronger.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link href="/contribute" className="btn btn-outline" style={{ 
              borderColor: 'white', 
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)'
            }}>
              <Users size={20} />
              Become a Member
            </Link>
            <Link href="/events" className="btn btn-outline" style={{ 
              borderColor: 'white', 
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)'
            }}>
              <Calendar size={20} />
              Upcoming Events
            </Link>
            <Link href="/contribute" className="btn btn-outline" style={{ 
              borderColor: 'white', 
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)'
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



