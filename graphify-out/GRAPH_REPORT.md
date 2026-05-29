# Graph Report - D:\\College\\Projects\\gdgcblr  (2026-05-29)

## Corpus Check
- Corpus is ~4,902 words - fits in a single context window. You may not need a graph.

## Summary
- 29 nodes · 29 edges · 17 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Structure Signals
- Entity graph basis: 13 non-file, non-concept node(s)
- Weakly connected components: 4
- Singleton components: 2
- Isolated nodes: 2
- Largest component: 9 node(s) (69% of the entity graph basis)
- Low-cohesion communities: 0
- Largest low-cohesion community: none on the entity graph basis

## Workspace Bridges
1. `Home\(\)` - connects `App — Page`, `App Page — Events`; home: `App Events Hero`; degree 4; score 59.03
  source files: `D:/College/Projects/gdgcblr/app/components/EventsHero.tsx`, `D:/College/Projects/gdgcblr/app/page.tsx`, `D:\\College\\Projects\\gdgcblr\\app\\page.tsx`
2. `EventsPage\(\)` - connects `App Events Hero — Events`; home: `App Page — Events`; degree 2; score 47.7
  source files: `D:/College/Projects/gdgcblr/app/events/page.tsx`, `D:/College/Projects/gdgcblr/app/page.tsx`, `D:\\College\\Projects\\gdgcblr\\app\\events\\page.tsx`
3. `page /events` - connects `App Page — Events`; home: `App Events Hero — Events`; degree 2; score 44.2
  source files: `D:/College/Projects/gdgcblr/app/events/page.tsx`, `D:\\College\\Projects\\gdgcblr\\app\\components\\EventsHero.tsx`, `D:\\College\\Projects\\gdgcblr\\app\\events\\page.tsx`
4. `SectionLabel\(\)` - connects `App Events Hero`; home: `App Page — Events`; degree 3; score 22.98
  source files: `D:/College/Projects/gdgcblr/app/components/EventsHero.tsx`, `D:/College/Projects/gdgcblr/app/events/page.tsx`, `D:/College/Projects/gdgcblr/app/page.tsx`
5. `GoogleDots\(\)` - connects `App Page — Events`; home: `App Events Hero`; degree 3; score 16.4
  source files: `D:/College/Projects/gdgcblr/app/components/EventsHero.tsx`, `D:/College/Projects/gdgcblr/app/page.tsx`

## God Nodes
1. `Home\(\)` - 5 edges
2. `EventsHero\(\)` - 4 edges
3. `GoogleDots\(\)` - 4 edges
4. `SectionLabel\(\)` - 4 edges
5. `ArrowIcon\(\)` - 3 edges
6. `EventsPage\(\)` - 3 edges
7. `layout /` - 3 edges
8. `page /events` - 3 edges
9. `page /` - 2 edges
10. `RootLayout\(\)` - 2 edges

