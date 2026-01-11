/** @format */
import { z } from 'zod'

export const listingSchema = z.object({
  title: z.string().min(5, 'ชื่อหัวข้อต้องมีความยาวอย่างน้อย 5 ตัวอักษร'),
  price: z.coerce.number().min(0, 'ราคาต้องไม่ติดลบ'),
  rai: z.coerce.number().min(0),
  ngan: z.coerce.number().min(0),
  sqWha: z.coerce.number().min(0),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  zoningColor: z.enum(['RED', 'ORANGE', 'PURPLE', 'GREEN', 'BLUE', 'YELLOW']),
})

export type ListingInput = z.infer<typeof listingSchema>
