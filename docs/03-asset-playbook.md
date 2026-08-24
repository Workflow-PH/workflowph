# 03 — Asset Playbook

**This is the critical path. It starts Aug 24 and must be done by Sep 6.**

You said assets are what you need most. You're right, and it's the correct thing to worry about. A week of development on complete assets produces a site people share. A week of development on half-assets produces placeholders that never get replaced.

Owner: **Asset Wrangler** (1 person, named, not a committee). Support: Content Lead, Designer.

---

## 1. Definition of Done for the asset track

By **Sep 6, 23:59**:

- [ ] 12 events have a complete Asset Kit (§3)
- [ ] All remaining events have a Sheet row for the archive list (title, date, type, venue, one link)
- [ ] All partner logos in SVG, or a written note that a partner declined / hasn't replied
- [ ] All core team headshots
- [ ] WorkFlow PH logo in SVG, light and dark variants
- [ ] `/images/` folder in the repo populated and committed
- [ ] Google Sheet fully filled, zero blank required cells
- [ ] Photo consent register complete (§7)

If we hit Sep 6 with 6 complete kits instead of 12, we ship 6 full pages and a longer archive list. **We do not slip the launch, and we do not ship placeholders.** That's the deal.

---

## 2. Folder structure — Google Drive

Create this on day one. Everyone uses it. No exceptions, no personal folders.

```
WorkFlowPH-Website-Assets/
├─ 00-INBOX/                        ← dump raw here, unsorted, from anyone
├─ 01-events/
│  └─ 2026-08-20_jia-talent-vault/
│     ├─ hero/                      ← 1 chosen landscape photo
│     ├─ gallery/                   ← 6-12 chosen photos
│     ├─ poster/                    ← the original FB creative
│     ├─ speakers/                  ← headshots
│     └─ NOTES.md                   ← recap draft, stats, links, credits
├─ 02-people/
│  ├─ core/
│  └─ speakers/
├─ 03-partners/                     ← one subfolder per partner, SVG + PNG
├─ 04-brand/                        ← WorkFlow PH logo, wordmark, fonts, colours
├─ 05-approved-web/                 ← FINAL, renamed, consent-cleared. Only this folder goes to the repo.
└─ 99-rejected/                     ← keep, don't delete; explains decisions later
```

Only `05-approved-web/` enters the repo. Nothing moves into it without passing §4 and §7.

---

## 3. The per-event Asset Kit

An event does not get a detail page until every **Required** row is filled. Print this. Tick it per event.

| # | Item | Spec | Required |
|---|---|---|---|
| 1 | Hero photo | Landscape, ≥ 2400 px long edge, sharp, people visible, no heavy text overlay | ✅ |
| 2 | Card photo | 4:3 crop, can be derived from hero | ⬜ falls back to hero |
| 3 | Gallery | 6–12 photos, mixed wide/detail/portrait, ≥ 1600 px | ✅ min 6 |
| 4 | Event poster | The original FB creative, PNG or JPG, ≥ 1080 px | ✅ |
| 5 | Speaker headshots | Square, ≥ 800 px, one per named speaker | ⬜ |
| 6 | Partner logos | SVG preferred, else transparent PNG ≥ 1000 px | ✅ if partnered |
| 7 | Title + series | Exact official naming | ✅ |
| 8 | Date, venue, city, mode | Venue is "Online" for virtual | ✅ |
| 9 | Type | One of the eight enum values in [02](02-ia-and-content-model.md) | ✅ |
| 10 | Hook | ≤ 90 characters, one line | ✅ |
| 11 | Recap | 60–150 words, past tense, plain language | ✅ |
| 12 | Takeaways | 3 bullets, ≤ 12 words each | ⬜ |
| 13 | Stats | Up to 3 (`registrants`, `attendees`, `hours`, `orgs represented`) | ✅ min 1 |
| 14 | Links | Original FB post minimum; add Meetup, album, slides, recording | ✅ min 1 |
| 15 | Alt text | One sentence per photo. Who, doing what, where. | ✅ |
| 16 | Credits | Photographer name per photo or per event | ✅ |
| 17 | Consent | Row in the consent register | ✅ |

