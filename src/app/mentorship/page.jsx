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
              Connecting with with talent across the global Luo community. 
              Grow professionally, strengthen cultural ties, and build lasting relationships that transcend borders.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/mentorship" className="btn btn-primary">
                COMING SOON
              </Link>
              
            </div>
          </div>
        </div>
      </section>

    </>
  )
}



