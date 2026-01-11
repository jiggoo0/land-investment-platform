/** @format */

import React from 'react'
import Image from 'next/image'
import { MapPin, TrendingUp, ShieldCheck, Maximize2, Ruler } from 'lucide-react'
import { formatThaiBaht } from '@/lib/utils/calculations'
import { Listing } from '@/types'

interface InvestmentCardProps {
  data?: Listing
  onClick?: (data: Listing) => void
}

// แยก Configuration ออกมาด้านนอกและระบุ Record Type เพื่อป้องกัน Error TS7053
const ZONING_CONFIG: Record<string, { color: string; label: string }> = {
  RED: { color: 'bg-red-500', label: 'ผังสีแดง (พาณิชยกรรม)' },
  ORANGE: { color: 'bg-orange-500', label: 'ผังสีส้ม (ย.๖)' },
  YELLOW: { color: 'bg-yellow-500', label: 'ผังสีเหลือง (ย.๓)' },
  PURPLE: { color: 'bg-purple-600', label: 'ผังสีม่วง (อุตสาหกรรม)' },
  GREEN: { color: 'bg-green-500', label: 'ผังสีเขียว (ชนบทและเกษตร)' },
  BLUE: { color: 'bg-blue-600', label: 'ผังสีน้ำเงิน (สถาบันราชการ)' },
}

export const InvestmentCard = ({ data, onClick }: InvestmentCardProps) => {
  // 💡 Default Data ในกรณีที่ไม่มีการส่ง Props เข้ามา
  const displayData = data || {
    id: 'sample-1',
    title: 'ที่ดินติดรถไฟฟ้า สายสีส้ม (ตลิ่งชัน)',
    price: 15500000,
    rai: 1,
    ngan: 2,
    sqWha: 50,
    zoningColor: 'ORANGE',
    latitude: 13.7563,
    longitude: 100.5018,
    roiEstimate: 12.8,
    growthRate: 4.5,
    isVerified: true,
    imageUrl: '',
  }

  // คำนวณพื้นที่รวมเป็นตารางวา
  const totalSqWha = displayData.rai * 400 + displayData.ngan * 100 + displayData.sqWha
  const pricePerSqWha = displayData.price / (totalSqWha || 1) // ป้องกันหารด้วย 0

  // ดึงค่า Config ตามสีผังเมือง
  const zoning = ZONING_CONFIG[displayData.zoningColor] || {
    color: 'bg-stone-500',
    label: 'ไม่ระบุผังเมือง',
  }

  return (
    <div
      onClick={() => onClick?.(displayData as Listing)}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-stone-200 bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-stone-200/60 active:scale-[0.98]"
    >
      {/* 🖼️ Image Section */}
      <div className="relative h-52 w-full overflow-hidden bg-stone-100">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
        <Image
          src={
            displayData.imageUrl ||
            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80'
          }
          alt={displayData.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Zoning Badge */}
        <div
          className={`absolute top-4 left-4 z-20 flex items-center gap-1.5 rounded-full ${zoning.color} px-3 py-1.5 text-[10px] font-black text-white shadow-xl ring-1 ring-white/20`}
        >
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          {zoning.label}
        </div>

        {/* Dynamic Price Display */}
        <div className="absolute bottom-4 left-4 z-20">
          <p className="text-[10px] font-bold tracking-widest text-stone-300 uppercase">
            Net Asset Value
          </p>
          <p className="text-2xl font-black text-white">{formatThaiBaht(displayData.price)}</p>
        </div>
      </div>

      {/* 📝 Content Section */}
      <div className="p-5">
        <div className="mb-4 flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="line-clamp-1 text-lg font-black tracking-tight text-stone-900 transition-colors group-hover:text-amber-700">
              {displayData.title}
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-xs font-medium tracking-wide text-stone-500 uppercase">
              <MapPin size={12} className="text-amber-600" /> ตลิ่งชัน, กรุงเทพฯ
            </div>
          </div>
          <ShieldCheck className="shrink-0 text-amber-600" size={24} />
        </div>

        {/* 📊 Metrics Grid */}
        <div className="mb-5 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-stone-100 bg-stone-50/50 p-3 transition-colors group-hover:border-stone-200 group-hover:bg-white">
            <p className="mb-1 flex items-center gap-1 text-[10px] font-bold tracking-tighter text-stone-400 uppercase">
              <Ruler size={10} /> พื้นที่รวม
            </p>
            <p className="font-sans text-sm font-black text-stone-800">
              {displayData.rai}-{displayData.ngan}-{displayData.sqWha} ไร่
            </p>
          </div>

          <div className="rounded-2xl border border-stone-100 bg-stone-50/50 p-3 text-right transition-colors group-hover:border-stone-200 group-hover:bg-white">
            <p className="mb-1 text-[10px] font-bold tracking-tighter text-stone-400 uppercase">
              ROI คาดการณ์
            </p>
            <div className="flex items-center justify-end gap-1 text-sm font-black text-green-600">
              <TrendingUp size={14} /> {displayData.roiEstimate}%
            </div>
          </div>
        </div>

        {/* 📈 Unit Price Footer */}
        <div className="flex items-center justify-between border-t border-stone-100 pt-4">
          <div>
            <p className="text-[9px] font-black tracking-[0.2em] text-stone-400 uppercase">
              Unit Price
            </p>
            <p className="text-sm font-bold text-stone-600">
              {formatThaiBaht(pricePerSqWha)}
              <span className="text-[10px] font-medium text-stone-400"> / ตร.ว.</span>
            </p>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-white transition-all hover:rotate-12 hover:bg-amber-600">
            <Maximize2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
