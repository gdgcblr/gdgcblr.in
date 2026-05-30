import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/home/Navbar";
import FooterSection from "../components/home/FooterSection";
import ArchiveList from "./ArchiveList";
import { getEventsData } from "../lib/sheets";

export const metadata: Metadata = {
  title: "Events | GDG Cloud Bengaluru",
  description:
    "DeployFest and past GDG Cloud Bengaluru programs across Google Cloud, GenAI, Kubernetes, DevOps, and developer learning.",
};

export default async function EventsPage() {
  const events = await getEventsData();
  
  // Find the featured event, or fallback to the first event
  const featuredEvent = events.find((e) => e.isFeatured) || events[0];
  
  // All other events go into the archive
  const archive = events.filter((e) => e !== featuredEvent);

  if (!featuredEvent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-black">
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <Navbar
        registerHref={featuredEvent.isUpcoming ? featuredEvent.link : "/"}
      />

      <main>
        {/* HERO / FEATURED EVENT */}
        <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-5xl flex-col items-center justify-center px-5 text-center pt-24 pb-10 sm:px-8 lg:px-10">
          {featuredEvent.isUpcoming ? (
            <div className="mb-6 flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5">
              <>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EA4335] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#EA4335]"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-black">
                  Upcoming Event
                </span>
              </>
            </div>
          ) : null}

          <h1 className="text-balance text-6xl font-bold tracking-tighter sm:text-7xl lg:text-[8rem] lg:leading-[0.9]">
            {featuredEvent.title.split(" ")[0]}{" "}
            <span className="text-gray-300">
              {featuredEvent.title.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          
          {featuredEvent.description && (
            <p className="mt-8 max-w-2xl text-lg text-gray-600 sm:text-xl">
              {featuredEvent.description}
            </p>
          )}

          <div className="mt-10 flex flex-wrap justify-center gap-8 border-t border-gray-100 pt-8 sm:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Date
              </p>
              <p className="mt-1 font-medium text-black">
                {featuredEvent.date}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Venue
              </p>
              <p className="mt-1 font-medium text-black">
                {featuredEvent.venue}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Format
              </p>
              <p className="mt-1 font-medium text-black">
                {featuredEvent.format}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <a
              href={featuredEvent.link}
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-black px-8 font-semibold text-white transition-transform hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 z-0 h-full w-full -translate-x-full rounded-full bg-gradient-to-r from-[#EA4335] via-[#4285F4] to-[#34A853] transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative flex items-center gap-2">
                {featuredEvent.isUpcoming
                  ? `Register for ${featuredEvent.title.split(" ")[0]}`
                  : "View Event Highlights"}
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </a>
          </div>

          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center gap-2 text-gray-400">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Past Events</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </section>

        <ArchiveList archive={archive} />
      </main>

      <FooterSection />
    </div>
  );
}
