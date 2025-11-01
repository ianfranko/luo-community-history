import Link from 'next/link'
import { Users, Target, BookOpen, Award, TrendingUp, Heart, MessageCircle, Calendar, CheckCircle, ArrowRight, GraduationCap, Briefcase, Globe, Sparkles, UserCheck, Clock } from 'lucide-react'

export default function MentorshipPage() {
  const programBenefits = [
    {
      icon: Users,
      title: 'One-on-One Guidance',
      description: 'Personalized mentorship tailored to your unique goals, challenges, and aspirations within the Luo community.'
    },
    {
      icon: TrendingUp,
      title: 'Career Development',
      description: 'Advance your professional journey with insights from experienced leaders in various industries worldwide.'
    },
    {
      icon: BookOpen,
      title: 'Knowledge Transfer',
      description: 'Access to wisdom, experiences, and cultural knowledge passed down from established community members.'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Connect with mentors and mentees across the Luo diaspora, expanding your professional and cultural network.'
    },
    {
      icon: Heart,
      title: 'Cultural Connection',
      description: 'Strengthen your ties to Luo heritage while navigating modern professional and personal challenges.'
    },
    {
      icon: Award,
      title: 'Leadership Skills',
      description: 'Develop essential leadership qualities to become a future leader in your field and community.'
    }
  ]

  const mentorshipAreas = [
    {
      icon: Briefcase,
      title: 'Professional Development',
      description: 'Career guidance, entrepreneurship, business development, and professional networking.',
      color: 'var(--primary-color)'
    },
    {
      icon: GraduationCap,
      title: 'Academic Excellence',
      description: 'Educational guidance, study strategies, university applications, and scholarship opportunities.',
      color: 'var(--secondary-color)'
    },
    {
      icon: Users,
      title: 'Cultural Leadership',
      description: 'Community organizing, cultural preservation, event planning, and youth leadership.',
      color: 'var(--accent-color)'
    },
    {
      icon: Globe,
      title: 'Diaspora Navigation',
      description: 'Adapting to new countries, maintaining cultural identity, and connecting with homeland.',
      color: 'var(--primary-color)'
    }
  ]

  const howItWorksSteps = [
    {
      number: '01',
      title: 'Apply to Join',
      description: 'Submit your application indicating whether you want to be a mentor, mentee, or both. Tell us about your background, goals, and areas of interest.',
      icon: UserCheck
    },
    {
      number: '02',
      title: 'Get Matched',
      description: 'Our team carefully matches mentors and mentees based on professional interests, goals, location, and cultural background for the best fit.',
      icon: Users
    },
    {
      number: '03',
      title: 'Connect & Begin',
      description: 'Attend an orientation session, meet your match, and establish your mentorship goals and meeting schedule together.',
      icon: MessageCircle
    },
    {
      number: '04',
      title: 'Grow Together',
      description: 'Engage in regular meetings, participate in program events, and work towards achieving your personal and professional goals.',
      icon: TrendingUp
    }
  ]

  const successStories = [
    {
      name: 'Akinyi M.',
      role: 'Medical Student',
      story: 'Through the mentorship program, I connected with Dr. Omondi, a renowned surgeon in Nairobi. His guidance helped me secure a research position and navigate medical school challenges. I\'m now in my final year and planning to give back as a mentor myself.',
      achievement: 'Secured Research Position'
    },
    {
      name: 'James O.',
      role: 'Entrepreneur',
      story: 'My mentor helped me transform my small business idea into a thriving tech startup. Beyond business advice, she connected me with investors in the Luo diaspora network. Today, my company employs 15 people and serves clients across East Africa.',
      achievement: 'Built Successful Startup'
    },
    {
      name: 'Sarah N.',
      role: 'Cultural Coordinator',
      story: 'As a young Luo woman in the UK diaspora, I felt disconnected from my roots. My mentor not only helped me organize cultural events but also taught me our traditions and language. Now I\'m leading youth cultural programs in London.',
      achievement: 'Leading Cultural Programs'
    }
  ]

  const mentorRequirements = [
    'Minimum 5 years of professional or leadership experience',
    'Active member of the Luo community or diaspora',
    'Commitment to meet with mentee at least once monthly',
    'Passion for guiding and supporting the next generation',
    'Strong communication and interpersonal skills',
    'Willingness to share experiences and knowledge openly'
  ]

  const menteeRequirements = [
    'Age 18-35 (flexible based on circumstances)',
    'Clear goals for personal or professional development',
    'Commitment to active participation in the program',
    'Openness to feedback and willingness to learn',
    'Connection to or interest in Luo community',
    'Respect for mentor\'s time and expertise'
  ]

  const programStats = [
    { number: '200+', label: 'Active Mentor-Mentee Pairs' },
    { number: '15', label: 'Countries Represented' },
    { number: '92%', label: 'Satisfaction Rate' },
    { number: '5 Years', label: 'Program History' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="text-5xl font-bold mb-6">
              Luo League Mentorship Program
            </h1>
            <p className="text-xl mb-8" style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
              Connecting experienced leaders with emerging talent across the global Luo community. 
              Grow professionally, strengthen cultural ties, and build lasting relationships that transcend borders.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/mentorship" className="btn btn-primary">
                Get Started Now
              </Link>
              
            </div>
          </div>
        </div>
      </section>

      {/* Program Statistics */}
      <section className="section bg-white">
        <div className="container">
          <div className="stats-grid">
            {programStats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ alignItems: 'center' }}>
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                Empowering the Next Generation
              </h2>
              <div className="space-y-4">
                <p style={{ color: 'var(--text-dark)', lineHeight: '1.8', marginBottom: '1rem' }}>
                  The Luo League Mentorship Program is a flagship initiative designed to connect 
                  experienced professionals, academics, and community leaders with young emerging 
                  talent seeking guidance in their personal and professional journeys.
                </p>
                <p style={{ color: 'var(--text-dark)', lineHeight: '1.8', marginBottom: '1rem' }}>
                  Whether you're a student navigating university applications, a young professional 
                  building your career, an entrepreneur launching a business, or a diaspora member 
                  seeking to strengthen cultural connections—our program provides the support and 
                  wisdom you need to succeed.
                </p>
                <p style={{ color: 'var(--text-dark)', lineHeight: '1.8' }}>
                  Our mentors are accomplished individuals from diverse fields—medicine, engineering, 
                  business, academia, arts, and community leadership—all committed to giving back and 
                  ensuring the continued success of Luo communities worldwide.
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
                <Target size={120} color="white" style={{ opacity: 0.3, position: 'absolute' }} />
                <Users size={80} color="white" />
              </div>
              <div className="card-body">
                <h3 className="card-title">Our Mission</h3>
                <p className="card-text">
                  To foster intergenerational knowledge transfer, professional development, and 
                  cultural continuity by connecting experienced Luo leaders with emerging talent 
                  across the global diaspora.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Why Join Our Mentorship Program?</h2>
          <p className="section-subtitle">
            The unique benefits you'll experience as part of our mentorship community
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programBenefits.map((benefit, index) => (
              <div key={index} className="card">
                <div className="card-body">
                  <div className="feature-icon" style={{ margin: '0 0 1rem 0' }}>
                    <benefit.icon size={24} />
                  </div>
                  <h3 className="card-title">{benefit.title}</h3>
                  <p className="card-text">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentorship Areas */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Mentorship Focus Areas</h2>
          <p className="section-subtitle">
            Specialized guidance across key areas of personal and professional development
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentorshipAreas.map((area, index) => (
              <div key={index} className="card">
                <div style={{ 
                  height: '180px', 
                  background: `linear-gradient(135deg, ${area.color}, var(--secondary-color))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <area.icon size={64} color="white" />
                </div>
                <div className="card-body">
                  <h3 className="card-title">{area.title}</h3>
                  <p className="card-text">{area.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">How the Program Works</h2>
          <p className="section-subtitle">
            Your journey from application to meaningful mentorship in four simple steps
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="card">
                <div className="card-body" style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 1rem',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}>
                    {step.number}
                  </div>
                  <div className="feature-icon" style={{ margin: '0 auto 1rem' }}>
                    <step.icon size={24} />
                  </div>
                  <h3 className="card-title">{step.title}</h3>
                  <p className="card-text">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Success Stories</h2>
          <p className="section-subtitle">
            Real stories from mentees who've transformed their lives through our program
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div key={index} className="card">
                <div className="card-body">
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <Award size={30} color="white" />
                  </div>
                  <h3 className="card-title">{story.name}</h3>
                  <p style={{ 
                    color: 'var(--primary-color)', 
                    fontSize: '0.9rem', 
                    fontWeight: '600',
                    marginBottom: '1rem' 
                  }}>
                    {story.role}
                  </p>
                  <p className="card-text" style={{ marginBottom: '1rem', fontStyle: 'italic' }}>
                    "{story.story}"
                  </p>
                  <div style={{
                    padding: '0.5rem 1rem',
                    background: 'var(--bg-light)',
                    borderRadius: '20px',
                    display: 'inline-block',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: 'var(--primary-color)'
                  }}>
                    <CheckCircle size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                    {story.achievement}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Program Requirements</h2>
          <p className="section-subtitle">
            What we look for in mentors and mentees joining our program
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mentor Requirements */}
            <div className="card">
              <div style={{ 
                height: '120px', 
                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Users size={48} color="white" />
              </div>
              <div className="card-body">
                <h3 className="card-title">Mentor Requirements</h3>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  marginTop: '1rem' 
                }}>
                  {mentorRequirements.map((req, index) => (
                    <li key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      marginBottom: '0.75rem',
                      color: 'var(--text-dark)'
                    }}>
                      <CheckCircle 
                        size={18} 
                        style={{ 
                          marginRight: '0.75rem', 
                          marginTop: '0.1rem',
                          color: 'var(--primary-color)',
                          flexShrink: 0
                        }} 
                      />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mentee Requirements */}
            <div className="card">
              <div style={{ 
                height: '120px', 
                background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <GraduationCap size={48} color="white" />
              </div>
              <div className="card-body">
                <h3 className="card-title">Mentee Requirements</h3>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  marginTop: '1rem' 
                }}>
                  {menteeRequirements.map((req, index) => (
                    <li key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      marginBottom: '0.75rem',
                      color: 'var(--text-dark)'
                    }}>
                      <CheckCircle 
                        size={18} 
                        style={{ 
                          marginRight: '0.75rem', 
                          marginTop: '0.1rem',
                          color: 'var(--secondary-color)',
                          flexShrink: 0
                        }} 
                      />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Features */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">What's Included in the Program</h2>
          <p className="section-subtitle">
            Comprehensive support and resources for all participants
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <div className="card-body">
                <div className="feature-icon" style={{ margin: '0 0 1rem 0' }}>
                  <Calendar size={24} />
                </div>
                <h3 className="card-title">Structured Program</h3>
                <p className="card-text">
                  12-month program with quarterly check-ins, progress reviews, and goal-setting 
                  sessions facilitated by our program coordinators.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="feature-icon" style={{ margin: '0 0 1rem 0' }}>
                  <Users size={24} />
                </div>
                <h3 className="card-title">Community Events</h3>
                <p className="card-text">
                  Monthly networking events, workshops, and cultural gatherings where mentors 
                  and mentees can connect and learn together.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="feature-icon" style={{ margin: '0 0 1rem 0' }}>
                  <BookOpen size={24} />
                </div>
                <h3 className="card-title">Resource Library</h3>
                <p className="card-text">
                  Access to exclusive resources, templates, guides, and tools to support your 
                  mentorship journey and professional development.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="feature-icon" style={{ margin: '0 0 1rem 0' }}>
                  <Target size={24} />
                </div>
                <h3 className="card-title">Goal Tracking</h3>
                <p className="card-text">
                  Dedicated platform for setting goals, tracking progress, and documenting 
                  your mentorship journey throughout the program.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="feature-icon" style={{ margin: '0 0 1rem 0' }}>
                  <MessageCircle size={24} />
                </div>
                <h3 className="card-title">Ongoing Support</h3>
                <p className="card-text">
                  Program coordinators available to provide guidance, address challenges, 
                  and ensure successful mentor-mentee relationships.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="feature-icon" style={{ margin: '0 0 1rem 0' }}>
                  <Award size={24} />
                </div>
                <h3 className="card-title">Recognition</h3>
                <p className="card-text">
                  Certificates of completion, opportunities to share your story, and recognition 
                  at our annual community awards ceremony.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Common questions about the mentorship program
          </p>
          
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="card" style={{ marginBottom: '1rem' }}>
              <div className="card-body">
                <h3 className="card-title">How much time commitment is required?</h3>
                <p className="card-text">
                  We recommend at least one meeting per month (1-2 hours) between mentor and mentee, 
                  plus occasional participation in program events. The relationship is flexible and 
                  can be adjusted based on both parties' schedules.
                </p>
              </div>
            </div>

            <div className="card" style={{ marginBottom: '1rem' }}>
              <div className="card-body">
                <h3 className="card-title">Can I participate if I'm in the diaspora?</h3>
                <p className="card-text">
                  Absolutely! Our program specifically connects diaspora members with mentors and 
                  mentees worldwide. Virtual meetings make it easy to participate regardless of location.
                </p>
              </div>
            </div>

            <div className="card" style={{ marginBottom: '1rem' }}>
              <div className="card-body">
                <h3 className="card-title">Is there a fee to join the program?</h3>
                <p className="card-text">
                  The mentorship program is completely free for all participants. It's funded by 
                  the Luo League of Nations as part of our commitment to community empowerment.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h3 className="card-title">What if my match isn't working out?</h3>
                <p className="card-text">
                  We understand that not every match is perfect. Our coordinators are here to help. 
                  You can request a rematch at any time, and we'll work to find a better fit for you.
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
            Ready to Start Your Mentorship Journey?
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', margin: '0 auto 2rem' }}>
            Join hundreds of Luo community members who are growing, learning, and building 
            meaningful connections through our mentorship program. Applications are open year-round.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link href="/contribute" className="btn btn-outline" style={{ 
              borderColor: 'white', 
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)'
            }}>
              <UserCheck size={20} />
              Apply as Mentee
            </Link>
            <Link href="/contribute" className="btn btn-outline" style={{ 
              borderColor: 'white', 
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)'
            }}>
              <Users size={20} />
              Become a Mentor
            </Link>
            <Link href="/about" className="btn btn-outline" style={{ 
              borderColor: 'white', 
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)'
            }}>
              <BookOpen size={20} />
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}



