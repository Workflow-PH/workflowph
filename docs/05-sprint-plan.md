# 05 — Sprint Plan (one week)

## 1. Where we actually are

The foundation is already built and pushed. That changes the shape of the week — you are not starting from zero, you are filling a finished shell.

**Done already:**

- Astro 7 + Tailwind 4 project, builds green, `astro check` clean, zero type errors
- Full design system: tokens, typography, grain overlay, flow-mesh motif, motion rules
- Content model with Zod schemas for six collections, validated at build time
- Every page route exists and renders: home, showcase index, showcase detail, builds, people, about, partners, join, press kit, 404
- Showcase card with the metadata triplet, asymmetric grid, archive list, poster-card fallback
- Accessible gallery + lightbox, mobile nav with focus trap, skip link, sitemap, JSON-LD
- Zero JavaScript bundle on content routes

**Not done:** photos, logos, real copy, real numbers. That is the entire remaining risk, and it is not a coding problem.

## 2. The week

```
Mon 24    Tue 25    Wed 26    Thu 27    Fri 28    Sat 29    Sun 30    Mon 31
  │         │         │         │         │         │         │         │
 kick     assets    assets    CONTENT   build     polish    freeze   LAUNCH
 off      + copy    + copy     GATE     + wire     + QA      + fix
```

| Day | Focus | Owner |
|---|---|---|
| **Mon 24** | Kickoff. Assign issues. Drive folders created. **Photo request sent to every core member.** Partner logo emails sent. | Lead |
| **Tue 25** | Asset harvest: Facebook archive → sheet. Photo selection and renaming for events 1–6. Copy drafting starts. | Wrangler, Content |
| **Wed 26** | Events 7–12. Boilerplate, about story, timeline, impact numbers finalised. Logos chased. | Wrangler, Content |
| **Thu 27** | **Content gate, 8 PM.** Count complete Asset Kits. Scope locked to that number. See §4. | Lead |
| **Fri 28** | Devs wire real content in. Images optimised and committed. Remaining feature issues closed. | Devs |
| **Sat 29** | Polish: performance pass, OG image, accessibility audit, cross-device. | Devs |
| **Sun 30** | **Freeze 11:59 PM.** Proofread everything out loud. Speaker and partner previews sent. DNS configured. | All |
| **Mon 31** | Launch. | Lead |

Sept 15 stays on the calendar as the fallback launch date if the content gate fails badly. Use it rather than shipping placeholder copy.

## 3. Roles

| Role | Owns | Load |
|---|---|---|
| **Sprint Lead** | Issue assignment, the content gate call, launch | ~1 h/day |
| **Asset Wrangler** | Photos, logos, renaming, consent register. Critical path. | Heavy Mon–Thu |
| **Content Lead** | All copy, recaps, partner emails, the numbers | Heavy Mon–Thu |
| **Dev A** | Wire real content, image pipeline, performance, SEO | Fri–Sun |
| **Dev B** | Remaining features, OG image, accessibility, QA | Fri–Sun |

Devs are deliberately light Mon–Thu. The code is ahead of the content; adding more code this week makes the gap worse, not better. If a dev is idle, put them on asset harvesting.

## 4. Content gate — Thursday 27, 8 PM

Count the events with a complete Asset Kit ([doc 03](03-asset-playbook.md) §3) and lock scope to that number.

| Complete kits | What ships Monday |
|---|---|
| 10+ | Everything as designed |
| 6–9 | Everything, with a longer archive list |
| 3–5 | Home + showcase + about + partners + join. Builds and people fold into about. |
| 0–2 | **Hold the launch to Sept 15.** Do not ship a shell with draft copy on it. |

Every seed event currently carries `draft: true`. Production builds exclude drafts, so nothing unverified can leak — you have to consciously flip a flag to publish. Keep it that way.

## 5. Working agreements

- Async standup in one thread by 9 PM PHT: shipped / next / blocked.
- Two live calls only: Mon 24 kickoff, Thu 27 content gate. 20 minutes each.
- One issue in progress per person.
- Branch per issue: `feat/wf-12-...`. One approval, squash merge, delete branch.
- Blocked more than four hours? Post it.
- `SHOW_DRAFTS=1 pnpm build` to preview draft content. Never set it in production.

## 6. Descope ladder

Pre-agreed, so Friday is a checklist rather than an argument. Cut top-down.

| # | Cut | Fallback |
|---|---|---|
| 1 | Showcase filter chips | Year grouping, which already ships |
| 2 | Per-event OG images | One static sitewide OG image |
| 3 | `/press-kit` | Section on `/about` + a Drive link |
| 4 | `/people` | Team block inside `/about` |
| 5 | `/builds` index | Homepage builds strip only |
| 6 | Scroll-reveal animation | Already CSS-only and degrades to no-op |

Never cut: real photos with alt text, mobile layout, the accessibility bar, the performance budget, a working contact path for partners.

## 7. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Assets don't arrive | **High** | **Critical** | Named owner, Thu gate, poster-card fallback already built, `tier: archive` escape hatch |
| Partners don't send logos | High | Low | Typographic wordmark fallback already built and shipping |
| Draft copy published by accident | Medium | High | `draft: true` on every seed file; production builds exclude drafts by default |
| Volunteer disappears | Medium | Medium | Content and code tracks are independent; the site already builds and deploys |
| Scope creep | High | Medium | [Doc 01 §6](01-brief-and-references.md) out-of-scope list; a `v2` label on the repo |
| Photo published without consent | Low | **Severe** | Consent register is a launch-checklist blocker |

## 8. v2 backlog

Park requests here. Search · CMS · Filipino localisation · live Meetup feed · member portal · community template submissions · newsletter · blog · sponsorship prospectus PDF.
