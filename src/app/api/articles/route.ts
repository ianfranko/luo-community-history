import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { MOCK_ENABLED, mockArticles } from '@/lib/mocks'

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  categoryId: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')

    const where: Prisma.ArticleWhereInput = {}
    
    if (category) {
      where.categoryId = category
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
        { excerpt: { contains: search } }
      ]
    }
    
    if (featured === 'true') {
      where.featured = true
    }

    const articles = MOCK_ENABLED ? mockArticles : await prisma.article.findMany({
      where,
      include: {
        category: true,
        tags: true,
        images: true,
        sources: true
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })

    const total = MOCK_ENABLED ? articles.length : await prisma.article.count({ where })

    return NextResponse.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = articleSchema.parse(body)

    // Create slug from title
    const slug = validatedData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const { tags, ...rest } = validatedData

    if (MOCK_ENABLED) {
      const created = { ...mockArticles[0], id: `a_${Date.now()}`, ...rest, slug }
      return NextResponse.json(created, { status: 201 })
    }

    const article = await prisma.article.create({
      data: {
        ...rest,
        slug,
        published: validatedData.published || false,
        ...(tags && tags.length
          ? { tags: { connect: tags.map((id) => ({ id })) } }
          : {})
      },
      include: {
        category: true,
        tags: true,
        images: true,
        sources: true
      }
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }
}
