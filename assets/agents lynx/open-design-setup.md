Lynx AI System — Open Design Setup
Purpose

This file explains how to install, run, test, and use Open Design inside the Lynx Visual Division workflow.

Open Design should be used as a visual exploration and design-system tool.

It should not replace:

strategy
design judgment
user understanding
accessibility review
performance review
final creative direction
final code QA

Open Design is useful for:

exploring visual directions
testing interface concepts
working with DESIGN.md files
generating UI directions
pairing design systems with prompts
preparing visual concepts before Codex implementation
What Open Design Is For

Use Open Design when working on:

portfolio visual direction
client-specific design systems
landing page design exploration
web app UI concepts
brand identity-to-interface translation
layout experiments
component style exploration
Open Design / Codex workflow testing

Do not use Open Design for:

replacing final design judgment
blindly accepting generated UI
creating final logos without review
adding unnecessary complexity
generating production code without QA
making all client projects look the same
Current Open Design Facts

Open Design is a local-first, open-source design tool that works with coding-agent CLIs and design systems. The GitHub repository describes it as a local-first design product that detects installed code-agent CLIs, runs design skills and design systems, and streams artifacts into a sandboxed preview.

The current quickstart says Open Design uses:

pnpm tools-dev as the main entry point
automatic .od/ folder creation
no od init step

Open the URL printed by the terminal after running the web command.

1. Folder Location

Recommended location:

C:\Users\skape\Desktop\open-design

or wherever the repository was cloned.

Example:

C:\Users\skape\Desktop\open-design

Do not put Open Design inside every client project.

Treat Open Design as a separate local tool.

2. Basic Terminal Flow

Open PowerShell.

Go to the Open Design folder:

cd "C:\Users\skape\Desktop\open-design"

Check versions:

node -v

pnpm -v

corepack --version

If pnpm does not work, try:

corepack enable

Then:

corepack pnpm --version

Install dependencies:

pnpm install

Run the web app:

pnpm tools-dev run web

Important:

Do not guess the localhost URL.

Open the exact URL printed in the terminal.

It may not always be localhost:3000.

3. If Nothing Opens

If the command seems to run but nothing opens:

Check the PowerShell output.
Look for a printed local URL.
Open that exact URL manually.
Do not assume port 3000.
If there is no URL, copy the terminal output and diagnose from the error.

Possible checks:

node -v

pnpm -v

corepack --version

pnpm install

pnpm tools-dev run web

4. Node and PNPM Notes

Open Design may require a very recent Node version depending on the current release.

If Open Design fails during install or startup, check:

node -v

If the version is too old, update Node before continuing.

Do not reinstall the whole project randomly.

First identify the error.

5. Windows Notes

If Open Design fails on Windows:

Confirm Node version.
Confirm pnpm works.
Confirm pnpm install completed.
Confirm you are in the correct folder.
Confirm the terminal printed a URL.
Copy the full error.

There are recent GitHub issue discussions around Windows behavior in some Open Design versions, so if it fails, the next step is to diagnose the exact terminal output instead of guessing.

6. Docker Alternative

Use Docker only if the normal pnpm method fails or if Docker is already installed.

Open Design also documents a Docker route through the deploy folder. The GitHub quickstart describes running Docker Compose and opening a local port for the deployed interface.

General flow:

cd "C:\Users\skape\Desktop\open-design\deploy"

docker compose up -d

Then open the local URL documented by the command or quickstart.

Do not use Docker if you are not comfortable with Docker yet.

Start with pnpm.

7. How Open Design Fits Lynx AI System

Use this relationship:

ChatGPT = strategy, direction, explanation, prompts
Lynx AI System = workflows, templates, rules, agents
Open Design = visual exploration and design-system testing
Codex = implementation in project files
VS Code = manual control and editing
Vercel = deployment

Open Design should receive:

project brief
design system
target user
business goal
visual references
anti-patterns
component needs
accessibility rules
performance constraints

Open Design should not receive only:

“Make it look premium.”

That is too vague.

8. Recommended Open Design Workflow

For a serious project:

Fill the correct brief.
Choose the workflow.
Define the design mode.
Create or update a DESIGN.md file.
Use Open Design for visual exploration.
Generate 2–3 directions.
Evaluate directions using Lynx criteria.
Select one direction.
Translate the direction into code rules.
Ask Codex to implement only after direction is clear.
QA the result.
Deploy if ready.

Use:

workflows/workflow-open-design.md
design-systems/lynx-visual-division/DESIGN.md
project-specific DESIGN.md
9. Open Design Prompt Template

Use this structure inside Open Design or as a preparation prompt.

Project:

[Project name]

Project type:

[Portfolio / landing page / business website / web app / catalog / brand identity]

Target user:

[Target user]

Business goal:

[Business goal]

Primary user action:

[Action]

Design mode:

[Mode]

Visual direction:

[Keywords and short description]

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

[UI direction / page layout / component concept / design system / visual exploration]

10. Portfolio-Specific Open Design Use

For the Lynx Visual Division portfolio, use Open Design only after creating:

portfolio-roadmap.md
portfolio-build-brief.md
portfolio-specific DESIGN.md

Recommended portfolio-specific design system file:

design-systems/lynx-visual-division-portfolio/DESIGN.md

Why:

The global Lynx design system is adaptive.

The portfolio needs its own specific aesthetic.

Suggested portfolio direction:

premium
minimal
editorial
interactive
sharp typography
controlled color
project personality inside cards
SVG logo/identity moments
refined motion
not generic SaaS
not cyberpunk
not gaming
not childish
11. Open Design Output Evaluation

Before accepting any Open Design result, ask:

Does it fit the target user?
Does it support the business goal?
Is the main message clear?
Is the layout usable?
Does it work on mobile?
Is the typography readable?
Is contrast acceptable?
Is the motion purposeful?
Can this be implemented in Next.js?
Will performance remain acceptable?
Does it feel original enough?
Does it avoid the project anti-patterns?

If the answer is weak, refine the prompt or reject the direction.

12. Codex Handoff After Open Design

After selecting a direction, prepare a Codex prompt.

Codex should read:

AGENTS.md
README.md
workflow-router.md
agent-index.md
workflow-open-design.md
relevant project brief
relevant DESIGN.md
selected Open Design notes

Codex task should include:

exact files or sections to implement
visual direction
component structure
what not to change
acceptance criteria
QA steps

Do not ask Codex:

“Apply the Open Design result.”

Instead say:

“Apply this selected visual direction to these components while preserving functionality.”

13. Troubleshooting Template

If Open Design fails, record:

Open Design Troubleshooting Log
Date

[Date]

Folder

[Path]

Command Run

[Command]

Node Version

[Output]

PNPM Version

[Output]

Error Output

[Paste error]

What Was Expected

[Expected result]

What Happened

[Actual result]

Next Diagnostic Step

[Next step]

14. First Test Task

After Open Design runs successfully, do not start with the full portfolio immediately.

First test with a small task:

Create a visual direction exploration for:

“Lynx Visual Division portfolio hero section”

Input:

bilingual studio portfolio
premium editorial interactive style
black/white base
strategic color through projects
strong typography
minimal layout
no generic SaaS
no cyberpunk
no gaming aesthetics

Output:

2–3 hero layout directions
typography mood
project card direction
motion notes
accessibility notes

Then evaluate before implementation.

Final Rule

Open Design should help Lynx Visual Division explore faster.

It should not make the final decision.

The final decision must come from strategy, audience, taste, usability, accessibility, performance, and implementation reality. and is not needed always, only whes is needed.