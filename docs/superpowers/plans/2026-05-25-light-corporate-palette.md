# Light Corporate Palette Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the existing Jeffrey Suffian homepage and shared colour system from dark navy/gold to a lighter, more approachable corporate palette based on the logo accents.

**Architecture:** Keep the React route structure and homepage sections unchanged. Update Tailwind theme tokens in `src/index.css`, then adjust key classes in `src/App.tsx` so the header, hero, trust strip, CTA bands, cards and icon badges feel brighter while preserving professional audit-firm credibility.

**Tech Stack:** Vite, React, Tailwind CSS v4, Node assertion tests.

---

### Task 1: Palette Guard

**Files:**
- Modify: `tests/homepage-content.test.mjs`

- [ ] **Step 1: Write the failing test**

Add assertions that require `src/index.css` to expose `--color-signature-yellow` and `--color-signature-red`, and require `src/App.tsx` to use `brand-accent-strip` plus a light hero background class.

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/homepage-content.test.mjs`
Expected: FAIL because the new palette tokens and light hero class do not exist yet.

### Task 2: Theme Tokens

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Update tokens**

Set `obsidian`, `navy`, `charcoal`, `ivory`, `champagne`, `goldline`, `signature-yellow`, `signature-red`, and `paper` to support a light corporate palette.

- [ ] **Step 2: Run tests**

Run: `node tests/homepage-content.test.mjs`
Expected: still FAIL until app classes are updated.

### Task 3: Homepage Visual Refresh

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Update classes**

Lighten header, hero, trust strip, final CTA section, service cards, icon badges and footer. Add a small logo-colour accent strip using red/yellow/black.

- [ ] **Step 2: Run verification**

Run:
`node tests/homepage-content.test.mjs`
`node tests/site-foundation.test.mjs`
`npm run lint`
`npm run build`

Expected: all commands exit 0.

### Task 4: Commit and Deploy

**Files:**
- Commit modified files.

- [ ] **Step 1: Commit**

Run:
`git add src/App.tsx src/index.css tests/homepage-content.test.mjs docs/superpowers/plans/2026-05-25-light-corporate-palette.md`
`git commit -m "style: refresh light corporate palette"`

- [ ] **Step 2: Deploy**

Run: `git push && vercel --prod --yes`

- [ ] **Step 3: Verify live**

Check `https://jeffrey-suffian-website.vercel.app/` returns 200 and production JS/CSS contains the new palette markers.
