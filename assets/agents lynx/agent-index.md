# Lynx AI System — Agent Index

## Purpose

Lynx AI System is a curated AI workflow system for Lynx Visual Division.

It is designed to help build, improve, document, and sell:

- premium landing pages
- business websites
- brand identity systems
- logo redesign
- logo refinement
- digital logo implementation
- creator portfolios
- interactive catalogs
- lightweight web apps
- SaaS-style MVPs
- portfolio case studies
- client website audits
- maintenance and optimization plans

This system is built for ChatGPT, Codex, GitHub Copilot, and future Open Design workflows.

Primary business goal:

Help Lynx Visual Division create visually premium, technically solid, bilingual digital products for English-speaking markets while keeping Spanish-speaking markets accessible.

Primary markets:

- United States
- United Kingdom
- Australia
- Canada

Secondary markets:

- Colombia
- Latin America

Default language strategy:

- English first
- Spanish second
- Bilingual support when relevant

---

## Core Principles

Every project should aim to be:

- visually premium
- responsive
- accessible
- fast-loading
- SEO-conscious
- conversion-aware
- easy to maintain
- easy to present in a portfolio
- suitable for Vercel deployment

Avoid:

- generic SaaS templates
- unnecessary complexity
- childish icon systems
- excessive gradients
- inaccessible animations
- hardcoded repeated styles
- unclear folder structures
- large dependencies without a strong reason
- legal, banking, payroll, medical, or high-risk systems unless scoped safely

---

## Core Workflow Agents

These are the main agents used in most Lynx Visual Division projects.

### Agents Orchestrator

Use when:
- a project requires several agents
- the task is complex or multi-step
- there is uncertainty about which agents should participate
- a workflow needs to be coordinated from idea to delivery

Primary output:
- recommended agent team
- project workflow
- handoff sequence
- risks and next steps

Do not use when:
- the task is a simple one-file code fix
- only a single specialist is clearly needed

---

### UX Researcher

Use when:
- defining target users
- studying competitors
- validating a product idea
- identifying user pain points
- improving usability
- planning client discovery
- reviewing user journeys
- making research-based design decisions

Primary output:
- research brief
- user personas
- user journey
- pain points
- opportunities
- usability recommendations

Do not use when:
- the task is only visual polish
- the user already gave a complete validated brief

---

### UX Architect

Use when:
- defining information architecture
- planning page structure
- creating layout systems
- defining responsive behavior
- organizing sections and content hierarchy
- creating CSS architecture
- planning routes and component boundaries
- preparing developer handoff

Primary output:
- site architecture
- page structure
- responsive layout plan
- component hierarchy
- CSS/design token recommendations
- implementation priorities

Do not use when:
- only copywriting is needed
- only visual mood is being explored

---

### UI Designer

Use when:
- creating visual systems
- defining typography
- defining color palette
- designing components
- improving spacing and layout rhythm
- polishing interfaces
- checking visual consistency
- adapting a brand into UI
- checking logo usability, digital scalability, favicon/social avatar practicality, and web implementation

Primary output:
- visual direction
- design tokens
- component specs
- UI polish notes
- responsive visual guidance
- accessibility-aware interface recommendations

Do not use when:
- the task is backend logic
- the structure is not defined yet and needs UX Architecture first

---

### Frontend Developer

Use when:
- implementing React, Next.js, or Vite interfaces
- creating components
- fixing UI bugs
- improving responsiveness
- connecting frontend state
- cleaning code
- optimizing frontend implementation
- translating design specs into code

Primary output:
- code changes
- component structure
- implementation notes
- changed files summary
- risks and testing notes

Do not use when:
- the task is still in strategy or research phase
- no project structure exists yet

---

### Rapid Prototyper

Use when:
- building a quick MVP
- testing a product idea fast
- creating proof-of-concept interfaces
- validating a simple app flow
- prioritizing speed over complete architecture

Primary output:
- MVP scope
- prototype plan
- minimum feature set
- fast implementation approach

Do not use when:
- the project needs production-grade architecture from day one
- the user is asking for deep polish or long-term scalability

---

### Software Architect

