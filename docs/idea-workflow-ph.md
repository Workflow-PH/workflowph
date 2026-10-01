---
spine_type: IDEA
spine_version: 0.2.0
project: WorkFlow PH
slug: workflow-ph
doc_version: 0.1
status: Draft
owner: slvdrvncntjvr
created: 2026-10-01
updated: 2026-10-01
reconciled: 2026-10-01
---

# Idea Brief: WorkFlow PH

---

## 1. One-line summary

A volunteer-run community teaching automation and AI literacy across the Philippines, with its work published on the record so anyone can verify it.

## 2. The problem

Automation education in the Philippines is scattered: isolated tutorials, no shared practice space, and no public record of who built what. Learners cannot tell what is real, volunteers get no durable credit for their work, and small teams have no open templates to reuse.

The current workaround is word-of-mouth and closed chat threads: event photos stay on personal phones, attendance numbers get estimated from memory, and workshop outputs never become reusable templates. That costs trust (claims cannot be checked), continuity (knowledge leaves with whoever organized the night), and reach (students outside Manila get nothing).

## 3. Who it is for

| User | What they need | How they work around it today |
|------|----------------|-------------------------------|
| Students and career shifters | A first working automation and a path into automation-powered roles | Scattered free tutorials with no mentor and no proof of learning |
| VAs, freelancers, BPO and marketing operators | Automations for the repetitive work they already sell | Manual repetition, or fragile flows copied from unverified videos |
| Technical builders (cloud, data, security, dev, QA) | Peers to build with and real problems to practice on | Solo side projects that never ship or get reviewed |
| Schools and partner organizations | A credible community to teach with and hire from | One-off talks with no follow-through record |
| Volunteers and organizers | Credit for work done and a playbook for running the next event | Private spreadsheets and chat history that nobody else can audit |

## 4. Out of scope

Explicit non-goals. Anything listed here must not appear in the PRD, the SDD, or
the code without a change record.

- No paid courses, certificates, or paywalled content. The community teaches in the open.
- No job board or hiring pipeline inside the site. Partnerships may link outward to hiring, but matching and placement are not site features.
- No user accounts, logins, or member dashboards. The site is a public record, not an app.
- No e-commerce, donations, or payment collection on the site.
- No estimated or rounded-up impact numbers. Unknown counts render as TBC until verified.
- No unverified people on the public roster. Names stay pending until confirmed.
- No traced or recreated partner logos. A logo slot stays empty until the partner supplies artwork.
- No visual restyle of the shipped design. Polish and content only, unless the owner approves a change.
- No new motion or layout system beyond what already ships, without owner approval.

## 5. Success looks like

Observable outcomes, not features. "A solver can verify a flag in under a second"
rather than "add a verify endpoint."

- A stranger can open any listed event and see what happened there: date, venue, role, photos, and who did the work.
- Every published number is either sourced or honestly marked TBC; nothing on the site is an estimate presented as fact.
- A builder in any province can fork an open template and run it the same day without asking anyone for access.
- A volunteer who ran an event finds their name on that event's record.
- A partner can explain in one sentence what working with the community got them, with the co-created work still public afterward.
- A journalist can lift boilerplate copy, colors, and logos from the press kit without emailing anyone.

## 6. Constraints

| Kind | Constraint | Source |
|------|-----------|--------|
| Time | Volunteers give 2–4 hrs/week, async-first; on-site days are optional | lib/data/site.ts volunteerTerms |
| Platform | Public website only; no accounts, no backend for members | Owner direction (site is a record, not an app) |
| Cost | Volunteer-run; no paid content or payments on the site | Community purpose (community_overview.txt) |
| Content | Photos must exist under public/; numbers must be sourced or TBC; people pending until verified; partner logos only from supplied artwork | README.md content rules |
| Design | Shipped design is final; polish and content only without approval | README.md design rule |

## 7. Open questions

Questions blocking downstream docs. Mirror each into `LOG`.
- `TBD(owner)` Which numbers are allowed to be published as verified (events run, builders reached, partner orgs), and who signs them off? Note: assets PR #33 now targets `dev` — numbers stay open until the records land.

Resolved 2026-10-01: roster verification is the Community Lead's internal sign-off (not displayed on the site); everything currently live stays live, and gaps are flagged and fixed iteratively — no pre-publication evidence gate.
