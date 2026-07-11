import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

/**
 * Return the FamilyMember profile for a user, creating it on first access if it
 * doesn't exist yet.
 *
 * Credentials sign-ups get their profile in /api/register, but OAuth (Google)
 * users are created by the Prisma adapter and never pass through that route, so
 * without this they'd have no profile and every /api/family call would 404.
 * Making it lazy means every account — regardless of how it signed up — has a
 * profile the moment it opens the tree.
 *
 * `userId` is unique, and the find-then-create is not atomic: concurrent first
 * requests (React Strict Mode double-fetch in dev, two tabs, or a GET racing a
 * POST) can both reach the create and the loser hits a P2002 unique violation.
 * We swallow that specific race and re-read the row the winner just created.
 */
export async function getOrCreateMe(userId: string) {
  const existing = await prisma.familyMember.findUnique({ where: { userId } })
  if (existing) return existing

  const user = await prisma.user.findUnique({ where: { id: userId } })
  const name = user?.name?.trim() || 'Me'
  const parts = name.split(' ')
  const firstName = parts[0]
  const lastName = parts.slice(1).join(' ') || null

  try {
    return await prisma.familyMember.create({
      data: { firstName, lastName, addedById: userId, userId },
    })
  } catch (err) {
    // A concurrent request won the create — return its row instead of 500ing.
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      const winner = await prisma.familyMember.findUnique({ where: { userId } })
      if (winner) return winner
    }
    throw err
  }
}