**Time estimate:** 45–60 minutes per event once the photos are located. Twelve events ≈ 10–12 hours of focused work. That is two evenings for three people. It is very achievable, and it is also exactly the thing that quietly doesn't happen unless someone is named and the deadline is real.

---

## 4. Image technical specs

### Intake (what the wrangler puts in Drive)

| Use | Aspect | Min pixels | Format |
|---|---|---|---|
| Hero | 16:9 | 2400 × 1350 | JPEG q90, sRGB |
| Card | 4:3 | 1600 × 1200 | JPEG q90, sRGB |
| Gallery landscape | 3:2 | 1800 × 1200 | JPEG q90, sRGB |
| Gallery portrait | 2:3 | 1200 × 1800 | JPEG q90, sRGB |
| Headshot | 1:1 | 800 × 800 | JPEG q90, sRGB |
| Poster | 4:5 or 1:1 | 1080 px min | PNG or JPEG |
| OG fallback | 1.91:1 | 1200 × 630 | PNG |
| Logo | — | vector | **SVG**, plus PNG @2x transparent |

Keep originals. Never upscale — a soft 1200 px photo is better than a mushy 2400 px one. If nothing over 1600 px exists for an event, that event becomes `tier: archive`.

### Output (what the build produces)

Astro's image pipeline handles this — do not hand-optimise. Devs configure once in **WF-05**.

- AVIF with WebP fallback, `sharp` backend
- `widths: [400, 800, 1200, 1600, 2400]`, `sizes` set per component
- `loading="lazy"` `decoding="async"` on everything except the homepage hero, which is `eager` + `fetchpriority="high"`
- Explicit `width`/`height` on every image. Non-negotiable for CLS.

### Performance budget (enforced in **WF-24**)

| Thing | Budget |
|---|---|
| Homepage hero image, delivered | ≤ 200 KB |
| Any card image, delivered | ≤ 90 KB |
| Total page weight, mobile, above fold | ≤ 1.2 MB |
| JS shipped on content routes | ≤ 100 KB gzip |
| Self-hosted fonts | ≤ 2 files, ≤ 120 KB total |
| LCP on simulated 4G | ≤ 2.5 s |
| CLS | < 0.1 |

---

## 5. Naming convention

```
YYYY-MM-DD_event-slug_role_seq_photographer.ext
```

| Example | Meaning |
|---|---|
| `2026-08-20_jia-talent-vault_hero_01_rmendoza.jpg` | hero shot |
| `2026-08-20_jia-talent-vault_gallery_07_rmendoza.jpg` | 7th gallery image |
| `2026-08-20_jia-talent-vault_poster_01.png` | FB creative |
| `2026-08-20_jia-talent-vault_speaker_kpabilando.jpg` | speaker headshot |
| `partner_tutorials-dojo_light.svg` | logo for dark backgrounds |
| `people_core_jsalazar.jpg` | core team headshot |

All lowercase. Hyphens inside a token, underscores between tokens. No spaces, no `IMG_4821`, no `final_final_v2`. Photographer initial + surname.

---

## 6. Partner logo requests — send Aug 24

Chase these first; they have the longest turnaround because they depend on other people replying. Known partners from the Facebook page: **Jia Talent Vault, Echelon Philippines, Tutorials Dojo, AWS User Group Philippines, AWS Community Day Philippines.**

Copy-paste request:

> Hi [Name],
>
> WorkFlow PH is launching our official website on **September 15**, and we'd like to feature [Org] on our partners page and on the page for [event].
>
> Could you send your brand assets? Specifically:
> - Logo in **SVG** (a transparent PNG at 1000 px+ works too)
> - A light-on-dark variant if you have one
> - Your brand guidelines or any usage restrictions
> - The URL you'd like the logo to link to
>
> We'd love to have these by **September 3** so you're in the launch version. Happy to send a preview before we go live.
>
> Thank you,
> WorkFlow PH

