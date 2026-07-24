# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This repository currently contains only `brief.md`, the project specification. No site code exists yet. When implementation starts, this file should be updated with actual build/lint/test commands and real architecture notes once the file structure exists.

## Project

Site vitrine (showcase website) for "Garage Martin", a local car repair shop with no current online presence. Goal: make visitors want to call/book an appointment, and reassure them the garage is trustworthy. Full spec is in `brief.md` — read it before starting work.

## Hard constraints (from brief.md)

- **No framework** — vanilla HTML/CSS/JS only.
- **Mobile-first responsive** — ~90% of the target audience searches "garage près de moi" from a phone.
- **Basic SEO** — meta title/description tags, semantic structure (`header`/`nav`/`main`/`footer`), exactly one `<h1>` per page.
- **Phone number must be tap-to-call** on mobile (`tel:` link).
- **Sober, reassuring color palette** — no flashy colors; the visual tone is "trusted craftsman," not a modern startup.

## V1 feature scope

1. Homepage: garage name, short tagline, hero visual, prominent "Appeler" (Call) button.
2. Services list (vidange, révision, pneus, diagnostic, carrosserie, etc.) with short descriptions.
3. "À propos" section: artisan bio, years of experience, certifications.
4. Customer reviews (3-4 fictitious testimonials for the mockup).
5. Opening hours + address + embedded Google Maps.
6. Simple contact form (name, phone, message).
7. Social links (Facebook, Google reviews).

Treat this list as the scope boundary for V1 — don't add features beyond it without checking with the user first.
