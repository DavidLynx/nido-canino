Lynx AI System — QA Checklist
Purpose

This checklist helps Lynx Visual Division review websites, landing pages, portfolios, catalogs, web apps, brand identity implementations, and client deliverables before publishing or presenting them.

QA means quality assurance.

The goal is to prevent avoidable mistakes before delivery.

Use this checklist before:

deploying to Vercel
sending a client preview
publishing a portfolio project
adding a project to a case study
pushing major changes to GitHub
launching a landing page
presenting a brand identity system
delivering a maintenance update
Critical Rule

Do not publish or present a project only because it “looks good”.

A project must also be:

usable
responsive
accessible
fast enough
clear
stable
honest
complete enough for its scope
aligned with the business goal
1. Project Context Check

Before QA, confirm:

 Project name is clear
 Project type is clear
 Business goal is clear
 Target user is clear
 Primary CTA or user action is clear
 Language requirement is clear
 Project status is clear: prototype, demo, live, client work, or portfolio piece
 Scope is clear
 Out-of-scope items are clear
 Known limitations are documented

Project type:

 Brand Identity / Logo System
 Landing Page
 Business Website
 Interactive Catalog
 Creator Portfolio
 Web App
 SaaS-style MVP
 Client Audit
 Case Study
 Maintenance Update
2. Visual Design QA

Check:

 The visual direction matches the project brief
 The design feels intentional
 Typography hierarchy is clear
 Body text is readable
 Headings are visually consistent
 Buttons are consistent
 Cards are consistent
 Spacing feels controlled
 Sections have enough breathing room
 Alignment is clean
 Colors feel intentional
 Contrast is acceptable
 Icons match the visual language
 Images are high enough quality
 Visual style matches the brand/client
 The project does not feel like a generic template
 The design is not overloaded with effects
 Motion, if used, feels purposeful

Questions:

Does this look professional enough to show?
Does this look appropriate for the target audience?
Does this feel consistent from top to bottom?
Would this help the client look more trustworthy?
3. UX QA

Check:

 The user understands what the project is quickly
 The main action is obvious
 Navigation is clear
 Important information is easy to find
 The page or app does not require unnecessary explanation
 Sections follow a logical order
 CTAs appear at useful moments
 Forms are easy to understand
 Empty states are helpful if needed
 Error states are clear if needed
 Loading states exist if needed
 Users are not trapped or confused
 The experience works for first-time users
 The experience supports the business goal

Questions:

What should the user do next?
Is that action obvious?
Is anything creating unnecessary friction?
Is there any section that looks nice but does not help?
4. Responsive QA

Check at minimum:

 Mobile width around 360px
 Mobile width around 390px
 Tablet width around 768px
 Desktop width around 1280px
 Large desktop if relevant

Mobile checks:

 No horizontal scrolling
 Text is readable
 Buttons are easy to tap
 Header works
 Menu works
 Hero section fits well
 Cards stack correctly
 Images crop correctly
 Forms are usable
 Footer is readable
 CTA remains easy to find

Desktop checks:

 Layout does not feel too empty
 Content width is controlled
 Sections align correctly
 Large images do not dominate unnecessarily
 Project cards or grids behave well
 Navigation feels balanced

Tablet checks:

 Layout does not feel squeezed
 Cards and grids adapt correctly
 Text blocks remain readable
 Navigation does not break
5. Bilingual QA

Use when the project supports Spanish and English.

Check Spanish:

 All visible text is in Spanish
 Navigation is translated
 Buttons are translated
 Project cards are translated
 Services are translated
 Forms are translated
 Error/empty/loading states are translated
 Footer is translated
 Metadata is translated if implemented
 Spanish sounds natural

Check English:

 All visible text is in English
 Navigation is translated
 Buttons are translated
 Project cards are translated
 Services are translated
 Forms are translated
 Error/empty/loading states are translated
 Footer is translated
 Metadata is translated if implemented
 English sounds professional and natural

Important:

 No mixed Spanish/English sections unless intentional
 No placeholder text remains
 Longer Spanish text does not break layout
 Language toggle works
 Current language is visually clear
 URLs or routes are logical if using /es and /en
6. Content QA

Check:

 Headline is clear
 Subheadline supports the headline
 Copy is concise
 No lorem ipsum remains
 No placeholder client names remain
 No spelling errors
 No repeated text by accident
 No exaggerated claims
 No fake metrics
 No unsupported SEO or revenue promises
 Tone matches the brand
 CTA copy is clear
 Service descriptions are understandable
 Project descriptions are honest
 Case study limitations are not hidden

For portfolio projects:

 Project status is honest
 Demo/concept projects are labeled clearly
 Client work is not misrepresented
 AI-assisted workflow is framed professionally if mentioned
 No beginner/internal learning notes are visible
7. SEO QA

Use for public websites, landing pages, portfolios, and case studies.

Check:

 Page title exists
 Meta description exists
 Main H1 exists
 Only one clear main H1 per page when appropriate
 H2/H3 hierarchy is logical
 Open Graph title exists if relevant
 Open Graph description exists if relevant
 Social preview image exists if relevant
 Images have alt text when meaningful
 Internal links work
 Local SEO information exists if relevant
 Contact/location information exists if relevant
 Bilingual metadata exists if bilingual SEO is implemented
 No keyword stuffing
 No fake ranking claims
 URLs are readable

For portfolio:

 Homepage title is strong
 Services page metadata is clear if it exists
 Project pages have unique titles if they exist
 Case studies have shareable descriptions
8. Accessibility QA

