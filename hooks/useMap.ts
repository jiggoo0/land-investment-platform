/** @format */

import { useState, useCallback } from 'react'

// กำหนด Interface สำหรับความชัดเจนของข้อมูล
interface MapCoords {
  latitude: number
  longitude: number
  zoom: number
}

export const useMap = (initialCoords = { lat: 13.7563, lng: 100.5018, zoom: 12 }) => {
  const [viewState, setViewState] = useState<MapCoords>({
    latitude: initialCoords.lat,
    longitude: initialCoords.lng,
    zoom: initialCoords.zoom,
  })

  // ฟังก์ชันสำหรับเคลื่อนกล้องไปยังพิกัดใหม่แบบนุ่มนวล
  const flyTo = useCallback((lat: number, lng: number, zoom?: number) => {
    setViewState((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      zoom: zoom || prev.zoom,
    }))
  }, [])

  return {
    viewState,
    setViewState,
    flyTo,
  }
}
