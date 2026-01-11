/** @format */

import React from 'react'
import Link from 'next/link'
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* 🏛️ Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-900 text-xl font-bold text-white">
                L
              </div>
              <span className="text-xl font-bold tracking-tight text-stone-900">
                LandSmart<span className="text-amber-700"> Hub</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-stone-500">
              แพลตฟอร์มวิเคราะห์ที่ดินเชิงลึก ช่วยให้นักลงทุนเข้าถึงข้อมูลผังเมือง
              และคาดการณ์ผลตอบแทนได้อย่างแม่นยำที่สุดในประเทศไทย
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <Link
                  key={idx}
                  href="#"
                  className="text-stone-400 transition-colors hover:text-amber-700"
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="mb-6 text-sm font-bold tracking-widest text-stone-900 uppercase">
              การใช้งาน
            </h4>
            <ul className="space-y-4 text-sm text-stone-500">
              <li>
                <Link href="/explore" className="transition-colors hover:text-stone-900">
                  สำรวจที่ดิน
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="transition-colors hover:text-stone-900">
                  แดชบอร์ดนักลงทุน
                </Link>
              </li>
              <li>
                <Link href="/listings/new" className="transition-colors hover:text-stone-900">
                  ลงประกาศขายที่ดิน
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-stone-900">
                  บทความวิเคราะห์ทำเล
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="mb-6 text-sm font-bold tracking-widest text-stone-900 uppercase">
              ติดต่อเรา
            </h4>
            <ul className="space-y-4 text-sm text-stone-500">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 text-amber-700" />
                <span>
                  ชั้น 24 อาคารสมาร์ททาวเวอร์, <br />
                  แขวงจตุจักร, กรุงเทพฯ 10900
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-amber-700" />
                <span>02-123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-amber-700" />
                <span>contact@landsmart.io</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="mb-6 text-sm font-bold tracking-widest text-stone-900 uppercase">
              รับข้อมูลข่าวสาร
            </h4>
            <p className="mb-4 text-xs text-stone-500">รับรายงานวิเคราะห์ตลาดที่ดินรายสัปดาห์</p>
            <div className="relative">
              <input
                type="email"
                placeholder="อีเมลของคุณ"
                className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pr-12 pl-4 text-sm outline-none focus:border-stone-900"
              />
              <button className="transition-hover absolute top-1 right-1 bottom-1 flex w-10 items-center justify-center rounded-lg bg-stone-900 text-white hover:bg-stone-800">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ⚖️ Bottom Bar: Legal & Trust */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-stone-100 pt-8 md:flex-row">
          <div className="flex items-center gap-2 rounded-full border border-stone-100 bg-stone-50 px-4 py-2 text-xs text-stone-500">
            <ShieldCheck size={14} className="text-amber-700" />
            ข้อมูลทั้งหมดได้รับการตรวจสอบความถูกต้องทางกฎหมาย
          </div>

          <div className="flex gap-8 text-xs text-stone-400">
            <Link href="#" className="hover:text-stone-600">
              นโยบายความเป็นส่วนตัว
            </Link>
            <Link href="#" className="hover:text-stone-600">
              เงื่อนไขการใช้งาน
            </Link>
            <p>© {currentYear} LandSmart Hub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
