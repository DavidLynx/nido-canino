Lynx Visual Division — Portfolio Build Brief
Purpose

This file defines the initial build brief for the Lynx Visual Division portfolio.

It translates the portfolio roadmap into a practical project brief that can guide:

ChatGPT planning
Open Design exploration
Codex implementation
Next.js architecture
bilingual content structure
project data organization
design system creation
portfolio QA
Vercel deployment

The portfolio should be built as a professional studio website, not as a learning exercise.

Core Goal

Create the first public version of the Lynx Visual Division portfolio.

The first version must be:

visually strong
bilingual
responsive
clear
fast enough
SEO-aware
easy to expand
easy to maintain
ready for Vercel
strong enough to share with potential clients

It does not need to include every advanced feature in the first version.

The first launch should be solid, not overloaded.

Studio Positioning

Lynx Visual Division is a bilingual visual design and AI-assisted web studio.

It creates:

brand identity systems
logo redesigns
digital logo implementations
premium landing pages
business websites
interactive catalogs
creator portfolios
lightweight web apps
SaaS-style MVPs
website audits
maintenance plans
AI-assisted design and development workflows

Short English positioning:

Premium websites, visual identities, and AI-assisted digital products for brands ready to look sharper and grow online.

Short Spanish positioning:

Sitios web premium, identidades visuales y productos digitales asistidos con IA para marcas que quieren verse mejor y crecer en digital.

Target Audience

Primary audience:

international clients
English-speaking small businesses
creators
digital product creators
service providers
startups
boutique brands
growing personal brands

Primary markets:

United States
United Kingdom
Australia
Canada

Secondary audience:

Colombia
Latin America
local businesses
Spanish-speaking creators
small companies needing digital upgrade
Language Requirements

The portfolio must support:

Spanish
English

Required behavior:

all visible content must be translated
navigation must be translated
project cards must be translated
services must be translated
CTAs must be translated
footer must be translated
metadata should be language-aware when possible
no mixed-language sections unless intentional
English must feel professional and natural
Spanish must feel professional and natural

Preferred route structure:

/es
/en

Default route:

redirect or default to /es for initial local context
keep /en fully ready for international sharing

Alternative:

one route with language toggle

Recommendation:

Use /es and /en if it is not too complex.

Visual Direction

The Lynx portfolio should feel:

premium
minimal
editorial
interactive
contemporary
sharp
intelligent
clean
experimental in details
structured
visually memorable

It should not feel:

generic SaaS
childish
messy
overly cyberpunk
like a gaming site
like a template
too corporate
too empty
too academic
like a student project

Base visual direction:

restrained base system
strong typography
high contrast
controlled color
refined spacing
expressive project previews
animated details
SVG logo/identity moments
smooth but purposeful motion

Color approach:

neutral/premium base
mostly black, white, gray, or muted foundation
strategic color inside project cards and visual previews
each project can bring its own personality

Motion approach:

subtle interface motion
hover reveals
smooth page/section transitions
SVG animation for logo systems if performance allows
avoid excessive scroll effects in first version
respect reduced-motion where possible
First Version Scope

The first version should include:

Home
Work / Projects
Services
Process
Brand Identity / Logo Systems section
About
Contact
Language toggle
Project cards
Coming soon project cards
Basic SEO
Responsive design
Vercel deployment

Optional if simple:

project detail modal
project detail route
filtered project grid
logo showcase mini-interaction
selected case study preview

Do not include in first version unless already easy:

CMS
database
login
payment system
complex backend
large WebGL scenes
heavy animation engine
service configurator
pricing calculator
full CRM
blog
complex case study engine
Recommended Architecture

Recommended stack:

Next.js
TypeScript
Tailwind CSS or CSS variables
Framer Motion only if needed
Vercel
structured local data

Recommended data files:

data/projects.ts
data/services.ts
data/logos.ts
data/translations.ts
data/navigation.ts

Recommended components:

components/layout/Header.tsx
components/layout/Footer.tsx
components/layout/LanguageSwitcher.tsx
components/sections/HeroSection.tsx
components/sections/FeaturedWorkSection.tsx
components/sections/ServicesSection.tsx
components/sections/LogoSystemsSection.tsx
components/sections/ProcessSection.tsx
components/sections/AboutSection.tsx
components/sections/ContactSection.tsx
components/project/ProjectCard.tsx
components/project/ProjectGrid.tsx
components/logo/LogoSystemCard.tsx
components/ui/Button.tsx
components/ui/Tag.tsx

Recommended routes:

/es
/en

Optional future routes:

/es/work
/en/work
/es/work/[slug]
/en/work/[slug]
/es/services
/en/services
/es/contact
/en/contact

First version recommendation:

Start with /es and /en home pages that include all main sections.

Add detailed project routes later.

Required Sections
1. Header

Should include:

Lynx Visual Division wordmark or logo
navigation
language switcher
contact CTA

Navigation:

English:

Work
Services
Process
About
Contact

Spanish:

Proyectos
Servicios
Proceso
Acerca de
Contacto

Header should be:

clean
responsive
not too tall
easy to use on mobile
visually aligned with premium studio positioning
2. Hero Section

Purpose:

Communicate the studio clearly in the first 5 seconds.

English hero draft:

Premium websites, visual identities, and AI-assisted digital products for brands ready to look sharper and grow online.

English supporting copy:

Lynx Visual Division helps creators, small businesses, and growing brands turn scattered digital presence into clear, polished, useful web experiences.

Spanish hero draft:

Sitios web premium, identidades visuales y productos digitales asistidos con IA para marcas que quieren verse mejor y crecer en digital.

Spanish supporting copy:

Lynx Visual Division ayuda a creadores, negocios pequeños y marcas en crecimiento a convertir una presencia digital dispersa en experiencias web claras, pulidas y útiles.

Primary CTA:

English:

View work

Spanish:

Ver proyectos

Secondary CTA:

English:

Start a project

Spanish:

Iniciar un proyecto

3. Featured Work Section

Purpose:

Show strongest projects quickly.

Initial project list:

Life XP
Neon Dice
QR Studio Generator
Comientra
Sales Radar
Dark Wallet
Nido Canino
Tazarazas
Divinitos
Heliox XP
My Astrology App

First version can include all as cards, with status labels.

Status labels:

English:

Live
Prototype
In progress
Coming soon
Concept
Needs polish

Spanish:

En vivo
Prototipo
En proceso
Próximamente
Concepto
Necesita mejora

Project card should show:

project name
category
short description
status
tags
live link if available
visual preview placeholder if screenshots are not ready
4. Web Apps Group

Initial apps:

Life XP
Neon Dice
QR Studio Generator
Comientra
Sales Radar
Dark Wallet
Heliox XP
My Astrology App

Suggested categories:

Web App
Tool
Prototype
Game-like UI
SaaS Concept
API App
Visual Experiment

Important:

Dark Wallet should be framed carefully as a visual/interface experiment or fictional/game-like product unless it is a real financial product.

My Astrology App should be framed as entertainment, lifestyle, or reflective experience, not deterministic or high-stakes guidance.

5. Websites Group

Initial websites:

Nido Canino
Tazarazas
Divinitos
Placeholder Website 1
Placeholder Website 2

Notes:

Nido Canino:

current real project
future overhaul
warm human brand
local business trust
pet care / structured care

Divinitos:

future interactive catalog
fashion/shoes
pet rescue storytelling
social-style gallery

Tazarazas:

requires clarification
include as placeholder or project card only if content is clear

Placeholder websites:

must be labeled as concept/demo
should not pretend to be real clients
6. Brand Identity / Logo Systems Section

Purpose:

Show that Lynx can also work on visual identity, logo redesign, and digital logo implementation.

Show:

logo marks
wordmarks if available
favicon versions
social avatar versions
dark/light versions
SVG motion concepts
digital implementation examples

Possible logos:

Lynx Visual Division
Dark Wallet
QR Studio Generator
Comientra
Sales Radar
Neon Dice
Life XP
Nido Canino
Tazarazas
Divinitos
Heliox XP
My Astrology App