Use when:
- defining app architecture
- planning data models
- deciding between Next.js, Vite, Supabase, APIs, or static build
- defining technical boundaries
- planning scalable systems
- preventing technical debt

Primary output:
- technical architecture
- recommended stack
- system boundaries
- data model outline
- risk analysis

Do not use when:
- the project is a simple static landing page
- there is no technical complexity

---

### SEO Specialist

Use when:
- creating SEO-friendly pages
- planning metadata
- structuring headings
- improving discoverability
- preparing bilingual SEO
- auditing existing websites
- improving local business pages
- writing search-focused content structure

Primary output:
- SEO recommendations
- metadata plan
- heading structure
- schema suggestions
- keyword/search intent notes
- technical SEO checklist

Do not use when:
- the project is private/internal and not intended to rank

---

### Growth Hacker

Use when:
- optimizing conversion
- improving landing page CTA
- planning acquisition channels
- creating offer strategy
- reviewing pricing presentation
- improving lead capture
- preparing launch plans

Primary output:
- conversion review
- CTA recommendations
- offer positioning
- A/B test ideas
- acquisition plan

Do not use when:
- the task is purely technical
- there is no user acquisition or conversion goal

---

### Content Creator

Use when:
- writing landing page copy
- creating website sections
- drafting social content
- writing service descriptions
- creating portfolio case study text
- preparing bilingual content

Primary output:
- website copy
- section copy
- headlines
- CTAs
- content structure
- bilingual variants when needed

Do not use when:
- legal, medical, or financial accuracy is required beyond general marketing language

---

### Brand Guardian

Use when:
- defining brand positioning
- protecting visual consistency
- translating brand identity into web design
- guiding identity direction, logo refinement logic, visual positioning, and do/donâ€™t rules
- reviewing whether a site feels premium
- making sure a project does not drift from brand direction

Primary output:
- brand positioning
- voice and tone
- visual consistency notes
- brand rules
- do/don’t guidance

Do not use when:
- the brand direction is irrelevant to the task

---

### Accessibility Auditor

Use when:
- checking WCAG AA basics
- reviewing contrast
- checking focus states
- checking semantic HTML
- checking keyboard navigation
- reviewing motion sensitivity
- improving inclusive design

Primary output:
- accessibility issues
- severity levels
- recommended fixes
- acceptance criteria

Do not use when:
- the project is still only conceptual and no interface exists yet

---

### Performance Benchmarker

Use when:
- checking speed
- improving Core Web Vitals
- optimizing images
- reducing bundle size
- reviewing animation performance
- preparing for production deployment

Primary output:
- performance risks
- optimization checklist
- image/loading recommendations
- bundle and dependency warnings

Do not use when:
- no implementation exists yet

---

### Reality Checker

Use when:
- verifying if a project is ready
- checking launch readiness
- detecting weak UX
- identifying missing states
- reviewing claims vs actual implementation
- deciding GO / NO-GO before publishing

Primary output:
- production readiness review
- critical issues
- medium-priority issues
- launch recommendation
- required evidence

Do not use when:
- the project is still in early brainstorming

---

### Git Workflow Master

Use when:
- preparing commits
- solving Git errors
- pushing to GitHub
- organizing branches
- writing commit messages
- recovering from Git conflicts
- preparing Vercel deployment

Primary output:
- exact terminal commands
- Git diagnosis
- safe recovery steps
- commit/push sequence

Do not use when:
- no Git operation is needed

---

## Secondary Support Agents

Use these when a project requires extra support.

### Code Reviewer

Use for:
- reviewing implementation quality
- identifying maintainability issues
- checking duplicated code
- suggesting safer refactors

### Technical Writer

Use for:
- README files
- setup instructions
- documentation
- developer handoff notes

### Evidence Collector

Use for:
- screenshot-based QA
- visual proof of bugs
- before/after comparisons
- UI regression notes

### Tool Evaluator

Use for:
- comparing tools
- deciding whether to use Open Design, Supabase, CMS tools, analytics, or other platforms

### Visual Storyteller

Use for:
- shaping visual identity narratives
- connecting brand concept, imagery, composition, and audience perception
- making identity directions feel intentional instead of decorative

