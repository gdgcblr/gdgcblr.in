import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EventsHero from "../components/EventsHero";

const deployFestHref =
  "https://gdg.community.dev/events/details/google-gdg-cloud-bengaluru-presents-deployfest/";

const eventDetails: [string, string][] = [
  ["Date", "May 23, 2026"],
  ["Time", "9:00 AM to 8:00 PM IST"],
  ["Venue", "Deutsche Bank Shared Services"],
  ["Location", "Electronic City, Bengaluru"],
  ["Format", "Single-day buildathon"],
  ["Focus", "Google Cloud, GenAI, Vertex AI"],
];

const agenda = [
  ["09:00", "Check-in, breakfast, badges, and team setup"],
  ["09:30", "Opening keynote and problem reveal"],
  ["10:00", "Seven-hour build sprint begins"],
  ["13:00", "Working lunch during build time"],
  ["17:00", "Code freeze for repositories and deployments"],
  ["17:30", "Rapid pitches and live demos"],
  ["19:30", "Winners, prizes, and networking"],
];

type ArchiveItem = {
 title: string;
 meta: string;
 color: string;
 tag: string;
};

const archive: ArchiveItem[] = [
  {
    title: "Come for Cloud, Stay for Success",
    meta: "Postman Bengaluru · GCP, IaC, DevOps, Kubernetes, AI operations",
    color: "#4285F4",
    tag: "Community Meetup",
  },
  {
    title: "Cloudtoberfest 2025",
    meta: "Google, Bagmane Capital Park · Kubernetes, GKE, Istio, MCP security",
    color: "#EA4335",
    tag: "Festival",
  },
  {
    title: "Google Cloud Community Day Bengaluru 2025",
    meta: "Hilton Bengaluru Embassy Manyata · Gemini, Gemma, Vertex AI",
    color: "#34A853",
    tag: "Community Day",
  },
  {
    title: "Build with AI: GDG Cloud Bangalore Edition",
    meta: "Dyte Bengaluru · Vertex AI, Generative AI, gRPC, agentic systems",
    color: "#FBBC04",
    tag: "Workshop",
  },
  {
    title: "Bangalore Dev Connect",
    meta: "Google Bangalore · Cloud, ML, app development, community networking",
    color: "#4285F4",
    tag: "Developer Connect",
  },
  {
    title: "Google Cloud Community Day 2023, Bengaluru",
    meta: "Infosys Electronic City · Security, analytics, AI, ML, workshops",
    color: "#EA4335",
    tag: "Conference",
  },
];

const archiveGallery = [
  {
    title: "Community Day Bengaluru 2025",
    image: "/gallery/community-day.jpg",
  },
  {
    title: "Come for Cloud, Stay for Success",
    image: "/gallery/cfcsfs.jpg",
  },
  {
    title: "Cloud Observability Summit",
    image: "/gallery/observability.jpg",
  },
  {
    title: "Cloud for all",
    image: "/gallery/cloudforall.jpg",
  },
];

export const metadata: Metadata = {
  title: "Events | GDG Cloud Bengaluru",
  description:
    "DeployFest and past GDG Cloud Bengaluru programs across Google Cloud, GenAI, Kubernetes, DevOps, and developer learning.",
};

function GoogleDots() {
  return (
    <span className="inline-flex items-center gap-1.5" aria-hidden="true">
      <span className="h-2 w-2 rounded-full bg-[#4285F4]" />
      <span className="h-2 w-2 rounded-full bg-[#EA4335]" />
      <span className="h-2 w-2 rounded-full bg-[#FBBC04]" />
      <span className="h-2 w-2 rounded-full bg-[#34A853]" />
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-3 text-sm font-semibold tracking-tight text-[#1A73E8]">
      <GoogleDots />
      {children}
    </p>
  );
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-[#F6F7FB] text-[#202124]">
      <header className="sticky top-0 z-50 border-b border-[#DADCE0] bg-[#FFFFFF]/92 backdrop-blur">
        <div className="grid h-1 grid-cols-4" aria-hidden="true">
          <span className="bg-[#4285F4]" />
          <span className="bg-[#EA4335]" />
          <span className="bg-[#FBBC04]" />
          <span className="bg-[#34A853]" />
        </div>
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center" aria-label="GDG Cloud Bengaluru home">
            <Image src="/logo.png" alt="GDG Cloud Bengaluru" width={195} height={30} priority className="h-7 w-auto" />
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/#top" className="text-sm font-medium text-[#3C4043] hover:text-[#202124]">Spotlight</Link>
            <a href="#agenda" className="text-sm font-medium text-[#3C4043] hover:text-[#202124]">Agenda</a>
            <a href="#archive" className="text-sm font-medium text-[#3C4043] hover:text-[#202124]">Hall of Fame</a>
            <Link href="/#calls-forms" className="text-sm font-medium text-[#3C4043] hover:text-[#202124]">CFP & Venue</Link>
            <span className="text-sm font-semibold text-[#202124]">Events</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hidden text-sm font-medium text-[#3C4043] hover:text-[#202124] sm:inline md:hidden">Home</Link>
            <a href={deployFestHref} className="inline-flex h-10 items-center rounded-full bg-[#1A73E8] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(26,115,232,0.25)] transition-opacity hover:opacity-90">Register</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <EventsHero deployFestHref={deployFestHref} eventDetails={eventDetails} />

        <section id="agenda" className="mx-auto w-full max-w-7xl scroll-mt-24 border-y border-[#E6E8EE] bg-[#FFFFFF] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <SectionLabel>Program flow</SectionLabel>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#202124] sm:text-5xl">
                A build day structured for focus, delivery, and live evaluation.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#3C4043] sm:text-lg">
                The agenda keeps teams moving from kickoff to demo with clear
                checkpoints, working lunch, and a structured pitch window.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-[#DADCE0] bg-[#F8F9FA] p-6">
              <div className="divide-y divide-[#DADCE0]">
                {agenda.map(([time, item]) => (
                  <div key={time} className="grid gap-3 py-5 sm:grid-cols-[6rem_1fr]">
                    <p className="text-sm font-semibold text-[#1A73E8]">{time}</p>
                    <p className="text-base font-medium leading-7 text-[#202124]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="archive" className="mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <SectionLabel>Event archive</SectionLabel>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#202124] sm:text-5xl">
                A track record across cloud, AI, DevOps, and developer learning.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#3C4043] sm:text-lg">
                Past programs show the breadth of topics and the delivery focus
                the community expects from each session.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:auto-rows-[10rem] sm:grid-cols-6">
                {archiveGallery.map((item) => (
                  <div
                    key={item.title}
                    className="relative overflow-hidden rounded-2xl border border-[#DADCE0] bg-[#FFFFFF] sm:col-span-3"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-[#DADCE0] bg-[#FFFFFF] p-6">
              <div className="divide-y divide-[#E6E8EE]">
                {archive.map((event) => (
                  <div key={event.title} className="py-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5F6368]">
                          {event.tag}
                        </p>
                        <h3 className="mt-2 text-base font-semibold text-[#202124]">
                          {event.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-[#3C4043]">
                          {event.meta}
                        </p>
                      </div>
                      <span
                        className="mt-1 h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: event.color }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