First version approach:

If animated logo systems are not ready, create a clean logo grid with hover states and short concept notes.

Future version:

Add SVG construction animations.

Logo card should include:

logo/name
concept
service type
formats available
status
7. Services Section

Use services from service-catalog.md.

Main services to show:

Brand Identity and Visual Design
Logo Redesign and Digital Logo Implementation
Landing Pages
Business Websites
Interactive Catalogs
Creator Portfolios
Lightweight Web Apps
SaaS-style MVPs
Website Audits
Website Maintenance Plans
Portfolio and Case Study Design
AI-Assisted Design and Development Workflows

First version should keep service descriptions concise.

Each service card should include:

title
short description
ideal client/use case
CTA or “Ask about this”

Avoid showing final prices unless pricing is ready.

8. Process Section

Purpose:

Show method and professionalism.

Suggested process:

English:

Discover
Define
Design
Build
Review
Launch
Maintain

Spanish:

Descubrir
Definir
Diseñar
Construir
Revisar
Publicar
Mantener

Process message:

English:

AI accelerates the workflow, but creative direction, visual judgment, and final quality control remain human-led.

Spanish:

La IA acelera el proceso, pero la dirección creativa, el criterio visual y el control final de calidad siguen siendo humanos.

9. About Section

Purpose:

Explain the studio in a human and professional way.

Should mention:

visual design background
AI-assisted web workflow
focus on UI/UX
focus on digital products
bridge between design and implementation
international direction
bilingual capability
practical and premium approach

English draft:

Lynx Visual Division was created to bridge visual design, web implementation, and AI-assisted workflows. The studio helps brands move from scattered digital presence to clear, polished, useful digital products.

Spanish draft:

Lynx Visual Division nace para unir diseño visual, implementación web y flujos de trabajo asistidos con IA. El estudio ayuda a marcas a pasar de una presencia digital dispersa a productos digitales claros, pulidos y útiles.

10. Contact Section

Purpose:

Make the next step simple.

CTAs:

English:

Start a project
Request a website audit
Ask about a brand refresh
Build a web app prototype

Spanish:

Iniciar un proyecto
Solicitar una auditoría web
Preguntar por una renovación de marca
Crear un prototipo web

First version contact methods:

email link
WhatsApp link if desired
social links
simple contact CTA

Avoid custom form unless it is reliable.

Project Data Requirements

Each project should include:

slug
title
category
type
status
short description in English
short description in Spanish
tags in English
tags in Spanish
live URL if available
repo URL if public
image/screenshot path
logo path if available
featured boolean
comingSoon boolean
caseStudyReady boolean
notes

Suggested project object fields:

slug
title
category
status
description
tags
liveUrl
repoUrl
image
logo
featured
comingSoon
caseStudyReady

Content should support:

en
es
Service Data Requirements

Each service should include:

slug
title in English
title in Spanish
description in English
description in Spanish
ideal client/use case
category
CTA
related workflow if relevant
Logo Data Requirements

Each logo item should include:

name
project
concept
category
logo path
icon path
favicon path if available
dark version if available
light version if available
status
notes
animationReady boolean
SEO Requirements

First version SEO:

homepage title in English
homepage title in Spanish
homepage description in English
homepage description in Spanish
Open Graph image if possible
favicon
semantic headings
image alt text
clean language routes
internal anchor links
no keyword stuffing
no fake claims

Possible English title:

Lynx Visual Division — Premium Websites, Visual Identity and AI-Assisted Digital Products

Possible Spanish title:

Lynx Visual Division — Sitios web premium, identidad visual y productos digitales asistidos con IA

Accessibility Requirements

Minimum:

semantic HTML
readable contrast
visible focus states
keyboard-friendly navigation
clear buttons and links
alt text for meaningful images
reduced motion consideration
no color-only communication
mobile touch targets
readable text sizes
Performance Requirements

Minimum:

