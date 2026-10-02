import { test, expect, type Page } from '@playwright/test'

/**
 * These checks exercise the home-page motion work:
 *  - intro -> stage mark handoff (no size jump)
 *  - watermark landing (mark fades behind AUTOMATE, returns on scroll)
 *  - poster strip infinite right-to-left drift + pause-on-hover
 *  - shift+wheel scrolls the strip while a plain wheel scrolls the page
 *  - reduced motion: no drift, final watermark state
 */

const STRIP = 'section[aria-label="Event posters"] [role="region"]'

async function skipIntro(page: Page) {
  // Match the inline layout script: pre-mark the intro done so the stage is live.
  await page.addInitScript(() => {
    try {
      sessionStorage.setItem('wf-intro', '1')
    } catch {}
  })
}

function stripScrollLeft(page: Page) {
  return page.locator(STRIP).evaluate((el) => (el as HTMLElement).scrollLeft)
}

/**
 * The page renders three "WorkFlow PH" marks (intro overlay, stage watermark,
 * finale). The stage one is the only sized, non-intro, non-finale mark; find it
 * in-page rather than via a fragile escaped class selector.
 */
async function stageMarkState(page: Page): Promise<{ visible: boolean; opacity: number }> {
  return page.evaluate(() => {
    const svgs = Array.from(document.querySelectorAll('svg[aria-label="WorkFlow PH"]'))
    const svg = svgs.find((s) => {
      if (s.closest('.wf-intro')) return false
      const r = (s as HTMLElement).getBoundingClientRect()
      // The stage mark fills ~66vw; the finale mark sits in a 40vw box. Pick the widest visible one.
      return r.width > 0 && r.height > 0
    })
    if (!svg) return { visible: false, opacity: 1 }
    // Among visible non-intro marks, prefer the widest (the stage watermark).
    const visibles = svgs
      .filter((s) => !s.closest('.wf-intro'))
      .map((s) => ({ s, r: (s as HTMLElement).getBoundingClientRect() }))
      .filter(({ r }) => r.width > 0 && r.height > 0)
      .sort((a, b) => b.r.width - a.r.width)
    const target = visibles[0]?.s ?? svg
    const wrap = target.closest('[style*="opacity"]') as HTMLElement | null
    const op = wrap ? parseFloat(getComputedStyle(wrap).opacity) : 1
    return { visible: true, opacity: op }
  })
}

function stageMarkOpacity(page: Page) {
  return stageMarkState(page).then((s) => s.opacity)
}