## Surprising Connections
- `page /` --renders--> `Home\(\)`  [EXTRACTED]
  D:\\College\\Projects\\gdgcblr\\app\\page.tsx → D:/College/Projects/gdgcblr/app/page.tsx  _connects across different repos/directories; bridges separate communities; peripheral node \`page /\` unexpectedly reaches hub \`Home\(\)\`_
- `page /events` --renders--> `EventsPage\(\)`  [EXTRACTED]
  D:\\College\\Projects\\gdgcblr\\app\\events\\page.tsx → D:/College/Projects/gdgcblr/app/events/page.tsx  _connects across different repos/directories; bridges separate communities_
- `layout /` --renders--> `RootLayout\(\)`  [EXTRACTED]
  D:\\College\\Projects\\gdgcblr\\app\\layout.tsx → D:/College/Projects/gdgcblr/app/layout.tsx  _connects across different repos/directories; bridges separate communities_
- `page /events` --renders--> `EventsHero\(\)`  [EXTRACTED]
  D:\\College\\Projects\\gdgcblr\\app\\events\\page.tsx → D:\\College\\Projects\\gdgcblr\\app\\components\\EventsHero.tsx  _connects across different repos/directories_
- `SectionLabel\(\)` --renders--> `GoogleDots\(\)`  [EXTRACTED]
  D:/College/Projects/gdgcblr/app/page.tsx → D:/College/Projects/gdgcblr/app/components/EventsHero.tsx  _bridges separate communities_

## Semantic Anomalies
- **[HIGH] Bridge node** - Home\(\) bridges App Events Hero and App Page, App Page — Events, App — Page.
  _High betweenness centrality \(35.033\) across 4 communities makes this node a likely dependency chokepoint._
- **[HIGH] Bridge node** - EventsPage\(\) bridges App Page — Events and App Page, App Events Hero — Events.
  _High betweenness centrality \(35.700\) across 3 communities makes this node a likely dependency chokepoint._
- **[HIGH] Bridge node** - page /events bridges App Events Hero — Events and App, App Page — Events.
  _High betweenness centrality \(32.200\) across 3 communities makes this node a likely dependency chokepoint._
- **[HIGH] Cross-boundary edge** - layout / → RootLayout\(\) crosses graph boundaries in an unexpected way.
  _connects across different repos/directories; bridges separate communities_
- **[HIGH] Cross-boundary edge** - page / → Home\(\) crosses graph boundaries in an unexpected way.
  _connects across different repos/directories; bridges separate communities; peripheral node \`page /\` unexpectedly reaches hub \`Home\(\)\`_

## Communities

### Community 0 - "App Events Hero"
Cohesion (entity basis within full-graph community): 0.67
Nodes (4): ArrowIcon\(\), EventsHero\(\), GoogleDots\(\), Home\(\)

### Community 1 - "App Page"
Cohesion (entity basis within full-graph community): 0
Nodes (2): ArrowIcon\(\), GoogleDots\(\)

### Community 2 - "App Events Hero — Events"
Cohesion (entity basis within full-graph community): 1
Nodes (2): EventsHero\(\), page /events

### Community 3 - "App"
Cohesion (entity basis within full-graph community): 1
Nodes (1): layout /

### Community 4 - "App — Page"
Cohesion (entity basis within full-graph community): 1
Nodes (1): page /

### Community 5 - "App Layout"
Cohesion (entity basis within full-graph community): 1
Nodes (1): RootLayout\(\)

### Community 6 - "Public Next"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 7 - "App Page — Events"
Cohesion (entity basis within full-graph community): 1
Nodes (2): EventsPage\(\), SectionLabel\(\)

### Community 8 - "Cfcsfs Jpg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 9 - "Cloudforall Jpg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 10 - "Community Day Jpg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 11 - "File SVG"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 12 - "Globe SVG"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 13 - "Next Env D TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 14 - "Observability Jpg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 15 - "Vercel SVG"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 16 - "Window SVG"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

## Knowledge Gaps
- **6 weakly connected node(s):** `GoogleDots\(\)`, `layout /`, `EventsHero\(\)`, `RootLayout\(\)`, `ArrowIcon\(\)` (+1 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `App Events Hero — Events`** (2 nodes): `EventsHero\(\)`, `page /events`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App`** (2 nodes): `layout /`, `/events`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App — Page`** (2 nodes): `page /`, `/`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App Layout`** (2 nodes): `layout.tsx`, `RootLayout\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Public Next`** (2 nodes): `next.svg`, `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App Page — Events`** (2 nodes): `EventsPage\(\)`, `SectionLabel\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Cfcsfs Jpg`** (1 nodes): `cfcsfs.jpg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Cloudforall Jpg`** (1 nodes): `cloudforall.jpg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community Day Jpg`** (1 nodes): `community-day.jpg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `File SVG`** (1 nodes): `file.svg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Globe SVG`** (1 nodes): `globe.svg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next Env D TypeScript`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Observability Jpg`** (1 nodes): `observability.jpg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vercel SVG`** (1 nodes): `vercel.svg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Window SVG`** (1 nodes): `window.svg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does \`EventsPage\(\)\` connect \`App Page — Events\` to \`App Page\`, \`App Events Hero — Events\`?**
  _High betweenness centrality \(35.700\) - this node is a cross-community bridge._
- **Why does \`Home\(\)\` connect \`App Events Hero\` to \`App Page\`, \`App Page — Events\`, \`App — Page\`?**
  _High betweenness centrality \(35.033\) - this node is a cross-community bridge._
- **Why does \`page /events\` connect \`App Events Hero — Events\` to \`App\`, \`App Page — Events\`?**
  _High betweenness centrality \(32.200\) - this node is a cross-community bridge._
- **What connects \`GoogleDots\(\)\`, \`layout /\`, \`EventsHero\(\)\` to the rest of the system?**
  _6 weakly-connected nodes found - possible documentation gaps or missing edges._