optimized images
avoid huge videos
avoid unnecessary dependencies
avoid heavy animation in first version
lazy load where useful
keep bundle reasonable
use SVG animation carefully
test mobile performance
First Version Out of Scope

Do not build yet:

CMS
database
login
dashboard
payment system
complex CRM
pricing estimator
AI chatbot
large WebGL scenes
full blog
full case study system if it delays launch
complex forms
advanced analytics
Recommended Build Phases
Phase 1 — Scaffold

Create:

Next.js project
basic routes /es and /en
layout
header
footer
translation/data structure
global styles
design tokens
Phase 2 — Content Data

Create:

project data
service data
logo data
navigation data
translation utilities
Phase 3 — Core Sections

Build:

hero
featured work
services
process
logo systems teaser
about
contact
Phase 4 — Visual Polish

Improve:

spacing
typography
project cards
hover states
section rhythm
responsive behavior
minimal motion
Phase 5 — QA

Check:

bilingual completeness
mobile layout
project links
images
CTAs
accessibility basics
performance basics
SEO basics
Phase 6 — Deploy

Deploy to Vercel.

Check live URL.

Phase 7 — Iterate

Add:

screenshots
case studies
project detail pages
logo animations
advanced motion
extra demo websites
Codex Implementation Prompt

Use this after the Next.js project exists and the Lynx starter files have been copied into the portfolio repo.

Read AGENTS.md, README.md, workflow-router.md, agent-index.md, portfolio-roadmap.md, portfolio-build-brief.md, qa-checklist.md, deployment-checklist.md, service-catalog.md, and design-systems/lynx-visual-division/DESIGN.md first.

Task:

Create the first version of the Lynx Visual Division portfolio.

Project type:

Bilingual portfolio website
Studio website
Service catalog
Project showcase

Requirements:

Next.js
TypeScript
responsive design
Spanish and English support
/es and /en routes if feasible
complete translated visible text
project cards for existing apps and websites
service cards based on service-catalog.md
brand/logo systems section
process section
about section
contact section
basic SEO metadata
accessible semantic HTML
no backend
no database
no authentication
no payment system
no CMS in first version
Vercel-ready

Primary agents:

Brand Guardian
UX Architect
UI Designer
Frontend Developer
SEO Specialist
Accessibility Auditor
Performance Benchmarker
Reality Checker

Important design direction:

The portfolio should feel premium, minimal, editorial, interactive, contemporary, and visually memorable.

Use a restrained base visual system with strategic color in project previews.

Avoid generic SaaS templates, childish icons, excessive gradients, heavy animation, cyberpunk/gaming aesthetics, or anything that makes the studio look amateur.

Important content rule:

This is a professional portfolio, not a learning exercise.

Do not add visible learning roadmap content, tutorial labels, internal workflow notes, or “phase” labels to the public UI.

Out of scope:

do not add CMS
do not add auth
do not add database
do not add payments
do not add complex backend
do not create fake metrics
do not claim unfinished projects are finished
do not modify unrelated system files
do not add unnecessary dependencies

Acceptance criteria:

/es and /en work, or a clean language toggle exists.
All visible content is available in Spanish and English.
Homepage includes hero, work/projects, services, process, logo/identity section, about, and contact.
Project cards include existing projects and coming soon projects.
Services reflect service-catalog.md.
Layout works on mobile and desktop.
CTAs are clear.
SEO basics are present.
Accessibility basics are considered.
No internal learning roadmap content is visible.
Build passes.
Project is ready for Vercel preview.

After finishing, report:

files read
files changed
components created
data files created
assumptions made
risks or limitations
commands run
command results
manual checks needed
recommended next step
First Version Success Criteria

The portfolio first version is ready when:

it can be shared with a potential client
it explains Lynx Visual Division clearly
it shows the existing work honestly
it includes brand identity as a service
it includes websites and apps
it has complete bilingual content
it looks professional on mobile
it does not feel generic
it has a clear contact path
it is ready to evolve
Final Rule

The first version should be strong enough to publish, but simple enough to actually finish.

Do not let advanced interactions delay the first live portfolio.