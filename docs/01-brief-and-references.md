# 01 — Brief & References

## 1. The problem we're solving

WorkFlow PH's entire public record lives on Facebook. That means:

- Nothing is linkable in a way a sponsor, university, or employer takes seriously.
- Event history is buried in a reverse-chronological feed with no structure.
- Photos, posters, and speaker features are scattered across posts and albums.
- There is no artifact a partner can screenshot into a deck.

A Facebook page proves activity. A showcase site proves **track record**.

## 2. Who this is for, in priority order

| # | Audience | What they need in under 30 seconds |
|---|---|---|
| 1 | **Sponsors & partners** (Tutorials Dojo, Jia Talent Vault, Echelon PH, cloud vendors) | Scale, reach, past partner logos, production quality, who to email |
| 2 | **Prospective volunteers** | That this is real, active, and led by people they'd want to work with |
| 3 | **Prospective attendees** | Next event, what past events actually felt like |
| 4 | **Speakers & the wider PH tech scene** | That being platformed here is worth their time |
| 5 | **Members** | Something they're proud to share on their own profiles |

Design decision that follows from this: the homepage's first screen must answer *"is this org legit and at what scale"* — not *"what is automation."*

## 3. Positioning: "not just visual"

You said this twice, so it's the core constraint. Creative Impact is beautiful but it sells *production*. We are selling *substance*. Beautiful is table stakes; the differentiator is the **proof layer**.

Every showcase item carries at least one of these, or it doesn't ship:

- **A number** — attendees, registrations, workshop hours, workflows shipped, partner count
- **An artifact** — a template, a repo, a recording, a deck, a workflow JSON
- **A name** — a speaker with a real credential, a partner with a real logo
- **A photo** — a room with people in it

Rule of thumb: if an item has only a poster and a date, it's a calendar entry, not a showcase item. Group those into a compact archive list instead of giving them a full page.

## 4. Success metrics

Measured 30 days post-launch (Oct 15):

| Metric | Target |
|---|---|
| Events with a complete asset kit and live page | ≥ 12 |
| Partner-inbound emails via the site | ≥ 3 |
| Volunteer applications tagged `source=website` | ≥ 15 |
| Mobile Lighthouse performance / a11y | ≥ 90 / ≥ 95 |
| Press kit downloads | ≥ 10 |
| Site referenced in a sponsorship deck | at least once |

## 5. In scope

- Home, Showcase index + detail pages, Builds (outputs), People, About, Partners, Join, Press Kit
- Filterable/groupable showcase grid with hover reveal
- Accessible photo lightbox
- Static content in-repo, editable by non-devs via one Google Sheet → JSON sync (see [02](02-ia-and-content-model.md))
- Per-page OG images
- Press kit with logos, brand colors, boilerplate copy

## 6. Explicitly out of scope for this sprint

Say no now so nobody builds it on Sep 11.

- CMS/admin dashboard (Sanity, Payload, Strapi)
- Auth, member portal, application forms with a database
- Live Facebook or Meetup API feed at runtime
- Blog with comments
- i18n / Filipino translation
- Search
- Newsletter automation beyond an embed
- Dark/light mode toggle (pick one direction and commit)
- Analytics beyond one privacy-friendly script

## 7. Reference board

Review these before the Sep 7 kickoff. Ten minutes each on mobile *and* desktop. Bring one screenshot you loved and one you hated to kickoff.

### A. Agency work-grid — the layout language you already like

