import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const contribution = await prisma.contribution.findUnique({
      where: { id },
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

    if (!contribution) {
      return NextResponse.json(
        { error: 'Contribution not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(contribution)
  } catch (error) {
    console.error('Error fetching contribution:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contribution' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const { status, notes } = body

    const contribution = await prisma.contribution.update({
      where: { id },
      data: {
        status: status || undefined,
        notes: notes || undefined
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

    return NextResponse.json(contribution)
  } catch (error) {
    console.error('Error updating contribution:', error)
    return NextResponse.json(
      { error: 'Failed to update contribution' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    await prisma.contribution.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Contribution deleted successfully' })
  } catch (error) {
    console.error('Error deleting contribution:', error)
    return NextResponse.json(
      { error: 'Failed to delete contribution' },
      { status: 500 }
    )
  }
}
