#!/bin/bash

# 1. ส่วนของ Explore (หน้าหลักของระบบ)
cat <<EOF > app/explore/page.tsx
import MapContainer from "@/components/maps/MapContainer";
import { InvestmentCard } from "@/components/cards/InvestmentCard";

export default function ExplorePage() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <aside className="w-1/3 overflow-y-auto border-r p-4 bg-white shadow-lg z-10">
        <h1 className="text-2xl font-bold mb-6">ค้นหาการลงทุน</h1>
        <div className="space-y-4">
          <InvestmentCard />
          <InvestmentCard />
          <InvestmentCard />
        </div>
      </aside>
      <main className="relative flex-1 bg-stone-100">
        <MapContainer />
      </main>
    </div>
  );
}
EOF

# 2. ส่วนของ Dashboard (หน้านักลงทุน)
cat <<EOF > app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Investor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <p className="text-sm text-gray-500">มูลค่าพอร์ตโดยรวม</p>
          <p className="text-2xl font-bold font-mono">฿12,450,000</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <p className="text-sm text-gray-500">คาดการณ์กำไรปีนี้</p>
          <p className="text-2xl font-bold text-green-600">+8.4%</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border text-white bg-stone-900">
          <p className="text-sm opacity-80">สถานะสมาชิก</p>
          <p className="text-2xl font-bold">Premium Investor</p>
        </div>
      </div>
    </div>
  );
}
EOF

# 3. ระบบ Validation (ตรวจสอบข้อมูลก่อนลงประกาศ)
cat <<EOF > lib/validators/listing.ts
import { z } from "zod";

export const listingSchema = z.object({
  title: z.string().min(5, "ชื่อหัวข้อต้องมีความยาวอย่างน้อย 5 ตัวอักษร"),
  price: z.number().positive("ราคาต้องมากกว่า 0"),
  sqWha: z.number().positive("ขนาดพื้นที่ต้องมากกว่า 0"),
  latitude: z.number(),
  longitude: z.number(),
  zoningColor: z.enum(["RED", "ORANGE", "PURPLE", "GREEN", "BLUE"]),
});
EOF

# 4. ส่วนประกอบ UI อื่นๆ ที่ขาด
touch components/shared/Navbar.tsx
touch components/shared/Footer.tsx
touch components/forms/ListingForm.tsx

# 5. สร้างไฟล์สำหรับเก็บตัวแปรสภาพแวดล้อม (Template)
cat <<EOF > .env.example
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/landsmart?schema=public"
NEXTAUTH_SECRET="your-secret-here"
MAPBOX_TOKEN="your-mapbox-token-here"
EOF

echo "🚀 Project files populated! Your Land Investment Platform is ready for coding."
chmod +x complete-project.sh
