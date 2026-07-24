---
name: design-review
description: Use before making any significant visual/design change to this site (new palette, typography, layout rework, restyling a section, adding animations). Forces diagnosing at least 3 concrete design problems in the current state before proposing any fix — never jump straight to "make it more modern" or "add some personality".
---

# Design review

This site (Garage Martin) already looks "correct" — the risk is proposing changes based on vague dissatisfaction ("ça manque de style", "pas assez moderne") instead of a real diagnosis. This skill forces the diagnosis first.

## Step 1 — Diagnose: at least 3 concrete problems

Look at the actual current files (`index.html`, `css/style.css`) and list **at least 3** problems. Each one must have:

- **Where**: the exact file/selector/section (e.g. `.btn-call` in `css/style.css`, the hero section in `index.html`).
- **What, concretely**: the current value or behavior (e.g. "all headings use the system sans stack with no distinct display face", "hero and services section have identical spacing rhythm, no visual hierarchy between sections", "no hover/scroll motion anywhere on the page — every state is static").
- **Why it actually hurts**: name the specific quality it undermines — trust, legibility, perceived modernity, brand personality, mobile usability — and how, not just "it's ugly".

Reject and rewrite any problem statement that could apply to literally any website. If you can't point to a specific file/selector/section, it isn't a real finding yet — keep looking.

## Step 2 — Map fixes 1:1 to problems

For each diagnosed problem, propose one concrete, specific fix (a real font pairing, a real color value, a specific layout change). Do not add extra changes that don't trace back to a diagnosed problem — no free-floating "let's also add X" unless it fixes one of the 3+ findings.

## Step 3 — Present before implementing

Present the findings and matched fixes as a short table or list (Problem → Why it hurts → Fix) and get a read from the user before touching CSS/HTML, unless they've already explicitly approved the direction.
