---
spine_type: PRD
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

# Product Requirements: WorkFlow PH

**IDEA:** [idea-workflow-ph.md](idea-workflow-ph.md)

---

## 1. Scope statement

This release is the public record site for WorkFlow PH: every event on record, the open builds it produced, the people who did the work, and the paths to join or partner. Anything that is not published fact — accounts, payments, hiring, courses — is out of scope.

## 2. Users

| User | Goal | Priority |
|------|------|----------|
| First-time visitor | Understand what WorkFlow PH is and whether it is real, in under a minute | Must-Have |
| Builder (student, VA, engineer) | Find an event record or an open template they can reuse | Must-Have |
| Volunteer / organizer | Get credited and find a lane to help in | Must-Have |
| Partner (school, company, community) | Judge whether to teach or collaborate with the community | Must-Have |
| Press / researcher | Lift correct boilerplate, numbers, colors, and logos | Should-Have |

## 3. Features

| ID | Feature | Priority | Description |
|----|---------|----------|-------------|
| PRD-F1 | Event showcase and verifiable record | Must-Have | Public list of events plus one page per event with date, venue, role, recap, outcomes, numbers, people, outputs, links, and photos |
| PRD-F2 | Open builds and template outputs | Must-Have | Public list of community outputs (template library, playbooks, walkthroughs) with status, stack, origin, and credits |
| PRD-F3 | People roster with verification rule | Must-Have | Public roster of core team; only verified members listed; pending profiles never published as real. Verification is the Community Lead's internal sign-off and is not displayed on the site. |
| PRD-F4 | About story and program record | Must-Have | The origin story, activities, beliefs, tracks, vision, history, and long-term goals |
| PRD-F5 | Partners and collaboration record | Must-Have | Partner list with tier and tenure, reasons to partner, and a contact path |
| PRD-F6 | Volunteer join path | Must-Have | Contribution lanes, volunteer terms (2–4 hrs/week, async-first), and an email contact path |
| PRD-F7 | Press kit | Should-Have | Downloadable logos, brand colors, typefaces, usage rules, and short/long boilerplate |
| PRD-F8 | SEO, sharing, and discoverability | Should-Have | Canonical URLs, per-page metadata, OG images, sitemap, robots, and legacy `/events` redirects |

Priority vocabulary: `Must-Have`, `Should-Have`, `Could-Have`, `Dropped`.
Only Must-Have features are required in the traceability matrix.

### 3.1 Acceptance criteria

One block per feature. Every Must-Have needs criteria before it can be locked.

**PRD-F1 — Event showcase and verifiable record**
- Given the showcase page, when a visitor opens it, then they see every event in `lib/data/events.ts` newest-first with title, date, and kind/city meta.
- Given an event with unknown numbers, when its page renders, then those numbers show `TBC` and no estimated figure appears.
- Given an event page, when its `photos[].src` entries are checked, then every file exists under `public/`.
- Given an unknown event slug, when visited at `/showcase/<slug>`, then the site returns its not-found page.

**PRD-F2 — Open builds and template outputs**
- Given the builds page, when a visitor opens it, then they see every output in `lib/data/outputs.ts` with name, status, stack, and what it does.
- Given an output with `status: planned`, when rendered, then it is labeled as planned and not presented as shipped.

**PRD-F3 — People roster with verification rule**
- Given the people page, when a visitor opens it, then only core and volunteer groups from `lib/data/people.ts` are listed (partner-org speakers stay on event pages).
- Given a person still pending verification, when the roster renders, then no stand-in profile is presented as a verified member.

**PRD-F4 — About story and program record**
- Given the about page, when a visitor opens it, then they find activities, beliefs, tracks, vision, history, and long-term goals matching `lib/data/site.ts`.
- Given the home page, when a visitor opens it, then published stats show only verified values; the pending volunteer count is withheld with its note.

