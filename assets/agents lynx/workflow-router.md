# Lynx AI System — Workflow Router

## Purpose

This file routes each project or task to the correct workflow, agent team, and execution mode.

Lynx AI System is not meant to activate every agent at once.  
The goal is to select the smallest useful team for each task, avoid confusion, and keep every project practical, sellable, visually premium, and technically controlled.

Use this router with:

- ChatGPT
- Codex
- GitHub Copilot
- Open Design workflows
- manual planning in VS Code

---

## Core Routing Principle

Before starting any task, classify it into one of these categories:

1. Landing Page
2. Business Website
3. Interactive Catalog
4. Creator Portfolio
5. Lightweight Web App
6. SaaS-style MVP
7. Portfolio Case Study
8. Client Website Audit
9. Maintenance Plan
10. UI / UX Polish
11. Technical Refactor
12. Git / Deployment
13. Open Design / Design System
14. Brand Identity / Logo System
15. Learning / Explanation

Then choose:

- the correct workflow
- the minimum necessary agents
- the expected output
- the safest execution mode

---

## Execution Modes

### Mode 1 — Conversation / Strategy

Use when:
- defining ideas
- planning a project
- writing copy
- building workflows
- deciding architecture
- learning concepts
- creating prompts for Codex

Best tool:
- ChatGPT

Do not use Codex unless implementation is required.

---

### Mode 2 — Manual File Edit

Use when:
- editing one file
- replacing a markdown file
- updating copy
- changing a small config
- adding a simple checklist
- making a small text-only change

Best tools:
- ChatGPT for the content
- VS Code for the edit

Do not use Codex for simple single-file edits.

---

### Mode 3 — Assisted Code Edit

Use when:
- editing 1–3 files
- fixing a component
- improving CSS
- changing a layout
- adjusting responsive behavior
- adding small UI behavior

Best tools:
- GitHub Copilot
- VS Code
- ChatGPT for precise prompts

Use Codex only if the change touches many related files.

---

### Mode 4 — Codex Implementation

Use when:
- creating many files
- modifying many components
- refactoring a project
- implementing a full workflow
- generating a page or app structure
- debugging a multi-file issue
- running checks
- preparing production changes

Best tool:
- Codex

Codex must:
- read AGENTS.md
- read agent-index.md
- read this workflow-router.md
- use only the relevant active agents
- avoid unrelated changes
- summarize changed files

---

### Mode 5 — QA / Production Review

Use when:
- a project is almost ready
- checking launch readiness
- reviewing accessibility
- checking performance
- preparing deployment
- verifying if the project is portfolio-ready

Best tools:
- ChatGPT for review plan
- Codex for code inspection and fixes
- browser/manual testing for evidence

---

## Project Type Routing

---

# 1. Landing Page

## Use When

The project is a single-page marketing website designed to convert visitors into leads, signups, bookings, or purchases.

Examples:
- service landing page
- product launch page
- campaign page
- waitlist page
- creator offer page
- small business lead page

## Recommended Workflow

Use:

`workflows/workflow-landing-page.md`

## Primary Agents

1. UX Researcher
2. Content Creator
3. Brand Guardian
4. UI Designer
5. UX Architect
6. Frontend Developer
7. SEO Specialist
8. Growth Hacker
9. Accessibility Auditor
10. Reality Checker

## Minimum Agent Set

For a fast landing page:

1. Content Creator
2. UI Designer
3. UX Architect
4. Frontend Developer
5. Growth Hacker

## Expected Outputs

- target audience summary
- offer positioning
- section structure
- headline and CTA system
- visual direction
- responsive layout
- SEO metadata plan
- conversion review
- production checklist

## Recommended Stack

Use:

- Next.js if the landing belongs to a serious brand, portfolio, or SEO project
- HTML/CSS/JS only for ultra-simple prototypes
- Tailwind CSS or CSS variables
- Vercel deployment

## Avoid

- too many sections
- vague CTAs
- generic SaaS visual style
- heavy animations without purpose
- slow-loading hero assets
- unclear value proposition

## Codex Instruction

Use Codex only after the structure, copy direction, and visual direction are defined.

---

# 2. Business Website

## Use When

The project is a multi-section or multi-page website for a real business.

Examples:
- local clinic
- café
- restaurant
- tattoo studio
- fashion shop
- dog care business
- wellness studio
- consulting service
- small or medium company

## Recommended Workflow

Use:

`workflows/workflow-landing-page.md` for simple websites  
or create a custom website workflow from this router for larger sites.