Check:

 Text contrast is readable
 Buttons have visible labels
 Links are understandable
 Focus states are visible
 Keyboard navigation is possible for interactive elements
 Forms have labels
 Required fields are clear
 Error messages are understandable
 Images have alt text when needed
 Decorative images do not create noise
 Motion respects reduced-motion preference when possible
 No information is communicated by color only
 Touch targets are large enough
 Text is not too small on mobile
 Modals/menus are not confusing
 Semantic HTML is used where possible

Important:

Accessibility is part of design quality, not an optional final patch.

9. Performance QA

Check:

 Images are optimized
 Large videos are avoided or compressed
 Fonts are not excessive
 Animations are not too heavy
 No unnecessary dependencies were added
 No obvious layout shift
 App feels smooth on mobile
 Pages do not feel slow
 Project does not rely on huge unoptimized assets
 Third-party scripts are limited
 Hero section loads acceptably
 SVG animations are not excessive
 Background effects do not hurt usability

Questions:

Does the site feel fast enough to be premium?
Are visual effects worth their performance cost?
Could images be smaller?
Is any dependency unnecessary?
10. Functionality QA

For websites:

 Navigation works
 All main links work
 CTA buttons work
 Contact links work
 WhatsApp links work if present
 Email links work if present
 Forms work or are clearly marked as placeholders
 Social links work
 Footer links work
 Project links work
 External links open correctly if intended

For web apps:

 Main user flow works
 Inputs work
 Buttons trigger the expected action
 Data saves if persistence is required
 Data resets if reset exists
 Export/download works if included
 Language switch works if included
 Theme switch works if included
 Empty state works
 Error state works
 Loading state works
 App does not crash on refresh
 App does not lose important data unexpectedly

For catalogs:

 Product cards render correctly
 Categories work
 Filters work if present
 Search works if present
 Product CTAs work
 Product images load
 Empty category state works if needed
11. Brand Identity QA

Use for logo, identity, or brand implementation work.

Check:

 Logo is readable
 Logo works at small sizes
 Favicon version works
 Social avatar version works
 Logo works on light background
 Logo works on dark background if needed
 SVG is clean enough for digital use
 PNG has transparent background if needed
 Logo is not too detailed for intended use
 Clear space is considered
 Color versions are prepared if needed
 Typography recommendations are documented
 Color palette is documented
 Mini brand guidelines are clear if included
 No font files are shared
 No trademark/legal clearance is claimed unless verified
 References were not copied directly

For website implementation:

 Header logo appears correctly
 Mobile header logo is readable
 Favicon appears correctly
 Social preview uses correct image if implemented
 Logo does not break layout
 Logo contrast is acceptable
12. Technical QA

Check:

 Project runs locally if needed
 No obvious console errors
 Build passes if applicable
 No broken imports
 No missing files
 No unused obvious junk files
 Public assets are in the right folder
 Environment variables are not exposed
 No secret keys are committed
 package.json scripts are clear
 No unnecessary packages were installed
 File structure is understandable
 Components are not duplicated unnecessarily
 Code changes match the task scope

Commands when relevant:

npm run build
npm run lint
git status

Only run commands that make sense for the project.

13. Git QA

Before committing:

 Run git status
 Review changed files
 Make sure only intended files changed
 Do not commit .env
 Do not commit unnecessary generated files
 Do not commit local junk
 Make sure public assets are intentional
 Write a clear commit message

Suggested commit style:

Update portfolio roadmap
Build landing page structure
Fix responsive project grid
Add brand identity workflow
Polish Life XP portfolio card
Add bilingual project content

Before pushing:

 Confirm branch
 Confirm remote
 Confirm build if relevant
 Push safely
 Avoid force push unless necessary and understood
14. Vercel QA

Before deploy:

 Correct project root
 Correct framework preset
 Correct build command
 Correct output settings
 Required environment variables added
 Public assets load
 Main route works locally
 Dynamic routes work if any
 Language routes work if any
 No build errors
 No missing dependency errors

After deploy:

 Live URL opens
 Main page works
 Navigation works
 Mobile works
 Project links work
 Images load
 Metadata/social preview is acceptable if checked
 No obvious 404
 No broken layout in production
15. Client Delivery QA

Before sending to a client:

 Preview link works
 Main objective is clear
 Client-requested changes are included
 No internal notes are visible
 No TODO text is visible
 No placeholder copy remains
 No broken images
 No broken links
 Mobile version is acceptable
 Message to client explains what changed
 Next step is clear

Client message should include:

what was updated
what they should review
what feedback is needed
any limitations or pending items
16. Portfolio Publishing QA

Before adding a project to the portfolio:

 Project has a clear title
 Project has a short description
 Project category is correct
 Status is honest
 Live URL works or status says coming soon
 Screenshot is strong
 Tags are relevant
 Role is clear
 Stack is clear if shown
 Case study link works if included
 No fake client claim
 No fake metrics
 English version complete
 Spanish version complete
 Project helps the portfolio look stronger
17. Final Reality Check

Before declaring a project finished, answer:

Does it work?
Does it look professional?
Does it support the business goal?
Does it work on mobile?
Is the language complete?
Is the CTA clear?
Are there broken links?
Are there visible placeholders?
Is the performance acceptable?
Is anything misleading?
Would I confidently show this to a client?
What is the one thing that still feels weak?

Final status:

GO
GO with minor notes
Needs fixes
Not ready
Recommended QA Output

When doing QA, use this format:

QA Summary
Project

[Project name]

Project Type

[Type]

Status

GO / GO with notes / Needs fixes / Not ready

Critical Issues
[Issue]
[Issue]
Important Issues
[Issue]
[Issue]
Optional Polish
[Item]
[Item]
Recommended Next Step

[Next action]

Final Rule

QA is not about perfection.

QA is about making sure the project is strong enough, honest enough, usable enough, and stable enough for its current purpose.