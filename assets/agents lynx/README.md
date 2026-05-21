Lynx AI System
Purpose

Lynx AI System is a local workflow system for planning, designing, building, improving, documenting, and selling digital products with AI-assisted tools.

It is designed for Lynx Visual Division, a bilingual visual design and web studio focused on:

premium landing pages
business websites
brand identity
logo redesign
logo refinement
digital logo adaptation
visual identity systems
interactive catalogs
creator portfolios
lightweight web apps
SaaS-style MVPs
portfolio case studies
client website audits
website maintenance plans
AI-assisted design and development workflows

This system is meant to work with:

ChatGPT
Codex
GitHub Copilot
Open Design
VS Code
Vercel
GitHub

The goal is not to automate creativity blindly.

The goal is to create a controlled, repeatable, professional workflow where AI helps with strategy, design, code, documentation, QA, and delivery.

Studio Context

Lynx Visual Division is positioned as a visual design and AI-assisted web studio.

Primary markets:

United States
United Kingdom
Australia
Canada

Secondary markets:

Colombia
Latin America

Default language strategy:

English first
Spanish second
bilingual support when relevant

Preferred project types:

landing pages
small and medium business websites
brand identity systems
logo redesign
logo refinement
digital logo adaptation
visual identity systems
brand + website bundles
creator portfolios
interactive catalogs
simple tools
web apps
SaaS-style MVPs
portfolio projects
website redesigns
ongoing maintenance plans

Preferred stack:

Next.js for serious websites, portfolio projects, SEO projects, and scalable apps
Vite + React for fast prototypes, tools, and visual experiments
TypeScript when useful
Tailwind CSS or CSS variables depending on the project
Vercel for deployment
GitHub for version control
Supabase only when auth or database is truly needed
Core Philosophy

This system exists to help produce work that is:

visually intentional
strategically aligned
technically controlled
accessible
responsive
fast-loading
SEO-aware
conversion-aware
maintainable
portfolio-ready
commercially useful

AI should support the workflow, not replace judgment.

The designer remains responsible for:

visual direction
taste
client context
user understanding
final quality
ethical decisions
accessibility awareness
business alignment
Folder Structure
Root Files
AGENTS.md

Main instruction file for agents, Codex, and AI-assisted workflows.

Use this as the first file that tools should read before working in the system.

agent-index.md

Catalog of the active agents used by Lynx AI System.

It explains:

which agents exist
when to use each agent
when not to use each agent
recommended agent teams
project type routing
usage rules for ChatGPT, Codex, and Copilot
workflow-router.md

Decision router for choosing the correct workflow.

Use this file to decide whether a task is:

landing page
business website
catalog
creator portfolio
web app
SaaS MVP
client audit
maintenance
design system
Git/deployment
learning/explanation

It also defines when to use:

ChatGPT
VS Code
GitHub Copilot
Codex
Open Design
codex-prompt-library.md

Reusable prompt library for Codex.

Use this file when you need structured prompts for:

project inspection
file organization
Next.js structure
Vite prototypes
UI polish
responsive fixes
landing page implementation
web app MVP implementation
SEO pass
accessibility pass
performance pass
build error fixes
Git commits
Vercel deployment checks
portfolio case studies
maintenance plans
service-catalog.md

Defines the sellable services offered by Lynx Visual Division, including brand identity, landing pages, websites, catalogs, web apps, audits, maintenance, and AI-assisted workflows.
system-map.md

Automatically generated folder map of the Lynx AI System structure.

missing-files-report.md

Report generated when the curated agent files were copied into active-agents.

It lists:

copied files
missing files
skipped files
filename assumptions
active-agents

This folder contains the curated working agents selected from the full Agency Agents repository.

The full agency-agents folder remains as a reference archive, but active-agents contains the agents most relevant to Lynx Visual Division.

Use this folder when a project needs specific agent guidance.

active-agents/design

Design-related agents.

Use for:

