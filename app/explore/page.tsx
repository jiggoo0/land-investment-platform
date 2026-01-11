/** @format */

'use client'

import React, { useState } from 'react'
import MapContainer, { ViewState } from '@/components/maps/MapContainer'
import { InvestmentCard } from '@/components/cards/InvestmentCard'
import { useMap } from '@/hooks/useMap'
import {
  Filter,
  Search,
  SlidersHorizontal,
  TrendingUp,
  ChevronRight,
  LayoutGrid,
} from 'lucide-react'

export default function ExplorePage() {
  // 🛰️ ใช้ Hook สำหรับควบคุมตำแหน่งแผนที่
  const { viewState, setViewState, flyTo } = useMap()
  const [activeTab, setActiveTab] = useState('all')

  // ✅ แก้ไข TS2352: ใช้ unknown เป็นสะพานเชื่อมเพื่อความปลอดภัย
  // เนื่องจาก MapCoords อาจไม่มี Index Signature ที่ตรงกับ Record
  const mapViewState: ViewState = {
    latitude: viewState.latitude,
    longitude: viewState.longitude,
    zoom: viewState.zoom,
    pitch: (viewState as unknown as Record<string, number | undefined>).pitch ?? 45,
    bearing: (viewState as unknown as Record<string, number | undefined>).bearing ?? 0,
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white font-sans">
      {/* 🧭 Sidebar: แผงควบคุมและรายการอสังหาริมทรัพย์ */}
      <aside className="z-20 flex w-full flex-col border-r border-stone-200 bg-white shadow-2xl md:w-[420px] lg:w-[480px]">
        {/* Header Section */}
        <div className="border-b border-stone-100 p-6 pb-4">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-black tracking-tight text-stone-900">สำรวจที่ดิน</h1>
            <button className="rounded-lg p-2 hover:bg-stone-100 md:hidden">
              <LayoutGrid size={20} />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative mb-6">
            <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-stone-400" size={18} />
            <input
              type="text"
              placeholder="ค้นหาทำเล หรือ รหัสโฉนด..."
              className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-3.5 pr-4 pl-12 text-sm font-medium transition-all outline-none focus:border-amber-600 focus:bg-white focus:ring-4 focus:ring-amber-600/5"
            />
          </div>

          {/* 🔴 Zoning Quick Filters */}
          <div className="custom-scrollbar no-scrollbar flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'all'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Filter size={14} /> ทั้งหมด
            </button>
            <button className="rounded-full border border-stone-200 px-4 py-2 text-xs font-bold whitespace-nowrap text-stone-700 transition-all hover:border-red-500 hover:bg-red-50">
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-red-500" /> ผังสีแดง
            </button>
            <button className="rounded-full border border-stone-200 px-4 py-2 text-xs font-bold whitespace-nowrap text-stone-700 transition-all hover:border-orange-500 hover:bg-orange-50">
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-orange-500" /> ผังสีส้ม
            </button>
            <button className="rounded-full bg-stone-100 p-2 text-stone-600 transition-colors hover:bg-stone-200">
              <SlidersHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* 📋 รายการที่ดินพร้อมวิเคราะห์กำไร */}
        <div className="custom-scrollbar flex-1 overflow-y-auto bg-stone-50/40 p-5">
          <div className="mb-5 flex items-center justify-between px-1">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                Available Listings
              </span>
              <span className="text-sm font-bold text-stone-900">128 รายการในพื้นที่กรุงเทพฯ</span>
            </div>
            <select className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-bold text-stone-700 shadow-sm outline-none">
              <option>เรียงตาม: ROI สูงสุด</option>
              <option>เรียงตาม: ราคาล่าสุด</option>
            </select>
          </div>

          <div className="space-y-5">
            <div onClick={() => flyTo(13.7367, 100.5231, 15)} className="cursor-pointer">
              <InvestmentCard />
            </div>
            <InvestmentCard />
            <InvestmentCard />
            <InvestmentCard />
          </div>
        </div>
      </aside>

      {/* 🗺️ Main View: แผนที่อัจฉริยะ */}
      <main className="relative flex-1 bg-[#e5e7eb]">
        {/* Market Intel Overlay */}
        <div className="glass-morphism absolute top-8 right-8 z-10 hidden min-w-[280px] flex-col gap-4 rounded-3xl border-none p-6 shadow-2xl shadow-stone-900/10 lg:flex">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black tracking-[0.2em] text-amber-800 uppercase">
              Market Intelligence
            </p>
            <div className="flex h-2 w-2 animate-pulse rounded-full bg-green-500" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="mb-1 text-[11px] font-bold text-stone-400">ราคาเฉลี่ย / ตร.ว.</p>
              <p className="text-xl font-black text-stone-900">฿45,000</p>
            </div>
            <div>
              <p className="mb-1 text-[11px] font-bold text-stone-400">แนวโน้มเติบโต</p>
              <div className="flex items-center gap-1">
                <TrendingUp size={16} className="text-green-600" />
                <p className="text-xl font-black text-green-600">+12.5%</p>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-stone-100" />

          <button className="flex w-full items-center justify-between rounded-xl bg-stone-900 px-4 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]">
            วิเคราะห์ทำเลเชิงลึก <ChevronRight size={16} />
          </button>
        </div>

        {/* 🗺️ Map Container */}
        <MapContainer
          viewState={mapViewState}
          onMove={(evt) => setViewState(evt.viewState as ViewState)}
        />
      </main>
    </div>
  )
}
