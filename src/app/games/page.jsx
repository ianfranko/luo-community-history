'use client'

import Link from 'next/link'
import { Trophy, Calendar, Users, Award, TrendingUp, ArrowRight, Clock, MapPin } from 'lucide-react'

export default function GamesPage() {
  const games = [
    {
      id: 1,
      name: 'Ajua',
      description: 'Traditional Luo board game that combines strategy and luck, played between communities to strengthen bonds and cultural exchange.',
      icon: '🎲',
      status: 'active',
      season: '2025 Season',
      totalMatches: 24,
      participatingCommunities: 8
    },
    {
      id: 2,
      name: 'Football',
      description: 'Inter-community football league bringing together teams from different Luo communities for friendly competition.',
      icon: '⚽',
      status: 'active',
      season: '2025 Season',
      totalMatches: 28,
      participatingCommunities: 12
    },
    {
      id: 3,
      name: 'Checkers',
      description: 'Classic board game tournament fostering camaraderie and strategic thinking among community members.',
      icon: '♟️',
      status: 'upcoming',
      season: 'Summer 2025',
      totalMatches: 16,
      participatingCommunities: 6
    }
  ]

  const leagueStandings = [
    {
      position: 1,
      community: 'Kisumu Community',
      gamesPlayed: 8,
      wins: 6,
      draws: 2,
      losses: 0,
      points: 20,
      logo: '🏆'
    },
    {
      position: 2,
      community: 'Siaya Warriors',
      gamesPlayed: 8,
      wins: 5,
      draws: 2,
      losses: 1,
      points: 17,
      logo: '⚔️'
    },
    {
      position: 3,
      community: 'Homa Bay United',
      gamesPlayed: 8,
      wins: 5,
      draws: 1,
      losses: 2,
      points: 16,
      logo: '🌊'
    },
    {
      position: 4,
      community: 'Migori Strikers',
      gamesPlayed: 8,
      wins: 4,
      draws: 3,
      losses: 1,
      points: 15,
      logo: '🔥'
    },
    {
      position: 5,
      community: 'Nairobi Diaspora',
      gamesPlayed: 8,
      wins: 4,
      draws: 2,
      losses: 2,
      points: 14,
      logo: '🌆'
    },
    {
      position: 6,
      community: 'Kakamega Lions',
      gamesPlayed: 8,
      wins: 3,
      draws: 3,
      losses: 2,
      points: 12,
      logo: '🦁'
    },
    {
      position: 7,
      community: 'Eldoret Eagles',
      gamesPlayed: 8,
      wins: 2,
      draws: 2,
      losses: 4,
      points: 8,
      logo: '🦅'
    },
    {
      position: 8,
      community: 'Bungoma Stars',
      gamesPlayed: 8,
      wins: 1,
      draws: 1,
      losses: 6,
      points: 4,
      logo: '⭐'
    }
  ]

  const upcomingMatches = [
    {
      homeTeam: 'Kisumu Community',
      awayTeam: 'Siaya Warriors',
      game: 'Football',
      date: 'February 15, 2025',
      time: '3:00 PM',
      venue: 'Kisumu Stadium',
      status: 'upcoming'
    },
    {
      homeTeam: 'Homa Bay United',
      awayTeam: 'Migori Strikers',
      game: 'Ajua',
      date: 'February 18, 2025',
      time: '5:00 PM',
      venue: 'Homa Bay Community Center',
      status: 'upcoming'
    },
    {
      homeTeam: 'Nairobi Diaspora',
      awayTeam: 'Kakamega Lions',
      game: 'Football',
      date: 'February 20, 2025',
      time: '2:00 PM',
      venue: 'Nairobi Sports Club',
      status: 'upcoming'
    },
    {
      homeTeam: 'Eldoret Eagles',
      awayTeam: 'Bungoma Stars',
      game: 'Checkers',
      date: 'February 22, 2025',
      time: '4:00 PM',
      venue: 'Eldoret Town Hall',
      status: 'upcoming'
    }
  ]

  const recentResults = [
    {
      homeTeam: 'Kisumu Community',
      awayTeam: 'Bungoma Stars',
      homeScore: 3,
      awayScore: 1,
      game: 'Football',
      date: 'February 8, 2025'
    },
    {
      homeTeam: 'Homa Bay United',
      awayTeam: 'Eldoret Eagles',
      homeScore: 2,
      awayScore: 0,
      game: 'Ajua',
      date: 'February 10, 2025'
    },
    {
      homeTeam: 'Siaya Warriors',
      awayTeam: 'Migori Strikers',
      homeScore: 1,
      awayScore: 1,
      game: 'Football',
      date: 'February 12, 2025'
    },
    {
      homeTeam: 'Nairobi Diaspora',
      awayTeam: 'Kakamega Lions',
      homeScore: 0,
      awayScore: 2,
      game: 'Checkers',
      date: 'February 14, 2025'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="text-5xl font-bold mb-6">
              Luo Community Games League
            </h1>
            <p className="text-xl mb-8" style={{ maxWidth: '700px', margin: '0 auto 2rem' }}>
              Fostering unity and competition among Luo communities through traditional and modern sports. Celebrating our shared heritage while building stronger bonds.
            </p>
          </div>
        </div>
      </section>

      {/* Games Overview */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Featured Games</h2>
          <p className="section-subtitle">
            Three exciting game categories bringing communities together
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {games.map((game) => (
              <div key={game.id} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ 
                  fontSize: '4rem', 
                  textAlign: 'center', 
                  padding: '1rem',
                  background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                  position: 'relative'
                }}>
                  <div style={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '3rem'
                  }}>
                    {game.icon}
                  </div>
                  <div style={{ 
                    position: 'absolute',
                    bottom: '0.5rem',
                    right: '1rem',
                    background: game.status === 'active' ? '#10b981' : '#f59e0b',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    {game.status.toUpperCase()}
                  </div>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{game.name}</h3>
                  <p className="card-text">{game.description}</p>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginTop: '1.5rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--border-color)'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                        {game.totalMatches}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                        Matches
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                        {game.participatingCommunities}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                        Teams
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '0.5rem',
                    background: 'var(--bg-light)',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    color: 'var(--text-light)'
                  }}>
                    📅 {game.season}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* League Standings */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h2 className="section-title mb-2">League Standings</h2>
              <p className="section-subtitle">Current rankings for Football League</p>
            </div>
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem', 
              padding: '0.5rem 1rem', 
              background: 'var(--bg-white)',
              borderRadius: '0.5rem',
              boxShadow: 'var(--shadow)'
            }}>
              <Trophy size={20} color="var(--primary-color)" />
              <span style={{ fontWeight: '600' }}>2025 Season</span>
            </div>
          </div>

          <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: 'var(--bg-gradient)', color: 'white' }}>
                  <tr>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Position</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Community</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Played</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Won</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Drawn</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Lost</th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leagueStandings.map((team, index) => (
                    <tr 
                      key={index}
                      style={{ 
                        borderBottom: '1px solid var(--border-color)',
                        background: index < 3 ? 'rgba(249, 115, 22, 0.05)' : 'white',
                        transition: 'background 0.2s'
                      }}
                    >
                      <td style={{ padding: '1rem', fontWeight: 'bold', fontSize: '1.25rem' }}>
                        {team.position === 1 && '🥇'}
                        {team.position === 2 && '🥈'}
                        {team.position === 3 && '🥉'}
                        {team.position > 3 && team.position}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '1.5rem' }}>{team.logo}</span>
                          <span style={{ fontWeight: '600' }}>{team.community}</span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>{team.gamesPlayed}</td>
                      <td style={{ padding: '1rem', textAlign: 'center', color: '#10b981', fontWeight: '600' }}>
                        {team.wins}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', color: '#f59e0b', fontWeight: '600' }}>
                        {team.draws}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', color: '#ef4444', fontWeight: '600' }}>
                        {team.losses}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', fontSize: '1.125rem', color: 'var(--primary-color)' }}>
                        {team.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Upcoming Matches</h2>
          <p className="section-subtitle">
            Don't miss these exciting fixtures coming up
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {upcomingMatches.map((match, index) => (
              <div key={index} className="card">
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '1rem' 
                }}>
                  <div style={{ 
                    padding: '0.5rem 1rem', 
                    background: 'var(--bg-gradient)', 
                    color: 'white',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 'bold'
                  }}>
                    {match.game}
                  </div>
                  <Clock size={16} color="var(--text-light)" />
                </div>
                
                <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
                  <div style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {match.homeTeam}
                  </div>
                  <div style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--text-light)', 
                    margin: '0.5rem 0' 
                  }}>
                    VS
                  </div>
                  <div style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                    {match.awayTeam}
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-color)',
                  fontSize: '0.875rem',
                  color: 'var(--text-light)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={16} />
                    <span>{match.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={16} />
                    <span>{match.time}</span>
                  </div>
                </div>
                
                <div style={{ 
                  marginTop: '0.75rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-light)'
                }}>
                  <MapPin size={16} />
                  <span>{match.venue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Results */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Recent Results</h2>
          <p className="section-subtitle">
            Latest scores from completed matches
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {recentResults.map((result, index) => (
              <div key={index} className="card" style={{ 
                background: 'var(--bg-white)',
                borderLeft: '4px solid var(--primary-color)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '1rem' 
                }}>
                  <div style={{ 
                    padding: '0.5rem 1rem', 
                    background: 'var(--bg-light)', 
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: 'var(--primary-color)'
                  }}>
                    {result.game}
                  </div>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                    {result.date}
                  </span>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ flex: 1, textAlign: 'right' }}>
                      <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                        {result.homeTeam}
                      </div>
                    </div>
                    <div style={{ 
                      fontSize: '2rem', 
                      fontWeight: 'bold', 
                      color: 'var(--primary-color)',
                      minWidth: '100px'
                    }}>
                      {result.homeScore} - {result.awayScore}
                    </div>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                        {result.awayTeam}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-gradient" style={{ color: 'white' }}>
        <div className="container text-center">
          <h2 className="section-title" style={{ color: 'white' }}>
            Join the Competition
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Represent your community in our games league. Register your team today!
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <button className="btn btn-outline" style={{ 
              borderColor: 'white', 
              color: 'white',
              cursor: 'pointer'
            }}>
              Register Your Team
              <ArrowRight size={20} />
            </button>
            <button className="btn" style={{ 
              background: 'white',
              color: 'var(--primary-color)',
              cursor: 'pointer'
            }}>
              View Full Schedule
              <Calendar size={20} />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
