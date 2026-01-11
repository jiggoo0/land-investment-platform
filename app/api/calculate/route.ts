/** @format */

import { NextResponse } from 'next/server'

// บังคับให้เป็น Dynamic เพื่อป้องกัน Error เรื่อง Database/Env ตอน Build
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { price, sqWha } = body

    if (!price || !sqWha) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      )
    }

    const pricePerSqWha = price / sqWha

    return NextResponse.json({
      success: true,
      data: {
        pricePerSqWha,
        estimatedTax: price * 0.02, // ตัวอย่างภาษีโอน 2%
      },
    })
  } catch {
    // ใช้ catch แบบไม่มี parameter เพื่อเลี่ยง unused-vars warning
    return NextResponse.json({ success: false, message: 'Calculation failed' }, { status: 500 })
  }
}