## Primary Agents

1. UX Researcher
2. Brand Guardian
3. UX Architect
4. UI Designer
5. Content Creator
6. Frontend Developer
7. SEO Specialist
8. Growth Hacker
9. Accessibility Auditor
10. Performance Benchmarker
11. Reality Checker

## Expected Outputs

- sitemap
- navigation structure
- homepage structure
- service/product page structure
- contact flow
- trust elements
- local SEO structure
- responsive layout
- maintenance recommendations

## Recommended Stack

Use:

- Next.js
- Tailwind CSS or CSS variables
- Vercel
- CMS only if the client needs frequent updates
- Supabase only if user accounts or database are needed

## Avoid

- unnecessary dashboards
- complex backend for simple websites
- fake dynamic features
- visual effects that hurt clarity
- making a local business site feel like generic SaaS

---

# 3. Interactive Catalog

## Use When

The project needs to show products, services, or collections in a visual and filterable way.

Examples:
- Divinitas shoe catalog
- Café Leonor product catalog
- artist merchandise
- creator digital products
- fashion collection
- service packages

## Recommended Workflow

Use a combination of:

`workflows/workflow-landing-page.md`  
and  
`workflows/workflow-web-app-mvp.md` if filtering/search/cart logic is needed.

## Primary Agents

1. UX Architect
2. UI Designer
3. Frontend Developer
4. SEO Specialist
5. Growth Hacker
6. Accessibility Auditor
7. Reality Checker

## Optional Agents

Use Brand Guardian if brand storytelling is important.  
Use Content Creator if product descriptions need improvement.  
Use Product Manager if the catalog behaves like an app.

## Expected Outputs

- product/category structure
- filtering logic
- product card system
- gallery behavior
- mobile browsing UX
- CTA flow
- SEO structure
- catalog maintenance plan

## Recommended Stack

Use:

- Next.js
- local JSON for small catalogs
- CMS if client needs to update products often
- payment links for simple purchases
- full checkout only if required and scoped clearly

## Avoid

- complex e-commerce too early
- inventory systems unless needed
- payment logic that creates high-risk obligations
- confusing filters
- weak product photography or poor image optimization

---

# 4. Creator Portfolio

## Use When

The project is a personal or professional site for a creator, freelancer, artist, influencer, consultant, or digital service provider.

Examples:
- content creator portfolio
- video editor portfolio
- tattoo artist website
- designer website
- coach website
- photographer website
- musician or performer website

## Recommended Workflow

Use:

`workflows/workflow-portfolio-case-study.md`  
and  
`workflows/workflow-landing-page.md`

## Primary Agents

1. UX Researcher
2. Brand Guardian
3. Content Creator
4. UI Designer
5. UX Architect
6. Frontend Developer
7. SEO Specialist
8. Growth Hacker
9. Reality Checker

## Expected Outputs

- personal positioning
- audience definition
- service structure
- project gallery
- about section
- CTA strategy
- contact flow
- portfolio case study structure
- bilingual content when relevant

## Recommended Stack

Use:

- Next.js
- bilingual routing if needed
- case study templates
- optimized media
- Vercel

## Avoid

- making it only a visual gallery
- hiding the offer
- unclear contact path
- overloading with too many styles
- heavy videos without optimization

---

# 5. Lightweight Web App

## Use When

The project is an interactive tool, but not a complex enterprise system.

Examples:
- LifeXP
- Neon Dice
- Social Comment Generator
- QR generator
- small calculators
- interactive planners
- creator tools
- internal simple dashboards

## Recommended Workflow

Use:

`workflows/workflow-web-app-mvp.md`

## Primary Agents

1. Product Manager
2. UX Researcher
3. Software Architect
4. Rapid Prototyper
5. UX Architect
6. UI Designer
7. Frontend Developer
8. Accessibility Auditor
9. Reality Checker

## Expected Outputs

- user problem
- core feature list
- MVP scope
- user flow
- state model
- component structure
- data storage decision
- UI system
- testing checklist
- portfolio case study notes

## Recommended Stack

Use:

- Vite + React for quick tools and experiments
- Next.js for serious public apps or SEO-related tools
- localStorage for simple personal tools
- Supabase only if auth, database, or persistence is required
- Vercel deployment

## Avoid

- adding login too early
- adding database without need
- building complex admin panels too early
- making the MVP too broad
- unclear onboarding

---

# 6. SaaS-style MVP

## Use When

The project has product potential beyond a simple tool.

