import type { Metadata } from "next";
import Link from "next/link";
import CFPForm from "./CFPForm";
import FooterSection from "../components/home/FooterSection";

export const metadata: Metadata = {
  title: "Call for Proposals (CFP) | GDG Cloud Bengaluru",
  description:
    "Submit your session proposal for GDG Cloud Bengaluru. We welcome talks, workshops, and lightning presentations on Google Cloud and AI.",
};

export default function CFPPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black hover:opacity-70 transition"
          >
            &larr; Back to Home
          </Link>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            GDG Cloud Bengaluru &bull; CFP 2026
          </span>
        </nav>
      </header>

      {/* Intro Section */}
      <section className="mx-auto w-full max-w-3xl px-5 pt-14 pb-8 sm:pt-20 sm:pb-12 text-center">
        <span className="inline-block border border-black rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-black mb-4">
          Call for Proposals
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-black sm:text-5xl">
          Submit Your Session
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
          Present your talk, architecture case study, or hands-on workshop to the developer and cloud community in Bengaluru.
        </p>
      </section>

      {/* Form Container */}
      <main className="mx-auto w-full max-w-5xl px-5 pb-20">
        <CFPForm />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
