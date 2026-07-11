'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Users, Crown, GitBranch, Search, Info, ChevronDown, ChevronRight } from 'lucide-react'
import {
  familyMembers,
  FamilyMember,
  getMember,
  getChildren,
  categoryColors,
  categoryLabels,
} from '@/data/family-tree'

// ─── Compact Person Card ───────────────────────────────────────────────────────

function PersonCard({
  member,
  size = 'md',
}: {
  member: FamilyMember
  size?: 'lg' | 'md' | 'sm'
}) {
  const color = categoryColors[member.category]
  const isLg = size === 'lg'
  const isSm = size === 'sm'

  return (
    <Link href={`/people/${member.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        className="person-card"
        style={{
          background: 'white',
          border: `2px solid ${color}`,
          borderRadius: '0.75rem',
          padding: isLg ? '1rem 1.25rem' : isSm ? '0.5rem 0.75rem' : '0.65rem 0.9rem',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          transition: 'transform 0.15s, box-shadow 0.15s',
          cursor: 'pointer',
          width: '100%',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 18px rgba(0,0,0,0.13)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
        }}
      >
        <div
          style={{
            width: isLg ? '52px' : isSm ? '32px' : '40px',
            height: isLg ? '52px' : isSm ? '32px' : '40px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${color}, ${color}bb)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.4rem',
          }}
        >
          <Users size={isLg ? 26 : isSm ? 16 : 20} color="white" />
        </div>
        <div
          style={{
            fontSize: isSm ? '0.6rem' : '0.62rem',
            fontWeight: '700',
            color,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '0.2rem',
          }}
        >
          {categoryLabels[member.category]}
        </div>
        <div
          style={{
            fontSize: isLg ? '0.95rem' : isSm ? '0.72rem' : '0.8rem',
            fontWeight: '700',
            color: '#1f2937',
            lineHeight: 1.25,
            marginBottom: '0.15rem',
          }}
        >
          {member.name}
        </div>
        <div style={{ fontSize: isSm ? '0.62rem' : '0.68rem', color: '#9ca3af' }}>{member.clan}</div>
        {!isSm && member.county && (
          <div style={{ fontSize: '0.62rem', color: '#d97706', marginTop: '0.15rem', fontWeight: '600' }}>
            {member.county}
          </div>
        )}
        {(member.birthYear || member.deathYear) && (
          <div style={{ fontSize: '0.6rem', color: '#b0b8c4', marginTop: '0.15rem' }}>
            {member.birthYear ?? '?'} – {member.deathYear ?? 'present'}
          </div>
        )}
      </div>
    </Link>
  )
}

// ─── Sub-clan column: one main branch child + its descendants ──────────────────

function BranchColumn({ branchId }: { branchId: string }) {
  const branch = getMember(branchId)
  if (!branch) return null
  const subClans = getChildren(branchId)
  const color = categoryColors[branch.category]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 0 }}>
      {/* Vertical line from horizontal bar to branch node */}
      <div style={{ width: '2px', height: '24px', background: '#d97706' }} />

      {/* Branch node (Owiny / Ojwang / Nyabong) */}
      <div style={{ width: '100%', maxWidth: '180px' }}>
        <PersonCard member={branch} size="md" />
      </div>

      {subClans.length > 0 && (
        <>
          {/* Line down to sub-clans */}
          <div style={{ width: '2px', height: '20px', background: '#d97706' }} />

          {/* Sub-clan list (vertical stack) */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
              position: 'relative',
              alignItems: 'center',
            }}
          >
            {/* Left border accent line */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '2px',
                background: `${color}44`,
                transform: 'translateX(-50%)',
              }}
            />

            {subClans.map((sub, idx) => (
              <SubClanRow key={sub.id} sub={sub} isLast={idx === subClans.length - 1} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Individual sub-clan row with optional expandable notable figures ──────────

function SubClanRow({ sub, isLast }: { sub: FamilyMember; isLast: boolean }) {
  const [open, setOpen] = useState(false)
  const notables = getChildren(sub.id)
  const hasNotables = notables.length > 0

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        paddingBottom: isLast ? 0 : '4px',
      }}
    >
      {/* Horizontal tick + card row */}
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '0' }}>
        {/* Left half-line from center spine to card */}
        <div style={{ flex: 1, height: '2px', background: '#d9770644' }} />

        {/* Card */}
        <div style={{ width: '100%', maxWidth: '170px', position: 'relative' }}>
          <PersonCard member={sub} size="sm" />
          {hasNotables && (
            <button
              onClick={() => setOpen((v) => !v)}
              title={open ? 'Collapse' : 'Expand notable figures'}
              style={{
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#d97706',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                padding: 0,
              }}
            >
              {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </button>
          )}
        </div>

        {/* Right half-line */}
        <div style={{ flex: 1, height: '2px', background: '#d9770644' }} />
      </div>

      {/* Notable figures (expandable) */}
      {hasNotables && open && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            marginTop: '14px',
            width: '100%',
            paddingBottom: '6px',
          }}
        >
          {notables.map((notable) => (
            <div key={notable.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div style={{ width: '2px', height: '16px', background: '#d97706' }} />
              <div style={{ width: '100%', maxWidth: '170px' }}>
                <PersonCard member={notable} size="sm" />
              </div>
              {/* Check for grandchildren (e.g. Raila under Jaramogi) */}
              {getChildren(notable.id).map((grandchild) => (
                <div key={grandchild.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <div style={{ width: '2px', height: '14px', background: '#d97706aa' }} />
                  <div style={{ width: '100%', maxWidth: '160px' }}>
                    <PersonCard member={grandchild} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Search ───────────────────────────────────────────────────────────────────

function SearchPanel() {
  const [query, setQuery] = useState('')
  const results =
    query.length > 1
      ? familyMembers.filter(
          (m) =>
            m.name.toLowerCase().includes(query.toLowerCase()) ||
            m.clan.toLowerCase().includes(query.toLowerCase()) ||
            m.description.toLowerCase().includes(query.toLowerCase())
        )
      : []

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ position: 'relative' }}>
        <Search
          size={18}
          style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af',
          }}
        />
        <input
          type="text"
          placeholder="Search by name, clan, or description…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem 0.75rem 2.75rem',
            borderRadius: '0.75rem',
            border: '2px solid #e5e7eb',
            fontSize: '1rem',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#d97706')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
        />
      </div>

      {results.length > 0 && (
        <div
          style={{
            marginTop: '0.5rem',
            background: 'white',
            borderRadius: '0.75rem',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            overflow: 'hidden',
          }}
        >
          {results.map((m) => (
            <Link
              key={m.id}
              href={`/people/${m.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderBottom: '1px solid #f3f4f6',
                textDecoration: 'none',
                color: 'inherit',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = '#fef9f0')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'white')}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${categoryColors[m.category]}, ${categoryColors[m.category]}99)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Users size={16} color="white" />
              </div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#1f2937' }}>{m.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  {m.clan} · {categoryLabels[m.category]}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {query.length > 1 && results.length === 0 && (
        <div style={{ marginTop: '1rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.9rem' }}>
          No results for &quot;{query}&quot;
        </div>
      )}
    </div>
  )
}

