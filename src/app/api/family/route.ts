import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getOrCreateMe } from '@/lib/family'

// GET /api/family — fetch all members + relationships in the current user's tree
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Find (or lazily create) this user's own FamilyMember profile
    const me = await getOrCreateMe(session.user.id)

    // Collect all member IDs reachable from "me" (2 hops)
    const directRels = await prisma.relationship.findMany({
      where: {
        OR: [{ fromMemberId: me.id }, { toMemberId: me.id }],
      },
    })

    const directIds = new Set<string>([me.id])
    for (const r of directRels) {
      directIds.add(r.fromMemberId)
      directIds.add(r.toMemberId)
    }

    // Second hop
    const secondRels = await prisma.relationship.findMany({
      where: {
        OR: [
          { fromMemberId: { in: [...directIds] } },
          { toMemberId: { in: [...directIds] } },
        ],
      },
    })

    const allIds = new Set<string>(directIds)
    for (const r of secondRels) {
      allIds.add(r.fromMemberId)
      allIds.add(r.toMemberId)
    }

    const members = await prisma.familyMember.findMany({
      where: { id: { in: [...allIds] } },
    })

    const relationships = await prisma.relationship.findMany({
      where: {
        fromMemberId: { in: [...allIds] },
        toMemberId: { in: [...allIds] },
      },
    })

    return NextResponse.json({ me, members, relationships })
  } catch (err) {
    console.error('GET /api/family error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

// POST /api/family — add a new family member and relationship to the user
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { firstName, lastName, gender, birthYear, birthPlace, clan, bio, relationship, connectToId } = body as {
    firstName?: string; lastName?: string; gender?: string; birthYear?: string | number
    birthPlace?: string; clan?: string; bio?: string; relationship?: string; connectToId?: string
  }

  if (!firstName) {
    return NextResponse.json({ error: 'First name is required' }, { status: 400 })
  }
  if (!relationship) {
    return NextResponse.json({ error: 'Relationship is required' }, { status: 400 })
  }

  // Parse the optional birth year defensively — never store NaN.
  let parsedBirthYear: number | null = null
  if (birthYear !== undefined && birthYear !== null && `${birthYear}`.trim() !== '') {
    const n = Number.parseInt(`${birthYear}`, 10)
    parsedBirthYear = Number.isNaN(n) ? null : n
  }

  try {
    const me = await getOrCreateMe(session.user.id)

    // Prevent connecting yourself to yourself
    if (connectToId && connectToId === me.id) {
      return NextResponse.json({ error: 'You cannot connect yourself to yourself' }, { status: 400 })
    }

    let member
    if (connectToId) {
      // Connect to an existing person
      member = await prisma.familyMember.findUnique({ where: { id: connectToId } })
      if (!member) {
        return NextResponse.json({ error: 'Person not found' }, { status: 404 })
      }
    } else {
      // Create a new person
      member = await prisma.familyMember.create({
        data: {
          firstName,
          lastName: lastName || null,
          gender: gender || 'unknown',
          birthYear: parsedBirthYear,
          birthPlace: birthPlace || null,
          clan: clan || null,
          bio: bio || null,
          addedById: session.user.id,
        },
      })
    }

    // Map the relationship label to a type pair
    // "me" is the anchor; we store bidirectional meaning
    const relMap: Record<string, { from: string; to: string }> = {
      father:      { from: 'parent_of', to: 'child_of' },
      mother:      { from: 'parent_of', to: 'child_of' },
      sibling:     { from: 'sibling_of', to: 'sibling_of' },
      spouse:      { from: 'spouse_of', to: 'spouse_of' },
      child:       { from: 'child_of', to: 'parent_of' },
      // Grandparents get their own type so they don't collapse into the parents row.
      grandparent: { from: 'grandparent_of', to: 'grandchild_of' },
      other:       { from: 'related_to', to: 'related_to' },
    }

    const rel = relMap[relationship] ?? { from: 'related_to', to: 'related_to' }

    // member → me
    await prisma.relationship.upsert({
      where: {
        id: `${member.id}-${me.id}-${rel.from}`,
      },
      update: {},
      create: {
        id: `${member.id}-${me.id}-${rel.from}`,
        fromMemberId: member.id,
        toMemberId: me.id,
        type: rel.from,
        addedById: session.user.id,
      },
    })

    // me → member
    await prisma.relationship.upsert({
      where: {
        id: `${me.id}-${member.id}-${rel.to}`,
      },
      update: {},
      create: {
        id: `${me.id}-${member.id}-${rel.to}`,
        fromMemberId: me.id,
        toMemberId: member.id,
        type: rel.to,
        addedById: session.user.id,
      },
    })

    return NextResponse.json({ member }, { status: 201 })
  } catch (err) {
    console.error('POST /api/family error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
