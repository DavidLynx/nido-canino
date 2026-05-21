Lynx AI System — Learning Roadmap
Purpose

This file defines the internal learning roadmap for using Lynx AI System, Codex, GitHub Copilot, Open Design, Next.js, React, TypeScript, Vercel, and AI-assisted design workflows.

This roadmap is for internal use only.

It exists to help the user understand enough technical and design logic to direct AI tools with control.

It must not become visible inside final client projects, portfolio pages, apps, websites, or public deliverables.

Critical Rule

Learning support must be invisible in the final product.

Codex, Copilot, ChatGPT, or any AI assistant must not add visible educational labels, tutorial sections, learning notes, “Phase 1 / Phase 2” markers, internal explanations, or roadmap references to client-facing UI unless explicitly requested.

This roadmap may guide:

explanations during conversation
internal notes
comments when useful and non-intrusive
implementation decisions
safer prompts
user understanding
project planning

This roadmap must not appear in:

public website copy
UI labels
navigation
project pages
landing page sections
production app screens
case study claims
metadata
SEO text
client deliverables
design system outputs unless explicitly internal
Learning Philosophy

The user does not need to become a traditional full-time programmer.

The goal is to become a visual designer and creative technical director who can:

understand web/app architecture
direct AI coding tools
review implementation decisions
identify when something is overcomplicated
understand what Codex is changing
use VS Code with more confidence
avoid losing control of projects
sell digital services professionally
communicate better with clients and developers
build strong portfolio projects with AI assistance

Learning should happen naturally while building.

Every explanation should be connected to a real project, task, bug, design decision, or business need.

Avoid academic lessons detached from practical use.

When to Teach

Teach concepts when:

the user asks directly
a new technical concept appears in a task
the user needs to make a decision
Codex is about to touch several files
a bug requires understanding the cause
a deployment problem appears
a design decision affects implementation
a stack choice must be made
a project needs architecture planning
the user seems unsure about a term
understanding the concept prevents future mistakes

Do not teach when:

the task is a simple copy/paste edit
the user needs a fast answer
the concept is not relevant
the explanation would interrupt flow
the user is only asking for a direct prompt
the product needs implementation, not theory
the explanation would add clutter
Teaching Style

When explaining, use:

simple language
practical examples
project-based context
visual/design analogies
short explanations first
deeper explanation only if needed
“when to use / when not to use”
“what this means for your project”
exact next action

Avoid:

unnecessary jargon
long academic theory
overwhelming detail
pretending the user needs to memorize everything
explaining concepts unrelated to the current task
turning every answer into a class

Good explanation structure:

What it is
Why it matters
When to use it
When not to use it
How it applies to the current project
What to do next
Internal Learning Areas

The user should gradually understand these areas.

1. Web Foundations

Learn enough to understand:

what HTML does
what CSS does
what JavaScript does
how a browser loads a page
how assets work
what responsive design means technically
what semantic HTML means
why accessibility matters
why performance matters

Practical goal:

The user can look at a basic web project and understand what each part is responsible for.

2. Project Structure

Learn enough to recognize:

root folder
package.json
public folder
src folder
app folder
pages folder
components folder
styles folder
lib folder
utils folder
data folder
environment variables
config files

Practical goal:

The user can ask Codex to edit the right area and understand why a file matters.

3. Git and GitHub

Learn enough to safely use:

git status
git add
git commit
git push
git pull
branches
remote origin
main branch
resolving basic push errors
avoiding accidental commits
understanding changed files

Practical goal:

The user can push updates safely and understand what is being sent to GitHub.

4. Vercel and Deployment

Learn enough to understand:

build command
root directory
framework detection
environment variables
deployment logs
404 errors
failed builds
preview deployments
production deployments
domain connection later

Practical goal:

The user can diagnose common deployment issues and ask for precise help.

5. Next.js

Learn enough to understand:

App Router
routes
layouts
pages
metadata
server components
client components
public assets
dynamic routes
static generation basics
bilingual routing
image optimization
deployment on Vercel

Practical goal:

The user can direct Codex on portfolio, landing pages, SEO pages, and scalable web apps.

6. Vite + React

Learn enough to understand:

when Vite is simpler than Next.js
React components
props
state
localStorage
component hierarchy
simple routing if used
build output
Vercel/static deployment

Practical goal:

The user can use Vite for fast tools, prototypes, experiments, and small apps.

7. React Basics

Learn enough to understand:

components
props
state
events
conditional rendering
lists/maps
forms
controlled inputs
effects at a basic level
component reuse
component splitting

Practical goal:

The user can read component structure and understand what Codex is modifying.

8. TypeScript Basics

Learn enough to understand:

types
interfaces
props typing
arrays and objects
union types
why errors happen
when TypeScript protects the project
when TypeScript feels annoying but useful

Practical goal:

The user does not need to write advanced TypeScript, but can understand common errors and instruct Codex better.

9. Styling Systems

Learn enough to understand:

CSS variables
Tailwind CSS
utility classes
design tokens
responsive classes
breakpoints
spacing systems
typography scales
dark mode
className structure
component styling consistency

Practical goal:

The user can translate visual judgment into implementable rules.

10. UI / UX Implementation

Learn enough to understand:

information architecture
user flows
visual hierarchy
CTA placement
form usability
navigation behavior
empty states
loading states
error states
responsive behavior
accessibility basics
interaction feedback

Practical goal:

The user can guide Codex to improve usability, not only appearance.

11. SEO Basics

Learn enough to understand:

title
meta description
Open Graph
headings
semantic structure
alt text
internal links
local SEO basics
bilingual SEO basics
sitemap/robots basics
search intent

Practical goal:

The user can create websites that are not only beautiful, but also findable and shareable.

12. Data and Persistence

Learn enough to understand:

static data
local JSON
localStorage
Supabase
APIs
environment variables
client-side vs server-side data
what data is sensitive
when a database is actually needed

Practical goal:

The user can avoid adding backend complexity too early.

13. APIs

Learn enough to understand:

what an API is
API keys
public vs secret keys
rate limits
fetch requests
error handling
loading states
environment variables
when API usage creates risk

Practical goal:

The user can build API-based apps like My Astrology App with safe scope.

14. Supabase

Learn enough to understand:

when Supabase is needed
auth basics
database tables
public keys vs secret keys
environment variables
RLS basics conceptually
storage basics
risks of exposing data

Practical goal:

The user can decide when a project needs Supabase and when localStorage is enough.

15. Forms and Contact Flows

Learn enough to understand:

contact forms
form validation
spam risks
external form tools
WhatsApp links
booking links
email links
serverless form handling
when simple links are better than custom forms

Practical goal:

The user can avoid overcomplicated contact systems.

16. Payments

Learn enough to understand:

payment links
checkout
Stripe basics
e-commerce complexity
why payments increase responsibility
what should be avoided in early prototypes

Practical goal:

The user can scope payment-related work safely.

17. Accessibility

Learn enough to understand:

contrast
keyboard navigation
focus states
semantic HTML
form labels
alt text
reduced motion
touch targets
readable typography
why accessibility is quality

Practical goal:

The user can include accessibility in design direction and QA.

18. Performance

Learn enough to understand:

image optimization
video weight
font loading
JavaScript bundle size
animation cost
lazy loading
layout shift
Core Web Vitals basics
mobile performance

Practical goal:

The user can keep visually strong websites fast.

19. Brand Identity for Digital

Learn enough to understand:

logo scalability
favicon-first design
responsive logo systems
SVG use
PNG transparency
social avatar needs
dark/light logo versions
typography and color systems
mini brand guidelines
digital implementation rules

Practical goal:

The user can sell and implement brand identity work connected to web design.

20. AI-Assisted Workflow

Learn enough to understand:

when to use ChatGPT
when to use Codex
when to use Copilot
when to use Open Design
how to write scoped prompts
how to prevent over-editing
how to review AI outputs
how to pass context between tools
how to document decisions

Practical goal:

The user can act as creative director of an AI-assisted studio workflow.

21. Open Design

Learn enough to understand:

how to install/run Open Design
what it is useful for
how to feed it a design brief
how to use DESIGN.md
how to evaluate AI-generated design directions
how to move from design exploration to code implementation
what not to trust blindly

Practical goal:

The user can use Open Design as part of a controlled design workflow, not as random visual generation.

Learning Triggers

Use learning support when these triggers appear:

Stack Decision Trigger

If deciding between Next.js, Vite, static HTML, Supabase, CMS, or API.

Explain:

what each option means
what is simplest
what is safest
what fits the business goal
Codex Scope Trigger

If the task touches several files.

Explain:

why Codex is appropriate
what Codex should read
what Codex must not touch
how to verify the result
Deployment Error Trigger

If Vercel/Git/build fails.

Explain:

what the error means
where to look
what command to run
what not to do blindly
Visual-to-Code Trigger

If converting design decisions into implementation.

Explain:

tokens
components
responsive behavior
typography
spacing
motion constraints
Data Trigger

If data persistence appears.

Explain:

localStorage vs database
static JSON vs Supabase
sensitive data risks
MVP-safe approach
Bilingual Trigger

If content needs English/Spanish.

Explain:

translation structure
avoiding hardcoded text
SEO implications
layout impact of longer Spanish text
Brand Identity Trigger

If logo/identity work appears.

Explain:

logo versions
SVG/PNG/favicon
social avatar
small-size usability
digital implementation
How AI Assistants Should Teach

When teaching, AI assistants should use one of these formats.

Micro Explanation

Use for quick concepts.

Format:

Concept:
Why it matters:
In this project:
Next action:
Practical Explanation

Use for task decisions.

Format:

What this means:
Options:
Recommended option:
Risk:
Next step:
Debug Explanation

Use for errors.

Format:

Error meaning:
Likely cause:
Smallest safe fix:
Command or file to check:
What not to do:
Design-to-Code Explanation

Use for visual implementation.

Format:

Visual decision:
Code meaning:
Files likely involved:
Responsive risk:
Accessibility risk:
Next step:
Codex Instruction

Codex should treat this file as internal learning support only.

Codex may use this file to:

explain concepts in its summary
choose safer implementation approaches
identify when the user may need clarification
keep implementation educational when useful

Codex must not:

add learning roadmap text to production UI
create visible tutorial sections unless requested
add “learning phase” labels to apps
expose internal roadmap content in public pages
add educational comments everywhere
over-explain inside code comments
include this roadmap in SEO metadata
include this roadmap in case study copy unless intentionally discussing process
create public pages named “Learning Roadmap” inside client/portfolio projects
Learning Roadmap Visibility

This file should remain:

internal
local
operational
non-client-facing

It may be included in the Lynx AI System folder.

It should not be copied into public project folders unless it is clearly marked internal and excluded from public UI.

If copied into a project repo, make sure it is not imported into the app, linked in navigation, rendered as a page, or exposed as public content.

Portfolio Learning Rule

While building the Lynx Visual Division portfolio, learning may happen around:

Next.js
routing
bilingual structure
components
animations
SVG motion
responsive design
SEO
Vercel
Git
Open Design

But the portfolio itself should present Lynx as a professional studio.

It should not present the portfolio as a student exercise.

Case studies may mention AI-assisted workflow professionally, but should not frame the work as beginner practice.

Final Rule

The learning roadmap is a private compass.

It helps the user understand and direct the work.

It must not reduce the perceived professionalism of the final product.