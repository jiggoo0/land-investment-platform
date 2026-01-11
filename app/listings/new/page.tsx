/** @format */

'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { listingSchema } from '@/lib/validators/listing'
import { Save, MapPin, ChevronLeft, Plus } from 'lucide-react'
import { z } from 'zod'

// ✅ สร้าง Type จาก Schema เพื่อความปลอดภัยของข้อมูล
type ListingInput = z.infer<typeof listingSchema>

export default function NewListingPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListingInput>({
    resolver: zodResolver(listingSchema),
    // ✅ กำหนดค่าเริ่มต้นให้ครบถ้วนเพื่อป้องกัน Runtime Error
    defaultValues: {
      title: '',
      price: 0,
      rai: 0,
      ngan: 0,
      sqWha: 0,
      zoningColor: 'GREEN',
      latitude: 13.7563,
      longitude: 100.5018,
    },
  })

  const onSubmit = async (data: ListingInput) => {
    setIsSubmitting(true)
    console.log('ข้อมูลที่พร้อมส่ง:', data)

    try {
      // TODO: เชื่อมต่อ API POST /api/listings
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push('/explore')
    } catch (error) {
      console.error('Submit Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-10 pb-20 font-sans">
      <div className="mx-auto max-w-3xl px-6">
        {/* Navigation */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-sm font-bold text-stone-500 transition-colors hover:text-stone-900"
        >
          <ChevronLeft size={16} /> กลับไปหน้าสำรวจ
        </button>

        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight text-stone-900">
            เพิ่มข้อมูลที่ดินใหม่
          </h1>
          <p className="mt-2 text-stone-500">
            บันทึกโอกาสการลงทุนใหม่เข้าสู่ระบบวิเคราะห์ระดับพรีเมียม
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: ข้อมูลพื้นฐาน */}
          <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 flex items-center gap-2 border-b pb-4 text-lg font-bold text-stone-900">
              <Plus size={20} className="text-amber-600" /> ข้อมูลพื้นฐาน
            </h2>

            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black tracking-widest text-stone-500 uppercase">
                  หัวข้อประกาศ
                </label>
                <input
                  {...register('title')}
                  placeholder="เช่น ที่ดินทำเลทอง ติดถนนใหญ่..."
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 transition-all outline-none focus:border-amber-600 focus:bg-white focus:ring-4 focus:ring-amber-600/5"
                />
                {errors.title && (
                  <p className="text-xs font-bold text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-black tracking-widest text-stone-500 uppercase">
                    ราคารวม (บาท)
                  </label>
                  <input
                    type="number"
                    {...register('price', { valueAsNumber: true })}
                    className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 outline-none focus:border-amber-600"
                  />
                  {errors.price && (
                    <p className="text-xs font-bold text-red-500">{errors.price.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black tracking-widest text-stone-500 uppercase">
                    ผังสีเมือง (Zoning)
                  </label>
                  <select
                    {...register('zoningColor')}
                    className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 font-bold outline-none focus:border-amber-600"
                  >
                    <option value="RED">🔴 สีแดง (พาณิชยกรรม)</option>
                    <option value="ORANGE">🟠 สีส้ม (ที่อยู่อาศัยหนาแน่นปานกลาง)</option>
                    <option value="YELLOW">🟡 สีเหลือง (ที่อยู่อาศัยหนาแน่นน้อย)</option>
                    <option value="GREEN">🟢 สีเขียว (เกษตรกรรม)</option>
                    <option value="PURPLE">🟣 สีม่วง (อุตสาหกรรม)</option>
                    <option value="BLUE">🔵 สีน้ำเงิน (หน่วยงานรัฐ)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: ขนาดพื้นที่ (หน่วยไทย) */}
          <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 flex items-center gap-2 border-b pb-4 text-lg font-bold text-stone-900">
              <MapPin size={20} className="text-amber-600" /> ขนาดพื้นที่ตามหน้าโฉนด
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <input
                  type="number"
                  {...register('rai', { valueAsNumber: true })}
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-4 text-center text-2xl font-black text-stone-900"
                />
                <span className="mt-3 block text-[10px] font-black tracking-widest text-stone-400 uppercase">
                  ไร่
                </span>
              </div>
              <div className="text-center">
                <input
                  type="number"
                  {...register('ngan', { valueAsNumber: true })}
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-4 text-center text-2xl font-black text-stone-900"
                />
                <span className="mt-3 block text-[10px] font-black tracking-widest text-stone-400 uppercase">
                  งาน
                </span>
              </div>
              <div className="text-center">
                <input
                  type="number"
                  {...register('sqWha', { valueAsNumber: true })}
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-4 text-center text-2xl font-black text-stone-900"
                />
                <span className="mt-3 block text-[10px] font-black tracking-widest text-stone-400 uppercase">
                  ตารางวา
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-2xl border border-stone-200 bg-white py-4 font-bold text-stone-600 transition-all hover:bg-stone-50"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gradient flex flex-[2] items-center justify-center gap-3 rounded-2xl py-4 font-black text-white shadow-xl shadow-amber-900/10 transition-transform active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? 'กำลังบันทึกข้อมูล...' : 'บันทึกข้อมูลที่ดิน'}
              <Save size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