### Image Prompt Engineer

Use for:
- visual exploration prompts
- moodboard direction prompts
- reference-style exploration for identity concepts

Do not use Image Prompt Engineer for final trademark-ready logo claims.

### Workflow Optimizer

Use for:
- improving repeated processes
- reducing manual work
- designing recurring systems for clients or internal studio operations

### Sales Outreach

Use for:
- cold email
- lead research
- business website audit messages
- outreach sequences

### Outbound Strategist

Use for:
- defining prospecting strategy
- choosing industries
- finding outreach angles
- creating ICP-based campaigns

### Proposal Strategist

Use for:
- client proposals
- service packages
- project scope
- value-based presentation

### Studio Producer

Use for:
- coordinating multiple client projects
- planning studio-level priorities
- balancing portfolio, sales, and delivery

### Project Shepherd

Use for:
- tracking project progress
- converting ideas into milestones
- managing execution steps

### ZK Steward

Use for:
- organizing knowledge
- summarizing lessons learned
- creating reusable notes from projects

### Document Generator

Use for:
- client-facing PDFs
- proposals
- case study documents
- audit reports

---

## Recommended Agent Teams

### Landing Page Team

Use for:
- product launch pages
- service landing pages
- campaign pages
- lead generation pages

Agents:
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

Expected outputs:
- target user brief
- offer positioning
- landing page copy
- section structure
- visual system
- implementation plan
- SEO checklist
- conversion review
- production readiness check

---

### Business Website / Catalog Team

Use for:
- small business websites
- restaurants
- clinics
- cafés
- local businesses
- product catalogs
- creator stores without complex e-commerce

Agents:
1. UX Researcher
2. Brand Guardian
3. UX Architect
4. UI Designer
5. Frontend Developer
6. SEO Specialist
7. Growth Hacker
8. Accessibility Auditor
9. Performance Benchmarker
10. Reality Checker

Expected outputs:
- sitemap
- user journey
- service/product structure
- catalog UX
- contact/lead flow
- SEO structure
- visual design system
- performance checklist

---

### Brand Identity / Logo System Team

Use for:
- new brand identity
- brand refresh
- logo redesign
- logo refinement
- digital logo adaptation
- favicon-first logo systems
- social avatar logo versions
- mini brand guidelines
- client DESIGN.md files
- brand + website bundles

Agents:
1. Brand Guardian
2. UI Designer
3. Visual Storyteller
4. UX Architect
5. Image Prompt Engineer
6. Accessibility Auditor
7. Reality Checker

Optional:
- UX Researcher
- Content Creator
- Frontend Developer
- Technical Writer
- Document Generator

Expected outputs:
- brand positioning
- identity audit
- visual direction
- logo strategy
- concept directions
- digital logo system
- favicon/social avatar recommendations
- color and typography direction
- mini brand guidelines
- implementation notes

---

### Web App MVP Team

Use for:
- LifeXP-style tools
- Neon Dice-style apps
- Social Comment Generator-style tools
- dashboards
- internal tools
- lightweight SaaS concepts

Agents:
1. Product Manager
2. UX Researcher
3. Software Architect
4. Rapid Prototyper
5. UX Architect
6. UI Designer
7. Frontend Developer
8. Accessibility Auditor
9. Reality Checker

Expected outputs:
- MVP definition
- user stories
- core flows
- feature priority
- technical architecture
- interface structure
- prototype implementation
- QA gate

---

### Portfolio Case Study Team

Use for:
- documenting finished projects
- creating portfolio entries
- translating work into business value
- showing process and results

Agents:
1. Brand Guardian
2. Content Creator
3. UI Designer
4. Technical Writer
5. SEO Specialist
6. Reality Checker

Expected outputs:
- project summary
- problem / solution / result structure
- design process
- technical stack
- screenshots checklist
- bilingual case study copy

---

### Client Website Audit Team

Use for:
- prospecting businesses
- auditing outdated websites
- creating sales opportunities
- preparing cold outreach

