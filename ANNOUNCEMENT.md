# Announcement

Two versions: a short one for the group chat, and a longer one for the pinned message or a Notion/Discord announcement channel. Edit names, links, and the domain, then post.

---

## A. Short version — group chat / Discord

> **🚀 Sprint call: WorkFlow PH is getting a real website. Launch Sep 15.**
>
> Right now our entire track record lives in a Facebook feed. A feed proves we're active. A site proves we have a track record — and that's what sponsors, partners, and future volunteers need to see.
>
> **What we're building:** a showcase site — events with real photos and real numbers, the automations we've actually shipped, our people, and our partners. Photo-led, fast, mobile-first.
>
> **The plan:**
> - **Aug 24 – Sep 6** — assets and content. Photos, logos, recaps, numbers. No code yet.
> - **Sep 7 – Sep 13** — one-week build sprint.
> - **Sep 14** — freeze and QA. **Sep 15** — launch.
>
> **We need 6 people:**
> 1. Sprint Lead — keeps the board moving, makes the cut decisions
> 2. **Asset Wrangler** — owns photos and files end to end. Most important role on the team.
> 3. Content Lead — copy, recaps, partner emails
> 4. Designer — direction, tokens, comps
> 5. Dev A — Astro, content layer, showcase pages
> 6. Dev B — homepage, remaining pages, lightbox
>
> **Stack:** Astro 7 + TypeScript + Tailwind 4, deployed on Vercel. Static, no CMS, no backend. Everything is in-repo and documented before Day 1.
>
> **Right now, everyone can help with one thing:** 📸 **dump your original event photos into the Drive folder.** Not the Facebook versions — the ones straight off your phone. Facebook compresses uploads and we need full resolution for hero images. This is the single most useful thing anyone can do today.
>
> Drive folder → `[LINK]`
> Full plan, tickets, and specs → `[REPO LINK]`
>
> Reply with the role you want. Roles close **Wednesday**.

---

## B. Long version — pinned announcement

### WorkFlow PH Website — Sprint Brief

**Launch: September 15, 2026.**

#### Why

WorkFlow PH has real substance — events with named partners like Jia Talent Vault, Echelon Philippines, Tutorials Dojo, and AWS User Group Philippines, plus speakers with serious credentials. All of it currently lives inside a Facebook feed where it's unlinkable, unstructured, and impossible to put in a deck.

We're building a proof surface. One URL a sponsor can open, one page a volunteer can read, one archive that shows what a volunteer-driven automation community in the Philippines has actually built.

#### What it is

A showcase site with four things on it:

1. **Events** — every event we've run, with photos, venue, partners, real attendance numbers, and a short recap
2. **Builds** — the automations, templates, and repos we've actually shipped. This is what makes us more than a photo gallery.
3. **People** — core team, volunteers, and speakers we've platformed
4. **Partners** — who backs us, and how to become one

Plus a press kit, because almost no PH community org has one and it takes half a day.

#### What it is not

No CMS. No login. No member portal. No blog. No API integrations. Those are all real ideas and they're all in the v2 list. Not this sprint.

#### Design direction

Photo-led on a dark canvas. Illustration-led design reads student org; photography of real rooms with real people reads national org. One accent colour, two typefaces, restrained motion.

Reference set to review before kickoff: `creativeimpactinc.com/work` for the metadata-driven work grid, `hackclub.com` for volunteer-org energy done right, `n8n.io/workflows` for how to present automation outputs, and `awsccpup.cloud` as the local bar to clear. Full board with notes in `docs/01-brief-and-references.md`.

#### Timeline

| When | What |
|---|---|
| Aug 24 – Sep 6 | **Pre-sprint.** Assets, copy, design direction, repo scaffold. No production code. |
| Aug 27 | Design direction locked. No relitigating after this. |
| Sep 5 | **Content gate.** We count complete asset kits and set final scope. |
| Sep 7 – Sep 13 | **Build sprint.** Code against finished content. |
| Sep 13, 11:59 PM | Code freeze. Bug fixes only after this. |
| Sep 14 | QA, DNS, previews to speakers and partners. |
| Sep 15 | Launch. |

The reason most one-week sprints fail is that the week gets spent gathering content. That's why the asset work starts two weeks early and why Sep 5 is a hard gate.

#### How we work

Async-first, because everyone has classes and jobs.

- Standup as a text post in one thread by 9 PM PHT. Three lines: shipped / next / blocked.
- Three live calls total, 20 minutes each: Mon Sep 7, Wed Sep 9, Sun Sep 13.
- One ticket in progress per person. Finish before starting.
- Blocked more than four hours? Post it. Don't sit on it overnight.
- Board on GitHub Projects: `Backlog → Ready → In Progress → In Review → Done`.