visual systems
UI design
UX research
UX architecture
brand consistency
storytelling
image prompt direction
interaction quality

Common agents:

UI Designer
UX Researcher
UX Architect
Brand Guardian
Whimsy Injector
Visual Storyteller
Image Prompt Engineer
active-agents/engineering

Frontend and software implementation agents.

Use for:

React
Next.js
Vite
component implementation
frontend architecture
Git workflows
code review
technical documentation

Common agents:

Frontend Developer
Software Architect
Rapid Prototyper
Git Workflow Master
Code Reviewer
Technical Writer
active-agents/marketing

Marketing and growth agents.

Use for:

SEO
landing page conversion
content strategy
social positioning
AI visibility
launch/growth strategy

Common agents:

SEO Specialist
Growth Hacker
Content Creator
Social Media Strategist
LinkedIn Content Creator
AI Citation Strategist
active-agents/product

Product strategy agents.

Use for:

MVP definition
product strategy
user feedback
market trends
feature prioritization

Common agents:

Product Manager
Sprint Prioritizer
Trend Researcher
Feedback Synthesizer
active-agents/testing

QA and validation agents.

Use for:

accessibility
performance
production readiness
screenshot evidence
workflow review
tool evaluation

Common agents:

Accessibility Auditor
Performance Benchmarker
Reality Checker
Evidence Collector
Tool Evaluator
Workflow Optimizer
active-agents/sales

Sales and outreach agents.

Use for:

client prospecting
cold outreach
discovery
proposals
deal strategy

Common agents:

Outbound Strategist
Discovery Coach
Proposal Strategist
Sales Outreach
Deal Strategist
active-agents/project-management

Project coordination agents.

Use for:

planning
execution control
timelines
task breakdown
studio operations

Common agents:

Studio Producer
Project Shepherd
Senior Project Manager
Experiment Tracker
active-agents/specialized

Specialized support agents.

Use for:

multi-agent orchestration
workflow architecture
MCP concepts
document generation
knowledge organization

Common agents:

Agents Orchestrator
Workflow Architect
MCP Builder
Document Generator
ZK Steward
workflows

This folder contains the main repeatable workflows for Lynx Visual Division.

Use these when starting or managing a specific type of project.

workflows/workflow-landing-page.md

Use for:

service landing pages
product launch pages
creator offer pages
campaign pages
waitlist pages
local business lead pages

Main goal:

Create a landing page that is visually strong, clear, responsive, SEO-aware, accessible, and conversion-focused.

workflows/workflow-web-app-mvp.md

Use for:

LifeXP-style apps
Neon Dice-style tools
Social Comment Generator-style tools
QR generators
dashboards
creator tools
lightweight SaaS MVPs

Main goal:

Build one useful, clear, functional MVP flow without overengineering.

workflows/workflow-client-website-audit.md

Use for:

prospecting clients
reviewing outdated websites
identifying redesign opportunities
preparing cold outreach
creating audit-based proposals

Main goal:

Find useful website improvement opportunities and start respectful sales conversations.

workflows/workflow-portfolio-case-study.md

Use for:

documenting finished projects
creating case studies
preparing portfolio content
explaining process, design decisions, stack, and outcomes

Main goal:

Turn projects into professional portfolio proof.

workflows/workflow-open-design.md

Use for:

Open Design workflows
client visual systems
DESIGN.md files
design direction exploration
AI-assisted UI generation
translating design into code rules

Main goal:

Use AI design tools with strategic control instead of random visual generation.

workflows/workflow-brand-identity.md

Use for:

brand identity design
brand refresh
logo redesign
logo refinement
digital logo adaptation
favicon-first logo systems
social avatar logo versions
website logo implementation
visual identity systems
mini brand guidelines
brand + website bundles

Main goal:

Create, refine, redesign, and implement brand identity systems for digital use.

workflows/workflow-maintenance-plan.md

Use for:

