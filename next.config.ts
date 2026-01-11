import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // อนุญาตให้โหลดรูปภาพจาก Unsplash (สำหรับรูปที่ดินตัวอย่าง)
    // และแหล่งเก็บข้อมูลรูปภาพที่คุณจะใช้จริง
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // กรณีใช้ Cloudinary เก็บรูปที่ดิน
      },
    ],
  },
  // ช่วยให้การจัดการพวกแผนที่ (Mapbox) ทำงานได้เสถียรขึ้นในโหมด Development
  experimental: {
    optimizePackageImports: ['lucide-react', 'date-fns'],
  },
}

export default nextConfig
