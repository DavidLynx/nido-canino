# Workflow — Landing Page Sprint

## Purpose

This workflow helps Lynx Visual Division create a conversion-focused landing page with strong visual direction, clear UX, responsive implementation, SEO basics, and production readiness.

Use this workflow for:

- service landing pages
- product launch pages
- creator offer pages
- campaign pages
- waitlist pages
- event pages
- local business lead pages
- portfolio landing pages

The goal is not only to make the page look good.

The goal is to make the page:

- clear
- useful
- visually aligned
- fast
- accessible
- persuasive
- easy to maintain
- easy to deploy
- valuable as a portfolio piece

---

## Recommended Tools

Use:

- ChatGPT for strategy, structure, copy, design direction, and prompts
- VS Code for manual one-file edits
- GitHub Copilot for small code edits
- Codex for multi-file implementation
- Open Design when exploring visual directions or design systems
- Vercel for deployment

---

## Recommended Agents

### Full Team

Use for serious landing pages:

1. UX Researcher
2. Content Creator
3. Brand Guardian
4. UI Designer
5. UX Architect
6. Frontend Developer
7. SEO Specialist
8. Growth Hacker
9. Accessibility Auditor
10. Performance Benchmarker
11. Reality Checker
12. Git Workflow Master

### Fast Team

Use for quick pages:

1. Content Creator
2. UI Designer
3. UX Architect
4. Frontend Developer
5. Growth Hacker
6. Reality Checker

### Minimal Team

Use for small edits:

1. UI Designer
2. Frontend Developer
3. Reality Checker

---

## Input Required

Before starting, fill:

