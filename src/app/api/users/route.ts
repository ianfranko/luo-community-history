import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { MOCK_ENABLED, mockUsers } from '@/lib/mocks'
import { z } from 'zod'

const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required'),
})

export async function GET() {
  try {
    const users = MOCK_ENABLED ? mockUsers : await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        _count: {
          select: { contributions: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = userSchema.parse(body)

    if (MOCK_ENABLED) {
      const existing = mockUsers.find(u => u.email === validatedData.email)
      const created = existing || { id: `u_${Date.now()}`, name: validatedData.name, email: validatedData.email, createdAt: new Date().toISOString(), _count: { contributions: 0 } }
      return NextResponse.json(created)
    }

    let user = await prisma.user.findUnique({ where: { email: validatedData.email } })
    if (!user) user = await prisma.user.create({ data: validatedData })
    return NextResponse.json(user)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error creating/finding user:', error)
    return NextResponse.json(
      { error: 'Failed to create/find user' },
      { status: 500 }
    )
  }
}
