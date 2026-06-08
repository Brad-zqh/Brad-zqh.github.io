'use client'

import { useEffect } from 'react'

// Replace YOUR_SITE_KEY with your actual mapmyvisitors.com site key
// Get it from: https://mapmyvisitors.com/ after signing up with brad-zqh.github.io
const MAPMYVISITORS_KEY = 'Qm1i4VQUaZG_U0fbYkxC0bb2zyMAT3L0hG8paJjf41Q'

export default function VisitorMap() {
  useEffect(() => {
    // Inject the mapmyvisitors script dynamically (client-side only)
    const existing = document.getElementById('mapmyvisitors')
    if (existing) return

    const script = document.createElement('script')
    script.id = 'mapmyvisitors'
    script.type = 'text/javascript'
    script.src = `//mapmyvisitors.com/map.js?d=${MAPMYVISITORS_KEY}&cl=ffffff&w=a`
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
