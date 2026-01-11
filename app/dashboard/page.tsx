export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Investor Dashboard</h1>
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">มูลค่าพอร์ตโดยรวม</p>
          <p className="font-mono text-2xl font-bold">฿12,450,000</p>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">คาดการณ์กำไรปีนี้</p>
          <p className="text-2xl font-bold text-green-600">+8.4%</p>
        </div>
        <div className="rounded-xl border bg-stone-900 bg-white p-6 text-white shadow-sm">
          <p className="text-sm opacity-80">สถานะสมาชิก</p>
          <p className="text-2xl font-bold">Premium Investor</p>
        </div>
      </div>
    </div>
  )
}
