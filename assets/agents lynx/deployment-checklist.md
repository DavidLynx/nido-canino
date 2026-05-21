Lynx AI System — Deployment Checklist
Purpose

This checklist helps Lynx Visual Division prepare websites, landing pages, portfolios, catalogs, and web apps for deployment.

Use this checklist before and after deploying to:

Vercel
Netlify
GitHub Pages
other hosting platforms if needed

Primary deployment platform:

Vercel

The goal is to prevent common deployment problems such as:

404 errors
wrong root directory
missing build command
missing environment variables
broken routes
missing public assets
broken images
failed builds
wrong framework settings
incomplete bilingual routes
broken project links
Critical Rule

Do not assume that a project is ready for deployment only because it works in VS Code.

A project should be checked locally, committed safely, deployed intentionally, and reviewed after deployment.

1. Project Type Check

Before deployment, identify the project type:

 Landing Page
 Business Website
 Interactive Catalog
 Creator Portfolio
 Lightweight Web App
 SaaS-style MVP
 Brand Identity / Logo Implementation
 Portfolio Case Study
 Maintenance Update
 Other: [write]

Project name:

[Write project name]

Deployment platform:

[Write platform]

Live URL:

[Write URL when available]

2. Stack Check

Identify the stack:

 Next.js
 Vite + React
 Static HTML/CSS/JS
 WordPress
 Shopify
 Webflow
 Other: [write]

Styling:

 Tailwind CSS
 CSS variables
 CSS Modules
 Global CSS
 Existing styling system
 Other: [write]

Data / Backend:

 Static only
 localStorage
 local JSON
 Supabase
 External API
 CMS
 Other: [write]
3. Local Project Check

Before deployment:

 Open the correct project folder
 Confirm this is the root folder
 Confirm package.json exists if it is a Node/React/Next/Vite project
 Confirm main files exist
 Confirm public assets exist
 Confirm environment variables are known if needed
 Confirm no important files are missing
 Confirm no internal-only text is visible in the UI
 Confirm language content is complete if bilingual
 Confirm main user flow works

Useful commands:

pwd or check current path in PowerShell
dir
git status
npm run build
4. Git Check Before Deployment

Run:

git status

Check:

 You are in the correct project folder
 Changed files are expected
 No unrelated files changed
 No .env file is staged
 No secret keys are staged
 No unnecessary generated files are staged
 Public assets are intentional
 No large accidental files are staged
 No temporary files are staged

If the project has not been initialized:

 Decide if a GitHub repo should be created
 Initialize Git only if needed
 Confirm branch name, usually main

Recommended basic sequence:

git status
git add .
git commit -m "Describe the change"
git push

Do not use force push unless the problem is clearly understood.

5. Environment Variables Check

Use this section if the project needs API keys, Supabase, analytics, forms, or external services.

Check:

 Project has .env.local locally if needed
 .env.local is not committed
 .gitignore includes .env* if appropriate
 Required variables are documented
 Required variables are added in Vercel
 No secret key is exposed in frontend code
 Public keys use proper public naming when required
 Missing variables are handled gracefully if possible

Common examples:

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
NEXT_PUBLIC_SITE_URL
API keys only if safe for frontend use
Server-only secrets must not be exposed publicly

Important:

Never paste private secrets into public files, README, case studies, screenshots, or prompts that will be committed.

6. Build Check

Before deploying, run the build command if available.

For Next.js:

npm run build

For Vite:

npm run build

Check:

 Build completes successfully
 No missing import errors
 No TypeScript blocking errors
 No missing environment variable errors
 No broken image import errors
 No route generation errors
 No hydration-related warnings that block deploy
 No unsupported browser/server API errors
 No package/dependency errors

If build fails:

Copy the full error.
Do not guess.
Use codex-prompt-library.md → Fix Build Errors.
Fix the smallest cause first.
Run build again.
7. Vercel Project Settings

Before or during deployment, check:

Framework Preset

Use:

Next.js for Next.js projects
Vite for Vite projects
Other/static as needed
Root Directory

The root directory should be the folder containing the project’s package.json.

Examples:

If project is:

C:\Users\skape\Desktop\my-portfolio

and package.json is inside my-portfolio, root should be:

.

If project is inside a subfolder:

repo/apps/web/package.json

root should be:

apps/web

Build Command

Common:

Next.js: npm run build
Vite: npm run build
Output Directory

Common:

Next.js: leave default
Vite: dist
Static: depends on project
Install Command

Usually:

npm install

Unless the project uses:

pnpm install
yarn install

Do not change randomly.

8. Common Vercel 404 Causes

If Vercel shows 404, check:

 Wrong root directory
 No index.html for static project
 Wrong output directory
 Build failed but deploy still created a URL
 Framework preset incorrect
 Next.js routes not configured correctly
 App is inside a subfolder but Vercel points to repo root
 Project was deployed from the wrong repo
 Public route does not exist
 Rewrites/redirects are wrong
 Static export mismatch
 vercel.json is misconfigured
 Case-sensitive file path issue

First diagnostic questions:

Where is package.json?
What framework is this?
What is the build command?
What is the output directory?
What route should open?
Does it work locally after build?
9. Public Assets Check

Check:

 Logo files are in the correct public folder
 Favicon exists
 App icons exist if needed
 Open Graph images exist if referenced
 Project screenshots exist if used
 Image paths are correct
 File names match exact casing
 No broken asset paths
 No unnecessary huge images
 SVGs render correctly
 PNGs that need transparency actually have transparency

For Next.js:

Public assets usually live in:

public/

Reference them like:

/logo.svg

not:

public/logo.svg

10. Bilingual Deployment Check

Use if the project supports Spanish and English.

Check:

 Spanish route works
 English route works
 Language toggle works
 Navigation stays in selected language
 Project cards translate fully
 Services translate fully
 CTAs translate fully
 Footer translates fully
 Metadata is language-aware if implemented
 No mixed-language sections
 English is professional and natural
 Spanish is professional and natural

Possible routes:

/es
/en
/es/work
/en/work
/es/work/[slug]
/en/work/[slug]

Make sure both language paths are tested after deployment.

11. Brand Identity Deployment Check

Use when deploying logo or identity changes.

Check:

 Header logo renders correctly
 Mobile header logo renders correctly
 Favicon appears correctly
 Browser tab icon is recognizable
 Social preview image uses correct brand if implemented
 Logo works on dark background if used
 Logo works on light background if used
 SVG path loads correctly
 PNG transparency works if used
 Logo does not stretch
 Logo does not break layout
 Logo has accessible text or appropriate alt usage
12. Forms and Contact Check

If the project has forms or contact actions, check:

 Contact form submits correctly
 Form has required field validation
 Error messages are understandable
 Success message appears
 Email destination is correct
 WhatsApp link opens correctly
 Phone link works on mobile
 Email link opens correctly
 Booking link works
 External links open as intended
 No placeholder form action remains

If forms are not implemented:

 Make sure they are not presented as working
 Use email/WhatsApp/booking links instead
13. SEO and Social Preview Check

Check:

 Homepage title
 Homepage description
 Open Graph title
 Open Graph description
 Open Graph image
 Favicon
 Canonical URL if implemented
 Robots/sitemap if relevant
 Unique project/case study metadata if pages exist
 Local SEO data if relevant
 Language alternates if implemented
 No fake SEO claims

Use social preview testing tools if needed later.

14. Accessibility and Performance Check

Before final deploy review:

 Text contrast acceptable
 Buttons readable
 Links understandable
 Focus states acceptable
 Keyboard navigation acceptable
 Mobile tap targets acceptable
 Motion is not excessive
 Reduced motion considered if heavy animation exists
 Images optimized
 No massive uncompressed videos
 No obvious layout shift
 Page feels fast enough on mobile
 No unnecessary dependencies added
15. Post-Deployment QA

After deployment, open the live URL and check:

 Homepage loads
 Navigation works
 Main CTA works
 Project links work
 Service links work
 Contact links work
 Images load
 Logo loads
 Favicon appears
 Mobile layout works
 English version works if bilingual
 Spanish version works if bilingual
 No obvious 404
 No visible TODO text
 No placeholder content
 No internal learning roadmap content
 No broken sections
 No console-breaking behavior visible
16. Deployment Report

After deployment, record:

Deployment Summary
Project

[Project name]

Platform

[Vercel / other]

Live URL

[URL]

Repo

[GitHub URL]

Branch

[Branch]

Build Command

[Command]

Status

GO / GO with notes / Needs fixes / Failed

Issues Found
[Issue]
[Issue]
Fixes Needed
[Fix]
[Fix]
Next Step

[Next action]

17. Emergency Deployment Recovery

If deploy is broken:

Do not panic.

Check in this order:

Did the build pass locally?
Did the build pass on Vercel?
Is the root directory correct?
Is the framework preset correct?
Are environment variables missing?
Are routes correct?
Are public assets missing?
Was the wrong branch deployed?
Was the wrong repo connected?
Did a recent commit break something?

Safe recovery options:

inspect Vercel logs
revert last commit if needed
redeploy previous successful deployment
fix root directory
add missing env vars
fix build error
push a small fix

Avoid:

deleting the Vercel project immediately
force pushing without understanding
changing many settings at once
reinstalling everything blindly
moving files randomly
deleting config files without backup
Codex Prompt for Deployment Check

Use this when you want Codex to inspect deployment readiness.

Read AGENTS.md, agent-index.md, workflow-router.md, qa-checklist.md, and deployment-checklist.md first.

Task:

Check this project for deployment readiness.

Do not modify files unless explicitly asked.

Review:

project stack
package.json scripts
build command
root directory assumptions
environment variables
public assets
routes
bilingual routes if present
favicon/logo setup
Vercel compatibility
common 404 risks
obvious build risks

Deliver:

deployment readiness status
likely Vercel settings
build command
output directory
required environment variables
root directory recommendation
risks
exact next steps
Final Rule

A deployment is not complete when Vercel gives a URL.

A deployment is complete when the live URL works, the main flows work, the content is correct, the project looks professional, and no obvious technical or visual issues are visible.