```txt
templates/landing-page-brief.md
At minimum, define:

client / brand
target user
offer
primary CTA
design mode
language
target market
required sections
visual references
technical stack
deployment target

If the brief is incomplete, start with assumptions clearly marked.

Phase 1 — Classification
Goal

Understand what kind of landing page is needed.

Questions

Answer:

Is this for a real client, portfolio demo, internal project, or product launch?
Is the main goal leads, sales, bookings, email capture, or portfolio presentation?
Is the audience local, international, niche, premium, technical, or mass-market?
Does the page need SEO?
Does the page need bilingual content?
Does the page need a form, WhatsApp link, booking link, or payment link?
Does it belong in an existing project or a new project?
Output

Create:

Landing Page Classification

Include:

landing page type
business goal
target user
conversion action
recommended stack
recommended agent team
execution mode
Phase 2 — Research and Positioning
Goal

Define the user, the offer, and the competitive angle.

Agents

Use:

UX Researcher
Growth Hacker
Brand Guardian
Tasks

Research or define:

target audience
user pain points
business context
competitors or visual references
trust requirements
conversion barriers
offer clarity
differentiator
tone of voice
Output

Create a short research brief:

## Research Brief

### Target User

### User Problem

### Desired Outcome

### Offer

### Differentiator

### Main Objection

### Trust Elements Needed

### Competitor / Reference Notes

### Positioning Sentence
For [target user], [offer] helps [desired outcome] through [main differentiator].
Quality Rule

Do not move to copy or design until the value proposition is understandable in one sentence.

Phase 3 — Page Strategy
Goal

Define the section structure and user path.

Agents

Use:

UX Architect
Growth Hacker
Content Creator
Default Landing Page Structure

Use this as a starting point:

Hero
Problem
Solution / Offer
Benefits
How It Works
Proof / Trust
Pricing or Packages
FAQ
Final CTA
Footer
Alternative Structures
Simple Service Landing
Hero
Services
Process
Proof
FAQ
Contact CTA
Creator Offer Landing
Hero
Personal positioning
Offer
Results / portfolio
Packages
Testimonials
CTA
Product Landing
Hero
Product value
Features
Use cases
Proof
Pricing
FAQ
CTA
Local Business Lead Page
Hero
Main service
Why trust us
Services
Location / service area
Reviews
Contact / WhatsApp
FAQ
Waitlist Page
Hero
Problem
Product preview
Benefits
Who it is for
Email signup
FAQ
Output

Create:

## Landing Page Structure

### Primary User Path

Entry → Understand value → Trust → Act

### Sections

1. [Section Name]
   - Goal:
   - Content:
   - CTA:
   - Notes:

2. [Section Name]
   - Goal:
   - Content:
   - CTA:
   - Notes:
Quality Rule

Every section must have a reason.

If a section does not improve clarity, trust, or conversion, remove it.

Phase 4 — Copywriting
Goal

Write clear, persuasive, scannable copy.

Agents

Use:

Content Creator
Growth Hacker
Brand Guardian
SEO Specialist if public/search-facing
Copy Requirements

The copy must:

make the value clear quickly
avoid vague buzzwords
use short sections
include strong headings
explain benefits, not only features
answer objections
make the CTA obvious
match the client’s brand voice
support SEO when relevant
support English/Spanish if bilingual
Landing Copy Template
# Landing Page Copy

## Hero

### Eyebrow

[Small contextual phrase]

### Headline

[Clear main promise]

### Subheadline

[Explain what it is, for whom, and why it matters]

### Primary CTA

[CTA label]

### Secondary CTA

[Optional]

---

## Problem

### Heading

[Problem heading]

### Copy

[Explain pain point]

---

## Solution

### Heading

[Solution heading]

### Copy

[Explain offer]

---

## Benefits

### Benefit 1

Title:
Copy:

### Benefit 2

Title:
Copy:

### Benefit 3

Title:
Copy:

---

## How It Works

### Step 1

Title:
Copy:

### Step 2

Title:
Copy:

### Step 3

Title:
Copy:

---

## Proof

[Testimonial, review, client result, portfolio proof, process proof, or placeholder]

---

## Pricing / Packages

[If relevant]

---

## FAQ

### Question 1

Answer:

### Question 2

Answer:

### Question 3

Answer:

---

## Final CTA

### Heading

[Final action heading]

### Copy

[Short closing copy]

### CTA

[CTA label]
Quality Rule

The hero must answer these in under 5 seconds:

What is this?
Who is it for?
Why should I care?
What do I do next?
Phase 5 — Visual Direction
Goal

Define the visual system before implementation.

Agents

Use:

UI Designer
Brand Guardian
UX Architect
Accessibility Auditor
Tasks

Define:

design mode
visual keywords
typography direction
color direction
spacing rhythm
layout behavior
component style
media style
motion level
accessibility risks
anti-patterns
Design Modes

Choose one or combine:

Editorial Premium
Modern SaaS
Creator Economy
Local Business Trust
Cultural / Alternative Brand
Warm Human Brand
Experimental Interactive
Custom
Output

Create:

# Landing Page Visual Direction

## Design Mode

[Selected mode]

## Visual Keywords

- [keyword]
- [keyword]
- [keyword]

## Typography

[Direction]

## Color

[Direction]

## Layout

[Direction]

## Components

[Buttons, cards, forms, sections]

## Motion

[Motion rules]

## Accessibility Notes

[Contrast, focus, readability, reduced motion]

## Anti-Patterns

- [avoid]
- [avoid]
- [avoid]
Quality Rule

The page should feel designed for this specific client, not generated from a generic template.

Phase 6 — UX Architecture
Goal

Convert the strategy and visual direction into an implementable structure.

Agents

Use:

UX Architect
Frontend Developer
UI Designer
Tasks

Define:

page sections
component hierarchy
responsive behavior
layout grid
container system
CTA placement
navigation behavior
form behavior
content hierarchy
reusable components
design tokens if needed
Output

Create:

# Landing Page Implementation Architecture

## Stack

[Next.js / Vite / HTML]

## Route

[Route path]

## Component Structure

- Header
- Hero
- ProblemSection
- OfferSection
- BenefitsGrid
- ProcessSteps
- ProofSection
- PricingSection
- FAQSection
- FinalCTA
- Footer

## Data Structure

[Static content / JSON / CMS / none]

## Responsive Behavior

### Mobile

### Tablet

### Desktop

## Accessibility Requirements

## SEO Requirements

## Performance Requirements
Quality Rule

Do not start coding until the component structure is clear.

Phase 7 — Implementation
Goal

Build the landing page safely.

Agents

Use:

Frontend Developer
UI Designer
UX Architect
Use Codex When

Use Codex if:

the page touches several files
components need to be created
routing/layout/metadata must be updated
responsive CSS needs several changes
SEO metadata must be added
assets must be organized
Use VS Code Manually When

Use manual editing if:

only one markdown file changes
only copy changes
only a small class or style needs to be adjusted
Codex Prompt Template
Read AGENTS.md, agent-index.md, workflow-router.md, and workflows/workflow-landing-page.md first.

Task:
Build or update the landing page for [PROJECT NAME].

Context:
[PASTE PROJECT CONTEXT]

Landing page brief:
[PASTE SUMMARY OR FILE PATH]

Section structure:
[PASTE STRUCTURE]

Copy:
[PASTE COPY OR FILE PATH]

Visual direction:
[PASTE VISUAL DIRECTION]

Technical requirements:
- Stack: [Next.js / Vite / existing]
- Styling: [Tailwind / CSS variables / existing]
- Deployment: Vercel
- Language: [English / Spanish / bilingual]
- SEO: [yes/no/basic/local/bilingual]
- Form/contact: [details]

Primary agents:
- UX Architect
- UI Designer
- Frontend Developer
- SEO Specialist
- Growth Hacker
- Accessibility Auditor
- Reality Checker

Requirements:
- responsive mobile-first layout
- accessible semantic HTML
- clear CTA above the fold
- optimized metadata if applicable
- clean component structure
- no unnecessary dependencies
- no backend unless explicitly required
- preserve existing functionality

Out of scope:
- do not create login
- do not create database
- do not create payment system unless explicitly requested
- do not redesign unrelated pages
- do not change Git history
- do not delete files

Acceptance criteria:
1. The landing page has all required sections.
2. The hero communicates the value clearly.
3. The primary CTA is visible and functional.
4. The page works on mobile, tablet, and desktop.
5. SEO basics are included if relevant.
6. Accessibility basics are respected.
7. No unrelated files are modified.

After finishing, report:
- files read
- files changed
- summary of changes
- assumptions made
- risks or limitations
- commands run
- command results
- manual checks still needed
- recommended next step
Phase 8 — SEO Pass
Goal

Make the page discoverable and shareable.

Agents

Use:

SEO Specialist
Content Creator
Frontend Developer
Check
title
meta description
Open Graph tags
social preview
H1/H2 hierarchy
semantic HTML
image alt text
internal links
local SEO if relevant
bilingual SEO if relevant
structured data if useful
Output

Create:

# SEO Pass

## Metadata

Title:
Description:
OG Title:
OG Description:
OG Image:
Canonical:
Language:

## Heading Structure

H1:
H2s:
H3s:

## Search Intent

Primary query:
Secondary queries:

## Fixes Made

## Remaining SEO Recommendations
Phase 9 — Conversion Review
Goal

Check if the page can realistically convert.

Agents

Use:

Growth Hacker
UX Researcher
Reality Checker
Check
Is the value proposition clear?
Is the CTA visible above the fold?
Is the CTA repeated at logical points?
Is trust established before asking for action?
Are objections answered?
Is pricing clear if relevant?
Is the contact path simple?
Does mobile conversion work?
Is there too much friction?
Are there unnecessary distractions?
Output

Create:

# Conversion Review

## Strengths

## Friction Points

## Top 5 Conversion Improvements

1.
2.
3.
4.
5.

## CTA Recommendation

## A/B Test Ideas

## GO / NO-GO for Conversion
Phase 10 — Accessibility Pass
Goal

Make sure the page is usable by more people.

Agents

Use:

Accessibility Auditor
Frontend Developer
UI Designer
Check
heading order
semantic HTML
button labels
link labels
form labels
focus states
color contrast risks
keyboard navigation
alt text
reduced motion
touch target size
mobile readability
Output

Create:

# Accessibility Review

## Issues Found

### Critical

### Important

### Optional

## Fixes Made

## Manual Checks Needed

## Accessibility Status
Phase 11 — Performance Pass
Goal

Keep the page fast and stable.

Agents

Use:

Performance Benchmarker
Frontend Developer
UI Designer
Check
image sizes
video sizes
font loading
animation cost
unnecessary dependencies
layout shift
lazy loading
excessive JavaScript
mobile performance risks
third-party scripts
Output

Create:

# Performance Review

## Risks Found

## Fixes Made

## Remaining Recommendations

## Manual Tests Needed
Phase 12 — Reality Check
Goal

Decide if the landing page is ready.

Agents

Use:

Reality Checker
UX Architect
Growth Hacker
Accessibility Auditor
Performance Benchmarker
Check
page loads
responsive layout works
CTA works
forms/links work
no broken images
no obvious console errors
copy is clear
SEO basics exist
accessibility basics exist
performance risks are acceptable
project is portfolio-ready if relevant
Output

Create:

# Landing Page Reality Check

## GO / NO-GO

[GO / NO-GO]

## Critical Issues

## Important Issues

## Optional Polish

## Required Fixes Before Deploy

## Recommended Next Step
Phase 13 — Deployment
Goal

Prepare for publishing.

Agents

Use:

Git Workflow Master
Frontend Developer
Reality Checker
Check
build passes
correct root directory
correct build command
correct environment variables
public assets load
routes work
metadata works
deployment platform is clear
Commands

Use depending on project:

git status
npm run build
git add .
git commit -m "Build landing page for [project]"
git push
Vercel Notes

Check:

framework preset
root directory
build command
output directory
environment variables
domain later if needed
Phase 14 — Portfolio Documentation
Goal

Turn the landing page into a portfolio asset.

Agents

Use:

Content Creator
Technical Writer
Brand Guardian
Reality Checker
Use Template
templates/case-study.md
Document
problem
solution
role
stack
design direction
features
SEO/conversion strategy
screenshots
live URL
lessons learned
Quality Rule

Do not claim fake metrics.

If no metrics exist, write:

No verified performance metrics yet.
Final Landing Page Checklist

Before considering the landing page finished, confirm:

 brief completed
 target user defined
 offer is clear
 primary CTA defined
 page structure approved
 copy written
 visual direction defined
 component structure defined
 responsive layout implemented
 SEO basics added
 accessibility basics checked
 performance risks reviewed
 conversion path reviewed
 build passes
 deployment ready
 case study notes captured
Final Rule

A landing page is not finished when it looks good.

It is finished when:

the right user understands it quickly
the offer feels clear
the CTA is obvious
the page works on mobile
trust is established
the implementation is stable
the business goal is supported