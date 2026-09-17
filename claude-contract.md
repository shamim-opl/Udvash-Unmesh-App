---
created: 2026-09-15
updated: 2026-09-15
type: reference
status: draft
tags: [udvash-unmesh, app, claude-contract]
---

# Working Contract: Udvash-Unmesh Online Care App

## What this project is

A React + Next.js (TypeScript) conversion of the existing Udvash-Unmesh-Uttoron marketing
website into a mobile-first app/web-app. This is a separate product from Guardian Portal
(guardian-facing academic data) and from the live Student Portal (logged-in student data).
It covers the **public-facing / enrollment side**: splash, login, home, branches, trial/free
course browsing by class and subject, video playback, and programs (courses) listing with
filters.

- **Design source of truth**: `reference/App-draft.pdf` (11-screen visual draft, single tall
  canvas, sliced into `reference/pdf-draft-slices/slice_01.png` … `slice_08.png`). Layout,
  spacing, hierarchy, component shapes, colors as shown in the PDF are followed closely and
  not redesigned.
- **Content source of truth**: the existing website at
  `../udvash-unmesh-uttoron_website/` (homepage.html, branches.html, program-list.html,
  program-detail.html, login.html, tokens.md, context.md, assets/). Real branch names,
  program titles, categories, and copy come from there, not invented.
- **Conflict rule**: design conflict → PDF wins. Content conflict → website wins.

## Process note

Per the workspace's default process (see root `principles/claude-contract.md` and the skill
chain in the root `CLAUDE.md`), new client-facing work normally goes through `/grill-me` and
`/design-brief` before UI work starts. Morshed explicitly asked to skip that here and go
straight to scaffolding, since the brief arrived pre-written in his own detailed instructions
(see the original prompt, reproduced in full at `reference/original-brief.md`). Treat that
file as the design brief for this project.

## Screen inventory (from the PDF)

1. Splash screen
2. Login screen — 4 variants shown (illustration / image-background / minimal / card style)
3. Onboarding, 5 steps: OTP verification → Name → Gender → Class → Location → Success
4. Home — hero banner, "আপনার জন্য" (trial/free courses, programs), bottom nav (Branches / Home / Login)
5. Branches — nearest branch card, division list (Dhaka, Chattogram, Rajshahi, Khulna, Barishal, Sylhet, …), search
6. Trial/Free Courses — class picker (5–12) → subject list per class → free class video list → video player screen
7. Programs — search/filter, All/HSC/Admission/Academic/Skill tabs, 4 listing-layout variants (card grid / list / filter+categories / advanced filter panel), plus additional screens: program search, program detail (tabs: Overview/Features/Syllabus/Branches), programs list, empty state

## Open items still needing Morshed's call

- **Variant selection**: several screens have multiple visual variants in the PDF (login: 4
  variants; programs listing: 4 variants). Per his instruction, each variant choice is
  presented to him individually before that screen is built — not decided by Claude.
- **Auth backend**: the website's `login.html` today may be static/marketing only. Phone+OTP
  and Google sign-in appear in the PDF login variants; whether either is wired to a real
  backend or needs to be mocked/stubbed is unconfirmed until checked against the Student
  Portal FRS / backend availability.
- **Data source for programs/branches at runtime**: whether this app calls a live API, scrapes
  static content into local JSON, or is API-less for now (static/demo) needs a decision before
  the Programs and Branches screens are wired beyond static content.

## Always (inherited + project-specific)

- Follow the PDF's layout/spacing/hierarchy exactly; do not reinterpret it as a "better" design.
- Reuse real website content (branch names, program titles, categories) instead of placeholder text.
- Floor device: mid-range Android phone on 3G/4G (per root defaults) — build mobile-first, test at ~375–400px width.
- Bangla and English both appear on screen, sometimes mixed; keep Bangla text exactly as shown in the PDF/website rather than re-translating.
- No unnecessary animation, no invented components beyond what the PDF shows.

## Never

- Never redesign the PDF's layout "to make it better."
- Never copy the existing website's HTML/CSS UI structure — it's a content source only.
- Never invent programs, branches, or course data not present on the existing website.

## Mine to decide (Morshed's)

- Which variant to build per screen where the PDF shows multiple options.
- Whether auth/API integration is live, mocked, or deferred.
- Final visual QA against the PDF.