Examples:
- creator business organizer
- client dashboard
- appointment flow
- project management mini-system
- business automation tool
- simple CRM-like tool
- internal company workflow app

## Recommended Workflow

Use:

`workflows/workflow-web-app-mvp.md`

## Primary Agents

1. Product Manager
2. UX Researcher
3. Software Architect
4. Sprint Prioritizer
5. Rapid Prototyper
6. UX Architect
7. UI Designer
8. Frontend Developer
9. Growth Hacker
10. Reality Checker

## Expected Outputs

- MVP definition
- feature prioritization
- user stories
- core user flows
- technical architecture
- data model
- auth decision
- interface map
- launch plan
- risk review

## Recommended Stack

Use:

- Next.js
- TypeScript
- Tailwind CSS or CSS variables
- Supabase if auth/database is needed
- Vercel
- Stripe or payment links only if carefully scoped

## Avoid

- legal, banking, payroll, medical or high-risk systems
- storing sensitive data without a security plan
- complex finance tools
- mission-critical systems
- promising automation that has not been tested

---

# 7. Portfolio Case Study

## Use When

A finished or nearly finished project needs to become a professional portfolio entry.

Examples:
- LifeXP case study
- Neon Dice case study
- Social Comment Generator case study
- Café Leonor website case study
- Nido Canino website case study
- Divinitas catalog case study

## Recommended Workflow

Use:

`workflows/workflow-portfolio-case-study.md`

## Primary Agents

1. Brand Guardian
2. Content Creator
3. UI Designer
4. Technical Writer
5. SEO Specialist
6. Reality Checker

## Expected Outputs

- project title
- one-line summary
- problem
- solution
- role
- stack
- process
- design decisions
- features
- screenshots checklist
- results or simulated outcomes
- lessons learned
- bilingual case study copy

## Recommended Stack

Use:

- Markdown, MDX, or structured JSON depending on portfolio architecture
- Next.js portfolio system
- optimized images
- bilingual content model

## Avoid

- exaggerating results
- claiming client impact without evidence
- showing unfinished work as production-ready
- too much text without visual rhythm

---

# 8. Client Website Audit

## Use When

The goal is to find potential clients by reviewing their current website and identifying opportunities.

Examples:
- local businesses found on Google Maps
- outdated websites
- poor mobile UX
- bad SEO
- weak CTA
- missing contact flow
- slow sites
- visually outdated brands

## Recommended Workflow

Use:

`workflows/workflow-client-website-audit.md`

## Primary Agents

1. UX Researcher
2. SEO Specialist
3. UI Designer
4. Growth Hacker
5. Sales Outreach
6. Proposal Strategist

## Expected Outputs

- quick business summary
- website problems
- UX issues
- SEO issues
- visual/design issues
- conversion issues
- missed opportunities
- outreach email
- recommended offer
- estimated scope

## Recommended Tools

Use:

- manual website review
- browser inspection
- Lighthouse when available
- Google Maps observation
- competitor comparison
- screenshots when helpful

## Avoid

- insulting the business
- sounding spammy
- making unsupported claims
- offering huge redesigns immediately
- overpromising revenue increases

---

# 9. Maintenance Plan

## Use When

The project requires recurring updates, optimization, support, or a monthly retainer.

Examples:
- update website content
- add new products
- fix bugs
- improve SEO
- check performance
- update portfolio
- monitor forms
- improve accessibility
- monthly client report

## Recommended Workflow

Use:

`workflows/workflow-maintenance-plan.md`

## Primary Agents

1. Project Shepherd
2. Frontend Developer
3. SEO Specialist
4. Performance Benchmarker
5. Accessibility Auditor
6. Technical Writer

## Expected Outputs

- monthly task list
- update scope
- maintenance boundaries
- response expectations
- reporting format
- improvement backlog
- suggested retainer structure

## Recommended Stack

Use the existing project stack.

## Avoid

- unlimited revisions
- vague maintenance scope
- emergency support without extra cost
- accepting responsibility for systems outside your control

---

# 10. UI / UX Polish

## Use When

A project works but does not feel premium, clear, or polished.

Examples:
- spacing feels wrong
- layout feels amateur
- hero section is weak
- mobile version feels broken
- visual hierarchy is unclear
- colors do not feel premium
- components feel inconsistent
- animations feel excessive or cheap

## Recommended Workflow

Use a custom polish workflow.

## Primary Agents

1. UI Designer
2. UX Architect
3. Brand Guardian
4. Accessibility Auditor
5. Frontend Developer
6. Reality Checker

