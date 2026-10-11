import type { Metadata } from "next";
import Link from "next/link";
import VolunteerForm from "./VolunteerForm";
import FooterSection from "../components/home/FooterSection";

export const metadata: Metadata = {
  title: "Volunteer | GDG Cloud Bengaluru",
  description:
    "Join the organizing crew for GDG Cloud Bengaluru. Contribute to event operations, registrations, tech AV, social media, and attendee experiences.",
};

export default function VolunteerPage() {
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
            GDG Cloud Bengaluru &bull; Volunteers 2026
          </span>
        </nav>
      </header>

      {/* Intro Section */}
      <section className="mx-auto w-full max-w-3xl px-5 pt-14 pb-8 sm:pt-20 sm:pb-12 text-center">
        <span className="inline-block border border-black rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-black mb-4">
          Community Crew
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-black sm:text-5xl">
          Volunteer With Us
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
          Be at the heart of Bengaluru's premier cloud and AI community events. Gain hands-on leadership experience, network with industry leads, and help ship world-class developer experiences.
        </p>
      </section>

      {/* Main Form */}
      <main className="mx-auto w-full max-w-5xl px-5 pb-20">
        <VolunteerForm />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
