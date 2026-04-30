import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const deployFestHref =
  "https://gdg.community.dev/events/details/google-gdg-cloud-bengaluru-presents-deployfest/";

const eventDetails = [
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

type ArchiveCardVariant = "feature" | "standard" | "compact";

type ArchiveItem = {
  title: string;
  meta: string;
  color: string;
  tag: string;
  tileClass: string;
  variant: ArchiveCardVariant;
};

const archive: ArchiveItem[] = [
  {
    title: "Come for Cloud, Stay for Success",
    meta: "Postman Bengaluru · GCP, IaC, DevOps, Kubernetes, AI operations",
    color: "#4285F4",
    tag: "Community Meetup",
    tileClass: "col-span-1 sm:col-span-4 sm:row-span-2",
    variant: "feature",
  },
  {
    title: "Cloudtoberfest 2025",
    meta: "Google, Bagmane Capital Park · Kubernetes, GKE, Istio, MCP security",
    color: "#EA4335",
    tag: "Festival",
    tileClass: "col-span-1 sm:col-span-2 sm:row-span-1",
    variant: "compact",
  },
  {
    title: "Google Cloud Community Day Bengaluru 2025",
    meta: "Hilton Bengaluru Embassy Manyata · Gemini, Gemma, Vertex AI",
    color: "#34A853",
    tag: "Community Day",
    tileClass: "col-span-1 sm:col-span-2 sm:row-span-1",
    variant: "compact",
  },
  {
    title: "Build with AI: GDG Cloud Bangalore Edition",
    meta: "Dyte Bengaluru · Vertex AI, Generative AI, gRPC, agentic systems",
    color: "#FBBC04",
    tag: "Workshop",
    tileClass: "col-span-1 sm:col-span-2 sm:row-span-1",
    variant: "standard",
  },
  {
    title: "Bangalore Dev Connect",
    meta: "Google Bangalore · Cloud, ML, app development, community networking",
    color: "#4285F4",
    tag: "Developer Connect",
    tileClass: "col-span-1 sm:col-span-2 sm:row-span-1",
    variant: "standard",
  },
  {
    title: "Google Cloud Community Day 2023, Bengaluru",
    meta: "Infosys Electronic City · Security, analytics, AI, ML, workshops",
    color: "#EA4335",
    tag: "Conference",
    tileClass: "col-span-1 sm:col-span-2 sm:row-span-1",
    variant: "standard",
  },
];

const archiveCardStyles = {
  feature: {
    gradient: "h-36 sm:h-44",
    content: "p-6 sm:p-7",
    tag: "text-xs sm:text-sm",
    title: "text-lg leading-tight sm:text-2xl lg:text-3xl",
    meta: "mt-2 text-sm leading-6 text-white/85 sm:text-base lg:text-lg",
  },
  standard: {
    gradient: "h-28 sm:h-34",
    content: "p-5 sm:p-6",
    tag: "text-[11px] sm:text-xs",
    title: "text-base leading-tight sm:text-lg lg:text-xl",
    meta: "mt-2 hidden text-xs leading-5 text-white/85 sm:block sm:text-sm",
  },
  compact: {
    gradient: "h-24 sm:h-30",
    content: "p-4 sm:p-5",
    tag: "text-[10px] sm:text-[11px]",
    title: "text-sm leading-tight sm:text-base lg:text-lg",
    meta: "mt-1 hidden text-[11px] leading-5 text-white/85 lg:block",
  },
} as const;

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

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
      <path
        d="M5 10h9M10.5 5.5 15 10l-4.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
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
    <div className="min-h-screen bg-[#FFFFFF] text-[#202124]">
      <header className="sticky top-0 z-50 border-b border-[#DADCE0] bg-[#FFFFFF]/95 backdrop-blur">
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
            <Link href="/#top" className="text-sm font-medium text-[#5F6368] hover:text-[#202124]">Spotlight</Link>
            <a href="#agenda" className="text-sm font-medium text-[#5F6368] hover:text-[#202124]">Agenda</a>
            <a href="#archive" className="text-sm font-medium text-[#5F6368] hover:text-[#202124]">Hall of Fame</a>
            <Link href="/#calls-forms" className="text-sm font-medium text-[#5F6368] hover:text-[#202124]">CFP & Venue</Link>
            <span className="text-sm font-semibold text-[#202124]">Events</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hidden text-sm font-medium text-[#5F6368] hover:text-[#202124] sm:inline md:hidden">Home</Link>
            <a href={deployFestHref} className="inline-flex h-10 items-center rounded-full bg-[#1A73E8] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90">Register</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="mx-auto grid min-h-[calc(100vh-4.25rem)] w-full max-w-7xl items-center gap-16 px-5 py-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
          <div>
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight text-[#202124] sm:text-6xl lg:text-7xl">
              Events
            </h1>
            <div className="mt-8">
              <SectionLabel>Featured program</SectionLabel>
            </div>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-[#202124] sm:text-4xl lg:text-5xl">
              DeployFest is built for teams that ship.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5F6368]">
              A single-day GDG Cloud Bengaluru buildathon for real-world
              solutions on Google Cloud, with GenAI, Vertex AI, live demos,
              judging, credits, and a focused 7-hour deployment sprint.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={deployFestHref} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1A73E8] px-7 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                Register for DeployFest
                <ArrowIcon />
              </a>
              <a href="#archive" className="inline-flex h-12 items-center justify-center rounded-full border border-[#DADCE0] px-7 text-sm font-semibold text-[#1A73E8] transition-colors hover:border-[#1A73E8]">
                View archive
              </a>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[#DADCE0] bg-[#F8F9FA] p-3">
            <div className="rounded-[1.5rem] border border-[#DADCE0] bg-[#FFFFFF] p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-[#202124]">
                Event essentials
              </h2>
              <dl className="mt-8 grid gap-5">
                {eventDetails.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[6rem_1fr] gap-4 border-t border-[#DADCE0] pt-4">
                    <dt className="text-xs font-semibold uppercase text-[#5F6368]">{label}</dt>
                    <dd className="text-sm font-semibold leading-6 text-[#202124]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </section>

        <section id="agenda" className="mx-auto w-full max-w-5xl scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <SectionLabel>Program flow</SectionLabel>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#202124] sm:text-5xl">
            A build day structured for focus, delivery, and live evaluation.
          </h2>
          <div className="mt-12 divide-y divide-[#DADCE0] border-y border-[#DADCE0]">
            {agenda.map(([time, item]) => (
              <div key={time} className="grid gap-3 py-6 sm:grid-cols-[7rem_1fr]">
                <p className="text-sm font-semibold text-[#1A73E8]">{time}</p>
                <p className="text-base font-medium leading-7 text-[#202124]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="archive" className="mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Event archive gallery</SectionLabel>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#202124] sm:text-5xl">
              A visible track record across cloud, AI, DevOps, and developer learning.
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-4 sm:auto-rows-[9rem] sm:grid-cols-6">
            {archive.map((event) => {
              const cardStyle = archiveCardStyles[event.variant];
              return (
                <article
                  key={event.title}
                  className={`group relative overflow-hidden rounded-3xl border border-[#DADCE0] bg-[#F8F9FA] ${event.tileClass}`}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${event.color}2B 0%, #F8F9FA 58%, #FFFFFF 100%)`,
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at top right, rgba(255,255,255,0.62), transparent 45%)",
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#202124]/90 via-[#202124]/65 to-transparent ${cardStyle.gradient}`}
                    aria-hidden="true"
                  />

                  <div className={`relative flex h-full flex-col justify-between ${cardStyle.content}`}>
                    <div className="flex items-center justify-between gap-3">
                      <p className={`font-semibold uppercase tracking-wide text-[#5F6368] ${cardStyle.tag}`}>
                        {event.tag}
                      </p>
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: event.color }}
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <h3 className={`font-semibold tracking-tight text-white ${cardStyle.title}`}>
                        {event.title}
                      </h3>
                      <p className={cardStyle.meta}>{event.meta}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
