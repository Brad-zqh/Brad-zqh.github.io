'use client'

import { useEffect, useRef, useState } from 'react'

interface Visitor {
  lat: number
  lon: number
  city: string
  country: string
  time: string
}

export default function VisitorMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    // Record this visit
    fetch('/api/visitor', { method: 'POST' }).catch(() => {})

    // Load visitors and render map
    async function initMap() {
      if (!mapRef.current || mapInstanceRef.current) return

      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')

      const map = L.map(mapRef.current, {
        center: [20, 0],
        zoom: 1.5,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
      })
      mapInstanceRef.current = map

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO',
      }).addTo(map)

      // Custom blue dot icon
      const dotIcon = L.divIcon({
        className: '',
        html: `<div style="width:10px;height:10px;border-radius:50%;background:#2563eb;border:2px solid white;box-shadow:0 0 4px rgba(37,99,235,0.6);"></div>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
      })

      const res = await fetch('/api/visitor')
      const visitors: Visitor[] = await res.json()
      setCount(visitors.length)

      visitors.forEach((v) => {
        L.marker([v.lat, v.lon], { icon: dotIcon })
          .addTo(map)
          .bindPopup(`<b>${v.city || 'Unknown'}</b><br>${v.country}`)
      })
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div className="mt-2">
      <div
        ref={mapRef}
        style={{ height: '280px', borderRadius: '12px', overflow: 'hidden' }}
        className="border border-neutral-200 dark:border-neutral-700"
      />
      {count !== null && (
        <p className="text-xs text-neutral-500 mt-2 text-center">
          {count} visitor{count !== 1 ? 's' : ''} from around the world
        </p>
      )}
    </div>
  )
}
