import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const runtime = 'nodejs'

let markCache: string | null = null
async function mark() {
  if (!markCache) {
    const buf = await readFile(join(process.cwd(), 'public/brand/workflow-ph-mark.png'))
    markCache = `data:image/png;base64,${buf.toString('base64')}`
  }
  return markCache
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = (searchParams.get('title') ?? 'Volunteer-driven automation, on record').slice(0, 90)
  const kicker = (searchParams.get('kicker') ?? 'Building the Volunteer-Driven Automation Landscape of the Philippines.').slice(0, 110)
  const src = await mark()

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#f3f4f1', color: '#13201e', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 80, top: 0, bottom: 0, width: 4, background: 'linear-gradient(180deg, #1cbfa7, #e2681f 55%, #fce043)' }} />
        <div style={{ position: 'absolute', left: 72, top: 92, width: 20, height: 20, background: '#13201e', transform: 'rotate(45deg)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '80px 80px 70px 140px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', fontSize: 22, letterSpacing: 4, textTransform: 'uppercase', color: '#4a5553' }}>WorkFlow PH</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} width={190} height={100} alt="" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: title.length > 40 ? 76 : 96, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>{title}</div>
            <div style={{ marginTop: 28, fontSize: 28, color: '#4a5553', lineHeight: 1.35 }}>{kicker}</div>
          </div>
          <div style={{ display: 'flex', height: 10, width: '100%', borderRadius: 10, background: 'linear-gradient(90deg, #1cbfa7, #e2681f 55%, #fce043)' }} />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { 'Cache-Control': 'public, max-age=86400, immutable' },
    },
  )
}
