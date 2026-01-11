/** @format */

import React from 'react'
import { Hammer, Users, Zap, Quote } from 'lucide-react'

export const AnnouncementBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-stone-900 px-8 py-14 shadow-2xl ring-1 ring-white/10">
      {/* 🌑 Background Effects */}
      <div className="absolute top-0 right-0 h-80 w-80 translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-600/15 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-80 w-80 -translate-x-1/2 translate-y-1/2 rounded-full bg-stone-500/10 blur-[120px]" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* 🏷️ Status Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-600/30 bg-amber-600/10 px-5 py-2">
          <Hammer className="animate-pulse text-amber-500" size={16} />
          <span className="text-xs font-bold tracking-[0.2em] text-amber-500 uppercase">
            Platform Under Development
          </span>
        </div>

        {/* 🏛️ The Statement */}
        <div className="max-w-3xl">
          <Quote className="mx-auto mb-6 text-stone-800" size={48} />
          <h2 className="mb-8 font-sans text-4xl leading-[1.1] font-black tracking-tight text-white sm:text-6xl">
            นี่คือพื้นที่ของ <span className="text-amber-500 italic">&quot;เจ้าป่า&quot;</span>
          </h2>

          <div className="space-y-6 text-lg leading-relaxed text-stone-400">
            <p>
              แพลตฟอร์มนี้เป็นของ{' '}
              <span className="font-semibold text-stone-200">&quot;เจ้าป่า&quot;</span>{' '}
              ขณะนี้กำลังอยู่ระหว่างการอัปเดตส่วนต่าง ๆ ผมขอให้หุ้นส่วนหรือทีมงานที่ติดต่อเข้ามา
              ร่วมกันตรวจสอบและระดมสมองอย่างเต็มกำลัง
            </p>
            <p className="font-medium text-stone-300">
              &quot;ที่นี่ไม่มีต้นทุนให้... <br className="hidden sm:block" />
              <span className="border-b-2 border-amber-500 bg-amber-900/40 px-2 py-1 tracking-wide text-white uppercase">
                ผมรับคนที่ทุ่มเทเท่านั้น
              </span>
              &quot;
            </p>
          </div>
        </div>

        {/* 📊 Action Hub */}
        <div className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="group flex items-center gap-5 rounded-2xl border border-white/5 bg-white/5 p-6 transition-all hover:bg-white/10">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-lg transition-transform group-hover:scale-110">
              <Users size={28} />
            </div>
            <div className="text-left">
              <p className="text-base font-bold tracking-wider text-white uppercase">ระดมสมอง</p>
              <p className="text-sm font-light text-stone-500">แชร์ไอเดียและวิสัยทัศน์ร่วมกัน</p>
            </div>
          </div>

          <div className="group flex items-center gap-5 rounded-2xl border border-white/5 bg-white/5 p-6 transition-all hover:bg-white/10">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-stone-900 shadow-lg transition-transform group-hover:scale-110">
              <Zap size={28} />
            </div>
            <div className="text-left">
              <p className="text-base font-bold tracking-wider text-white uppercase">ตรวจสอบระบบ</p>
              <p className="text-sm font-light text-stone-500">ลงมือสร้างผลงานให้เสร็จสมบูรณ์</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8">
          <p className="text-[11px] font-black tracking-[0.5em] text-stone-600 uppercase">
            By. <span className="text-stone-300">เจ้าป่า</span>
          </p>
        </div>
      </div>
    </div>
  )
}
