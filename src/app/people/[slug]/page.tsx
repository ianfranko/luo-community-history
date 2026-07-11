import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Users,
  MapPin,
  Calendar,
  ArrowLeft,
  GitBranch,
  Award,
  Star,
  ChevronRight,
} from 'lucide-react'
import {
  familyMembers,
  getMemberBySlug,
  getMember,
  getChildren,
  getParents,
  categoryColors,
  categoryLabels,
} from '@/data/family-tree'

export function generateStaticParams() {
  return familyMembers.map((m) => ({ slug: m.slug }))
}

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const person = getMemberBySlug(slug)
  if (!person) notFound()

  const parents = getParents(person.id)
  const children = getChildren(person.id)
  const spouses = person.spouseIds.map((id) => getMember(id)).filter(Boolean)
  const color = categoryColors[person.category]

  return (
    <>
      {/* Back nav */}
      <div
        style={{
          background: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: '0.75rem 0',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
            <Link href="/family-tree" style={{ color: '#6b7280', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <ArrowLeft size={14} />
              Family Tree
            </Link>
            <ChevronRight size={14} color="#9ca3af" />
            <Link href="/people" style={{ color: '#6b7280', textDecoration: 'none' }}>
              People
            </Link>
            <ChevronRight size={14} color="#9ca3af" />
            <span style={{ color: '#374151', fontWeight: '600' }}>{person.name}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section
        style={{
          background: `linear-gradient(135deg, ${color}15, ${color}08)`,
          borderBottom: `3px solid ${color}30`,
          padding: '3rem 0',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
            {/* Avatar */}
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${color}, ${color}99)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 8px 32px ${color}40`,
                flexShrink: 0,
              }}
            >
              <Users size={56} color="white" />
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: '250px' }}>
              {/* Category badge */}
              <span
                style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '2rem',
                  background: `${color}20`,
                  color: color,
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem',
                }}
              >
                {categoryLabels[person.category]}
              </span>

              <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#111827', margin: '0 0 0.25rem' }}>
                {person.name}
              </h1>

              {person.title && (
                <p style={{ fontSize: '1.1rem', color: color, fontWeight: '600', marginBottom: '1rem' }}>
                  {person.title}
                </p>
              )}

              {/* Meta pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  <Users size={15} />
                  <span>{person.clan}</span>
                </div>

                {(person.village || person.county) && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    <MapPin size={15} />
                    <span>{[person.village, person.county].filter(Boolean).join(', ')}</span>
                  </div>
                )}

                {(person.birthYear || person.deathYear) && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    <Calendar size={15} />
                    <span>
                      {person.birthYear ?? '?'} – {person.deathYear ?? 'Present'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: biography + achievements */}
            <div style={{ gridColumn: 'span 2' }}>
              {/* Biography */}
              <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div className="card-body">
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>
                    Biography
                  </h2>
                  <p style={{ lineHeight: 1.8, color: '#374151', fontSize: '0.95rem' }}>{person.biography}</p>
                </div>
              </div>

              {/* Achievements */}
              {person.achievements && person.achievements.length > 0 && (
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                  <div className="card-body">
                    <h2
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: '#111827',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <Award size={20} color={color} />
                      Key Achievements
                    </h2>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {person.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                            padding: '0.6rem 0',
                            borderBottom: i < person.achievements!.length - 1 ? '1px solid #f3f4f6' : 'none',
                          }}
                        >
                          <Star size={14} color={color} style={{ marginTop: '3px', flexShrink: 0 }} />
                          <span style={{ fontSize: '0.9rem', color: '#374151' }}>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Related places */}
              {person.relatedPlaces && person.relatedPlaces.length > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h2
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: '#111827',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <MapPin size={20} color={color} />
                      Related Places
                    </h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {person.relatedPlaces.map((place) => (
                        <span
                          key={place}
                          style={{
                            padding: '0.35rem 0.75rem',
                            borderRadius: '2rem',
                            background: `${color}15`,
                            color: color,
                            fontSize: '0.82rem',
                            fontWeight: '600',
                          }}
                        >
                          {place}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: family connections */}
            <div>
              {/* Lineage */}
              <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div className="card-body">
                  <h3
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: '#111827',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <GitBranch size={18} color={color} />
                    Family Connections
                  </h3>

                  {parents.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '700', color: '#9ca3af', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                        Lineage From
                      </div>
                      {parents.map((p) => (
                        <Link
                          key={p.id}
                          href={`/people/${p.slug}`}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', padding: '0.4rem 0' }}
                        >
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: `linear-gradient(135deg, ${categoryColors[p.category]}, ${categoryColors[p.category]}99)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <Users size={14} color="white" />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>{p.name}</div>
                            <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{p.clan}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {spouses.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '700', color: '#9ca3af', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                        Spouse
                      </div>
                      {spouses.map((s) => s && (
                        <Link key={s.id} href={`/people/${s.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', padding: '0.4rem 0' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg, ${categoryColors[s.category]}, ${categoryColors[s.category]}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Users size={14} color="white" />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>{s.name}</div>
                            <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{s.clan}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {children.length > 0 && (
                    <div>
                      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '700', color: '#9ca3af', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                        Descendants / Clan Members
                      </div>
                      {children.map((c) => (
                        <Link key={c.id} href={`/people/${c.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', padding: '0.4rem 0' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg, ${categoryColors[c.category]}, ${categoryColors[c.category]}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Users size={14} color="white" />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>{c.name}</div>
                            <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{categoryLabels[c.category]}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {parents.length === 0 && children.length === 0 && spouses.length === 0 && (
                    <p style={{ fontSize: '0.875rem', color: '#9ca3af', fontStyle: 'italic' }}>
                      No family connections documented yet.
                    </p>
                  )}
                </div>
              </div>

              {/* View in tree */}
              <div className="card">
                <div className="card-body" style={{ textAlign: 'center' }}>
                  <GitBranch size={28} color={color} style={{ margin: '0 auto 0.5rem' }} />
                  <h4 style={{ fontWeight: '700', marginBottom: '0.5rem', color: '#111827' }}>View in Clan Tree</h4>
                  <p style={{ fontSize: '0.82rem', color: '#6b7280', marginBottom: '1rem' }}>
                    See how {person.name.split(' ')[0]} fits within the full Luo lineage.
                  </p>
                  <Link href="/family-tree" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Open Family Tree
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More people */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">More from {person.clan}</h2>
          <p className="section-subtitle">Other documented members of the {person.clan} clan</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {familyMembers
              .filter((m) => m.clan === person.clan && m.id !== person.id)
              .slice(0, 3)
              .map((m) => (
                <Link key={m.id} href={`/people/${m.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ transition: 'transform 0.15s' }}>
                    <div className="card-body">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: `linear-gradient(135deg, ${categoryColors[m.category]}, ${categoryColors[m.category]}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Users size={20} color="white" />
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', color: '#1f2937', fontSize: '0.9rem' }}>{m.name}</div>
                          <div style={{ fontSize: '0.75rem', color: categoryColors[m.category], fontWeight: '600' }}>{categoryLabels[m.category]}</div>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.5 }}>{m.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          {familyMembers.filter((m) => m.clan === person.clan && m.id !== person.id).length === 0 && (
            <p style={{ textAlign: 'center', color: '#9ca3af', fontStyle: 'italic' }}>
              No other members of {person.clan} are documented yet.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