**PRD-F5 — Partners and collaboration record**
- Given the partners page, when a visitor opens it, then every partner in `lib/data/partners.ts` appears with tier and tenure, plus reasons to partner and a contact email link.
- Given a partner without supplied artwork, when rendered, then no traced or placeholder logo appears in the logo slot.

**PRD-F6 — Volunteer join path**
- Given the join page, when a visitor opens it, then they see contribution lanes, the 2–4 hrs/week async-first terms, and a working email contact link.
- Given the contact link, when clicked, then it opens a mail to the published community address with a volunteer subject.

**PRD-F7 — Press kit**
- Given the press-kit page, when a journalist opens it, then logos are downloadable as supplied, colors show hex values, and short/long boilerplate is copyable.
- Given the brand rules, when read, then they state the name is written "WorkFlow PH" and the gradient is never recolored or flattened.

**PRD-F8 — SEO, sharing, and discoverability**
- Given any page, when shared, then it carries a canonical URL, title, description, and OG image.
- Given `/events` or `/events/<slug>`, when visited, then the visitor lands on the matching `/showcase` URL via permanent redirect.
- Given `/sitemap.xml` and `/robots.txt`, when fetched, then they list the canonical routes plus one URL per event.

## 4. Explicit exclusions

Carried forward from `IDEA` §4, plus anything cut during requirements.

| Excluded | Why | Revisit when |
|----------|-----|--------------|
| Paid courses or certificates | Community teaches in the open; not a school | Owner decides to sell education |
| Job board or placement flow | Site is a record, not a hiring app | Owner charters a hiring product with its own PRD |
| Accounts, logins, dashboards | No member app exists | Owner funds and scopes an app tier |
| Payments or donations on site | Volunteer-run; no commerce surface | Owner adds a fiscal host and a tier-3 OPS plan |
| Estimated impact numbers | Estimates presented as fact destroy trust | A number is sourced and signed off |
| Unverified people on the roster | Stand-ins published as real mislead | Roster is verified and consent confirmed |
| Traced or placeholder partner logos | Misrepresents partners | Partner supplies artwork |
| Restyles, new motion, layout changes | Design is final per repo rule | Owner approves a design change record |

## 5. Metrics

| ID | Metric | Target | How measured |
|----|--------|--------|--------------|
| WORKFLOW-PH-M1 | Events on record with verifiable evidence | TBD(owner) | Count of event records carrying recap/outcomes, photos, people, sourced numbers, and working links (see `evidenceFor` in lib/data/events.ts) |
| WORKFLOW-PH-M2 | Published numbers are sourced or TBC | 100% of numbers | Audit of `lib/data/events.ts` and `lib/data/site.ts`: every value is either sourced or null/TBC |
| WORKFLOW-PH-M3 | Media files resolve | 100% of `photos[].src` | Every referenced file exists under `public/` |
| WORKFLOW-PH-M4 | Contact paths work | 100% of mail links | Partners and join pages produce a correct mailto link |

## 6. Candidates (not decided)

Ideas raised but not accepted. Nothing here may be implemented.

| Candidate | Raised by | Notes |
|-----------|-----------|-------|
| Event search and filters | TBD(owner) | Useful once the record grows past dozens of events; not in this release |
| Per-output detail pages | TBD(owner) | Template library may need its own pages later; today it is a list |
| Newsletter or announcements feed | TBD(owner) | Would need an owner, a cadence, and a tier-3 OPS story first |
| QAD test plan and OPS runbooks | Bootstrap | Correctly deferred: tier 3 adds QAD and OPS |

## 7. Open questions

- `TBD(owner)` Stats sign-off: corrected to 6 events / 500+ builders / 10 partners per the Community Lead (thoughts.md) and applied site-wide. Flag for review: the record list now holds 23 entries (8 confirmed + 15 lorem-first stubs), so the review must confirm what "6 events run" counts.
- `TBD(owner)` Press kit: keep the page or drop it? If kept, its boilerplate numbers must match the verified stats before they are quoted publicly.
