# Lynx AI System — Codex Prompt Library

## Purpose

This file contains reusable Codex prompts for Lynx Visual Division projects.

Use these prompts when a task requires multi-file edits, project-wide understanding, refactors, implementation, QA, deployment preparation, or structured code work.

For small one-file edits, do not use Codex. Use ChatGPT + VS Code manually.

---

## General Rules for Codex

Before using any prompt, Codex should follow these rules:

1. Read `AGENTS.md`.
2. Read `agent-index.md`.
3. Read `workflow-router.md`.
4. Use only the relevant active agents.
5. Do not modify unrelated files.
6. Do not create unnecessary files.
7. Do not install dependencies unless explicitly asked.
8. Do not initialize Git unless explicitly asked.
9. Do not delete files unless explicitly asked.
10. Preserve existing working functionality.
11. Make small, controlled changes.
12. Summarize changed files at the end.
13. Report risks, assumptions, and missing context.
14. If the task is unclear, ask before making large changes.

---

# 1. Project Inspection

Use this when opening an existing project for the first time.

```txt
Read this project and create a concise technical overview.

Follow these instructions:

1. Read AGENTS.md if it exists.
2. Inspect the folder structure.
3. Read package.json if present.
4. Identify the stack.
5. Identify the main app/page entry points.
6. Identify styling approach.
7. Identify deployment assumptions.
8. Identify obvious risks or missing files.

Do not modify any files.

Deliver:
- project type
- stack
- folder structure summary
- main files
- how to run locally
- how to build
- likely deployment platform
- risks / warnings
- recommended next steps
2. Safe File Organization

Use this when organizing folders or moving files.

Organize the project files safely.

Rules:
- Do not delete anything.
- Do not rewrite file content unless explicitly instructed.
- Do not rename files unless the match is obvious.
- Create folders only if needed.
- Move or copy files only according to the instructions below.
- Create a report of everything changed.

Task:
[DESCRIBE EXACT ORGANIZATION TASK HERE]

Deliver:
- folders created
- files moved
- files copied
- files skipped
- assumptions made
- issues found
3. Create a New Next.js Project Structure

Use this when starting a serious portfolio, website, or public web app.

Create a clean Next.js project structure for a premium bilingual website/web app.

Context:
Project name: [PROJECT NAME]
Brand: [BRAND NAME]
Project type: [portfolio / landing page / business website / web app]
Primary language: English
Secondary language: Spanish
Deployment: Vercel

Requirements:
- Next.js App Router structure
- TypeScript
- clean component organization
- SEO-friendly metadata structure
- responsive layout foundation
- accessible HTML
- design token foundation
- public assets folder organization
- reusable layout components

Create or update only the necessary files.

Do not install dependencies unless package.json already indicates they are needed.
Do not add authentication.
Do not add database.
Do not add payment logic.
Do not overcomplicate the structure.

Deliver:
- files created/changed
- project structure
- how to run locally
- how to build
- next recommended steps
4. Create a Vite + React Prototype Structure

Use this for quick tools, experiments, small apps, or prototypes.

Create a clean Vite + React prototype structure.

Context:
Project name: [PROJECT NAME]
Purpose: [DESCRIBE PURPOSE]
Target user: [TARGET USER]
Deployment: Vercel or static hosting

Requirements:
- React component structure
- simple routing only if needed
- clean CSS or Tailwind structure depending on current project
- responsive mobile-first layout
- accessible controls
- localStorage only if simple persistence is needed
- no backend unless explicitly required

Do not add login.
Do not add database.
Do not add payment systems.
Do not add unnecessary dependencies.

Deliver:
- files created/changed
- how the prototype works
- how to run locally
- what is intentionally out of scope
5. Apply Lynx Visual Division Design System

Use this when applying the Lynx style to a project.

Apply the Lynx Visual Division design direction to this project.

Before editing:
1. Read AGENTS.md.
2. Read design-systems/lynx-visual-division/DESIGN.md if it exists.
3. Inspect the current UI structure.
4. Identify where the visual system should be applied.

Design direction:
- premium
- editorial
- black and white
- minimal
- interactive
- Swiss-inspired
- luxury fashion meets modern web design
- strong typography
- strong spacing
- high contrast
- subtle motion only when useful

Avoid:
- generic SaaS gradients
- childish icons
- random glassmorphism
- excessive shadows
- cyberpunk unless project-specific
- gaming aesthetics unless project-specific
- heavy animation
- low contrast

Task:
[DESCRIBE WHAT SHOULD BE UPDATED]

Rules:
- Preserve existing functionality.
- Do not rewrite the whole app.
- Update only the necessary components/styles.
- Keep responsive behavior.
- Keep accessibility in mind.
- Do not add new dependencies unless absolutely necessary.

Deliver:
- visual changes made
- files changed
- before/after reasoning
- accessibility notes
- risks or remaining polish items
5A. Brand Identity Project Inspection

Use this when checking whether a website/app is ready for brand identity or logo implementation.

Read AGENTS.md, agent-index.md, workflow-router.md, service-catalog.md, templates/brand-identity-brief.md, and workflows/workflow-brand-identity.md first.

Inspect the current project for brand identity and logo implementation readiness.

Do not modify files.

Check:
- existing logo files
- public assets folder
- favicon files
- app icons
- metadata/social images
- header logo usage
- dark/light logo needs
- CSS/design tokens related to brand
- current typography/color usage
- missing logo formats
- risks for small-size readability

Deliver:
- current identity assets found
- logo implementation status
- missing assets
- risks
- recommended next steps
5B. Apply Logo Assets to Website

Use this when approved logo assets already exist and need to be implemented in a website/app.

Read AGENTS.md, agent-index.md, workflow-router.md, and workflows/workflow-brand-identity.md first.

Task:
Apply provided logo assets to the current website/app.

Assets provided:
[LIST PATHS]

Requirements:
- update header logo usage if needed
- update favicon if provided
- update app/social icon references if relevant
- preserve existing functionality
- keep responsive header behavior
- do not redesign unrelated sections
- do not modify logo artwork itself unless explicitly instructed
- do not add dependencies
- do not delete existing assets unless instructed

Acceptance criteria:
1. Logo appears correctly in intended locations.
2. Favicon is configured if provided.
3. Mobile header remains usable.
4. Dark/light background use is acceptable if relevant.
5. No unrelated UI or logic changes are made.

Deliver:
- files changed
- assets used
- implementation notes
- manual checks needed
5C. Create Client DESIGN.md From Brand Brief

Use this when a completed brand identity brief should become implementation guidance.

Read AGENTS.md, agent-index.md, workflow-router.md, templates/brand-identity-brief.md, and workflows/workflow-brand-identity.md first.

Task:
Create a client-specific DESIGN.md from the completed brand identity brief.

Input:
[PASTE BRIEF OR FILE PATH]

Create:
design-systems/[client-or-project-name]/DESIGN.md

Include:
- brand context
- target user
- business goal
- visual direction
- logo usage
- color system
- typography system
- layout rules
- component rules
- motion rules
- accessibility notes
- SEO/content tone
- anti-patterns
- implementation notes
- quality checklist

Do not modify other files.
5D. Brand Identity Implementation Pass

Use this when an approved identity direction needs to be applied across a website/app.

Read AGENTS.md, agent-index.md, workflow-router.md, service-catalog.md, and workflows/workflow-brand-identity.md first.

Task:
Apply the approved brand identity direction to the current website/app.

Brand identity notes:
[PASTE NOTES OR FILE PATH]

Requirements:
- apply only the approved identity rules
- preserve existing functionality
- update visual tokens only if scoped
- update logo usage only if assets are provided
- keep accessibility and contrast in mind
- keep responsive behavior
- do not redesign unrelated pages
- do not add dependencies
- do not claim trademark/legal clearance

Deliver:
- files read
- files changed
- summary of visual/identity changes
- risks
- manual checks needed
- recommended next step
6. Responsive UI Fix

Use this when desktop looks fine but mobile/tablet is broken.

Fix responsive layout issues in this project.

Problem:
[DESCRIBE RESPONSIVE PROBLEM]

Target devices:
- mobile: 320px–639px
- tablet: 640px–1023px
- desktop: 1024px+

Rules:
- Mobile-first.
- Do not break desktop while fixing mobile.
- Avoid hardcoded heights unless necessary.
- Avoid horizontal scrolling.
- Keep touch targets usable.
- Preserve existing content and functionality.
- Do not redesign unrelated sections.

Check:
- header/navigation
- hero section
- grids
- cards
- forms
- buttons
- media/images
- footer
- spacing rhythm

Deliver:
- files changed
- responsive fixes made
- remaining issues
- recommended manual tests
7. UI Polish Pass

Use this when the app works but does not feel premium.

Perform a controlled UI polish pass.

Context:
The project works, but the interface needs to feel more premium, clear, balanced, and visually intentional.

Focus on:
- spacing
- typography hierarchy
- component consistency
- buttons
- cards
- sections
- visual rhythm
- alignment
- hover/focus states
- empty states if present
- mobile polish

Do not:
- change the product concept
- rewrite all components
- add unnecessary animations
- add new dependencies
- change copy unless needed for clarity
- break existing functionality

Style direction:
[DESCRIBE STYLE DIRECTION]

Deliver:
- visual diagnosis
- changes made
- files changed
- remaining polish suggestions
- risks
8. Landing Page Implementation

Use this when the copy and structure are already defined.

Build or update a landing page using the provided strategy.

Project:
[PROJECT NAME]

Target audience:
[TARGET AUDIENCE]

Offer:
[OFFER]

Sections:
[PASTE SECTION STRUCTURE]

Copy:
[PASTE COPY OR SAY WHERE IT IS STORED]

Visual direction:
[DESCRIBE VISUAL DIRECTION]

Requirements:
- responsive
- fast-loading
- accessible
- SEO-friendly
- CTA above the fold
- clear section hierarchy
- optimized metadata
- clean component structure
- Vercel-ready

Avoid:
- generic layout
- vague CTA
- excessive animation
- large unoptimized images
- unnecessary backend
- fake functionality

Deliver:
- files changed
- section structure created
- components created/updated
- SEO notes
- how to run/build
- remaining tasks
9. Business Website Implementation

Use this for a multi-page or multi-section business website.

Build or update a business website structure.

Business:
[BUSINESS NAME]

Industry:
[INDUSTRY]

Target market:
[TARGET MARKET]

Pages/sections needed:
[LIST PAGES OR SECTIONS]

Brand direction:
[BRAND STYLE]

Requirements:
- clear homepage structure
- services/products section
- trust elements
- contact CTA
- responsive layout
- local SEO structure if relevant
- accessible markup
- fast-loading assets
- easy content editing

Do not:
- create complex backend
- create dashboard
- add auth
- add database unless explicitly required
- add payment system unless scoped

Deliver:
- files changed
- page/section structure
- content placeholders
- SEO structure
- remaining client content needed
10. Interactive Catalog Implementation

Use this for product/service catalog projects.

Create or improve an interactive catalog.

Project:
[PROJECT NAME]

Catalog type:
[products / services / portfolio items / collections]

Data source:
[local JSON / hardcoded data / CMS / existing files]

Catalog needs:
- product/service cards
- category filtering
- search if useful
- product detail view if needed
- CTA per item
- mobile-first browsing
- optimized images
- accessible controls

Brand/storytelling context:
[DESCRIBE BRAND CONTEXT]

Do not:
- create full e-commerce unless explicitly required
- add inventory management
- add complex checkout
- add payment logic without clear scope

Deliver:
- data structure used
- components created/updated
- files changed
- how to add new items
- remaining improvements
11. Web App MVP Implementation

Use this when creating or improving a lightweight app.

Build or improve a lightweight web app MVP.

Project:
[PROJECT NAME]

User problem:
[USER PROBLEM]

Core feature:
[CORE FEATURE]

MVP features:
[LIST ONLY MUST-HAVE FEATURES]

Out of scope:
[LIST WHAT SHOULD NOT BE BUILT]

Stack:
[Next.js / Vite + React / existing stack]

Data persistence:
[none / localStorage / Supabase / other]

Requirements:
- simple onboarding if needed
- clear main user flow
- responsive UI
- accessible controls
- clean state management
- no unnecessary backend
- no unnecessary auth
- no unnecessary dependencies

Deliver:
- user flow implemented
- files changed
- components created/updated
- state/data approach
- manual testing steps
- known limitations
12. Add Bilingual Support

Use this when adding English/Spanish structure.

Add or improve bilingual support for this project.

Languages:
- English as primary
- Spanish as secondary

Requirements:
- preserve current routes if possible
- create a scalable translation structure
- avoid hardcoded repeated text
- keep SEO in mind
- support metadata per language if applicable
- keep UI responsive with longer Spanish text
- do not rewrite unrelated components

Preferred approach:
Use the simplest approach that fits the current project structure.

Task:
[DESCRIBE WHAT NEEDS TO BECOME BILINGUAL]

Deliver:
- translation structure
- files changed
- how to add/edit translations
- SEO notes
- any limitations
13. SEO Pass

Use this before publishing a public site.

Perform an SEO pass on this project.

Context:
Project type: [landing page / business website / portfolio / web app]
Primary market: [USA / UK / Australia / Colombia / etc.]
Primary language: [English / Spanish / bilingual]

Check:
- title metadata
- description metadata
- Open Graph tags
- Twitter/social preview tags
- heading hierarchy
- semantic HTML
- image alt text
- internal links
- robots/sitemap if relevant
- structured data if relevant
- bilingual SEO if relevant

Do not:
- rewrite the entire site
- add fake keywords
- overstuff headings
- make unsupported claims

Deliver:
- SEO issues found
- changes made
- files changed
- remaining recommendations
14. Accessibility Pass

Use this before publishing or after a UI change.

Perform an accessibility pass.

Check:
- semantic HTML
- heading order
- button/link labels
- form labels
- keyboard navigation
- focus states
- color contrast risks
- alt text
- ARIA only when needed
- reduced motion support
- touch target sizes

Rules:
- Fix straightforward issues.
- Do not overuse ARIA.
- Preserve the visual design.
- Do not change unrelated functionality.

Deliver:
- accessibility issues found
- fixes made
- files changed
- remaining manual checks
15. Performance Pass

Use this before deployment or after adding visuals/media.

Perform a performance pass.

Check:
- image optimization
- unused heavy dependencies
- bundle size risks
- animation performance
- lazy loading opportunities
- font loading
- layout shift risks
- large media files
- unnecessary client-side rendering

Rules:
- Do not remove important features.
- Do not change design direction.
- Do not add optimization libraries unless necessary.
- Prefer simple fixes first.

Deliver:
- performance risks found
- fixes made
- files changed
- remaining recommendations
- manual tests to run
16. Reality Check Before Deploy

Use this before pushing/deploying.

Perform a production readiness reality check.

Project:
[PROJECT NAME]

Review:
- Does the app/site run?
- Does the build pass?
- Are main routes working?
- Is the UI responsive?
- Are CTAs visible and functional?
- Are forms safe or clearly placeholder?
- Are there broken links?
- Are there missing images?
- Are there console errors?
- Are SEO basics present?
- Are accessibility basics acceptable?
- Are there obvious performance risks?
- Is the project portfolio-ready?

Rules:
- Do not make changes unless explicitly asked.
- First report findings.
- Separate critical, important, and optional issues.
- Give a GO / NO-GO recommendation.

Deliver:
- GO / NO-GO
- critical issues
- important issues
- optional polish
- suggested next prompt for fixes
17. Fix Build Errors

Use this when npm run build fails.

Fix the build errors in this project.

Instructions:
1. Read the build error carefully.
2. Identify the exact files causing the error.
3. Make the smallest safe fix.
4. Do not refactor unrelated code.
5. Do not change design or features unless required to fix the build.
6. Run the build again if possible.
7. Report what changed.

Build error:
[PASTE FULL ERROR HERE]

Deliver:
- root cause
- files changed
- fix applied
- build result
- remaining warnings
18. Fix Runtime Error

Use this when the browser/app crashes.

Fix this runtime error.

Instructions:
1. Identify the likely cause.
2. Trace the component or function involved.
3. Make the smallest safe fix.
4. Preserve existing functionality.
5. Do not redesign the UI.
6. Do not add dependencies unless required.

Runtime error:
[PASTE ERROR HERE]

Steps to reproduce:
[PASTE STEPS]

Deliver:
- root cause
- files changed
- fix applied
- how to test
- remaining risks
19. Prepare Git Commit

Use this when changes are done and need a clean commit.

Review the current changes and prepare a Git commit summary.

Do not modify files unless you find a critical issue and ask first.

Tasks:
1. Check git status.
2. Summarize changed files.
3. Identify if any generated or unnecessary files should not be committed.
4. Suggest a clear commit message.
5. Provide exact Git commands.

Deliver:
- changed files summary
- files to include
- files to exclude
- commit message
- commands
20. Vercel Deployment Check

Use this when preparing deploy or debugging Vercel.

Check this project for Vercel deployment readiness.

Review:
- package.json scripts
- framework detection
- root directory assumptions
- build command
- output settings
- environment variables needed
- public assets
- routing
- Next.js/Vite config
- common Vercel 404 causes

Do not modify files unless explicitly asked.

Deliver:
- deployment readiness
- likely Vercel settings
- required environment variables
- risks
- exact next steps
21. Convert Finished Project Into Portfolio Case Study

Use this when a project is ready to document.

Create a portfolio case study draft from this project.

Project:
[PROJECT NAME]

Context:
[DESCRIBE WHAT THE PROJECT DOES]

Role:
[YOUR ROLE]

Stack:
[STACK]

Live URL:
[URL]

GitHub:
[URL]

Design direction:
[VISUAL STYLE]

Features:
[LIST FEATURES]

Known limitations:
[LIST LIMITATIONS]

Requirements:
- English first
- Spanish version second if useful
- premium studio tone
- honest claims only
- no fake metrics
- clear problem / solution / outcome structure
- include screenshot checklist

Deliver:
- case study title
- short summary
- problem
- solution
- process
- features
- stack
- outcome
- lessons learned
- screenshot checklist
- portfolio card copy
22. Website Audit for Prospecting

Use this when reviewing a potential client website.

Audit this business website as a potential redesign prospect.

Business:
[BUSINESS NAME]

Website:
[URL]

Industry:
[INDUSTRY]

Location:
[LOCATION]

Target customer:
[IF KNOWN]

Review:
- first impression
- mobile experience
- visual design
- information clarity
- trust signals
- CTA/contact flow
- SEO basics
- performance risks
- accessibility risks
- missed business opportunities

Tone:
Be professional, respectful, and useful.
Do not insult the business.
Do not exaggerate.
Do not claim exact results without evidence.

Deliver:
- quick diagnosis
- top 5 issues
- top 5 opportunities
- recommended offer
- possible scope
- cold outreach email
- shorter LinkedIn/Instagram message
23. Maintenance Plan Creation

Use this when creating a monthly service plan.

Create a website maintenance plan.

Client/project:
[CLIENT OR PROJECT NAME]

Website type:
[landing page / business website / catalog / web app / portfolio]

Current stack:
[STACK]

Monthly needs:
[LIST NEEDS]

Business goal:
[GOAL]

Create:
- monthly maintenance checklist
- what is included
- what is not included
- response time boundaries
- update limits
- reporting format
- optional add-ons
- suggested pricing tiers

Keep the scope realistic and protective.
Avoid unlimited revisions.
Avoid emergency support unless defined as a paid add-on.

Deliver:
- plan structure
- client-facing explanation
- internal checklist
- suggested pricing model
24. Refactor Without Redesign

Use this when code is messy but the UI should stay the same.

Refactor this project without changing the visual design or user-facing behavior.

Focus on:
- removing duplicated code
- improving component structure
- improving naming
- simplifying CSS
- extracting reusable pieces
- improving maintainability
- reducing technical debt

Do not:
- redesign the UI
- change copy
- change routes
- add new dependencies
- remove features
- change behavior unless required and explained

Before editing:
1. Inspect the relevant files.
2. Propose a short refactor plan.
3. Then implement only the safe parts.

Deliver:
- refactor plan
- files changed
- what improved
- what stayed the same
- testing steps
25. Refactor CSS / Design Tokens

Use this when styles are messy or inconsistent.

Refactor the CSS/design token system.

Goals:
- reduce hardcoded values
- improve spacing consistency
- improve typography consistency
- improve color naming
- support responsive layouts
- support light/dark mode if already present or requested
- make future UI changes easier

Do not:
- completely redesign the interface
- introduce a new styling framework
- break existing responsive behavior
- change brand direction

Deliver:
- token structure
- files changed
- before/after explanation
- remaining cleanup opportunities
26. Add Dark / Light / System Theme Toggle

Use this when a project needs theme support.

Add a light / dark / system theme toggle.

Requirements:
- light, dark, and system modes
- persist preference in localStorage
- respect prefers-color-scheme
- accessible controls
- no flash if possible
- semantic CSS variables or existing theme approach
- do not break current design

Place the toggle:
[DESCRIBE LOCATION]

Do not:
- add unnecessary dependencies
- rewrite unrelated styles
- change layout unnecessarily

Deliver:
- files changed
- theme logic explanation
- how to test
- known limitations
27. Add LocalStorage Persistence

Use this for small apps that do not need a database.

Add localStorage persistence to this app.

Data to persist:
[DESCRIBE DATA]

Requirements:
- safe read/write helpers
- handle missing or invalid stored data
- avoid breaking server rendering if Next.js is used
- keep data structure versioned if useful
- do not add database
- do not add auth

Deliver:
- files changed
- storage keys used
- data structure
- how to reset data
- testing steps
28. Add Supabase Carefully

Use this only when auth/database is truly needed.

Add Supabase integration carefully.

Project:
[PROJECT NAME]

Supabase is needed for:
[auth / database / both]

Requirements:
- use environment variables
- do not expose secret keys
- create clear client/server separation if Next.js is used
- handle missing env vars gracefully
- do not break anonymous/local mode if the app already supports it
- document required Supabase settings

Do not:
- hardcode credentials
- create complex RLS policies without explanation
- store sensitive data unless scoped
- add payment logic

Deliver:
- files changed
- environment variables needed
- setup steps
- security notes
- testing steps
29. Create README for Project

Use this when a project needs documentation.

Create or improve README.md for this project.

Include:
- project name
- short description
- live demo placeholder
- stack
- features
- folder structure
- how to run locally
- how to build
- deployment notes
- environment variables if needed
- known limitations
- portfolio notes if relevant

Tone:
Clear, professional, concise.

Do not:
- invent features
- invent metrics
- include secrets
- overcomplicate documentation

Deliver:
- README updated
- summary of sections added
30. Emergency “Do Not Break It” Prompt

Use this when Codex has been making too many changes or the project feels fragile.

Stop broad changes.

From now on:
- Do not rewrite unrelated files.
- Do not redesign the app.
- Do not change architecture.
- Do not add dependencies.
- Do not delete files.
- Do not rename files.
- Do not change working features.

Only address this specific issue:

[DESCRIBE ISSUE]

Before editing:
1. Identify the smallest file set needed.
2. Explain the minimal fix.
3. Apply only that fix.
4. Summarize exactly what changed.

If the fix requires broader changes, stop and explain why before editing.
Quick Prompt Selection Guide

Use:

Project Inspection → when opening a repo
Safe File Organization → when arranging folders
Next.js Structure → for serious websites/portfolio
Vite Prototype → for small tools
Apply Lynx Design → for visual identity
Brand Identity Project Inspection → before logo/identity implementation
Apply Logo Assets to Website → when approved logo files are provided
Create Client DESIGN.md From Brand Brief → after completing a brand identity brief
Brand Identity Implementation Pass → when applying approved identity rules
Responsive Fix → for mobile/tablet issues
UI Polish → for premium feel
Landing Page Implementation → for marketing pages
Business Website Implementation → for SMB websites
Interactive Catalog → for products/services
Web App MVP → for tools/apps
Bilingual Support → for English/Spanish
SEO Pass → before publishing
Accessibility Pass → before publishing
Performance Pass → before publishing
Reality Check → before deploy
Fix Build Errors → when build fails
Fix Runtime Error → when app crashes
Prepare Git Commit → before GitHub push
Vercel Deployment Check → before deploy
Portfolio Case Study → after finishing a project
Website Audit → for prospecting clients
Maintenance Plan → for retainers
Refactor Without Redesign → cleanup only
CSS/Tokens Refactor → style system cleanup
Theme Toggle → light/dark/system
LocalStorage → simple persistence
Supabase → auth/database only when needed
README → documentation
Emergency Prompt → when Codex is over-editing
Final Rule

Use Codex like a skilled implementation assistant, not like a vague magician.

A good Codex prompt should always define:

project context
exact task
files or areas involved
what to avoid
expected output
testing or review steps

If the prompt is vague, the result will be risky.
