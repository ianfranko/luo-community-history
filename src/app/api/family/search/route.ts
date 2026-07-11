import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// GET /api/family/search?q=name — find existing members for connection
export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const q = (req.nextUrl.searchParams.get('q') ?? '').trim()
  if (q.length < 2) return NextResponse.json([])

  try {
    const results = await prisma.familyMember.findMany({
      where: {
        OR: [
          { firstName: { contains: q } },
          { lastName: { contains: q } },
        ],
      },
      take: 8,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        birthYear: true,
        birthPlace: true,
        clan: true,
        gender: true,
        isLiving: true,
      },
    })

    // Connect-search is intentionally global (any member can be linked into a tree),
    // but don't expose precise birth details of LIVING people to arbitrary users —
    // name + clan is enough to recognise a relative. Deceased ancestors are public
    // genealogical record, so their details are returned in full.
    const sanitized = results.map(({ isLiving, ...m }) =>
      isLiving ? { ...m, birthYear: null, birthPlace: null } : m
    )

    return NextResponse.json(sanitized)
  } catch (err) {
    console.error('GET /api/family/search error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
