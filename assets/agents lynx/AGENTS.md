AGENTS.md — Lynx AI System
Purpose

This file defines how AI tools should work inside Lynx AI System.

Lynx AI System is a local workflow system for Lynx Visual Division, a bilingual visual design and AI-assisted web studio focused on:

premium landing pages
business websites
brand identity systems
logo redesign
digital logo implementation
interactive catalogs
creator portfolios
lightweight web apps
SaaS-style MVPs
client website audits
portfolio case studies
maintenance plans
AI-assisted design and development workflows

This system is intended to support:

ChatGPT
Codex
GitHub Copilot
Open Design
VS Code
GitHub
Vercel

The goal is to create professional digital products with strategic control, not to let AI make uncontrolled decisions.

Studio Context

Lynx Visual Division works at the intersection of:

visual design
UI design
UX strategy
frontend implementation
AI-assisted workflows
design systems
product thinking
SEO basics
conversion strategy
portfolio storytelling
client delivery

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

Preferred stack:

Next.js for serious websites, portfolios, SEO projects, and scalable apps
Vite + React for fast prototypes, tools, experiments, and simple web apps
TypeScript when useful
Tailwind CSS or CSS variables depending on the project
Vercel for deployment
GitHub for version control
Supabase only when auth or database is truly needed
Core Operating Principle

Use the smallest useful workflow.

Do not activate every agent.

Do not overcomplicate simple tasks.

Do not use Codex for basic one-file edits.

Before acting, classify the task.

Then choose:

the right workflow
the right agents
the right tool
the safest scope
File Reading Order

When working inside this system, read files in this order:

AGENTS.md
README.md
workflow-router.md
agent-index.md
Relevant workflow file inside workflows/
Relevant template inside templates/
Relevant design system inside design-systems/
Relevant active agent files inside active-agents/

Do not read all agent files unless necessary.

Use active-agents/ as the curated working set.

Use agency-agents/ only as a reference archive.

Main System Files
README.md

Use this to understand the overall system structure.

workflow-router.md

Use this to classify the task and decide which workflow and tool should be used.

agent-index.md

Use this to select the correct agents and understand their roles.

codex-prompt-library.md

Use this to find reusable Codex prompts for common tasks.

design-systems/lynx-visual-division/DESIGN.md

Use this to understand the global adaptive design philosophy.

Important:

This is not a fixed aesthetic style guide.

It defines how to think about design across different clients and project types.

templates/

Use templates to collect information before implementation.

workflows/

Use workflows to execute project types step by step.

active-agents/

Use this as the curated list of working agents.

agency-agents/

Keep this as the full original reference library.

Do not modify or reorganize unless explicitly asked.

Tool Selection Rules
Use ChatGPT When

Use ChatGPT for:

strategy
planning
learning
research synthesis
writing briefs
writing workflows
writing prompts
design direction
business decisions
client messaging
case study writing
explaining concepts
creating content for single markdown files
Use VS Code Manually When

Use VS Code manually for:

editing one markdown file
replacing text
small copy updates
checking folder structure
reviewing files
simple safe changes

Do not use Codex for one-file markdown edits unless explicitly requested.

Use GitHub Copilot When

Use Copilot for:

small code completions
CSS tweaks
component snippets
small function edits
quick local improvements inside VS Code
Use Codex When

Use Codex for:

multi-file edits
project inspection
creating page structures
creating components
refactoring connected files
fixing build errors
fixing runtime errors across files
applying a design system across a project
SEO/accessibility/performance passes across files
preparing Git/deployment steps
implementing workflows
Use Open Design When

Use Open Design for:

visual system exploration
client-specific design systems
UI direction generation
translating brand identity into interface rules
design-to-code workflows
interface experiments
Scope Rules
Tiny Scope

Definition:

one file
small edit
copy replacement
markdown update
small config change

Use:

ChatGPT
VS Code
Copilot if needed

Avoid:

Codex
Small Scope

Definition:

one to three files
small UI fix
isolated component change
minor CSS update

Use:

Copilot
Codex only if relationships are unclear
Medium Scope

Definition:

several files
one full page
connected components
routing/metadata updates
responsive pass across a section

Use:

Codex
Large Scope

Definition:

full project structure
multi-page implementation
app architecture
design system application
major refactor
full workflow implementation

Use:

ChatGPT planning first
Codex implementation second
Reality Checker before finishing
Project Type Routing

Before starting work, classify the project as one of:

Landing Page
Business Website
Interactive Catalog
Creator Portfolio
Lightweight Web App
SaaS-style MVP
Portfolio Case Study
Client Website Audit
Maintenance Plan
UI / UX Polish
Technical Refactor
Git / Deployment
Open Design / Design System
Brand Identity / Logo System
Learning / Explanation

