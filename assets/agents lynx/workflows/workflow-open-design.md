Workflow — Open Design and Design Systems
Purpose

This workflow helps Lynx Visual Division use Open Design, design systems, AI-assisted design tools, and structured visual exploration without losing strategic control.

Use this workflow for:

defining a client visual direction
creating a DESIGN.md file per client
exploring UI directions
translating brand identity into interface rules
creating design tokens
preparing a project for Codex implementation
building reusable component systems
creating portfolio visual systems
adapting design to different industries
avoiding generic AI-generated UI

The goal is not to let AI randomly generate beautiful screens.

The goal is to guide AI with:

clear business context
user understanding
visual references
design principles
accessibility standards
technical feasibility
performance awareness
brand-specific constraints
Core Principle

Open Design is a tool.

It is not the creative director.

The creative direction must come from:

the client brief
the target user
the business goal
the market context
the brand personality
the design mode
the anti-patterns
the intended user action

AI can generate options.
Lynx Visual Division chooses, edits, rejects, refines, and implements.

Recommended Tools

Use:

ChatGPT for strategy, design direction, prompts, and critique
Open Design for visual exploration and design system workflows
VS Code for editing DESIGN.md files
Codex for applying the design system to code
GitHub Copilot for small implementation edits
browser/manual review for visual QA
Vercel for deployment previews
Recommended Agents
Full Design System Team

Use for serious client/project design systems:

Brand Guardian
UX Researcher
UX Architect
UI Designer
Frontend Developer
Accessibility Auditor
Performance Benchmarker
Tool Evaluator
Reality Checker
Fast Visual Direction Team

Use for quick visual exploration:

Brand Guardian
UI Designer
UX Architect
Accessibility Auditor
Implementation Team

Use when applying the design system to code:

UX Architect
UI Designer
Frontend Developer
Accessibility Auditor
Reality Checker
Input Required

Before using this workflow, define:

project name
client or brand
project type
target user
business goal
design mode
visual references
anti-patterns
technical stack
accessibility requirements
performance constraints

Use:

templates/project-brief.md

or a client-specific brief.

If the project is a landing page, also use:

templates/landing-page-brief.md

If the project is a web app, also use:

templates/web-app-brief.md

Phase 1 — Design Context
Goal

Define why the design system exists.

Agents

Use:

Brand Guardian
UX Researcher
UX Architect
Questions

Answer:

What is the project?
Who is the target user?
What does the user need to understand quickly?
What action should the user take?
What emotion should the brand create?
What industry expectations exist?
What visual references are relevant?
What should this project avoid visually?
What level of experimentation is appropriate?
What must remain practical and maintainable?
Output

Create:

Design Context
Project

[Name]

Client / Brand

[Name]

Project Type

[Type]

Target User

[User]

Business Goal

[Goal]

Desired User Action

[Action]

Brand Feeling

[Feeling]

Industry Context

[Context]

Visual Risk Level

Low / Medium / High

Design System Purpose

[Why this design system is needed]

Quality Rule

Do not start generating visuals before the design context is clear.

Phase 2 — Choose Design Mode
Goal

Select the most appropriate visual direction for the project.

Agents

Use:

UI Designer
Brand Guardian
UX Researcher
Available Design Modes

Choose one or combine:

Editorial Premium
Modern SaaS
Creator Economy
Local Business Trust
Cultural / Alternative Brand
Warm Human Brand
Experimental Interactive
Productivity Dashboard
Game-like Interface
Custom
Selection Criteria

Choose based on:

industry
audience
brand maturity
trust level needed
conversion goal
emotional tone
content type
technical complexity
market expectations
portfolio value
Output

Create:

Design Mode Selection
Selected Mode

[Mode]

Why This Mode Fits

[Reason]

Secondary Influence

[Optional]

What This Direction Should Communicate

[Message]

What It Should Avoid

[Anti-patterns]

Quality Rule

Do not choose a style because it is trendy. Choose it because it fits the problem.

Phase 3 — Reference Research
Goal

Collect references without copying them.

Agents

Use:

UI Designer
UX Researcher
Brand Guardian
Tool Evaluator when comparing sources/tools
Reference Types

Use:

competitor websites
industry leaders
design award sites
SaaS products
editorial websites
local business websites
creator portfolios
product pages
app dashboards
motion references
typography references
color references
component libraries
accessibility examples
For Each Reference, Capture
URL or name
what works
what does not fit
useful principle
possible risk
what to adapt, not copy
Output

Create:

Reference Notes
Reference 1

Name / URL:

What works:

What does not fit:

Principle to extract:

Risk:

Reference 2

Name / URL:

What works:

What does not fit:

Principle to extract:

Risk:

Reference 3

Name / URL:

What works:

What does not fit:

Principle to extract:

Risk:

Quality Rule

Extract principles, not surface decoration.

Phase 4 — Define Visual System
Goal

Turn the direction into usable design rules.

Agents

Use:

UI Designer
Brand Guardian
Accessibility Auditor
UX Architect
Define
typography
color system
spacing system
layout system
grid behavior
component style
icon/image style
motion level
interaction feedback
accessibility requirements
anti-patterns
Output

Create:

Visual System
Design Keywords
[keyword]
[keyword]
[keyword]
[keyword]
[keyword]
Typography Direction

[Rules]

Color Direction

[Rules]

Spacing Direction

[Rules]

Layout Direction

[Rules]

Component Direction

[Rules]

Media Direction

[Rules]

Motion Direction

[Rules]

Accessibility Direction

[Rules]

Anti-Patterns
[avoid]
[avoid]
[avoid]
Quality Rule

The design system must be specific enough to guide implementation, but flexible enough to adapt to real content.

Phase 5 — Create Client DESIGN.md
Goal

Create a specific design system file for the client or project.

File Location

Create:

design-systems/[client-or-project-name]/DESIGN.md

Examples:

design-systems/lynx-visual-division/DESIGN.md
design-systems/cafe-leonor/DESIGN.md
design-systems/nido-canino/DESIGN.md
design-systems/divinitas/DESIGN.md
design-systems/lifexp/DESIGN.md
Recommended Structure

Use this structure:

[Client / Project Name] — Design System
Purpose
Brand / Product Context
Target User
Business Goal
Design Mode
Visual Keywords
Typography
Color System
Layout System
Component System
Motion and Interaction
Accessibility
Performance
Content Tone
SEO Notes
Anti-Patterns
Implementation Notes
Quality Checklist
Output

Create a completed DESIGN.md file that can guide:

ChatGPT
Open Design
Codex
Copilot
manual design review
future project maintenance
Quality Rule

The global Lynx DESIGN.md defines method.
Client DESIGN.md files define specific aesthetics.

Phase 6 — Open Design Prompt Creation
Goal

Create a strong prompt for Open Design or similar tools.

Agents

Use:

UI Designer
Brand Guardian
UX Architect
Accessibility Auditor
Prompt Must Include
project name
project type
target user
business goal
desired user action
selected design mode
visual keywords
typography direction
color direction
layout direction
component needs
motion level
accessibility rules
anti-patterns
technical stack if relevant
Open Design Prompt Template

Use this structure:

Project:
[Name]

Project type:
[Landing page / business website / web app / catalog / portfolio]

Target user:
[User]

Business goal:
[Goal]

Primary user action:
[Action]

Design mode:
[Mode]

Visual direction:
[Keywords and description]

Typography:
[Direction]

Color:
[Direction]

Layout:
[Direction]

Components needed:
[List components]

Motion:
[Motion direction]

Accessibility:
[Rules]

Performance:
[Rules]

Avoid:
[List anti-patterns]

Output needed:
[UI direction / design system / component concept / page layout / app screen]

Quality Rule

A good design prompt is specific about goals and constraints, not just aesthetics.

Phase 7 — Generate Visual Directions
Goal

Explore multiple options without committing too early.

Agents

Use:

UI Designer
Brand Guardian
UX Architect
Generate

At least 2–3 visual directions when possible:

Safe / Commercial
Premium / Refined
Experimental / Differentiated

For each direction, define:

name
mood
typography
color
layout
component feel
motion
best use case
risks
Output

Create:

Visual Direction Options
Option 1 — [Name]

Mood:

Typography:

Color:

Layout:

Components:

Motion:

Best For:

Risks:

Option 2 — [Name]

Mood:

Typography:

Color:

Layout:

Components:

Motion:

Best For:

Risks:

Option 3 — [Name]

Mood:

Typography:

Color:

Layout:

Components:

Motion:

Best For:

Risks:

Quality Rule

Do not select the most impressive option automatically. Select the most appropriate option.

Phase 8 — Evaluate Directions
Goal

Choose the best direction based on strategy, not taste alone.

Agents

Use:

Brand Guardian
UX Researcher
UI Designer
Accessibility Auditor
Performance Benchmarker
Reality Checker
Evaluation Criteria

Rate each direction from 1 to 5:

brand fit
audience fit
clarity
conversion potential
accessibility
performance risk
technical feasibility
originality
maintainability
portfolio value
Output

Create:

Direction Evaluation
Option 1

Brand Fit:
Audience Fit:
Clarity:
Conversion:
Accessibility:
Performance:
Feasibility:
Originality:
Maintainability:
Portfolio Value:

