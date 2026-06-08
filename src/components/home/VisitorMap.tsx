'use client'

import { useEffect } from 'react'

// Replace YOUR_SITE_KEY with your actual mapmyvisitors.com site key
// Get it from: https://mapmyvisitors.com/ after signing up with brad-zqh.github.io
const MAPMYVISITORS_KEY = 'YOUR_SITE_KEY'

export default function VisitorMap() {
  useEffect(() => {
    // Inject the mapmyvisitors script dynamically (client-side only)
    const existing = document.getElementById('mapmyvisitors')
    if (existing) return

    const script = document.createElement('script')
    script.id = 'mapmyvisitors'
    script.type = 'text/javascript'
    script.src = `//mapmyvisitors.com/map.js?cl=ffffff&w=a&t=n&d=${MAPMYVISITORS_KEY}&co=2563eb&ct=ffffff&cmo=3b82f6&cmn=2563eb`
    document.getElementById('mapmyvisitors-container')?.appendChild(script)

    return () => {
      document.getElementById('mapmyvisitors')?.remove()
    }
  }, [])

  return (
    <div className="mt-2 flex justify-center">
      <div
        id="mapmyvisitors-container"
        className="w-full"
        style={{ minHeight: '200px' }}
      />
    </div>
  )
}
