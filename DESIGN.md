---
name: GDG Cloud Bengaluru
description: Developer community hub and event spotlight for GDG Cloud Bengaluru.
colors:
  primary: "#1A73E8"
  google-blue: "#4285F4"
  google-red: "#EA4335"
  google-yellow: "#FBBC04"
  google-green: "#34A853"
  background: "#FFFFFF"
  surface: "#F8F9FA"
  surface-muted: "#FCFCFD"
  border: "#DADCE0"
  border-soft: "#ECEFF1"
  ink: "#202124"
  ink-muted: "#5F6368"
typography:
  display:
    fontFamily: "\"Google Sans\", \"Inter\", \"Segoe UI\", Arial, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "\"Google Sans\", \"Inter\", \"Segoe UI\", Arial, sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "\"Google Sans\", \"Inter\", \"Segoe UI\", Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "\"Google Sans\", \"Inter\", \"Segoe UI\", Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "\"Google Sans\", \"Inter\", \"Segoe UI\", Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.08em"
rounded:
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  pill: "9999px"
spacing:
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.pill}"
    padding: "12px 28px"
  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: "12px 28px"
---

# Design System: GDG Cloud Bengaluru

## 1. Overview

**Creative North Star: "The Deployment Studio"**

This system should feel like a focused engineering studio: clean, confident, and built for people who ship. The aesthetic is precise and welcoming, with clear hierarchy and disciplined spacing that makes the next event unmistakable. The tone is premium without being flashy, relying on crisp typography, a restrained neutral base, and purposeful color accents.

It explicitly rejects generic SaaS or crypto landing templates, heavy gradients as decoration, and endless identical card grids that flatten hierarchy. The page should feel crafted for developers, with real community credibility and a clear path to register.

**Key Characteristics:** focused, modern, credible, and practical.

## 2. Colors

The palette is bright but controlled: a neutral white/gray foundation with Google-aligned accents used sparingly to guide attention.

### Primary
- **DeployFest Blue** (#1A73E8): Primary CTA, links, and key emphasis.

### Secondary
- **Google Blue** (#4285F4): Supporting highlights and signal accents.
- **Google Red** (#EA4335): Event badges and category highlights.
- **Google Yellow** (#FBBC04): Accent for energy and community moments.
- **Google Green** (#34A853): Balance accent for breadth of programs.

### Neutral
- **Studio White** (#FFFFFF): Main background and card surfaces.
- **Surface Gray** (#F8F9FA): Section backgrounds and inset panels.
- **Mist Gray** (#FCFCFD): Light section tint for contrast breaks.
- **Divider Gray** (#DADCE0): Borders, dividers, and quiet outlines.
- **Soft Divider** (#ECEFF1): Subtle separators on wide sections.
- **Ink** (#202124): Primary text and headings.
- **Ink Muted** (#5F6368): Body copy and supporting labels.

### Named Rules
**The Accent Discipline Rule.** Use accent colors as small, deliberate signals (≤10% of a section). Most surfaces remain neutral for clarity.

## 3. Typography

**Display Font:** Google Sans (with Inter, Segoe UI, Arial fallback)  
**Body Font:** Google Sans (with Inter, Segoe UI, Arial fallback)

**Character:** Modern, engineered clarity with confident weight contrast.

### Hierarchy
- **Display** (600, 4.5rem, 1.02): Hero headlines that anchor the page.
- **Headline** (600, 3rem, 1.1): Section headers and program highlights.
- **Title** (600, 1.5rem, 1.25): Card titles and panel headings.
- **Body** (400, 1rem, 1.6): Descriptive copy and summaries (65–75ch max).
- **Label** (600, 0.75rem, 0.08em, uppercase): Kicker labels and metadata.

### Named Rules
**The Readable Scale Rule.** Body copy stays high-contrast and never drops below 0.875rem.

## 4. Elevation

This system is flat by default. Depth comes from tonal layering and borders rather than shadows. Surfaces stack with clear outlines to keep the layout crisp and engineered.

### Named Rules
**The Flat-By-Default Rule.** Avoid shadows unless state feedback is required.

## 5. Components

### Buttons
- **Shape:** pill (9999px).
- **Primary:** Blue fill, white text, 12px vertical padding, 28px horizontal padding.
- **Secondary:** White background with blue text and border.
- **Hover / Focus:** Subtle opacity or border shift, no heavy shadow.

### Cards / Containers
- **Corner Style:** 1rem to 2rem radii depending on size.
- **Background:** White on neutral surface, with clean border.
- **Border:** 1px divider gray, no shadow.
- **Internal Padding:** 24px–32px for primary sections.

### Navigation
- **Style:** Inline text links with muted default and high-contrast hover.
- **Active State:** Bold or darker ink for the current section.
- **CTA:** Primary pill button on the right.

### Gallery Tiles
- **Style:** Image-backed tiles with dark gradient overlays.
- **Text:** White titles with muted tag text, accent dot for category.

## 6. Do's and Don'ts

### Do:
- **Do** keep backgrounds neutral and reserve accent colors for CTAs and signals.
- **Do** maintain clear borders between sections for a studio-like structure.
- **Do** keep body text dark enough for effortless reading.

### Don't:
- **Don't** use generic SaaS or crypto landing templates or layouts.
- **Don't** use heavy gradients as decoration.
- **Don't** repeat identical card grids without hierarchy or variation.