## Expected Outputs

- visual diagnosis
- UX diagnosis
- spacing and hierarchy fixes
- component consistency notes
- responsive improvements
- accessibility checks
- implementation plan

## Recommended Execution Mode

Use:

- ChatGPT for diagnosis
- VS Code for small edits
- Codex for multi-file UI refactors

## Avoid

- changing the entire design without reason
- adding decorative elements that do not improve clarity
- breaking working functionality
- fixing desktop while ignoring mobile

---

# 11. Technical Refactor

## Use When

The code works but is messy, duplicated, fragile, or hard to maintain.

Examples:
- repeated components
- messy CSS
- unclear file structure
- duplicated logic
- hardcoded values
- broken responsive rules
- too many one-off fixes
- inconsistent naming

## Recommended Workflow

Use a custom refactor workflow.

## Primary Agents

1. Software Architect
2. Code Reviewer
3. Frontend Developer
4. Performance Benchmarker
5. Reality Checker

## Expected Outputs

- refactor diagnosis
- file-level plan
- risk assessment
- safe implementation order
- changed files summary
- testing checklist

## Recommended Execution Mode

Use Codex when the refactor affects several files.

## Avoid

- refactoring without tests or manual verification
- changing behavior without permission
- renaming everything unnecessarily
- mixing refactor with redesign

---

# 12. Git / Deployment

## Use When

The project needs to be committed, pushed, deployed, fixed on Vercel, or recovered from a Git issue.

Examples:
- git status
- git add
- git commit
- git push
- rejected push
- stale info
- wrong branch
- Vercel 404
- root directory issue
- deployment failed
- build error

## Recommended Workflow

Use a custom Git workflow.

## Primary Agents

1. Git Workflow Master
2. Frontend Developer
3. Reality Checker
4. Technical Writer when documentation is needed

## Expected Outputs

- exact terminal commands
- diagnosis
- safe sequence
- rollback option when needed
- deployment checklist

## Recommended Execution Mode

Use:

- ChatGPT for command guidance
- Codex only when inspecting project files or fixing deployment config

## Avoid

- force push unless necessary
- deleting files without backup
- changing Vercel settings blindly
- running commands from the wrong folder

---

# 13. Open Design / Design System

## Use When

The project requires visual system creation, brand design rules, reusable UI language, or integration with Open Design.

Examples:
- Lynx Visual Division design system
- Café Leonor visual system
- Nido Canino visual system
- project-specific DESIGN.md
- reusable UI patterns
- brand tokens
- motion rules
- component style rules

## Recommended Workflow

Use:

`workflows/workflow-open-design.md`

## Primary Agents

1. Brand Guardian
2. UI Designer
3. UX Architect
4. Frontend Developer
5. Accessibility Auditor
6. Tool Evaluator

## Expected Outputs

- DESIGN.md
- design tokens
- typography rules
- color rules
- layout rules
- component rules
- motion principles
- accessibility rules
- anti-patterns

## Recommended Execution Mode

Use:

- ChatGPT to write the design system
- VS Code to edit the file
- Codex to apply the system across several files
- Open Design when visual workflow integration is required

## Avoid

- vague style descriptions
- copying trends without adapting them
- inaccessible contrast
- design rules that cannot be implemented in code
- overcomplicated token systems

---

# 14. Brand Identity / Logo System

## Use When

The task involves brand identity, logo redesign, logo refinement, digital logo adaptation, favicon systems, social media avatar logos, mini brand guidelines, or applying identity to a website/app.

Examples:
- redesign a logo
- refine an existing logo
- create favicon-first logo version
- create social avatar version
- create digital logo system
- create brand identity direction
- create logo usage rules
- create mini brand guidelines
- apply logo to a website header and favicon
- create brand + website bundle

## Recommended Workflow

Use:

`workflows/workflow-brand-identity.md`

## Primary Agents

1. Brand Guardian
2. UI Designer
3. Visual Storyteller
4. UX Architect
5. Image Prompt Engineer
6. Accessibility Auditor
7. Reality Checker

## Optional Agents

- UX Researcher
- Content Creator
- Frontend Developer
- Technical Writer
- Document Generator

## Expected Outputs

- brand positioning
- identity audit
- visual direction
- logo strategy
- required logo versions
- favicon recommendation
- social avatar version
- color and typography direction
- mini brand guidelines
- client DESIGN.md if needed
- digital implementation notes

## Recommended Execution Mode