recurring website support
monthly updates
SEO/content refreshes
bug fixes
catalog updates
optimization plans
client retention

Main goal:

Create recurring revenue with clear scope and boundaries.

templates

This folder contains reusable templates that should be filled before starting serious work.

templates/project-brief.md

Master project brief.

Use for any serious project.

It captures:

project type
business goal
target user
brand positioning
visual direction
content needs
technical needs
SEO needs
scope
agent team
first action
templates/landing-page-brief.md

Brief for landing pages.

Use when building:

service landing pages
product pages
creator offer pages
local business lead pages
campaign pages
templates/web-app-brief.md

Brief for web apps and MVPs.

Use when building:

tools
dashboards
lightweight apps
SaaS-style MVPs
portfolio apps
templates/brand-identity-brief.md

Brief for brand identity, logo redesign, logo refinement, digital logo adaptation, favicon systems, social avatar logo versions, and web identity systems.
templates/client-audit.md

Template for auditing potential client websites.

Use when prospecting businesses from:

Google Maps
Instagram
LinkedIn
local directories
referrals
templates/case-study.md

Template for portfolio case studies.

Use after finishing or polishing a project.

templates/maintenance-plan.md

Template for creating monthly website maintenance plans.

Use for recurring client support and retainers.

templates/codex-task.md

Template for turning a task into a clear Codex instruction.

Use before asking Codex to make multi-file changes.

design-systems

This folder contains global and client-specific design systems.

design-systems/lynx-visual-division/DESIGN.md

Global design philosophy and adaptive design system for Lynx Visual Division.

Important:

This is not a fixed style guide.

It does not force every client into the same aesthetic.

It defines:

design philosophy
adaptive design rules
design modes
typography principles
color principles
layout principles
component principles
motion rules
accessibility standards
performance standards
AI-assisted design principles
Open Design rules
anti-patterns

Client-specific design systems should be created later as needed.

Examples:

design-systems/cafe-leonor/DESIGN.md
design-systems/nido-canino/DESIGN.md
design-systems/divinitas/DESIGN.md
design-systems/lifexp/DESIGN.md
archive

Use this folder for old experiments, deprecated documents, unused workflows, or previous versions.

Do not delete useful references too quickly.

Archive instead.

agency-agents

This is the full original Agency Agents folder.

Keep it as a reference.

Do not use all agents by default.

Use active-agents for the curated Lynx working system.

If a future project needs a new specialist, copy the relevant agent from agency-agents into active-agents and update agent-index.md.