Agents:
1. UX Researcher
2. SEO Specialist
3. UI Designer
4. Growth Hacker
5. Sales Outreach
6. Proposal Strategist

Expected outputs:
- website audit
- visual problems
- UX problems
- SEO problems
- conversion problems
- opportunity summary
- outreach message
- recommended offer

---

### Maintenance Plan Team

Use for:
- monthly retainers
- website updates
- performance checks
- SEO refreshes
- content updates
- bug fixing

Agents:
1. Project Shepherd
2. Frontend Developer
3. SEO Specialist
4. Performance Benchmarker
5. Accessibility Auditor
6. Technical Writer

Expected outputs:
- monthly checklist
- update plan
- maintenance scope
- reporting format
- improvement backlog

---

## Usage Rules for ChatGPT

When working in ChatGPT:

1. Use this index to decide which agents should participate.
2. Do not activate all agents at once.
3. For simple tasks, use one or two agents only.
4. For full projects, use recommended teams.
5. Always produce practical outputs that can be passed to Codex or Copilot.
6. Explain technical concepts in an educational way when needed.
7. Keep business goals in mind: portfolio quality, client sales, maintainability, and international positioning.

---

## Usage Rules for Codex

When working in Codex:

1. Read AGENTS.md first.
2. Read this agent-index.md if agent selection is needed.
3. Use only the relevant active-agents files.
4. Do not rewrite agent files unless explicitly instructed.
5. Do not create unnecessary files.
6. Do not introduce new dependencies without explaining why.
7. Preserve existing functionality.
8. Make minimal, high-confidence changes.
9. Summarize changed files after each task.
10. Report missing context instead of guessing on high-risk decisions.

---

## Usage Rules for GitHub Copilot

When working in Copilot:

1. Use this index as a reference for choosing a mode.
2. Keep tasks small and specific.
3. Prefer file-level edits over large project-wide rewrites.
4. Use agents mostly as guidance, not as full autonomous workflows.
5. Ask for one clear result at a time.

---

## Default Project Types

### Static Landing Page

Recommended stack:
- HTML/CSS/JS for very simple one-page projects
- Next.js if it belongs to the main portfolio or needs SEO scalability

Primary agents:
- Content Creator
- UI Designer
- UX Architect
- Frontend Developer
- SEO Specialist
- Growth Hacker

---

### Business Website

Recommended stack:
- Next.js
- Tailwind CSS or CSS variables
- Vercel
- CMS only if client needs frequent updates

Primary agents:
- UX Researcher
- Brand Guardian
- UX Architect
- UI Designer
- Frontend Developer
- SEO Specialist
- Reality Checker

---

### Brand Identity / Logo System

Recommended stack:
- Open Design for visual exploration
- manual vector/design tools for final logo work
- DESIGN.md for implementation rules
- Codex only when applying approved identity to multiple website/app files

Primary agents:
- Brand Guardian
- UI Designer
- Visual Storyteller
- UX Architect
- Image Prompt Engineer
- Accessibility Auditor
- Reality Checker

---

### Interactive Catalog

Recommended stack:
- Next.js
- local JSON or CMS
- simple filtering/search
- payment link or checkout integration only if needed

Primary agents:
- UX Architect
- UI Designer
- Frontend Developer
- SEO Specialist
- Growth Hacker

---

### Lightweight Web App

Recommended stack:
- Vite + React for prototypes
- Next.js for serious/public apps
- Supabase only if auth/database is needed

Primary agents:
- Product Manager
- Software Architect
- Rapid Prototyper
- UX Architect
- UI Designer
- Frontend Developer
- Reality Checker

---

### Portfolio Project

Recommended stack:
- Next.js
- bilingual content
- case studies
- strong visual system
- fast loading
- Vercel deployment

Primary agents:
- Brand Guardian
- UX Architect
- UI Designer
- Frontend Developer
- SEO Specialist
- Performance Benchmarker
- Reality Checker

---

## Final Rule

This system exists to help Lynx Visual Division produce work that feels:

- premium
- clear
- useful
- fast
- visually memorable
- strategically sellable
- technically controlled

The goal is not to use agents for complexity.
The goal is to use agents to create better work with more control.
