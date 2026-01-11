/** @format */

// กำหนดประเภทสีผังเมืองตามมาตรฐานผังเมืองไทย
export type ZoningColor = 'RED' | 'ORANGE' | 'YELLOW' | 'PURPLE' | 'GREEN' | 'BLUE'

export interface Listing {
  id: string
  title: string
  price: number

  // 📏 ข้อมูลพื้นที่ (ไทย)
  rai: number
  ngan: number
  sqWha: number

  // 🎨 ผังเมือง
  zoningColor: ZoningColor

  // 📍 พิกัด (ใช้ชื่อที่สอดคล้องกับ Mapbox)
  latitude: number
  longitude: number

  // 📈 ข้อมูลวิเคราะห์ (สำหรับ InvestmentCard)
  roiEstimate?: number // % กำไรคาดการณ์
  growthRate?: number // % อัตราเติบโตของทำเล

  // 🖼️ ข้อมูลประกอบ
  imageUrl?: string
  updatedAt: Date | string
}

// สำหรับใช้ในหน้าสรุปพอร์ต (Dashboard)
export interface InvestmentStats {
  totalValue: number
  totalHoldings: number
  averageROI: number
}
