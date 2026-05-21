Workflow — Web App MVP
Purpose

This workflow helps Lynx Visual Division plan, build, polish, and document lightweight web apps and SaaS-style MVPs.

Use this workflow for:

interactive tools
creator tools
dashboards
productivity apps
simple SaaS MVPs
portfolio web apps
local-first tools
prototypes
internal business tools
game-like utilities

Examples:

LifeXP
Neon Dice
Social Comment Generator
QR Generator
Dark Wallet
creator business organizer
simple content planning dashboard
client mini-CRM
habit tracker
visual calculator
AI-assisted utility

The goal is to build useful apps without overengineering.

A good MVP should:

solve one clear problem
have one strong primary flow
be easy to understand
work on mobile and desktop
avoid unnecessary backend complexity
feel visually intentional
be technically maintainable
be easy to present in a portfolio
Recommended Tools

Use:

ChatGPT for strategy, product thinking, UX, prompts, and explanation
VS Code for simple edits
GitHub Copilot for small code assistance
Codex for multi-file implementation
Open Design for design systems or interface exploration
Vercel for deployment
Supabase only when auth or database is truly needed
Recommended Agents
Full MVP Team

Use for serious app projects:

Product Manager
UX Researcher
Software Architect
Sprint Prioritizer
Rapid Prototyper
UX Architect
UI Designer
Frontend Developer
Accessibility Auditor
Performance Benchmarker
Reality Checker
Git Workflow Master
Fast MVP Team

Use for quick prototypes:

Product Manager
Rapid Prototyper
UX Architect
UI Designer
Frontend Developer
Reality Checker
Polish Team

Use when the app already exists:

UX Architect
UI Designer
Frontend Developer
Accessibility Auditor
Performance Benchmarker
Reality Checker
Input Required

Before starting, fill:

templates/web-app-brief.md

At minimum, define:

app name
user problem
target user
core feature
MVP features
out-of-scope features
data persistence
stack
design mode
primary user flow
deployment target

If the brief is incomplete, start with clearly marked assumptions.

Phase 1 — Product Classification
Goal

Understand what kind of app is being built.

Questions

Answer:

Is this a tool, dashboard, game-like app, SaaS MVP, or portfolio demo?
Who is the primary user?
What problem does the app solve?
What is the main task the user must complete?
Does it need login?
Does it need a database?
Does it need payments?
Does it need export/download?
Is it public-facing or internal?
Is this for portfolio, client work, or future product potential?
Output

Create a product classification:

app type
target user
main user problem
core feature
recommended stack
data persistence choice
agent team
execution mode
Quality Rule

If the app cannot be explained in one sentence, simplify the idea before building.

Phase 2 — Problem and User Definition
Goal

Define the real user need before designing features.

Agents

Use:

Product Manager
UX Researcher
Growth Hacker if monetization or acquisition matters
Tasks

Define:

target user
user context
main pain point
desired outcome
current workaround
reason the app should exist
why a normal website is not enough
what success feels like for the user
Output

Create:

Product Definition
Target User

[Write user]

User Problem

[Write problem]

Desired Outcome

[Write desired outcome]

Core Promise

This app helps [target user] do [main task] so they can [desired outcome].

Current Alternatives

[Write alternatives or competitor tools]

Differentiator

[Write what makes this app useful or interesting]

Quality Rule

Do not add features until the core user problem is clear.

Phase 3 — MVP Scope
Goal

Reduce the idea to the smallest useful version.

Agents

Use:

Product Manager
Sprint Prioritizer
Rapid Prototyper
Software Architect
Tasks

Define:

must-have features
nice-to-have features
out-of-scope features
first release goal
risk level
technical complexity
build sequence
MVP Scope Template
Must-Have
[Feature]
[Feature]
[Feature]
Nice-to-Have
[Feature]
[Feature]
[Feature]
Out of Scope
[Feature not now]
[Feature not now]
[Feature not now]
MVP Success Criteria

The MVP is successful if:

[Criterion]
[Criterion]
[Criterion]
Quality Rule

If the MVP has more than 3–5 must-have features, reduce scope.

Phase 4 — User Flow
Goal

Map the primary app experience.

Agents

Use:

UX Researcher
UX Architect
Product Manager
Tasks

Define:

entry point
onboarding
main action
result or feedback
save/export/share behavior
return user experience
empty states
error states
loading states
Output

Create:

Primary User Flow
User arrives
User understands the app
User enters or selects information
User completes main action
App shows result or feedback
User saves, exports, shares, or continues
User returns later if relevant
Screens Needed
[Screen]
[Screen]
[Screen]
States Needed
Empty state:
Loading state:
Error state:
Success state:
Reset state:
Saved state:
Quality Rule