Use:
- ChatGPT for strategy and critique
- Open Design for visual exploration
- manual vector/design tools for final logo work
- VS Code for documentation
- Codex only when applying identity to multiple website/app files

## Avoid

- claiming trademark/legal clearance
- copying references directly
- using AI logo outputs as final files without review
- sharing font files
- creating logos that only work at large sizes
- ignoring favicon and social avatar usage
- forcing the Lynx aesthetic onto client brands

---

# 15. Learning / Explanation

## Use When

The user needs to understand a concept before implementing it.

Examples:
- Next.js vs Vite
- static vs dynamic site
- React components
- TypeScript basics
- localStorage
- Supabase
- routing
- APIs
- SEO
- hydration
- server vs client components
- Git commands
- deployment logic

## Recommended Workflow

Use educational explanation mode.

## Primary Agents

1. Technical Writer
2. Software Architect
3. Frontend Developer
4. UX Architect when the topic touches interface structure

## Expected Outputs

- simple explanation
- practical example
- when to use it
- when not to use it
- how it applies to Lynx Visual Division projects
- next action

## Recommended Execution Mode

Use ChatGPT.

## Avoid

- academic explanations with no practical use
- too much jargon
- skipping the business/design context
- assuming advanced programming knowledge

---

## Routing Questions

When the task is unclear, answer these questions:

1. Is this a marketing page, a business website, an app, or an internal system?
2. Is the goal visibility, conversion, usability, automation, or portfolio presentation?
3. Does it need SEO?
4. Does it need a database?
5. Does it need login?
6. Does it need payments?
7. Is it public-facing or internal?
8. Is the project for a real client, a portfolio demo, or a learning exercise?
9. Is the task strategy, design, content, implementation, QA, or deployment?
10. Does this require brand identity or logo work?
11. Does the logo need to work as favicon or social avatar?
12. Will the identity be applied to a website or app?
13. Can this be solved manually in one file, or does it require Codex?

If the answer is still unclear, start with the smallest safe workflow.

---

## Tool Selection Rules

### Use ChatGPT When

- planning
- learning
- writing strategy
- creating prompts
- reviewing screenshots
- defining workflows
- making business decisions
- drafting content

### Use VS Code Manually When

- editing one markdown file
- replacing copy
- changing a small config
- reviewing file structure
- reading code
- making a small safe change

### Use GitHub Copilot When

- editing a small function
- completing component code
- making CSS tweaks
- generating small snippets
- working inside one or two files

### Use Codex When

- many files are involved
- the task requires project-wide understanding
- refactoring is needed
- creating page/component structures
- fixing multi-file bugs
- running checks
- preparing code for deploy

### Use Open Design When

- translating visual identity into UI rules
- exploring brand identity directions
- creating design systems
- experimenting with interface directions
- applying brand language to web components

---

## Safe Scope Rules

Before implementation, define the scope as one of:

### Tiny Scope

One file, small edit.

Use:
- ChatGPT + VS Code
- or Copilot

Avoid Codex.

### Small Scope

One to three files.

Use:
- Copilot
- or Codex only if the relationships are unclear

### Medium Scope

Several files or one full page.

Use:
- Codex

### Large Scope

Full project structure, app architecture, design system, or multi-page implementation.

Use:
- ChatGPT planning first
- Codex implementation second
- Reality Checker before finishing

---

## Default Workflow Sequence

For most serious projects, use this sequence:

1. Define project type
2. Define business goal
3. Define target user
4. Select agent team
5. Create brief
6. Create structure
7. Create visual system
8. Create implementation plan
9. Build or edit
10. Review accessibility
11. Review performance
12. Review conversion
13. Prepare deployment
14. Document as portfolio case study

---

## Anti-Patterns

Avoid these behaviors:

- activating too many agents for a small task
- asking Codex to “make it better” without scope
- asking Codex to rewrite a whole project without a reason
- mixing design, refactor, SEO, and copy in one uncontrolled task
- adding authentication before proving the app needs it
- adding a database before data persistence is required
- using payment systems in early prototypes
- using animations that hurt usability
- hiding the CTA
- creating visual systems that cannot be coded
- ignoring mobile
- ignoring accessibility
- ignoring performance
- deploying without checking basic routes
- pushing to GitHub from the wrong folder

---

## Final Routing Rule

Use the smallest useful workflow.

The purpose of Lynx AI System is not to make projects more complicated.

The purpose is to help Lynx Visual Division create better digital products with:

- clearer thinking
- stronger visual direction
- safer implementation
- better business positioning
- faster delivery
- better portfolio value
