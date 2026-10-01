# SPINE pointer

This project uses **SPINE** (Structured Project Intelligence Engine) via a
zero-footprint pointer. SPINE rules are not duplicated here. Fetch the canonical
engine at session start and follow it.

**Pinned engine:** SPINE 0.2.0
**Source repo:** https://github.com/slvdrvncntjvr/spine
**Tag:** v0.2.0
**local_fallback:** `C:/Users/Vincent/spine`

## How to operate SPINE in this repo

1. **Session start — read the engine.** Resolve in this order, stop at first hit:
   - `$SPINE_HOME/AGENTS.md` if the `SPINE_HOME` env var is set
   - `C:/Users/Vincent/spine/AGENTS.md` (local_fallback above)
   - `~/.spine/engine/AGENTS.md`
   - `https://raw.githubusercontent.com/slvdrvncntjvr/spine/v0.2.0/AGENTS.md`

   Local first is deliberate. Do not make a network call the precondition for
   doing any work. If all four fail, say so and stop rather than improvising a
   doc format.

2. **Templates on demand.** When a trigger phrase matches a document type, read
   `<resolved root>/templates/<CODE>_Template.md`. Read the
   `> **Agent Instructions**` blockquote before writing anything.

3. **Validate after generating.**
   `python <resolved root>/scripts/check.py docs/` (add `--strict` for CI).

4. **Cockpit.** Only on explicit request:
   `python <resolved root>/scripts/cockpit.py .` → writes `cockpit.html` at the
   repo root. Generated artifact; it is in `.gitignore`.

5. **Output location.** `docs/index.md` plus `docs/<code>-<slug>.md`. Stamp
   "Built on SPINE 0.2.0" into `docs/index.md`.

## Project-specific rules

<!-- Add repo-specific conventions below. The engine defers to this section for
     repo-specific matters (stack, commands, branch policy) but not for the
     Hard Rules in engine §8. -->

_None yet._
