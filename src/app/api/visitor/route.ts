import { NextRequest, NextResponse } from 'next/server'

const GIST_ID = process.env.GIST_ID!
const GITHUB_TOKEN = process.env.GITHUB_TOKEN!
const GIST_FILE = 'visitors.json'

async function getVisitors(): Promise<any[]> {
  const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
    cache: 'no-store',
  })
  const gist = await res.json()
  return JSON.parse(gist.files[GIST_FILE].content || '[]')
}

async function saveVisitors(visitors: any[]) {
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
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '8.8.8.8'

    // Skip local IPs
    if (ip.startsWith('127.') || ip.startsWith('::1') || ip === 'localhost') {
      return NextResponse.json({ ok: true, skipped: true })
    }

    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`, { cache: 'no-store' })
    const geo = await geoRes.json()

    if (!geo.latitude || !geo.longitude) {
      return NextResponse.json({ ok: true, skipped: true })
    }

    const visitors = await getVisitors()
    visitors.push({
      lat: geo.latitude,
      lon: geo.longitude,
      city: geo.city || '',
      country: geo.country_name || '',
      time: new Date().toISOString(),
    })

    await saveVisitors(visitors)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

export async function GET() {
  try {
    const visitors = await getVisitors()
    return NextResponse.json(visitors)
  } catch (e) {
    return NextResponse.json([], { status: 500 })
  }
}