Option 2

[Same criteria]

Option 3

[Same criteria]

Selected Direction

[Name]

Why

[Reason]

Required Adjustments

[List]

Quality Rule

The selected direction should balance creativity and usability.

Phase 9 — Translate Design Into Code Rules
Goal

Make sure the chosen design can be implemented.

Agents

Use:

UX Architect
UI Designer
Frontend Developer
Accessibility Auditor
Define
design tokens
CSS variables or Tailwind tokens
component hierarchy
layout rules
responsive rules
motion rules
focus states
content constraints
asset requirements
Output

Create:

Implementation Design Rules
Tokens Needed
colors
typography
spacing
radius
shadows
motion
breakpoints
Components Needed
[Component]
[Component]
[Component]
Responsive Rules

Mobile:

Tablet:

Desktop:

Accessibility Rules

[Rules]

Performance Rules

[Rules]

Asset Requirements

[Images, icons, video, etc.]

Quality Rule

If the design cannot be implemented clearly, it is not ready.

Phase 10 — Apply Design System With Codex
Goal

Use Codex to apply the design system across project files.

Use Codex When

Use Codex if:

multiple components need updates
design tokens need to be created
CSS variables need refactoring
Tailwind classes need systematic cleanup
responsive layout needs multiple changes
visual system must be applied across several files
Do Not Use Codex When

Avoid Codex if:

only one markdown file changes
only one color or text value changes
the design direction is not defined
the task is still conceptual
Codex Prompt Template

Read AGENTS.md, agent-index.md, workflow-router.md, and workflows/workflow-open-design.md first.

Task:
Apply the design system for [CLIENT / PROJECT NAME] to the current project.

Context:
[Paste project context]

Design system:
[Paste DESIGN.md content or file path]

Current issue:
[Explain what needs to change]

Primary agents:

UX Architect
UI Designer
Frontend Developer
Accessibility Auditor
Reality Checker

Requirements:

preserve existing functionality
apply the design system consistently
improve visual hierarchy
improve responsive behavior if needed
keep accessibility basics
avoid unnecessary dependencies
avoid unrelated redesigns
keep performance in mind

Out of scope:

do not change product logic
do not add authentication
do not add database
do not add payment logic
do not rewrite unrelated pages
do not delete files
do not change Git history

Acceptance criteria:

The selected design direction is reflected in the UI.
Components feel more consistent.
Typography, spacing, and color usage are more intentional.
Responsive layout remains functional.
Accessibility basics are not worsened.
No unrelated functionality is changed.

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
Phase 11 — Visual QA
Goal

Review the implementation against the design direction.

Agents

Use:

UI Designer
Brand Guardian
Accessibility Auditor
Reality Checker
Check
Does the interface match the selected design mode?
Is the typography consistent?
Is spacing intentional?
Are colors controlled?
Are components reusable?
Are hover/focus states clear?
Does mobile feel designed, not squeezed?
Does the interface feel appropriate for the client?
Does it avoid the defined anti-patterns?
Does it remain accessible?
Does it remain fast?
Output

Create:

Visual QA
Matches Design Direction

Yes / Partially / No

Strong Areas
[Area]
[Area]
Weak Areas
[Area]
[Area]
Required Fixes
[Fix]
[Fix]
Optional Polish
[Polish]
[Polish]
GO / NO-GO

[GO / NO-GO]

Phase 12 — Design System Documentation
Goal

Save what was learned for future reuse.

Agents

Use:

Technical Writer
ZK Steward
UI Designer
Brand Guardian
Document
selected direction
rejected directions
final tokens
component patterns
accessibility decisions
performance decisions
implementation notes
screenshots
lessons learned
Output

Add to the project documentation:

Design System Notes
Final Direction

[Direction]

Why It Was Selected

[Reason]

What Was Avoided

[Anti-patterns]

Reusable Patterns
[Pattern]
[Pattern]
Lessons Learned
[Lesson]
[Lesson]
Final Open Design Checklist

Before applying a design system:

 project brief exists
 target user is clear
 business goal is clear
 design mode selected
 references reviewed
 anti-patterns defined
 DESIGN.md created
 accessibility risks identified
 performance risks identified
 component needs defined
 implementation rules defined

Before delivery:

 visual direction is reflected
 typography is consistent
 color system is controlled
 spacing rhythm is consistent
 components are reusable
 mobile layout works
 focus states are visible
 contrast is acceptable
 motion is purposeful
 performance is acceptable
 anti-patterns avoided
 design documentation updated
Final Rule

Open Design should expand creative possibilities, not replace design judgment.

The best result is not the most futuristic screen.

The best result is the interface that fits the client, the user, the business goal, and the technical reality.