Then read workflow-router.md and select the correct workflow.

Workflow Files

Use these workflows:

workflows/workflow-landing-page.md
workflows/workflow-web-app-mvp.md
workflows/workflow-client-website-audit.md
workflows/workflow-portfolio-case-study.md
workflows/workflow-open-design.md
workflows/workflow-brand-identity.md
workflows/workflow-maintenance-plan.md

Do not create a new workflow unless the existing workflows do not fit.

Template Files

Use these templates:

templates/project-brief.md
templates/landing-page-brief.md
templates/web-app-brief.md
templates/brand-identity-brief.md
templates/client-audit.md
templates/case-study.md
templates/maintenance-plan.md
templates/codex-task.md

Before implementation, the relevant template should be filled or summarized.

If the template is incomplete, make assumptions clearly and mark them as assumptions.

Agent Selection Rules

Use agent-index.md to select agents.

Do not activate all agents.

Use the smallest useful team.

Default Landing Page Team

Use:

UX Researcher
Content Creator
Brand Guardian
UI Designer
UX Architect
Frontend Developer
SEO Specialist
Growth Hacker
Accessibility Auditor
Reality Checker
Default Web App MVP Team

Use:

Product Manager
UX Researcher
Software Architect
Rapid Prototyper
UX Architect
UI Designer
Frontend Developer
Accessibility Auditor
Reality Checker
Default Client Audit Team

Use:

UX Researcher
SEO Specialist
UI Designer
Growth Hacker
Sales Outreach
Proposal Strategist
Default Case Study Team

Use:

Brand Guardian
Content Creator
Technical Writer
UI Designer
SEO Specialist
Reality Checker
Default Maintenance Team

Use:

Project Shepherd
Frontend Developer
SEO Specialist
Performance Benchmarker
Accessibility Auditor
Technical Writer
Default Design System Team

Use:

Brand Guardian
UI Designer
UX Architect
Frontend Developer
Accessibility Auditor
Tool Evaluator
Default Brand Identity Team

Use:

Brand Guardian
UI Designer
Visual Storyteller
UX Architect
Image Prompt Engineer
Accessibility Auditor
Reality Checker

Optional:

Content Creator
UX Researcher
Frontend Developer
Technical Writer
Document Generator
Codex Behavior Rules

When Codex is used, it must:

Read AGENTS.md.
Read workflow-router.md.
Read agent-index.md.
Read the relevant workflow file.
Read the relevant template or project brief.
Identify the scope before editing.
Use only relevant active agents.
Avoid unrelated changes.
Preserve existing functionality.
Avoid unnecessary dependencies.
Avoid deleting files unless explicitly instructed.
Avoid renaming files unless required.
Avoid changing Git history.
Avoid initializing Git unless requested.
Avoid installing packages unless requested.
Make small, controlled changes.
Report what it changed.
Report assumptions and risks.
Suggest next steps.
Codex Must Not Do

Codex must not:

rewrite the entire system without permission
modify all agents at once
delete the original agency-agents folder
edit archived files unless asked
invent business strategy without a brief
create authentication unless required
create database logic unless required
create payment systems unless scoped
introduce legal, banking, payroll, medical, or high-risk systems without explicit safe scope
add large dependencies without explaining why
make a design generic unless requested
claim performance, SEO, or revenue results without evidence
generate fake case study metrics
deploy or push without confirmation if the user did not ask
Design Rules

Use design-systems/lynx-visual-division/DESIGN.md.

Important design principles:

every client needs its own design truth
do not force the Lynx portfolio aesthetic onto all clients
choose visual direction based on client, audience, industry, and business goal
design must support clarity, trust, usability, conversion, accessibility, and performance
contemporary design is welcome, but trends must serve strategy
AI-generated design must be evaluated, not accepted blindly
brand identity work must consider logo scalability, favicon usability, social avatar usability, digital contrast, typography and color implementation, dark/light background versions, and small-size readability

Design should be:

intentional
accessible
responsive
technically implementable
visually coherent
appropriate for the client
strong enough for portfolio presentation when relevant

Avoid:

generic SaaS templates
trend-chasing without purpose
excessive gradients
inaccessible contrast
heavy motion without reason
unreadable typography
overcomplicated layouts
making all client projects look the same
Brand Identity Rules

Brand identity work may include logo redesign, logo refinement, visual identity systems, favicon-first marks, social media avatar versions, mini brand guidelines, and digital implementation rules.

Brand identity work must not claim legal trademark clearance, official registration, or font licensing rights unless explicitly verified.