The first version should have one primary flow. Secondary flows can wait.

Phase 5 — Technical Architecture
Goal

Choose the simplest technical structure that supports the MVP.

Agents

Use:

Software Architect
Frontend Developer
Rapid Prototyper
Stack Decision

Use Vite + React when:

it is a quick tool
SEO is not important
there are few pages
it is a visual or portfolio experiment
the app is mostly client-side

Use Next.js when:

SEO matters
the app needs public pages
the project belongs to the main portfolio
routes and metadata matter
the app may grow into a serious product

Use localStorage when:

data is personal and simple
no account is needed
the app works locally
persistence is basic

Use Supabase when:

login is needed
data must sync across devices
multiple users are involved
a real database is required

Avoid backend when:

localStorage is enough
there is no real user account need
data does not need syncing
the MVP can be validated without it
Output

Create:

Technical Architecture
Stack

[Next.js / Vite + React / Existing]

Styling

[Tailwind / CSS variables / existing]

Data Persistence

[None / localStorage / JSON / Supabase]

Main Routes or Screens
[Route/screen]
[Route/screen]
[Route/screen]
Main Components
[Component]
[Component]
[Component]
State Model

[Describe state simply]

Out of Scope Technically

[List what should not be built yet]

Quality Rule

Do not add authentication, database, or payments unless the MVP truly needs them.

Phase 6 — UI System
Goal

Define the visual and component system before coding too much.

Agents

Use:

UI Designer
UX Architect
Brand Guardian
Accessibility Auditor
Tasks

Define:

design mode
visual keywords
typography direction
color direction
layout system
component style
interaction style
feedback states
motion rules
accessibility risks
App Design Modes

Choose one or combine:

Modern SaaS
Creator Economy
Productivity Dashboard
Editorial Premium
Game-like Interface
Experimental Interactive
Warm Human Brand
Local Business Tool
Cultural / Alternative Brand
Custom
Output

Create:

App Visual Direction
Design Mode

[Selected mode]

Visual Keywords
[keyword]
[keyword]
[keyword]
Typography

[Direction]

Color

[Direction]

Layout

[Direction]

Components

[Cards, forms, controls, panels, buttons, tabs, etc.]

Motion

[Motion direction]

Accessibility Notes

[Contrast, focus, keyboard, reduced motion]

Anti-Patterns
[Avoid]
[Avoid]
[Avoid]
Quality Rule

The app should feel like a real product, not a collection of disconnected UI pieces.

Phase 7 — Prototype Implementation
Goal

Build the first working version.

Agents

Use:

Rapid Prototyper
Frontend Developer
UX Architect
UI Designer
Use Codex When

Use Codex if:

several components need to be created
state logic touches multiple files
routing needs to be added
persistence needs to be implemented
the app needs a full first version
responsive behavior needs project-wide changes
Use VS Code Manually When

Use manual editing if:

changing one file
editing copy
adjusting a small style
replacing a template
Codex Prompt Template

Read AGENTS.md, agent-index.md, workflow-router.md, and workflows/workflow-web-app-mvp.md first.

Task:
Build or improve the MVP for [PROJECT NAME].

Context:
[Paste project context]

Web app brief:
[Paste summary or file path]

Core user problem:
[Write problem]

Core feature:
[Write feature]

MVP features:
[List features]

Out of scope:
[List what not to build]

Technical requirements:

Stack: [Next.js / Vite + React / existing]
Styling: [Tailwind / CSS variables / existing]
Data persistence: [none / localStorage / Supabase / other]
Language: [English / Spanish / bilingual]
Deployment: Vercel

Primary agents:

Product Manager
Software Architect
UX Architect
UI Designer
Frontend Developer
Accessibility Auditor
Reality Checker

Requirements:

implement the main user flow
keep the app responsive
use accessible controls
keep state logic understandable
avoid unnecessary dependencies
avoid backend unless explicitly required
preserve existing functionality
do not redesign unrelated areas

Acceptance criteria:

The main user flow works.
The core feature is usable.
The app works on mobile and desktop.
Data persistence works if required.
Empty/error/success states exist if relevant.
No unnecessary backend was added.
No unrelated files were modified.

After finishing, report:

files read
files changed
summary of changes
assumptions made
risks or limitations
commands run
command results
manual checks still needed
recommended next step
Phase 8 — State and Persistence Review
Goal

Check whether the app stores and updates data safely.

Agents

Use:

Software Architect
Frontend Developer
Code Reviewer
Check
state structure
localStorage keys
invalid stored data handling
reset behavior
versioning if needed
server/client issues in Next.js
unnecessary database use
sensitive data risks
import/export if relevant
Output

Create:

State Review
Data Stored

[List data]

Storage Method

[None / localStorage / Supabase / other]

