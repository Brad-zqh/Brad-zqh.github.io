'use client'

import { useEffect, useRef } from 'react'

// Replace YOUR_SITE_KEY with your actual mapmyvisitors.com site key
// Get it from: https://mapmyvisitors.com/ after signing up with brad-zqh.github.io
const MAPMYVISITORS_KEY = 'Qm1i4VQUaZG_U0fbYkxC0bb2zyMAT3L0hG8paJjf41Q'

export default function VisitorMap() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const loadMap = () => {
      const existing = document.getElementById('mapmyvisitors')
      if (existing) return

      const script = document.createElement('script')
      script.id = 'mapmyvisitors'
      script.type = 'text/javascript'
      script.src = `https://mapmyvisitors.com/map.js?d=${MAPMYVISITORS_KEY}&cl=ffffff&w=a`
      script.async = true
      container.appendChild(script)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadMap()
          observer.disconnect()
        }
      },
      { rootMargin: '300px' }
    )
    observer.observe(container)

    return () => {
      observer.disconnect()
      document.getElementById('mapmyvisitors')?.remove()
    }
  }, [])

  return (
    <div className="mt-2 flex justify-center">
      <div
        ref={containerRef}
        id="mapmyvisitors-container"
        className="w-full"
        aria-label="Visitor map"
        style={{ minHeight: '200px' }}
      />
    </div>
  )
}