#### Stack

Astro 7.2.4, TypeScript 7, Tailwind CSS 4.3.3, MDX content collections with Zod validation, sharp for images, Vercel for hosting with a preview deploy on every PR. Static output, no backend.

Astro because this is a content- and image-heavy site with two interactive pieces, and Astro ships zero JS for everything else. That's how we hit our performance targets on Philippine mobile data without doing performance work. Full reasoning in `docs/04-tech-and-standards.md`.

#### Quality bar — CI enforces this, so it isn't negotiable

- Mobile Lighthouse: performance ≥ 90, accessibility ≥ 95
- LCP ≤ 2.5 s on simulated 4G, CLS < 0.1
- ≤ 100 KB of JavaScript on content routes
- Every image has alt text and a photographer credit
- Full keyboard navigation, `prefers-reduced-motion` respected

A PR that drops Lighthouse below the bar fails CI. That's deliberate — it stops the site quietly getting heavier all week.

#### Roles — reply to claim one

| Role | You'll own | Load |
|---|---|---|
| Sprint Lead | Board, unblocking, scope decisions, launch call | ~1 h/day, whole period |
| **Asset Wrangler** | Photos, logos, naming, consent register. The critical path. | Heavy Aug 24 – Sep 6 |
| Content Lead | All copy, the content sheet, recaps, partner emails | Heavy Aug 24 – Sep 6 |
| Designer | Moodboard, locked direction, tokens, comps, OG template | Heavy Aug 31 – Sep 8 |
| Dev A | Scaffold, CI, content layer, showcase index + detail | Sprint week, 5–6 h/day |
| Dev B | Homepage blocks, remaining pages, gallery + lightbox | Sprint week, 5–6 h/day |

Doubling up is fine. Two people on assets would be better than one.

#### Everyone can do this today

📸 **Put your original event photos in the Drive folder.** Camera roll originals, not Facebook downloads — FB re-compresses uploads and we need full resolution for hero images. Wide shots of full rooms, speakers mid-talk, people actually working together, and detail shots.

Please **don't** upload photos with legible badges, ID cards, or laptop screens showing emails or credentials. We'll be checking every photo at 100% zoom, but catching it upstream saves everyone time.

Drive folder → `[LINK]`

#### Everything is already written down

| Doc | What's in it |
|---|---|
| `docs/01-brief-and-references.md` | Goals, audience, positioning, reference board, design direction |
| `docs/02-ia-and-content-model.md` | Sitemap, page anatomy, full Zod schemas |
| `docs/03-asset-playbook.md` | Image specs, naming, folders, consent rules, per-event kit |
| `docs/04-tech-and-standards.md` | Stack, repo layout, tokens, git rules, a11y bar, CI |
| `docs/05-sprint-plan.md` | Day-by-day plan, ceremonies, descope ladder, risks |
| `docs/06-backlog.md` | All 37 tickets with acceptance criteria and estimates |
| `docs/07-launch-checklist.md` | Pre-flight before we point the domain |

Read `01` and `05` before kickoff. Devs also read `02`, `04`, and your tickets in `06`. Non-devs live in `03`.

Repo → `[REPO LINK]`

#### One thing to internalise

**On Sep 13 at 11:59 PM, whatever exists is what launches.** There's a pre-agreed descope ladder in `docs/05-sprint-plan.md` §6 so cutting scope is a checklist item, not an argument. Shipping something real on Sep 15 beats shipping something perfect in November — and we can iterate every week after that.

Let's build. 🇵🇭

---

## C. Role signup — copy into a form or a thread poll

```
Name:
Role you're claiming (1st / 2nd choice):
Realistic hours per day, Sep 7–13:
Days you're fully unavailable:
Experience with Astro / Next / Tailwind (none is fine, say so):
Do you have original photos from past WorkFlow PH events? (y/n)
Can you commit to the Sep 13 freeze?
```

## D. Launch-day post — draft for Sep 15

> **WorkFlow PH is now at [domain]. 🇵🇭**
>
> Everything we've built in one place: [N] events, [N] builders reached, [N] partner organisations, and the automation templates our community has actually shipped.
>
> Built in one week by [N] volunteers. Photos by [names]. Thank you to @Tutorials Dojo, @AWS User Group Philippines, @Jia Talent Vault, and @Echelon Philippines for backing the work.
>
> If you've spoken at, attended, or volunteered for a WorkFlow PH event — you're on it. Go find yourself.
>
> Want to partner with us or volunteer? Both links are on the site.
>
> → [domain]
