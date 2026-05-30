import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/home/Navbar";
import FooterSection from "../components/home/FooterSection";

export const metadata: Metadata = {
  title: "Events | GDG Cloud Bengaluru",
  description:
    "DeployFest and past GDG Cloud Bengaluru programs across Google Cloud, GenAI, Kubernetes, DevOps, and developer learning.",
};

type FeaturedEvent = {
  title: string;
  description: string;
  date: string;
  venue: string;
  format: string;
  isUpcoming: boolean;
  link: string;
};

const featuredEvent: FeaturedEvent = {
  title: "DeployFest 2026",
  description:
    "A single-day, intensive buildathon focused on shipping working deployments, solving real problems, and sharing live demos.",
  date: "May 23, 2026",
  venue: "Deutsche Bank",
  format: "Buildathon",
  isUpcoming: false,
  link: "https://gdg.community.dev/events/details/google-gdg-cloud-bengaluru-presents-deployfest/",
};

type ArchiveItem = {
  title: string;
  meta: string;
  color: string;
  tag: string;
};

const archive: ArchiveItem[] = [
  {
    title: "Come for Cloud, Stay for Success",
    meta: "Postman Bengaluru · GCP, IaC, DevOps",
    color: "#4285F4",
    tag: "23/05/2026",
  },
  {
    title: "Cloudtoberfest 2025",
    meta: "Bagmane Capital Park · K8s, GKE, Istio",
    color: "#EA4335",
    tag: "23/05/2026",
  },
  {
    title: "Community Day Bengaluru 2025",
    meta: "Hilton Bengaluru Embassy Manyata",
    color: "#34A853",
    tag: "23/05/2026",
  },
  {
    title: "Build with AI: Bangalore Edition",
    meta: "Dyte Bengaluru · Vertex AI, GenAI",
    color: "#FBBC04",
    tag: "23/05/2026",
  },
  {
    title: "Bangalore Dev Connect",
    meta: "Google Bangalore · Cloud, ML, App Dev",
    color: "#4285F4",
    tag: "23/05/2026",
  },
  {
    title: "Community Day 2023, Bengaluru",
    meta: "Infosys Electronic City · Security, AI",
    color: "#EA4335",
    tag: "23/05/2026",
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <Navbar
        registerHref={featuredEvent.isUpcoming ? featuredEvent.link : "/"}
      />

      <main className="pt-32 pb-20 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-40">
        {/* HERO / FEATURED EVENT */}
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 text-center sm:px-8 lg:px-10">


          <h1 className="text-balance text-6xl font-bold tracking-tighter sm:text-7xl lg:text-[8rem] lg:leading-[0.9]">
            {featuredEvent.title.split(" ")[0]}{" "}
            <span className="text-gray-300">
              {featuredEvent.title.split(" ").slice(1).join(" ")}.
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-gray-600 sm:text-xl">
            {featuredEvent.description}
          </p>

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
        </section>

        {/* ARCHIVE / PAST EVENTS */}
        <section className="mx-auto mt-32 w-full max-w-7xl px-5 sm:mt-48 sm:px-8 lg:px-10">
          <div className="mb-12 border-b border-gray-100 pb-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Past Events.
            </h2>
            <p className="mt-4 text-gray-500">
              A track record of shipping and learning together.
            </p>
          </div>

          <div className="flex flex-col">
            {archive.map((item, i) => (
              <div
                key={i}
                className="group relative flex flex-col border-b border-gray-100 py-8 transition-colors hover:border-black sm:flex-row sm:items-center sm:justify-between sm:py-12"
              >
                <div className="flex flex-col">
                  <span
                    className="mb-2 text-xs font-bold uppercase tracking-wider"
                    style={{ color: "black" }}
                  >
                    {item.tag}
                  </span>
                  <h3
                    className="text-3xl font-bold tracking-tight text-gray-300 transition-colors duration-300 group-hover:text-[var(--hover-color)] sm:text-5xl lg:text-6xl"
                    style={
                      { "--hover-color": item.color } as React.CSSProperties
                    }
                  >
                    {item.title}
                  </h3>
                </div>

                <div className="mt-4 flex items-center gap-4 sm:mt-0 sm:text-right">
                  <p className="text-sm font-medium text-gray-500 sm:max-w-[200px]">
                    {item.meta}
                  </p>
                  <div className="hidden h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-colors group-hover:border-black group-hover:bg-black sm:flex">
                    <svg
                      className="h-5 w-5 text-black group-hover:text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