Risks

[List risks]

Fixes Needed

[List fixes]

Manual Test

[List steps]

Quality Rule

Never store sensitive data casually.

Phase 9 — UX Review
Goal

Check if the app is actually understandable and useful.

Agents

Use:

UX Researcher
UX Architect
Product Manager
Reality Checker
Check
Can users understand what the app does quickly?
Is the main action obvious?
Is onboarding needed?
Are labels clear?
Are empty states helpful?
Are errors understandable?
Does the app give useful feedback?
Is mobile usable?
Is the app too complex for the MVP?
Is anything distracting from the core task?
Output

Create:

UX Review
Strengths
Confusing Areas
Missing States
Top 5 UX Improvements
MVP Scope Recommendation

[Keep / simplify / expand carefully]

Phase 10 — UI Polish Pass
Goal

Make the app feel polished and portfolio-ready.

Agents

Use:

UI Designer
Brand Guardian
Frontend Developer
Accessibility Auditor
Check
typography hierarchy
spacing
alignment
component consistency
button styles
form styles
feedback states
card/panel structure
responsive layout
visual rhythm
hover/focus states
dark/light mode if present
visual identity
Output

Create:

UI Polish Review
Visual Strengths
Visual Weaknesses
Changes Made
Remaining Polish Items
Portfolio Readiness

[Low / Medium / High]

Quality Rule

Do not polish by adding noise. Polish by improving clarity, rhythm, and consistency.

Phase 11 — Accessibility Pass
Goal

Make the app usable by more people.

Agents

Use:

Accessibility Auditor
Frontend Developer
UI Designer
Check
semantic HTML
button labels
form labels
keyboard navigation
focus states
contrast risks
alt text if images exist
reduced motion
touch targets
no color-only communication
screen reader risk areas
Output

Create:

Accessibility Review
Critical Issues
Important Issues
Optional Improvements
Fixes Made
Manual Checks Needed
Accessibility Status

[Needs work / Acceptable / Strong]

Phase 12 — Performance Pass
Goal

Keep the app fast and smooth.

Agents

Use:

Performance Benchmarker
Frontend Developer
UI Designer
Check
bundle size risks
heavy dependencies
image optimization
animation performance
unnecessary re-renders
excessive client-side logic
font loading
layout shift
storage performance
mobile performance
Output

Create:

Performance Review
Risks Found
Fixes Made
Remaining Recommendations
Manual Tests Needed
Quality Rule

A slow app does not feel premium.

Phase 13 — Reality Check
Goal

Decide if the MVP is usable, deployable, and portfolio-ready.

Agents

Use:

Reality Checker
Product Manager
UX Architect
Accessibility Auditor
Performance Benchmarker
Check
app runs
build passes
main flow works
core feature works
mobile layout works
no obvious console errors
empty/error states exist
data persistence works if required
copy explains the app
CTAs or actions are clear
accessibility basics are acceptable
performance risks are acceptable
portfolio story is clear
Output

Create:

Web App MVP Reality Check
GO / NO-GO

[GO / NO-GO]

Critical Issues
Important Issues
Optional Polish
Required Fixes Before Deploy
Recommended Next Step
Phase 14 — Deployment
Goal

Prepare the app for publishing.

Agents

Use:

Git Workflow Master
Frontend Developer
Reality Checker
Check
package.json scripts
build command
root directory
Vercel compatibility
environment variables
public assets
routes
metadata
runtime errors
localStorage/server issues if Next.js
deployment link
Common Commands

Use depending on project:

git status
npm run build
git add .
git commit -m "Build MVP for [project]"
git push
Quality Rule

Do not deploy before checking the main user flow.

Phase 15 — Portfolio Case Study
Goal

Turn the app into portfolio material.

Agents

Use:

Content Creator
Technical Writer
Brand Guardian
Product Manager
Reality Checker
Use Template

templates/case-study.md

Document
problem
target user
solution
core feature
UX flow
UI direction
stack
AI-assisted workflow
screenshots
live URL
GitHub link if public
limitations
lessons learned
Important

Do not claim fake metrics.

If no real metrics exist, write:

No verified performance metrics yet.

Final MVP Checklist

Before calling the MVP finished, confirm:

 product problem is clear
 target user is defined
 MVP scope is limited
 out-of-scope features are documented
 primary flow works
 core feature works
 mobile layout works
 empty states exist if needed
 error states exist if needed
 persistence works if needed
 no unnecessary backend added
 no unnecessary auth added
 accessibility basics checked
 performance risks reviewed
 build passes
 deployment ready
 case study notes captured
Final Rule

A web app MVP is not finished when it has many features.

It is finished when one useful flow works clearly, reliably, and beautifully enough to prove the idea.