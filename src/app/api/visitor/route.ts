import { NextRequest, NextResponse } from 'next/server'

const GIST_ID = process.env.GIST_ID!
const GITHUB_TOKEN = process.env.GITHUB_TOKEN!
const GIST_FILE = 'visitors.json'

interface Visitor {
  lat: number
  lon: number
  city: string
  country: string
  time: string
}

interface GistResponse {
  files: Record<string, { content: string }>
}

async function getVisitors(): Promise<Visitor[]> {
  const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
    cache: 'no-store',
  })
  const gist: GistResponse = await res.json()
  return JSON.parse(gist.files[GIST_FILE]?.content || '[]')
}

async function saveVisitors(visitors: Visitor[]) {
  await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    method: 'PATCH',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      files: { [GIST_FILE]: { content: JSON.stringify(visitors) } },
    }),
  })
}

export async function POST(req: NextRequest) {
  try {
    // Use Vercel's built-in geo headers — no external API needed
    const lat = req.headers.get('x-vercel-ip-latitude')
    const lon = req.headers.get('x-vercel-ip-longitude')
    const city = req.headers.get('x-vercel-ip-city') || ''
    const country = req.headers.get('x-vercel-ip-country') || ''

    if (!lat || !lon) {
      // Fallback: dev environment has no geo headers
      return NextResponse.json({ ok: true, skipped: true, reason: 'no_geo_headers' })
    }

    const visitors = await getVisitors()
    visitors.push({
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      city: decodeURIComponent(city),
      country,
      time: new Date().toISOString(),
    })

    await saveVisitors(visitors)
    return NextResponse.json({ ok: true, city: decodeURIComponent(city), country })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}

export async function GET() {
  try {
    const visitors = await getVisitors()
    return NextResponse.json(visitors)
  } catch {
    return NextResponse.json([], { status: 500 })
  }
}
