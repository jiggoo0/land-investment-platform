/** @format */

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Map, LayoutDashboard, PlusCircle, Menu, X, User } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // ตรวจสอบการ Scroll เพื่อเปลี่ยนสไตล์ Navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'สำรวจที่ดิน', href: '/explore', icon: Map },
    { name: 'แดชบอร์ด', href: '/dashboard', icon: LayoutDashboard },
  ]

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'glass-morphism py-3 shadow-md' : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* 🏛️ Logo Section */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-900 text-lg font-bold text-white transition-transform group-hover:rotate-6">
            L
          </div>
          <span className="text-xl font-bold tracking-tight text-stone-900">
            LandSmart<span className="font-black text-amber-700">.</span>
          </span>
        </Link>

        {/* 💻 Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 text-sm font-semibold transition-colors hover:text-amber-700 ${
                    isActive ? 'text-amber-800' : 'text-stone-600'
                  }`}
                >
                  <Icon size={18} />
                  {link.name}
                </Link>
              )
            })}
          </div>

          <div className="h-6 w-px bg-stone-200" />

          <div className="flex items-center gap-4">
            <Link
              href="/listings/new"
              className="flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-stone-800 active:scale-95"
            >
              <PlusCircle size={18} />
              ลงประกาศ
            </Link>

            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 transition-colors hover:bg-stone-50">
              <User size={20} />
            </button>
          </div>
        </div>

        {/* 📱 Mobile Toggle */}
        <button
          className="rounded-lg p-2 text-stone-900 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 📱 Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="animate-in fade-in slide-in-from-top-5 absolute top-full left-0 w-full border-b border-stone-100 bg-white p-6 shadow-xl md:hidden">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 text-lg font-bold text-stone-900"
              >
                <link.icon size={22} className="text-amber-700" />
                {link.name}
              </Link>
            ))}
            <hr className="border-stone-100" />
            <Link
              href="/listings/new"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-gradient flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold"
            >
              <PlusCircle size={20} /> ลงประกาศฟรี
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
