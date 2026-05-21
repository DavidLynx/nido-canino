# Codex Task Template — Lynx AI System

## 1. Task Identification

### Task Name

[Write a clear task name]

### Project

[Write project name]

### Task Type

Select one:

- Project inspection
- File organization
- New page
- New component
- UI polish
- Responsive fix
- Bug fix
- Build error fix
- Runtime error fix
- SEO pass
- Accessibility pass
- Performance pass
- Bilingual support
- Refactor
- Design system implementation
- Landing page implementation
- Web app MVP implementation
- Catalog implementation
- Git / deployment preparation
- Documentation
- Other: [explain]

### Scope Size

Select one:

- Tiny: one file, small edit
- Small: 1–3 files
- Medium: several files or one full page
- Large: project structure or multi-page implementation

### Should Codex Be Used?

Select:

- No, do manually in VS Code
- Maybe, if files are connected
- Yes, Codex is appropriate
- Yes, Codex required

---

## 2. Context

### What is the project?

[Briefly explain the project]

### What is the current state?

[Explain what exists now]

### What is the problem or goal?

[Explain the exact issue or desired outcome]

### Why does this matter?

Select or explain:

- improves UX
- improves UI
- improves SEO
- fixes broken functionality
- improves performance
- improves accessibility
- prepares for deployment
- improves portfolio quality
- supports client delivery
- improves maintainability
- other: [explain]

---

## 3. Relevant Files

### Files Codex Should Read First

List known files:

- `AGENTS.md`
- `agent-index.md`
- `workflow-router.md`
- [project file]
- [project file]

### Files or Areas Likely Involved

List if known:

- [file/path]
- [file/path]
- [file/path]

### Files Codex Must Not Touch

List protected files:

- [file/path]
- [file/path]

If none:

```txt
No specific protected files, but avoid unrelated changes.
4. Agent Selection
Primary Agents

Select from:

Agents Orchestrator
UX Researcher
UX Architect
UI Designer
Frontend Developer
Rapid Prototyper
Software Architect
SEO Specialist
Growth Hacker
Content Creator
Brand Guardian
Accessibility Auditor
Performance Benchmarker
Reality Checker
Git Workflow Master
Code Reviewer
Technical Writer
Tool Evaluator
Workflow Optimizer
Sales Outreach
Proposal Strategist

Selected agents:

[Agent 1]
[Agent 2]
[Agent 3]
Why these agents?

[Explain briefly]

5. Exact Task
Task Description

Write the exact task:

[Write what Codex must do]

Acceptance Criteria

The task is complete when:

[Criterion]
[Criterion]
[Criterion]
[Criterion]
Out of Scope

Codex must not:

[Do not do this]
[Do not do this]
[Do not do this]

Default exclusions:

do not rewrite unrelated files
do not redesign the whole project unless asked
do not add dependencies unless explicitly approved
do not delete files unless explicitly approved
do not change Git history
do not initialize Git unless asked
do not install packages unless asked
6. Design / UX Requirements

Fill only if relevant.

Visual Direction

[Describe visual direction]

UX Requirements

[Describe UX expectations]

Responsive Requirements

Select:

mobile-first
desktop-first
balanced
specific breakpoint issue
not relevant

Details:

[Write notes]

Accessibility Requirements

Default:

semantic HTML
readable contrast
keyboard-friendly controls
visible focus states
form labels when needed
reduced motion consideration when motion exists

Extra notes:

[Write notes]

7. Technical Requirements
Stack

Select or write:

Next.js
Vite + React
React
TypeScript
JavaScript
Tailwind CSS
CSS variables
Existing stack
Other: [write]
Data / State

Select:

none
localStorage
local JSON
Supabase
existing API
other: [write]
Dependencies

Select:

do not add dependencies
dependencies may be added only if explained first
dependency required: [write]
Environment Variables

Select:

none
existing only
new variables required: [list names only]
not sure
8. Testing / Verification
Codex Should Run

Select if available:

npm run lint
npm run build
npm run test
npm run dev only if needed
no commands needed
not sure
Manual Checks Needed

Select:

mobile layout
desktop layout
links
forms
buttons
language switch
theme switch
export/download
localStorage persistence
deployment
accessibility basics
performance basics
other: [explain]
Expected Result

[Describe what should be true after the task]

9. Output Required From Codex

Codex must report:

files read
files changed
summary of changes
assumptions made
risks or limitations
commands run
command results
manual checks still needed
recommended next step
10. Ready-to-Use Codex Prompt

Copy the final prompt below into Codex:

Read AGENTS.md, agent-index.md, and workflow-router.md first.

Task:
[WRITE EXACT TASK]

Context:
[WRITE PROJECT CONTEXT]

Relevant files:
[LIST FILES]

Primary agents to apply:
[LIST AGENTS]

Requirements:
[LIST REQUIREMENTS]

Out of scope:
- Do not rewrite unrelated files.
- Do not redesign the whole project unless explicitly asked.
- Do not add dependencies unless explicitly approved.
- Do not delete files unless explicitly approved.
- Do not change Git history.
- Do not initialize Git unless asked.
- Do not install packages unless asked.

Acceptance criteria:
[LIST ACCEPTANCE CRITERIA]

Verification:
[LIST COMMANDS OR MANUAL CHECKS]

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
11. Notes

[Add screenshots, error messages, client notes, design references, or extra context]


