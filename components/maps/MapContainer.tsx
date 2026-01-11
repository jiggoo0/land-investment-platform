/** @format */

'use client'

import React, { useState } from 'react'
import { Map, NavigationControl, Marker, Popup } from 'react-map-gl/mapbox' // ✅ นำ MapMouseEvent ออกเพราะไม่ได้ใช้งาน
import 'mapbox-gl/dist/mapbox-gl.css'
import { TrendingUp, MapPin } from 'lucide-react'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

// --- Interfaces ---
export interface ViewState {
  latitude: number
  longitude: number
  zoom: number
  pitch?: number
  bearing?: number
}

interface ListingPin {
  lat: number
  lng: number
  title: string
  price: string
}

interface MapContainerProps {
  viewState?: ViewState
  onMove?: (evt: { viewState: ViewState }) => void
}

export default function MapContainer({ viewState: externalViewState, onMove }: MapContainerProps) {
  const [selectedPin, setSelectedPin] = useState<ListingPin | null>(null)

  const [internalViewState, setInternalViewState] = useState<ViewState>({
    latitude: 13.7563,
    longitude: 100.5018,
    zoom: 12,
    pitch: 45,
    bearing: 0,
  })

  const currentViewState = externalViewState || internalViewState

  const handleMove =
    onMove ||
    ((evt: { viewState: ViewState }) =>
      setInternalViewState((prev) => ({
        ...prev,
        ...evt.viewState,
      })))

  return (
    <div className="relative h-full w-full overflow-hidden bg-stone-100 shadow-2xl md:rounded-l-[2.5rem]">
      <Map
        {...currentViewState}
        onMove={handleMove}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        scrollZoom={true}
        antialias={true}
        terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
      >
        <NavigationControl position="top-right" />

        {/* 📍 Marker Section */}
        <Marker
          latitude={13.7563}
          longitude={100.5018}
          anchor="bottom"
          onClick={(e) => {
            // ✅ ใช้ stopPropagation เพื่อป้องกัน event ลามไปถึงตัว Map
            e.originalEvent.stopPropagation()
            setSelectedPin({
              lat: 13.7563,
              lng: 100.5018,
              title: 'ที่ดินติดแม่น้ำเจ้าพระยา',
              price: '45M',
            })
          }}
        >
          <div className="group cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="mb-2 rounded-xl bg-stone-900 px-3 py-1.5 text-[11px] font-black text-white shadow-2xl transition-all group-hover:-translate-y-1 group-hover:bg-amber-600">
                ฿45M
              </div>
              <div className="relative flex h-8 w-8 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full bg-amber-500/20" />
                <div className="relative rounded-full bg-white p-2 shadow-xl ring-2 ring-amber-600 transition-transform group-hover:scale-110">
                  <MapPin size={16} className="text-amber-700" />
                </div>
              </div>
            </div>
          </div>
        </Marker>

        {/* 💬 Popup Section */}
        {selectedPin && (
          <Popup
            latitude={selectedPin.lat}
            longitude={selectedPin.lng}
            offset={40}
            closeButton={false}
            onClose={() => setSelectedPin(null)}
            maxWidth="260px"
            anchor="bottom"
          >
            <div className="overflow-hidden rounded-2xl bg-white p-0 font-sans shadow-none">
              <div className="h-2 w-full bg-amber-600" />
              <div className="p-4">
                <p className="text-[10px] font-black tracking-[0.2em] text-amber-700 uppercase">
                  Premium Listing
                </p>
                <h4 className="mt-1.5 leading-tight font-bold text-stone-900">
                  {selectedPin.title}
                </h4>

                <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-stone-400 uppercase">
                      Yield Est.
                    </span>
                    <span className="flex items-center gap-1 text-sm font-black text-green-600">
                      <TrendingUp size={14} /> +12.4%
                    </span>
                  </div>
                  <button className="rounded-lg bg-stone-900 px-3 py-1.5 text-[10px] font-bold text-white transition-colors hover:bg-stone-800">
                    ดูโฉนด
                  </button>
                </div>
              </div>
            </div>
          </Popup>
        )}
      </Map>

      <div className="absolute right-8 bottom-8 z-10 flex flex-col gap-2">
        <div className="glass-morphism rounded-full px-4 py-2 text-[10px] font-black tracking-widest text-stone-600 uppercase shadow-lg">
          3D Perspective Active
        </div>
      </div>
    </div>
  )
}
