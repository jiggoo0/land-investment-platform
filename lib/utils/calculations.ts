/** @format */

/**
 * รวมฟังก์ชันคำนวณทางการเงินและอสังหาริมทรัพย์
 * สำหรับแพลตฟอร์ม LandSmart โดย เจ้าป่า
 */

// 1. คำนวณภาษีที่ดินและสิ่งปลูกสร้าง (Land & Building Tax Estimates)
export const calculateLandTax = (
  value: number,
  type: 'AGRICULTURAL' | 'RESIDENTIAL' | 'COMMERCIAL' | 'VACANT',
): number => {
  let rate = 0

  switch (type) {
    case 'AGRICULTURAL':
      rate = 0.0001
      break // 0.01%
    case 'RESIDENTIAL':
      rate = 0.0002
      break // 0.02%
    case 'COMMERCIAL':
      rate = 0.003
      break // 0.3%
    case 'VACANT':
      rate = 0.003
      break // 0.3% (เพิ่มขึ้นทุก 3 ปี)
    default:
      rate = 0.003
  }

  return value * rate
}

// 2. คำนวณผลตอบแทนจากการลงทุน (Return on Investment - ROI)
export const calculateROI = (
  buyPrice: number,
  sellPrice: number,
  holdingYears: number,
  costs: number = 0,
): {
  totalProfit: number
  totalRoiPercent: number
  annualRoiPercent: number
} => {
  const totalProfit = sellPrice - buyPrice - costs
  const totalRoiPercent = (totalProfit / (buyPrice + costs)) * 100

  // คำนวณแบบดอกเบี้ยทบต้น (Compound Annual Growth Rate - CAGR)
  const annualRoiPercent =
    holdingYears > 0
      ? (Math.pow(sellPrice / (buyPrice + costs), 1 / holdingYears) - 1) * 100
      : totalRoiPercent

  return {
    totalProfit,
    totalRoiPercent: parseFloat(totalRoiPercent.toFixed(2)),
    annualRoiPercent: parseFloat(annualRoiPercent.toFixed(2)),
  }
}

// 3. คำนวณการเติบโตของราคาที่ดินตามทำเล (Estimated Appreciation)
export const estimateFutureValue = (
  presentValue: number,
  growthRate: number,
  years: number,
): number => {
  // Formula: FV = PV * (1 + i)^n
  const futureValue = presentValue * Math.pow(1 + growthRate / 100, years)
  return Math.round(futureValue)
}

// 4. จัดรูปแบบตัวเลขเงินบาท (Thai Baht Formatter)
export const formatThaiBaht = (value: number): string => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0,
  }).format(value)
}

// 5. แปลงหน่วยที่ดินไทย (Rai-Ngan-Wah to Square Meters)
export const landUnitToSqMeters = (rai: number = 0, ngan: number = 0, wah: number = 0): number => {
  return rai * 1600 + ngan * 400 + wah * 4
}