| Site | Steal this |
|---|---|
| [creativeimpactinc.com/work](https://www.creativeimpactinc.com/work) | The metadata triplet under every card: **CLIENT / Project Name / Year ● Venue / Category**. That's a content model, not a design. Copy it directly. Also: hover-to-reveal keeps the grid calm and photo-forward. |
| [instrument.com](https://www.instrument.com/) | Case pages that read as narrative with numbers, not galleries |
| [locomotive.ca](https://locomotive.ca/en) | Restrained motion that still feels expensive; scroll pacing |
| [basement.studio](https://basement.studio/) | Dev-org personality without looking corporate — closest tonal match for a tech collective |
| [hellomonday.com](https://www.hellomonday.com/) | Typographic scale and editorial rhythm |

**Adapt, don't copy:** their "client" slot is our **event series or partner**. Their "category" slot is our **event type** (Workshop / Community Day / Summit / Hackathon / AMA).

### B. Volunteer-driven orgs with soul — closest to what you actually are

| Site | Steal this |
|---|---|
| [hackclub.com](https://hackclub.com/) | The gold standard for volunteer-driven tech orgs. Photo-maximalist, unpolished-on-purpose, radiates "real humans do this." Study how they use candid photos over stock. |
| [recurse.com](https://www.recurse.com/) | Credibility through plain writing and alumni outcomes. Almost no decoration, extremely convincing. |
| [codebar.io](https://codebar.io/) | Volunteer + chapter structure made legible |
| [djangogirls.org](https://djangogirls.org/) | Event archive at scale (hundreds of events) without collapsing |

### C. Conference & event recap patterns

| Site | Steal this |
|---|---|
| [config.figma.com](https://config.figma.com/) | Post-event state: recap reel, session archive, photo wall. Note how the site stays useful *after* the event. |
| [githubuniverse.com](https://githubuniverse.com/) | Speaker cards, session metadata density |
| [smashingconf.com](https://smashingconf.com/) | Multi-year archive navigation — directly relevant to a long event history |
| [cascadiajs.com](https://cascadiajs.com/) | Small-team community conf, punches above its weight |

### D. The proof/outputs layer — most important for an automation org

| Site | Steal this |
|---|---|
| [n8n.io/workflows](https://n8n.io/workflows/) | **Highest-value reference on this list.** A browsable library of automation templates with node badges, author attribution, and use-case tags. This is exactly what our `/builds` section should feel like. If WorkFlow PH publishes even 8 real workflows, this pattern makes the org look ten times more substantial than any photo gallery. |
| [zapier.com/templates](https://zapier.com/templates) | Filtering by app/integration, card density |
| [github.com/topics/automation](https://github.com/topics/automation) | Minimal repo-card metadata that still communicates activity |

### E. PH-local peers — the bar to clear

| Site | Read |
|---|---|
| [pupmsc.vercel.app/events](https://pupmsc.vercel.app/events) | Clean event listing baseline |
| [devcon.ph](https://devcon.ph/) | The national-scale PH tech org comparison point |

### F. Press kit / brand assets — the cheap credibility win

[vercel.com/design](https://vercel.com/design) · [stripe.com/newsroom/brand-assets](https://stripe.com/newsroom/brand-assets) · [figma.com/brand](https://www.figma.com/brand/)

A `/press-kit` page costs half a day and instantly reads institutional. Almost no PH community org has one. Do it.

## 8. Design direction — decide at kickoff, don't debate mid-sprint

Bring a Figma moodboard to Sep 7 kickoff. One direction gets picked in the first 30 minutes and locked.

Suggested starting point given the audience and the reference set:

- **Photo-led, not illustration-led.** Illustration reads student org. Photography of real rooms with real people reads national org.
- **Dark, near-black canvas** with photos as the only saturated colour. Makes mixed-quality photography look intentional and unifies inconsistent source material. This is the single highest-leverage choice given that our photos come from many different phones and cameras.
- **One accent colour** pulled from the WorkFlow PH logo, used only for interactive states and stats.
- **Two typefaces max**, both variable, self-hosted. A high-contrast display face for headlines and event titles, a neutral grotesque for body.
- **Motion budget:** entrance fades, image scale-on-hover, one signature scroll moment on the homepage. Nothing else. Every animation must honour `prefers-reduced-motion`.
- **Grid:** 12-col desktop, asymmetric showcase grid (mixed card sizes) so the page has rhythm instead of looking like a spreadsheet.

### Deliberate anti-goals

- No stock photography, ever. Real photos or designed fallback cards.
- No generic hero video that takes 8 MB to say nothing.
- No mascot-first identity.
- No carousel on the homepage.
- No "Lorem ipsum" surviving into a PR.
