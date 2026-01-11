/** @format */

'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { listingSchema, ListingInput } from '@/lib/validators/listing'
import { ChevronRight, ChevronLeft, CheckCircle2, Upload, LandPlot } from 'lucide-react'

export default function ListingForm() {
  const [step, setStep] = useState(1)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListingInput>({
    // ✅ ใช้ ListingInput เพื่อให้โครงสร้างข้อมูลตรงกับ Schema 100%
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: '',
      price: 0,
      rai: 0,
      ngan: 0,
      sqWha: 0,
      latitude: 13.7563,
      longitude: 100.5018,
      zoningColor: 'GREEN',
    },
  })

  const onSubmit = (data: ListingInput) => {
    console.log('Form Submitted:', data)
    // TODO: เชื่อมต่อ API /api/listings
    setStep(4)
  }

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-stone-200 bg-white p-8 shadow-2xl shadow-stone-200/50">
      {/* 📊 Progress Bar */}
      <div className="mb-10 flex items-center justify-between">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold transition-all ${
                step >= i
                  ? 'border-amber-700 bg-amber-700 text-white'
                  : 'border-stone-200 text-stone-300'
              }`}
            >
              {step > i ? <CheckCircle2 size={20} /> : i}
            </div>
            {i < 3 && (
              <div className={`h-1 w-16 sm:w-24 ${step > i ? 'bg-amber-700' : 'bg-stone-100'}`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: ข้อมูลเบื้องต้น */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
            <h2 className="text-2xl font-bold text-stone-900">ข้อมูลที่ดินเบื้องต้น</h2>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-stone-600">ชื่อหัวข้อประกาศ</label>
              <input
                {...register('title')}
                placeholder="เช่น ที่ดินเปล่าติดถนนใหญ่ ใกล้ MRT"
                className="w-full rounded-xl border border-stone-200 bg-stone-50 p-3 outline-none focus:ring-2 focus:ring-amber-600/20"
              />
              {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-stone-600">ราคาขาย (บาท)</label>
                <input
                  type="number"
                  {...register('price', { valueAsNumber: true })}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 p-3"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-stone-600">พื้นที่ (ตารางวา)</label>
                <input
                  type="number"
                  {...register('sqWha', { valueAsNumber: true })}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 p-3"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={nextStep}
              className="btn-gradient flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold"
            >
              ถัดไป <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Step 2: ตำแหน่งและผังเมือง */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
            <h2 className="text-2xl font-bold text-stone-900">ตำแหน่งและผังเมือง</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-stone-600">ละติจูด (Lat)</label>
                <input
                  type="number"
                  step="any"
                  {...register('latitude', { valueAsNumber: true })}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 p-3 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-stone-600">ลองจิจูด (Lng)</label>
                <input
                  type="number"
                  step="any"
                  {...register('longitude', { valueAsNumber: true })}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 p-3 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-stone-600">
                <LandPlot size={16} /> สีผังเมือง (Zoning)
              </label>
              <select
                {...register('zoningColor')}
                className="w-full rounded-xl border border-stone-200 bg-stone-50 p-3 font-semibold"
              >
                <option value="RED">🔴 สีแดง - พานิชยกรรม</option>
                <option value="ORANGE">🟠 สีส้ม - ที่อยู่อาศัยหนาแน่นปานกลาง</option>
                <option value="YELLOW">🟡 สีเหลือง - ที่อยู่อาศัยหนาแน่นน้อย</option>
                <option value="GREEN">🟢 สีเขียว - เกษตรกรรม</option>
                <option value="PURPLE">🟣 สีม่วง - อุตสาหกรรม</option>
                <option value="BLUE">🔵 สีน้ำเงิน - ราชการ</option>
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-stone-200 py-4 font-bold text-stone-600 hover:bg-stone-50"
              >
                <ChevronLeft size={18} /> กลับ
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="btn-gradient flex-[2] items-center justify-center rounded-xl py-4 font-bold"
              >
                ยืนยันตำแหน่งและข้อมูล
              </button>
            </div>
          </div>
        )}

        {/* Step 3: อัปโหลดรูปภาพและยืนยัน */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 space-y-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 text-amber-700">
              <Upload size={32} />
            </div>
            <h2 className="text-2xl font-bold text-stone-900">อัปโหลดเอกสารสิทธิ์และรูปภาพ</h2>
            <p className="text-stone-500">กรุณาแนบรูปภาพโฉนดหรือรูปภาพที่ดินจริงเพื่อการตรวจสอบ</p>

            <div className="cursor-pointer rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 py-12 transition-all hover:border-amber-400">
              <p className="text-sm font-medium text-stone-400">
                ลากไฟล์มาวางที่นี่ หรือ คลิกเพื่อเลือกไฟล์
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-stone-200 py-4 font-bold text-stone-600"
              >
                <ChevronLeft size={18} /> กลับ
              </button>
              <button type="submit" className="btn-gradient flex-[2] rounded-xl py-4 font-bold">
                ลงประกาศเลย
              </button>
            </div>
          </div>
        )}

        {/* Success State */}
        {step === 4 && (
          <div className="animate-in zoom-in-95 space-y-6 py-10 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-3xl font-bold text-stone-900">ลงประกาศสำเร็จ!</h2>
            <p className="text-stone-600">
              ข้อมูลของคุณกำลังถูกตรวจสอบโดยทีมงาน AI เพื่อยืนยันความถูกต้อง
            </p>
            <button
              type="button"
              onClick={() => (window.location.href = '/explore')}
              className="btn-gradient rounded-xl px-12 py-4 font-bold"
              style={{ width: 'auto' }}
            >
              ไปหน้าสำรวจที่ดิน
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
