/** @format */

import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST() {
  // ลบ parameter ออกไปเลยถ้าไม่ได้ใช้ เพื่อกำจัด Warning
  return NextResponse.json({
    success: true,
    message: 'Verification successful',
  })
}
