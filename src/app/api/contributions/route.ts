import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { MOCK_ENABLED, mockContributions } from '@/lib/mocks'

const contributionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  type: z.enum(['story', 'photo', 'document', 'correction', 'memory', 'tradition']),
  userId: z.string().min(1, 'User ID is required'),
  notes: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const type = searchParams.get('type')

    const where: Prisma.ContributionWhereInput = {}
    
    if (status) {
      where.status = status
    }
    
    if (type) {
      where.type = type
    }

    const contributions = MOCK_ENABLED ? mockContributions : await prisma.contribution.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })

    const total = MOCK_ENABLED ? contributions.length : await prisma.contribution.count({ where })

    return NextResponse.json({
      contributions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching contributions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contributions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contributionSchema.parse(body)

    if (MOCK_ENABLED) {
      const created = { ...mockContributions[0], id: `c_${Date.now()}`, ...validatedData }
      return NextResponse.json(created, { status: 201 })
    }

    const contribution = await prisma.contribution.create({
      data: {
        ...validatedData,
        status: 'pending'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(contribution, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error creating contribution:', error)
    return NextResponse.json(
      { error: 'Failed to create contribution' },
      { status: 500 }
    )
  }
}