How to Use This System
For a New Landing Page
Fill templates/landing-page-brief.md.
Read workflow-router.md.
Use workflows/workflow-landing-page.md.
Define the agent team.
Write strategy and copy in ChatGPT.
Define visual direction.
Use Codex only when implementation touches multiple files.
Run QA.
Deploy.
Document with templates/case-study.md.
For a New Web App MVP
Fill templates/web-app-brief.md.
Use workflows/workflow-web-app-mvp.md.
Define the MVP scope.
Decide stack: Vite + React or Next.js.
Avoid auth/database unless necessary.
Build the core flow.
Review UX, UI, accessibility, performance.
Deploy.
Document as portfolio case study.
For Finding Clients
Find a business with a weak or outdated website.
Fill templates/client-audit.md.
Use workflows/workflow-client-website-audit.md.
Identify one positive observation.
Identify one real improvement opportunity.
Write respectful outreach.
If they respond, prepare a focused proposal.
Offer landing page, website refresh, catalog, or maintenance plan.
For Maintenance Plans
Fill templates/maintenance-plan.md.
Use workflows/workflow-maintenance-plan.md.
Define monthly scope.
Define exclusions.
Define request limits.
Define price.
Create reporting system.
Execute monthly updates.
Report value clearly.
For Portfolio Case Studies
Fill templates/case-study.md.
Use workflows/workflow-portfolio-case-study.md.
Prepare screenshots.
Write English version first.
Add Spanish version if needed.
Be honest about role, AI usage, stack, and results.
Do not invent metrics.
For Open Design
Fill the relevant brief.
Use workflows/workflow-open-design.md.
Define design mode.
Create client-specific DESIGN.md if needed.
Generate multiple directions.
Evaluate them strategically.
Translate selected direction into code rules.
Use Codex only after the design direction is clear.
For Brand Identity / Logo Redesign
Fill templates/brand-identity-brief.md.
Use workflows/workflow-brand-identity.md.
Define brand positioning and audience.
Audit existing identity if one exists.
Choose visual direction.
Define logo strategy and required logo versions.
Create or refine logo system.
Prepare digital versions: website header, favicon, social avatar, dark/light versions.
Create client DESIGN.md if the identity will be applied to a website or app.
Apply identity to web/app files with Codex only when multiple files are involved.
Tool Usage Rules
Use ChatGPT For
strategy
learning
planning
writing
design direction
prompt creation
business decisions
case study writing
client messaging
architecture thinking
Use VS Code Manually For
one-file edits
markdown updates
replacing text
reviewing folders
small safe changes
Use GitHub Copilot For
small code completions
CSS tweaks
component snippets
quick function edits
small local improvements
Use Codex For
multi-file changes
project inspection
refactors
page implementation
component creation
app structure changes
bug fixes across files
build/deployment checks
applying a design system across code
Use Open Design For
visual system exploration
client design directions
interface experiments
design-to-code thinking
design system creation
Safe Work Rules

Before using Codex, define:

exact task
project context
files involved
agents to apply
out-of-scope items
acceptance criteria
verification steps

Avoid prompts like:

“make it better”
“improve everything”
“make it premium”
“fix the app”
“redesign this”
“optimize all”

Use specific prompts from:

codex-prompt-library.md

or fill:

templates/codex-task.md

Default Project Sequence

For most serious projects:

Project brief
Workflow router
Agent selection
Research or positioning
UX structure
Visual direction
Technical architecture
Implementation
SEO review
Accessibility review
Performance review
Reality check
Deployment
Case study
Maintenance or next iteration
Anti-Patterns

Avoid:

using all agents at once
using Codex for tiny edits
letting AI invent project strategy without a brief
copying trends without context
building too many features before validating the core flow
adding login too early
adding databases too early
adding payment systems without scope
ignoring mobile
ignoring accessibility
ignoring performance
publishing without checking links and CTAs
promising SEO rankings or revenue without evidence
inventing case study metrics
offering unlimited maintenance
accepting vague client requests
Current System Status

Core files completed or expected:

AGENTS.md
agent-index.md
workflow-router.md
codex-prompt-library.md
service-catalog.md
design-systems/lynx-visual-division/DESIGN.md
templates/project-brief.md
templates/landing-page-brief.md
templates/web-app-brief.md
templates/brand-identity-brief.md
templates/client-audit.md
templates/case-study.md
templates/maintenance-plan.md
templates/codex-task.md
workflows/workflow-landing-page.md
workflows/workflow-web-app-mvp.md
workflows/workflow-brand-identity.md
workflows/workflow-client-website-audit.md
workflows/workflow-portfolio-case-study.md
workflows/workflow-open-design.md
workflows/workflow-maintenance-plan.md
Next Recommended Files

These are optional but useful for the next phase:

service-catalog.md
pricing-model.md
portfolio-roadmap.md
client-outreach-system.md
qa-checklist.md
deployment-checklist.md
learning-roadmap.md

Do not create all of them at once unless needed.

Recommended next step:

Update AGENTS.md so it points clearly to this system and explains how Codex should use the files.

Final Rule

Lynx AI System exists to create better digital products with more control.

The system should make work:

clearer
faster
more professional
easier to sell
easier to maintain
easier to document
safer to implement
stronger as portfolio proof

Use AI as a studio team.

Do not use AI as a replacement for direction.