Log each request in the Sheet with date sent and date received. If a partner hasn't replied by Sep 6, use a **text-only wordmark** in the site's own typeface. Never trace, screenshot, or AI-generate someone's logo.

---

## 7. Consent, privacy, and credit

Non-optional. Volunteer orgs get this wrong and it costs them trust.

### Consent register

One tab in the Sheet: `event_slug | photo_file | subjects | consent_basis | cleared_by | date`

`consent_basis` is one of:
- `event-notice` — the event registration or on-site signage stated photos would be published
- `individual` — the person gave explicit permission (screenshot it, link it)
- `public-figure` — speaker on stage in their speaking capacity
- `no-faces` — wide shot, backs of heads, or hands/screens only

If a photo has no valid basis, it goes to `99-rejected/`.

### Hard blocks — do not publish

- Any identifiable minor without written guardian consent
- Attendee badges, IDs, QR codes, or name tags that are legible
- Laptop screens, projected slides, or whiteboards showing emails, keys, tokens, credentials, or personal data. **Zoom to 100% and check every screen in every photo.** This is the most common leak in tech-event photography.
- Anyone visibly distressed, asleep, eating awkwardly, or otherwise unflattering
- Photos from closed or internal sessions where publication wasn't announced

### Speaker courtesy

Email each featured speaker their page preview before launch. One line, one link. Takes five minutes and buys enormous goodwill — and they will reshare it, which is free reach.

### Credit

Every photo carries a photographer credit in the data. Render it in the lightbox and as a combined credit line on the event page. If a volunteer photographer isn't credited, they stop shooting for you.

---

## 8. Fallbacks when a photo doesn't exist

Never ship a broken image, a stretched image, or a grey box.

**Priority order:**
1. Real event photo
2. The FB event poster, blurred and darkened as a background with the title set over it
3. **Designed poster card** — event title in the display typeface over a generated gradient, seeded deterministically from the event slug so each event gets a distinct but on-brand colour. Add a faint type-icon watermark.
4. If none of the above is acceptable, the event is `tier: archive` and gets a list row, not a page.

Option 3 is ticket **WF-09** and is genuinely worth building — it makes an incomplete archive look deliberate instead of unfinished. Some of the best-looking event archives on the web are mostly typography.

---

## 9. Harvesting from Facebook

The FB page is the source of truth for history. Do this manually and once; there is no API path worth building for a one-week sprint.

1. Open [facebook.com/workflowph](https://facebook.com/workflowph), scroll to the earliest post.
2. For every event post, add a Sheet row: date, title, type, venue, FB post permalink, whether an album exists.
3. Download the poster creative at full resolution from each post.
4. For posts with albums, download the originals — **not** the feed-compressed versions. Use the photo's "Download" option on desktop, which serves a larger file than right-click-save on the feed.
5. Ask core team members for their **original camera-roll photos**. Facebook re-compresses uploads; the phone originals are typically 3–5× larger and are what you actually want for heroes.
6. Cross-check against Meetup, Luma, or Google Forms records for real registration and attendance numbers. Real numbers beat rounded guesses, and sponsors can tell the difference.

**Step 5 is the highest-value task in this entire document.** One group chat message asking six people to dump their event photos into `00-INBOX/` will likely produce better source material than everything else combined. Send it today.

---

## 10. Tooling

| Need | Tool |
|---|---|
| Bulk rename | PowerShell `Rename-Item`, or Adobe Bridge / XnView MP with a rename template |
| Bulk resize + crop | XnView MP (free, batch convert), or `sharp-cli` |
| SVG cleanup | [SVGOMG](https://jakearchibald.github.io/svgomg/) |
| Colour extraction from photos | [Coolors image picker](https://coolors.co/image-picker) |
| Moodboard | Figma or [cosmos.so](https://www.cosmos.so/) |
| Quick face/screen blur | Figma with a blur layer, or Photopea |

Batch resize with `sharp-cli`, run from the assets folder:

```powershell
npx -y sharp-cli@5 -i "./raw/*.jpg" -o "./out" resize 2400 --withoutEnlargement -- jpeg --quality 90
```
