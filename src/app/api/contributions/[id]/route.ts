import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contribution = await prisma.contribution.findUnique({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status, notes } = body

    const contribution = await prisma.contribution.update({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    await prisma.contribution.delete({
      where: { id: params.id }
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