For brand identity work, use:

templates/brand-identity-brief.md
workflows/workflow-brand-identity.md
service-catalog.md
Business Boundaries

Lynx Visual Division may work on:

websites
landing pages
brand identity systems
logo redesign
digital logo implementation
catalogs
portfolios
simple tools
lightweight apps
SaaS-style MVPs
maintenance plans
audits
redesigns

Be cautious with:

legal systems
banking systems
payroll systems
medical systems
regulated industries
sensitive personal data
complex payment logic
mission-critical business systems

For high-risk systems:

define safe scope
avoid storing sensitive data casually
avoid compliance claims
avoid promises that require legal, medical, financial, or security expertise
recommend external specialists when needed
Language Rules

Default:

English first for international positioning
Spanish second for Latin America and Colombia

When writing bilingual content:

do not translate word for word if it sounds unnatural
preserve meaning and tone
adapt cultural context
keep Spanish professional and natural
keep English clear, premium, and business-oriented

For client messaging in Spanish:

prefer professional, respectful tone
avoid sounding robotic
use usted when the context is client-facing and formal
keep messages clear and concise
SEO Rules

For public-facing projects, consider:

title metadata
meta description
Open Graph tags
heading hierarchy
semantic HTML
alt text
internal links
local SEO when relevant
bilingual SEO when relevant
structured data only when useful

Do not:

keyword stuff
promise rankings
create fake SEO claims
invent traffic results
ignore user clarity for search optimization
Accessibility Rules

Accessibility is part of design quality.

Default target:

WCAG AA awareness
semantic HTML
readable contrast
keyboard-friendly controls
visible focus states
form labels
meaningful alt text
reduced motion consideration
touch-friendly controls
no color-only communication

Do not treat accessibility as a final patch.

Consider it from the beginning.

Performance Rules

Premium work must feel fast.

Check:

image sizes
video sizes
font loading
JavaScript bundle size
animation cost
layout shift
third-party scripts
mobile performance
unnecessary dependencies

A visually impressive site that loads slowly is not premium.

Portfolio Rules

When documenting projects:

be honest
explain role clearly
mention AI-assisted workflow professionally when relevant
do not invent metrics
do not exaggerate client results
include limitations if important
use strong screenshots
explain problem, solution, process, stack, and outcome
write English first
add Spanish if relevant

Use:

templates/case-study.md
workflows/workflow-portfolio-case-study.md
Maintenance Rules

Maintenance must have clear boundaries.

Never offer vague unlimited support.

Define:

monthly hours
included tasks
excluded tasks
request limits
response time
revision limits
reporting format
add-ons
price

Use:

templates/maintenance-plan.md
workflows/workflow-maintenance-plan.md
Client Outreach Rules

Client website audits must be respectful.

Do:

identify one positive observation
identify one useful opportunity
keep outreach short
offer a small next step
avoid pressure
avoid insults
avoid fake guarantees

Do not:

shame the business
say the website is terrible
promise revenue
promise SEO rankings
send huge unsolicited reports
spam repeatedly

Use:

templates/client-audit.md
workflows/workflow-client-website-audit.md
Git and Deployment Rules

Before Git operations:

check folder location
run git status
understand changed files
avoid force push unless necessary
avoid committing generated junk
write clear commit messages

Before deployment:

run build when possible
check root directory
check build command
check environment variables
check public assets
check main routes
check live URL after deploy

Use Git Workflow Master when needed.

Output Format for Codex

After completing a task, Codex should report:

files read
files changed
summary of changes
assumptions made
risks or limitations
commands run
command results
manual checks still needed
recommended next step

If no files were changed, say so clearly.

If the task could not be completed, explain why and suggest the smallest useful next action.

Standard Task Flow

For serious tasks:

Classify project/task type.
Select workflow.
Select agents.
Confirm scope.
Read relevant template/brief.
Define implementation plan.
Execute only required changes.
Check quality.
Report changes.
Suggest next step.
Anti-Patterns

Avoid:

using all agents for everything
using Codex for tiny edits
vague prompts
uncontrolled redesigns
adding features before defining MVP
adding auth too early
adding database too early
adding payment systems too early
ignoring mobile
ignoring accessibility
ignoring performance
ignoring SEO for public sites
creating generic visuals
making all clients look the same
inventing metrics
promising results without evidence
offering unlimited maintenance
changing many files without a plan
Final Rule

Lynx AI System is not a folder full of prompts.

It is an operating system for thinking, designing, building, reviewing, selling, and documenting digital products with AI assistance.

Use AI as a studio team.

Direction comes first.

Implementation comes second.

Quality review comes before delivery.si
