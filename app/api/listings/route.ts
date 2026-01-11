/** @format */

import { prisma } from '@/lib/db/prisma'

// บังคับให้เป็น dynamic route
export const dynamic = 'force-dynamic'

export async function GET() {
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return Response.json(listings)
}