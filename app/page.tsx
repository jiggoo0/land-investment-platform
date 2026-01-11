/** @format */

import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import { AnnouncementBanner } from '@/components/banner/AnnouncementBanner'
import {
  ArrowRight,
  Map,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Globe,
  LucideIcon,
} from 'lucide-react'

// --- Types ---
interface MetricItemProps {
  icon: LucideIcon
  value: string
  label: string
  className?: string
}

// --- Sub-components ---
const MetricItem = ({ icon: Icon, value, label, className = '' }: MetricItemProps) => (
  <div className={`group flex flex-col items-center ${className}`}>
    <div className="mb-4 rounded-2xl bg-amber-50 p-4 text-amber-800 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-100">
      <Icon size={28} />
    </div>
    <p className="text-4xl font-black tracking-tight text-stone-900">{value}</p>
    <p className="mt-2 text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">{label}</p>
  </div>
)

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 🧭 Navigation Bar */}
      <Navbar />

      <main className="relative flex flex-1 flex-col items-center overflow-hidden bg-[var(--color-brand-surface)] px-6 pt-32 pb-20">
        {/* 🟢 Background Decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-[10%] -right-[10%] h-[600px] w-[600px] rounded-full bg-stone-200/40 blur-[120px]" />
          <div className="absolute -bottom-[10%] -left-[10%] h-[600px] w-[600px] rounded-full bg-amber-100/30 blur-[120px]" />
        </div>

        <div className="z-10 flex max-w-5xl flex-col items-center text-center">
          {/* 📢 Announcement Banner */}
          <div className="animate-in fade-in zoom-in mb-16 w-full duration-700">
            <AnnouncementBanner />
          </div>

          {/* 🏷️ Trust Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/60 px-5 py-2 shadow-sm backdrop-blur-md">
            <ShieldCheck className="text-amber-700" size={18} />
            <span className="text-xs font-bold tracking-widest text-stone-600 uppercase">
              Official Land Intelligence Platform
            </span>
          </div>

          {/* 🏗️ Hero Section */}
          <h1 className="mb-6 font-sans text-5xl font-bold tracking-tight text-stone-900 sm:text-7xl md:text-8xl lg:leading-[1.1]">
            Elevate Your <br />
            <span className="bg-gradient-to-r from-amber-900 via-amber-700 to-stone-800 bg-clip-text text-transparent">
              Land Portfolio
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-stone-600 md:text-xl">
            ปลดล็อกศักยภาพการลงทุนด้วยระบบวิเคราะห์ผังเมืองเชิงลึก และ AI คาดการณ์ผลตอบแทน (ROI)
            รายแปลงที่แม่นยำที่สุดในประเทศไทย
          </p>

          {/* ⚡ Action Hub */}
          <div className="flex w-full flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/explore"
              className="btn-gradient group flex w-full items-center justify-center gap-3 rounded-2xl px-12 py-5 text-lg font-bold shadow-2xl shadow-stone-900/20 transition-all sm:w-auto"
            >
              เริ่มสำรวจที่ดิน
              <Map className="transition-transform group-hover:rotate-12" size={22} />
            </Link>

            <Link
              href="/dashboard"
              className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-stone-200 bg-white px-12 py-5 text-lg font-bold text-stone-800 transition-all hover:bg-stone-50 hover:shadow-lg sm:w-auto"
            >
              ดูพอร์ตการลงทุน
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={22} />
            </Link>
          </div>

          {/* 📊 Value Metrics Grid */}
          <div className="mt-24 grid w-full grid-cols-2 gap-x-6 gap-y-12 border-t border-stone-100 pt-16 md:grid-cols-3">
            <MetricItem icon={Globe} value="฿2.4B+" label="Transaction Volume" />
            <MetricItem icon={TrendingUp} value="14.2%" label="Avg. Annual Growth" />
            <MetricItem
              icon={BarChart3}
              value="500+"
              label="Verified Listings"
              className="col-span-2 md:col-span-1"
            />
          </div>

          {/* 🛠️ AI Powered Hint */}
          <div className="mt-16 flex items-center gap-2 text-stone-400">
            <div className="h-px w-8 bg-stone-200" />
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase">
              Powered by LandSmart Intelligence Engine
            </span>
            <div className="h-px w-8 bg-stone-200" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
