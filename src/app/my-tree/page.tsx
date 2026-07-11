'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Users, Plus, Search, X, GitBranch, ChevronDown, AlertCircle,
  Heart, Baby, UserCheck, User, Loader2, CheckCircle2
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Member {
  id: string
  firstName: string
  lastName: string | null
  gender: string
  birthYear: number | null
  birthPlace: string | null
  clan: string | null
  bio: string | null
}

interface Relationship {
  id: string
  fromMemberId: string
  toMemberId: string
  type: string
}

interface TreeData {
  me: Member | null
  members: Member[]
  relationships: Relationship[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fullName(m: Member) {
  return [m.firstName, m.lastName].filter(Boolean).join(' ')
}

function getRelated(memberId: string, type: string[], rels: Relationship[], members: Member[]): Member[] {
  const ids = rels
    .filter((r) => r.fromMemberId === memberId && type.includes(r.type))
    .map((r) => r.toMemberId)
  return members.filter((m) => ids.includes(m.id))
}

const GENDER_COLORS: Record<string, string> = {
  male: '#2563eb',
  female: '#db2777',
  unknown: '#6b7280',
}

// ─── Member Card ──────────────────────────────────────────────────────────────

function MemberCard({ member, isMe = false, onAdd }: { member: Member; isMe?: boolean; onAdd?: () => void }) {
  const color = GENDER_COLORS[member.gender] ?? '#6b7280'
  return (
    <div
      style={{
        background: 'white',
        border: `2px solid ${isMe ? '#d97706' : color}`,
        borderRadius: '0.75rem',
        padding: isMe ? '1rem 1.25rem' : '0.75rem',
        width: isMe ? '180px' : '150px',
        textAlign: 'center',
        boxShadow: isMe ? '0 4px 20px rgba(217,119,6,0.2)' : '0 2px 8px rgba(0,0,0,0.08)',
        position: 'relative',
      }}
    >
      {isMe && (
        <div style={{
          position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)',
          background: '#d97706', color: 'white', fontSize: '0.6rem', fontWeight: '800',
          padding: '2px 8px', borderRadius: '2rem', letterSpacing: '0.08em', textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>You</div>
      )}
      <div style={{
        width: isMe ? '48px' : '40px', height: isMe ? '48px' : '40px',
        borderRadius: '50%', background: `linear-gradient(135deg, ${isMe ? '#d97706' : color}, ${isMe ? '#f59e0b' : color + '99'})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem',
      }}>
        <Users size={isMe ? 24 : 18} color="white" />
      </div>
      <div style={{ fontSize: isMe ? '0.9rem' : '0.78rem', fontWeight: '700', color: '#1f2937', lineHeight: 1.3 }}>
        {fullName(member)}
      </div>
      {member.birthYear && (
        <div style={{ fontSize: '0.68rem', color: '#9ca3af', marginTop: '0.2rem' }}>b. {member.birthYear}</div>
      )}
      {member.clan && (
        <div style={{ fontSize: '0.68rem', color: '#6b7280', marginTop: '0.1rem' }}>{member.clan}</div>
      )}
      {onAdd && (
        <button onClick={onAdd} style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: '#d97706', background: '#fef9f0', border: '1px solid #fde68a', borderRadius: '0.375rem', padding: '0.2rem 0.6rem', cursor: 'pointer', fontWeight: '600' }}>
          + Add relative
        </button>
      )}
    </div>
  )
}

// ─── Empty Slot ───────────────────────────────────────────────────────────────

function EmptySlot({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '140px', padding: '1.25rem 0.75rem',
        border: '2px dashed #d1d5db', borderRadius: '0.75rem',
        background: '#f9fafb', cursor: 'pointer', textAlign: 'center',
        transition: 'border-color 0.15s, background 0.15s',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#d97706'; (e.currentTarget as HTMLButtonElement).style.background = '#fef9f0' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#d1d5db'; (e.currentTarget as HTMLButtonElement).style.background = '#f9fafb' }}
    >
      <Plus size={20} color="#d97706" />
      <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>{label}</span>
    </button>
  )
}

// ─── Add Member Modal ─────────────────────────────────────────────────────────

type RelType = 'father' | 'mother' | 'sibling' | 'spouse' | 'child' | 'grandparent' | 'other'

interface AddModalProps {
  defaultRelationship?: RelType
  onClose: () => void
  onAdded: () => void
}

function AddMemberModal({ defaultRelationship, onClose, onAdded }: AddModalProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('unknown')
  const [birthYear, setBirthYear] = useState('')
  const [birthPlace, setBirthPlace] = useState('')
  const [clan, setClan] = useState('')
  const [relationship, setRelationship] = useState<RelType>(defaultRelationship ?? 'sibling')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Member[]>([])
  const [searching, setSearching] = useState(false)
  const [selectedExisting, setSelectedExisting] = useState<Member | null>(null)

  // Search for existing members
  useEffect(() => {
    if (searchQuery.length < 2) { setSearchResults([]); return }
    const timer = setTimeout(async () => {
      setSearching(true)
      const res = await fetch(`/api/family/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await res.json()
      setSearchResults(data)
      setSearching(false)
    }, 350)
    return () => clearTimeout(timer)
  }, [searchQuery])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/family', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        gender,
        birthYear,
        birthPlace,
        clan,
        relationship,
        connectToId: selectedExisting?.id ?? null,
      }),
    })

    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error); return }
    onAdded()
  }

  const relOptions: { value: RelType; label: string; icon: React.ElementType }[] = [
    { value: 'father', label: 'Father', icon: User },
    { value: 'mother', label: 'Mother', icon: User },
    { value: 'sibling', label: 'Sibling (Brother/Sister)', icon: Users },
    { value: 'spouse', label: 'Spouse / Partner', icon: Heart },
    { value: 'child', label: 'Son / Daughter', icon: Baby },
    { value: 'grandparent', label: 'Grandparent', icon: UserCheck },
    { value: 'other', label: 'Other relative', icon: Users },
  ]

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
    }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: 'white', borderRadius: '1rem', width: '100%', maxWidth: '520px',
        maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      }}>
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111827', margin: 0 }}>Add Family Member</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '0.25rem' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {/* Relationship */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#374151', marginBottom: '0.5rem' }}>
              This person is my…
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {relOptions.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRelationship(value)}
                  style={{
                    padding: '0.6rem 0.75rem', borderRadius: '0.5rem', border: '1.5px solid',
                    borderColor: relationship === value ? '#d97706' : '#e5e7eb',
                    background: relationship === value ? '#fef9f0' : 'white',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                    fontSize: '0.82rem', fontWeight: '600', color: relationship === value ? '#92400e' : '#374151',
                    transition: 'all 0.15s', textAlign: 'left',
                  }}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Search for existing person */}
          <div style={{ marginBottom: '1.25rem', padding: '1rem', background: '#f0fdf4', borderRadius: '0.75rem', border: '1px solid #bbf7d0' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#166534', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Search size={13} /> Already in the system? Connect instead of creating a duplicate
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search by name…"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setSelectedExisting(null) }}
                style={{ width: '100%', padding: '0.6rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #86efac', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', background: 'white' }}
              />
              {searching && <Loader2 size={14} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', animation: 'spin 1s linear infinite' }} />}
            </div>
            {searchResults.length > 0 && !selectedExisting && (
              <div style={{ marginTop: '0.5rem', border: '1px solid #86efac', borderRadius: '0.5rem', overflow: 'hidden', background: 'white' }}>
                {searchResults.map((m) => (
                  <button key={m.id} type="button" onClick={() => { setSelectedExisting(m); setFirstName(m.firstName); setLastName(m.lastName ?? ''); setSearchQuery(''); setSearchResults([]) }}
                    style={{ width: '100%', padding: '0.6rem 0.875rem', border: 'none', background: 'white', cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid #f0fdf4', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#f0fdf4')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'white')}
                  >
                    <Users size={14} color="#059669" />
                    <div>
                      <span style={{ fontWeight: '600', color: '#111827' }}>{fullName(m)}</span>
                      {(m.birthPlace || m.clan) && (
                        <span style={{ color: '#6b7280', marginLeft: '0.4rem' }}>— {[m.birthPlace, m.clan].filter(Boolean).join(', ')}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
            {selectedExisting && (
              <div style={{ marginTop: '0.5rem', padding: '0.6rem 0.875rem', background: '#dcfce7', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534', fontWeight: '600' }}>
                  <CheckCircle2 size={14} />
                  Connecting to: {fullName(selectedExisting)}
                </div>
                <button type="button" onClick={() => setSelectedExisting(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Form fields — only if not connecting to existing */}
          {!selectedExisting && (
            <form onSubmit={handleSubmit} id="add-member-form">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#374151', marginBottom: '0.3rem' }}>First name *</label>
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required placeholder="e.g. Elijah"
                    style={{ width: '100%', padding: '0.65rem 0.875rem', borderRadius: '0.5rem', border: '1.5px solid #e5e7eb', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#d97706')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#374151', marginBottom: '0.3rem' }}>Last name</label>
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="e.g. Odundo"
                    style={{ width: '100%', padding: '0.65rem 0.875rem', borderRadius: '0.5rem', border: '1.5px solid #e5e7eb', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#d97706')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#374151', marginBottom: '0.3rem' }}>Gender</label>
                  <div style={{ position: 'relative' }}>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 2rem 0.65rem 0.875rem', borderRadius: '0.5rem', border: '1.5px solid #e5e7eb', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box', appearance: 'none', background: 'white' }}>
                      <option value="unknown">Unknown</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#374151', marginBottom: '0.3rem' }}>Birth year</label>
                  <input type="number" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} placeholder="e.g. 1965" min="1800" max="2024"
                    style={{ width: '100%', padding: '0.65rem 0.875rem', borderRadius: '0.5rem', border: '1.5px solid #e5e7eb', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#d97706')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#374151', marginBottom: '0.3rem' }}>Village / Town</label>
                  <input type="text" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} placeholder="e.g. Kisumu"
                    style={{ width: '100%', padding: '0.65rem 0.875rem', borderRadius: '0.5rem', border: '1.5px solid #e5e7eb', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#d97706')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#374151', marginBottom: '0.3rem' }}>Clan</label>
                  <input type="text" value={clan} onChange={(e) => setClan(e.target.value)} placeholder="e.g. Jo-Ugenya"
                    style={{ width: '100%', padding: '0.65rem 0.875rem', borderRadius: '0.5rem', border: '1.5px solid #e5e7eb', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#d97706')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')} />
                </div>
              </div>

              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.85rem', color: '#dc2626' }}>
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" onClick={onClose} style={{ flex: 1, padding: '0.75rem', borderRadius: '0.625rem', border: '1.5px solid #e5e7eb', background: 'white', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                  Cancel
                </button>
                <button type="submit" disabled={loading} style={{ flex: 2, padding: '0.75rem', borderRadius: '0.625rem', background: loading ? '#fde68a' : '#d97706', color: 'white', border: 'none', fontSize: '0.875rem', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer' }}>
                  {loading ? 'Saving…' : 'Add to My Tree'}
                </button>
              </div>
            </form>
          )}

          {/* If connecting to existing, just show connect button */}
          {selectedExisting && (
            <div>
              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.85rem', color: '#dc2626' }}>
                  <AlertCircle size={14} /> {error}
                </div>
              )}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={onClose} style={{ flex: 1, padding: '0.75rem', borderRadius: '0.625rem', border: '1.5px solid #e5e7eb', background: 'white', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    setError(''); setLoading(true)
                    const res = await fetch('/api/family', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ firstName: selectedExisting.firstName, relationship, connectToId: selectedExisting.id }),
                    })
                    const data = await res.json()
                    setLoading(false)
                    if (!res.ok) { setError(data.error); return }
                    onAdded()
                  }}
                  disabled={loading}
                  style={{ flex: 2, padding: '0.75rem', borderRadius: '0.625rem', background: loading ? '#fde68a' : '#059669', color: 'white', border: 'none', fontSize: '0.875rem', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer' }}
                >
                  {loading ? 'Connecting…' : `Connect to ${fullName(selectedExisting)}`}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Tree View ────────────────────────────────────────────────────────────────

function TreeView({ tree, onAdd }: { tree: TreeData; onAdd: (rel?: RelType) => void }) {
  const { me, members, relationships } = tree

  if (!me) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <GitBranch size={48} color="#d97706" style={{ margin: '0 auto 1rem' }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Your tree is empty</h3>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Your profile was created during registration. Add your first family member to get started.</p>
        <button onClick={() => onAdd('father')} className="btn btn-primary">
          <Plus size={18} /> Add a family member
        </button>
      </div>
    )
  }

  const grandparents = getRelated(me.id, ['grandchild_of'], relationships, members)
  const parents = getRelated(me.id, ['child_of'], relationships, members)
  const children = getRelated(me.id, ['parent_of'], relationships, members)
  const siblings = getRelated(me.id, ['sibling_of'], relationships, members)
  const spouses = getRelated(me.id, ['spouse_of'], relationships, members)

  const father = parents.find((p) => p.gender === 'male') ?? parents[0]
  const mother = parents.find((p) => p.gender === 'female') ?? (parents.length > 1 ? parents[1] : null)

  return (
    <div style={{ overflowX: 'auto', padding: '1rem 0 2rem' }}>
      <div style={{ minWidth: 'max-content', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>

        {/* ── Grandparents row ── */}
        {grandparents.length > 0 && (
          <>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Grandparents
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '0' }}>
              {grandparents.map((g) => <MemberCard key={g.id} member={g} />)}
            </div>
            <div style={{ width: '2px', height: '24px', background: '#d97706' }} />
          </>
        )}

        {/* ── Parents row ── */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end', marginBottom: '0' }}>
          {father
            ? <MemberCard member={father} />
            : <EmptySlot label="Add Father" onClick={() => onAdd('father')} />}
          {mother
            ? <MemberCard member={mother} />
            : <EmptySlot label="Add Mother" onClick={() => onAdd('mother')} />}
        </div>

        {/* Connector lines from parents to me */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <div style={{ width: '150px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '2px', height: '30px', background: '#d97706' }} />
          </div>
          <div style={{ width: '150px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '2px', height: '30px', background: '#d97706' }} />
          </div>
        </div>

        {/* Horizontal connector between parent lines */}
        <div style={{ width: `${150 + 24}px`, height: '2px', background: '#d97706', marginBottom: '0' }} />

        {/* Drop to me */}
        <div style={{ width: '2px', height: '24px', background: '#d97706' }} />

        {/* ── Main row: siblings | me | spouse ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Siblings */}
          {siblings.length > 0 && (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              {siblings.map((s) => <MemberCard key={s.id} member={s} />)}
              <div style={{ width: '32px', height: '2px', background: '#d97706' }} />
            </div>
          )}

          {/* Me */}
          <MemberCard member={me} isMe />

          {/* Spouse */}
          {spouses.length > 0 ? (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ width: '32px', height: '2px', background: '#db2777' }} />
              {spouses.map((s) => <MemberCard key={s.id} member={s} />)}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '24px', height: '2px', background: '#e5e7eb' }} />
              <EmptySlot label="Add Spouse" onClick={() => onAdd('spouse')} />
            </div>
          )}
        </div>

        {/* Drop to children */}
        <div style={{ width: '2px', height: '24px', background: '#d97706', marginTop: '0' }} />

        {/* ── Children row ── */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>
          {children.map((c) => <MemberCard key={c.id} member={c} />)}
          <EmptySlot label="Add Child" onClick={() => onAdd('child')} />
        </div>

        {/* Siblings add button */}
        {siblings.length === 0 && (
          <div style={{ marginTop: '1.5rem' }}>
            <button onClick={() => onAdd('sibling')} style={{ padding: '0.5rem 1.25rem', border: '1.5px dashed #d1d5db', borderRadius: '2rem', background: 'white', cursor: 'pointer', fontSize: '0.8rem', color: '#6b7280', fontWeight: '600', transition: 'all 0.15s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#d97706'; (e.currentTarget as HTMLButtonElement).style.color = '#d97706' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#d1d5db'; (e.currentTarget as HTMLButtonElement).style.color = '#6b7280' }}
            >
              + Add Sibling
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MyTreePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [tree, setTree] = useState<TreeData | null>(null)
  const [loadingTree, setLoadingTree] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [defaultRel, setDefaultRel] = useState<RelType | undefined>()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  const fetchTree = useCallback(async () => {
    setLoadingTree(true)
    const res = await fetch('/api/family')
    if (res.ok) setTree(await res.json())
    setLoadingTree(false)
  }, [])

  useEffect(() => {
    if (status === 'authenticated') fetchTree()
  }, [status, fetchTree])

  function openAdd(rel?: RelType) {
    setDefaultRel(rel)
    setShowModal(true)
  }

  if (status === 'loading' || !session) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 size={32} color="#d97706" style={{ animation: 'spin 1s linear infinite' }} />
      </div>
    )
  }

  const memberCount = tree?.members.length ?? 0

  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'white', marginBottom: '0.25rem' }}>
                {session.user?.name}&apos;s Family Tree
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem' }}>
                {memberCount > 1 ? `${memberCount} people documented` : 'Start building your lineage'}
              </p>
            </div>
            <button
              onClick={() => openAdd()}
              className="btn"
              style={{ background: 'white', color: '#d97706', fontWeight: '700', border: '2px solid white' }}
            >
              <Plus size={18} />
              Add Family Member
            </button>
          </div>
        </div>
      </section>

      {/* Tree */}
      <section className="section">
        <div className="container">
          {loadingTree ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
              <Loader2 size={32} color="#d97706" style={{ animation: 'spin 1s linear infinite' }} />
            </div>
          ) : tree ? (
            <>
              {/* Info banner if tree has connections to others */}
              {memberCount > 1 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1.25rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.75rem', marginBottom: '2rem', fontSize: '0.875rem', color: '#166534' }}>
                  <CheckCircle2 size={16} />
                  <span>Your tree has <strong>{memberCount}</strong> people. Click any empty slot to add more relatives.</span>
                </div>
              )}
              <TreeView tree={tree} onAdd={openAdd} />
            </>
          ) : (
            <p style={{ textAlign: 'center', color: '#9ca3af' }}>Could not load tree. Please refresh.</p>
          )}
        </div>
      </section>

      {/* How it works */}
      {(!tree?.me || memberCount <= 1) && (
        <section className="section bg-white">
          <div className="container">
            <h2 className="section-title">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: '1', icon: User, title: 'Your profile is ready', desc: 'Your profile was created when you registered. You appear at the centre of your tree.' },
                { step: '2', icon: Plus, title: 'Add family members', desc: 'Click any "Add" slot to add your father, mother, siblings, spouse, or children.' },
                { step: '3', icon: GitBranch, title: 'Connect relatives', desc: 'If a relative is already in the system, the search will suggest them — no duplicates.' },
              ].map(({ step, icon: Icon, title, desc }) => (
                <div key={step} className="card">
                  <div className="card-body" style={{ textAlign: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #d97706, #f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                      <Icon size={22} color="white" />
                    </div>
                    <h4 style={{ fontWeight: '700', marginBottom: '0.5rem' }}>{title}</h4>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Community tree link */}
      <section className="section bg-gradient" style={{ color: 'white' }}>
        <div className="container text-center">
          <GitBranch size={36} color="white" style={{ margin: '0 auto 1rem' }} />
          <h2 className="section-title" style={{ color: 'white' }}>See the Full Luo Clan Tree</h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Explore how your lineage connects to the broader Luo community — from Ramogi Ajwang to today.
          </p>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/family-tree" className="btn" style={{ background: 'white', color: '#d97706', fontWeight: '700', border: '2px solid white' }}>
              <GitBranch size={18} />
              Open Community Tree
            </Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <AddMemberModal
          defaultRelationship={defaultRel}
          onClose={() => setShowModal(false)}
          onAdded={() => { setShowModal(false); fetchTree() }}
        />
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </>
  )
}
