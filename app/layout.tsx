/** @format */

import type { Metadata, Viewport } from 'next'
import { Inter, Sarabun } from 'next/font/google'
import './globals.css'

// 🏗️ CONFIG FONTS: ผสาน Inter สำหรับภาษาอังกฤษ และ Sarabun สำหรับภาษาไทย
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sarabun',
  display: 'swap',
})

// 🔍 SEO METADATA: ข้อมูลสำหรับ Search Engine ที่สมบูรณ์
export const metadata: Metadata = {
  title: {
    default: 'LandSmart | แพลตฟอร์มลงทุนที่ดินและอสังหาริมทรัพย์อัจฉริยะ',
    template: '%s | LandSmart Hub',
  },
  description:
    'วิเคราะห์ ค้นหา และลงทุนในอสังหาริมทรัพย์ด้วยข้อมูลแม่นยำ พร้อมระบบคำนวณผลตอบแทน ROI และตรวจสอบผังเมืองอัตโนมัติ',
  keywords: ['ลงทุนที่ดิน', 'วิเคราะห์อสังหาริมทรัพย์', 'ราคาที่ดิน', 'ผังเมืองไทย', 'ROI ที่ดิน'],
  authors: [{ name: 'LandSmart Development Team' }],
  metadataBase: new URL('https://landsmart-hub.io'), // เปลี่ยนเป็น Domain จริงของคุณในภายหลัง
}

// 📱 VIEWPORT CONFIG: จัดการการแสดงผลบนอุปกรณ์เคลื่อนที่
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#4a2c10', // Walnut Brown (Brand Identity)
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="th"
      className={`${inter.variable} ${sarabun.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--color-brand-surface)] font-sans text-stone-900 antialiased selection:bg-amber-200 selection:text-amber-900">
        {/* 🚀 AI CONTEXT: 
            โครงสร้างนี้พร้อมสำหรับการหุ้ม AuthProvider หรือ ThemeProvider 
            ในอนาคตเพื่อเชื่อมต่อกับระบบสมาชิกที่คุณวางโฟลเดอร์ (auth) ไว้แล้ว 
        */}
        <div className="relative flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  )
}