// ─── Legend ───────────────────────────────────────────────────────────────────

function Legend() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.6rem',
        justifyContent: 'center',
        padding: '0.75rem 1rem',
        background: 'white',
        borderRadius: '0.75rem',
        border: '1px solid #e5e7eb',
        marginBottom: '1.5rem',
      }}
    >
      {Object.entries(categoryLabels).map(([key, label]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: categoryColors[key as FamilyMember['category']],
              flexShrink: 0,
            }}
          />
          <span style={{ color: '#374151' }}>{label}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Main Tree Layout ─────────────────────────────────────────────────────────

function ClanTree() {
  const root = getMember('ramogi-ajwang')
  if (!root) return null

  // Ramogi's three children
  const mainBranches = getChildren('ramogi-ajwang')

  return (
    <div style={{ width: '100%' }}>
      {/* Root node */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0' }}>
        <div style={{ width: '220px' }}>
          <PersonCard member={root} size="lg" />
        </div>
      </div>

      {/* Line down from root */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '2px', height: '24px', background: '#d97706' }} />
      </div>

      {/* Horizontal bar spanning all 3 branches */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '16.67%',
            right: '16.67%',
            height: '2px',
            background: '#d97706',
          }}
        />
      </div>

      {/* Three branch columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.5rem',
          alignItems: 'start',
          padding: '0 0.25rem',
        }}
      >
        {mainBranches.map((branch) => (
          <BranchColumn key={branch.id} branchId={branch.id} />
        ))}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type Tab = 'tree' | 'search'

export default function FamilyTreePage() {
  const [activeTab, setActiveTab] = useState<Tab>('tree')

  const stats = [
    { number: familyMembers.length, label: 'People Documented' },
    { number: familyMembers.filter((m) => m.category === 'clan-founder').length, label: 'Clan Founders' },
    { number: new Set(familyMembers.map((m) => m.clan)).size, label: 'Clans Represented' },
    { number: familyMembers.filter((m) => m.birthYear).length, label: 'Dated Records' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content text-center">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <GitBranch size={48} color="white" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Luo Clan Family Tree</h1>
            <p className="text-xl mb-8" style={{ maxWidth: '650px', margin: '0 auto 2rem' }}>
              Trace the lineage of the Luo people from the legendary Ramogi Ajwang through the founding
              clan leaders to notable historical figures who shaped East Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section bg-white" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-item">
                <span className="stat-number">{s.number}+</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="section" style={{ paddingTop: '1.5rem' }}>
        <div className="container">
          {/* Tab bar */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
            {([
              { key: 'tree', label: 'Clan Tree', icon: GitBranch },
              { key: 'search', label: 'Search People', icon: Search },
            ] as { key: Tab; label: string; icon: React.ElementType }[]).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  padding: '0.6rem 1.5rem',
                  borderRadius: '2rem',
                  border: '2px solid',
                  borderColor: activeTab === key ? '#d97706' : '#e5e7eb',
                  background: activeTab === key ? '#d97706' : 'white',
                  color: activeTab === key ? 'white' : '#374151',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.15s',
                }}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          {/* Tree tab */}
          {activeTab === 'tree' && (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '0.875rem 1.25rem',
                  background: '#fef9f0',
                  border: '1px solid #fde68a',
                  borderRadius: '0.75rem',
                  marginBottom: '1.25rem',
                  fontSize: '0.83rem',
                  color: '#92400e',
                }}
              >
                <Info size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
                <span>
                  This tree was generated by a <strong>Python layout algorithm</strong> (Reingold-Tilford) for
                  optimal spacing. Click any card below to view a full profile.
                </span>
              </div>

              {/* Python-generated SVG tree */}
              <div
                style={{
                  width: '100%',
                  background: '#fdf6ec',
                  borderRadius: '1rem',
                  border: '1px solid #fde68a',
                  overflow: 'hidden',
                  marginBottom: '2rem',
                }}
              >
                <img
                  src="/clan-tree.svg"
                  alt="Luo Clan Family Tree — from Ramogi Ajwang through all sub-clan founders"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

            </>
          )}

          {/* Search tab */}
          {activeTab === 'search' && (
            <div style={{ padding: '1rem 0' }}>
              <h2 className="section-title">Search the Archive</h2>
              <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
                Find a person by name, clan, or keyword
              </p>
              <SearchPanel />

              <div style={{ marginTop: '3rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1f2937' }}>
                  All Documented People
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {familyMembers.map((m) => (
                    <Link key={m.id} href={`/people/${m.slug}`} style={{ textDecoration: 'none' }}>
                      <div
                        className="card"
                        style={{ transition: 'transform 0.15s' }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)')}
                      >
                        <div className="card-body">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div
                              style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, ${categoryColors[m.category]}, ${categoryColors[m.category]}99)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <Users size={22} color="white" />
                            </div>
                            <div>
                              <div style={{ fontWeight: '700', color: '#1f2937', fontSize: '0.95rem' }}>
                                {m.name}
                              </div>
                              <div style={{ fontSize: '0.78rem', color: categoryColors[m.category], fontWeight: '600' }}>
                                {categoryLabels[m.category]}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                                {m.clan}
                                {m.birthYear ? ` · b. ${m.birthYear}` : ''}
                              </div>
                            </div>
                          </div>
                          <p style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.5 }}>
                            {m.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient" style={{ color: 'white' }}>
        <div className="container text-center">
          <Crown size={40} color="white" style={{ margin: '0 auto 1rem' }} />
          <h2 className="section-title" style={{ color: 'white' }}>
            Know Your Lineage?
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Help us build the most complete record of Luo heritage. Submit a family member,
            correct existing records, or share oral history from your clan elders.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link
              href="/people"
              className="btn"
              style={{ backgroundColor: 'white', color: 'var(--primary-color)', border: '2px solid white' }}
            >
              <Users size={20} />
              Browse All People
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
