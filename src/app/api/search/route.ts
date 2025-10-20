import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const type = searchParams.get('type') // articles, people, places, events
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      )
    }

    const results: any = {}

    // Search articles
    if (!type || type === 'articles') {
      const articles = await prisma.article.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
            { excerpt: { contains: query, mode: 'insensitive' } }
          ],
          published: true
        },
        include: {
          category: true,
          tags: true
        },
        take: limit
      })
      results.articles = articles
    }

    // Search people
    if (!type || type === 'people') {
      const people = await prisma.person.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { title: { contains: query, mode: 'insensitive' } },
            { village: { contains: query, mode: 'insensitive' } },
            { clan: { contains: query, mode: 'insensitive' } },
            { biography: { contains: query, mode: 'insensitive' } }
          ]
        },
        take: limit
      })
      results.people = people
    }

    // Search places
    if (!type || type === 'places') {
      const places = await prisma.place.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { county: { contains: query, mode: 'insensitive' } }
          ]
        },
        take: limit
      })
      results.places = places
    }

    // Search events
    if (!type || type === 'events') {
      const events = await prisma.event.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { location: { contains: query, mode: 'insensitive' } }
          ]
        },
        take: limit
      })
      results.events = events
    }

    // Search contributions
    if (!type || type === 'contributions') {
      const contributions = await prisma.contribution.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } }
          ],
          status: 'approved'
        },
        include: {
          user: {
            select: {
              id: true,
              name: true
            }
          }
        },
        take: limit
      })
      results.contributions = contributions
    }

    return NextResponse.json({
      query,
      results,
      totalResults: Object.values(results).reduce((sum: number, items: any) => sum + items.length, 0)
    })
  } catch (error) {
    console.error('Error searching:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}
