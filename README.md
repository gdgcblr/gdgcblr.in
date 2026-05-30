# GDG Cloud Bengaluru Website

Welcome to the official website for GDG Cloud Bengaluru! This project is built using Next.js 16 (App Router), Tailwind CSS, and Framer Motion for sleek, modern, and impeccable design.

## 🚀 Getting Started

To run the project locally on your machine:

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✏️ Editing Content

The site is built with modular components to make content updates incredibly easy without touching the core layout engine.

### Homepage Content
- **Hero & General Layout:** All sections on the homepage are located in `app/page.tsx` and the `app/components/home/` directory.
- **Gallery/Bento Grid:** To add or remove images from the animated gallery grid, edit the `galleryHighlights` array at the top of `app/components/home/GallerySection.tsx`.

### Events Page
The Events page dynamically reconfigures itself based on the data you provide.

To update the Events page, open `app/events/page.tsx`:
1. **Featured Event:** Edit the `featuredEvent` object at the top of the file. 
   - *Pro tip:* Toggle `isUpcoming: true` when you have a new event to enable the pulsing "Upcoming" badge and "Register" button. Toggle it to `false` when the event is over to seamlessly switch to a "Latest Event" view.
2. **Past Events (Archive):** Add or remove items from the `archive` array. The grid will automatically style the rows and apply the brand colors you specify on hover.

### Navigation
- To update links in the top navigation bar or the footer, edit `app/components/home/Navbar.tsx` and `app/components/home/FooterNav.tsx`.

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion & GSAP (for MagicBento interactions)
- **Deployment:** Vercel (Recommended)