test.describe('home page motion', () => {
  test('loads and shows the stage mark and AUTOMATE together', async ({ page }) => {
    await skipIntro(page)
    await page.goto('/')
    // The settle timing varies by engine; poll until the watermark has faded.
    await expect
      .poll(async () => (await stageMarkState(page)).opacity, { timeout: 8000 })
      .toBeLessThan(0.5)
    expect((await stageMarkState(page)).visible).toBe(true)
  })

  test('scrolling restores the mark to full strength', async ({ page }) => {
    await skipIntro(page)
    await page.goto('/')
    await page.waitForTimeout(1600)
    // Scroll into the stage (section is 520vh tall) past the AUTOMATE exit (~0.2).
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.6))
    await page.waitForTimeout(600)
    const opacity = await stageMarkOpacity(page)
    expect(opacity).toBeGreaterThan(0.9)
  })

  test('poster strip drifts right-to-left on its own', async ({ page }) => {
    await skipIntro(page)
    await page.goto('/')
    const strip = page.locator(STRIP)
    await strip.scrollIntoViewIfNeeded()
    // Move the mouse away so hover does not pause the drift.
    await page.mouse.move(5, 5)
    await page.waitForTimeout(400)
    const a = await stripScrollLeft(page)
    await page.waitForTimeout(1200)
    const b = await stripScrollLeft(page)
    // Right-to-left visual drift => scrollLeft increases over time.
    expect(b).toBeGreaterThan(a)
  })

  test('poster strip pauses while the cursor is over it', async ({ page }) => {
    await skipIntro(page)
    await page.goto('/')
    const strip = page.locator(STRIP)
    await strip.scrollIntoViewIfNeeded()
    // Move away first so hovering fires a fresh pointerenter (repeat runs may
    // leave the cursor already inside the strip, suppressing the event).
    await page.mouse.move(5, 5)
    await page.waitForTimeout(200)
    await strip.hover()
    // Allow the pause easing (~300ms) to settle before sampling.
    await page.waitForTimeout(700)
    const a = await stripScrollLeft(page)
    await page.waitForTimeout(1200)
    const b = await stripScrollLeft(page)
    // Held: unpaused drift (30px/s) would move ~36px in 1200ms; a held strip
    // stays far under that even if the page was just scrolled (boost is
    // suppressed while paused). Allow a small residual for engine timing.
    expect(Math.abs(b - a)).toBeLessThan(8)
    // Then leaving resumes it.
    await page.mouse.move(5, 5)
    await page.waitForTimeout(1500)
    const c = await stripScrollLeft(page)
    expect(c).toBeGreaterThan(b)
  })

  test('plain wheel scrolls the page, not the strip', async ({ page }, testInfo) => {
    // Wheel is a desktop pointer concern; touch devices have no equivalent.
    test.skip(testInfo.project.name === 'mobile-webkit', 'no wheel on touch devices')
    await skipIntro(page)
    await page.goto('/')
    const strip = page.locator(STRIP)
    await strip.scrollIntoViewIfNeeded()
    // Fresh pointerenter so hover holds the drift (see note in the pause test).
    await page.mouse.move(5, 5)
    await page.waitForTimeout(200)
    await strip.hover()
    // Let the drift settle to a hold before measuring, so this isolates
    // "did the wheel scroll the strip" from any residual auto-drift.
    await page.waitForTimeout(700)
    const beforeStrip = await stripScrollLeft(page)
    const beforeY = await page.evaluate(() => window.scrollY)
    await page.mouse.wheel(0, 300)
    await page.waitForTimeout(400)
    const afterY = await page.evaluate(() => window.scrollY)
    const afterStrip = await stripScrollLeft(page)
    // The main contract: a plain vertical wheel scrolls the PAGE.
    expect(afterY).toBeGreaterThan(beforeY)
    // The strip is not meaningfully scrolled by it. A small residual native
    // nudge on the horizontally-overflowing container is acceptable; what
    // matters is it does not scroll by a card width (232px) or more.
    expect(Math.abs(afterStrip - beforeStrip)).toBeLessThan(100)
  })

  test('shift+wheel scrolls the strip horizontally', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile-webkit', 'no wheel on touch devices')
    await skipIntro(page)
    await page.goto('/')
    const strip = page.locator(STRIP)
    await strip.scrollIntoViewIfNeeded()
    await strip.hover()
    await page.waitForTimeout(300)
    const before = await stripScrollLeft(page)
    await page.keyboard.down('Shift')
    await page.mouse.wheel(0, 400)
    await page.keyboard.up('Shift')
    await page.waitForTimeout(300)
    const after = await stripScrollLeft(page)
    expect(after).toBeGreaterThan(before + 100)
  })

})

test.describe('reduced motion', () => {
  test.use({ colorScheme: 'dark' })

  test('no drift and the watermark shows its final state', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' })
    const page = await context.newPage()
    await page.goto('/')
    // Under reduced motion the watermark jumps to its settled state (~0.15)
    // within a frame of load. Poll to stay robust across engines.
    await expect
      .poll(async () => (await stageMarkState(page)).opacity, { timeout: 8000 })
      .toBeLessThan(0.5)
    expect((await stageMarkState(page)).visible).toBe(true)
    const strip = page.locator(STRIP)
    await strip.scrollIntoViewIfNeeded()
    await page.mouse.move(5, 5)
    const a = await strip.evaluate((el) => (el as HTMLElement).scrollLeft)
    await page.waitForTimeout(1200)
    const b = await strip.evaluate((el) => (el as HTMLElement).scrollLeft)
    expect(Math.abs(b - a)).toBeLessThan(2)
    await context.close()
  })
})
