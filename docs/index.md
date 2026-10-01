---
spine_type: INDEX
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

# Documentation Index: WorkFlow PH

**Project slug:** `workflow-ph`
**Tier:** 2 (Application)
**Maintained by:** slvdrvncntjvr

Built on SPINE 0.2.0

---

## 1. Document Suite

| Document | File | Version | Status | Updated | Reconciled |
|----------|------|---------|--------|---------|------------|
| IDEA · Idea Brief | [idea-workflow-ph.md](idea-workflow-ph.md) | 0.1 | Draft | 2026-10-01 | 2026-10-01 |
| BUILD · Build Guide | [build-workflow-ph.md](build-workflow-ph.md) | 0.1 | Draft | 2026-10-01 | 2026-10-01 |
| PRD · Product Requirements | [prd-workflow-ph.md](prd-workflow-ph.md) | 0.1 | Draft | 2026-10-01 | 2026-10-01 |
| SDD · System Design | [sdd-workflow-ph.md](sdd-workflow-ph.md) | 0.1 | Draft | 2026-10-01 | 2026-10-01 |
| QAD · QA & Test Plan | n/a | n/a | N/A (tier 2; deferred to tier 3) | n/a | n/a |
| OPS · Ops & Observability | n/a | n/a | N/A (tier 2; deferred to tier 3) | n/a | n/a |
| LOG · Session Log | [log-workflow-ph.md](log-workflow-ph.md) | 0.1 | Draft | 2026-10-01 | 2026-10-01 |

**Materialized at repo root (not in `docs/`):** README.md, AGENTS.md (SPINE pointer), CLAUDE.md, GEMINI.md

### 1.1 RFCs

None. No non-obvious feature in this suite currently warrants a deep-design RFC.

---

## 2. Change Log

Change records against `Locked` documents. See engine §7.3.

| CR ID | Date | Summary | Trigger doc | Docs touched | File |
|-------|------|---------|-------------|--------------|------|
| none | | No CRs this session | | | |

---

## 3. Traceability Matrix

Every Must-Have feature, from requirement through design to test. A `no` in any
column on a Must-Have row is a gap; report it rather than quietly filling it.

| PRD-F# | Feature | Priority | In SDD | In QAD | In RFC |
|--------|---------|----------|--------|--------|--------|
| PRD-F1 | Event showcase and verifiable record | Must-Have | yes | no | N/A |
| PRD-F2 | Open builds and template outputs | Must-Have | yes | no | N/A |
| PRD-F3 | People roster with verification rule | Must-Have | yes | no | N/A |
| PRD-F4 | About story and program record | Must-Have | yes | no | N/A |
| PRD-F5 | Partners and collaboration record | Must-Have | yes | no | N/A |
| PRD-F6 | Volunteer join path | Must-Have | yes | no | N/A |

---

## 4. Incident Log

| PM ID | Date | Severity | Summary | Actions closed | File |
|-------|------|----------|---------|----------------|------|
| none | | | | | |

---

## 5. Health Check

- [ ] Every `Locked` doc's `reconciled` date is newer than the last code change in its area
- [ ] No doc has sat in `Draft` past its expected movement date
- [ ] Every open change record has propagated downstream
- [ ] Every feature ID referenced by SDD, RFC, or QAD still exists in the PRD
- [ ] §3 Traceability Matrix covers every Must-Have
- [ ] Validator green (`python $SPINE_HOME/scripts/check.py docs/`)
- [ ] No secrets committed in `docs/`

---

## 6. Notes

- Tier 2 bootstrap on 2026-10-01. All six tier-2 docs are Draft; nothing is Locked yet.
- QAD/OPS are N/A by tier choice, not by oversight. The `no` entries in the QAD column above are the honest gap that records this.
- Code already exists in the repo (site was built before docs). If the owner wants a retrofit firewall (inventory vs. intent), say so and the suite moves to engine §7.6; until then these docs describe intended behavior grounded in the repo README and data files, with gaps marked TBD(owner).
- Branch and URL policy confirmed 2026-10-01 (`main` = production, `dev` = staging previews, vercel.app canonical; SITE_URL switched in code). Jem batch (thoughts + Astro reference in `jem/`) distilled into LOG Q4, Q6, Q15–Q18; one consistent update when answers land. Poster strip direction approved (current theme, no redesign).
- Open TBD items live in IDEA §7, PRD §7, SDD §8, and LOG §2.
