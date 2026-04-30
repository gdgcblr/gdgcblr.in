import Image from "next/image";
import Link from "next/link";

const chapterHref = "https://gdg.community.dev/gdg-cloud-bengaluru/";

const stats = [
  {
    value: "5K+",
    title: "Community Reach",
    label: "developers, architects, and cloud practitioners connected across Bengaluru",
    color: "#4285F4",
  },
  {
    value: "Cloud + AI",
    title: "Technical Focus",
    label: "programming across Google Cloud, GenAI, Vertex AI, Kubernetes, and DevOps",
    color: "#EA4335",
  },
  {
    value: "Build",
    title: "Learning Format",
    label: "hands-on workshops, buildathons, demos, study jams, and community days",
    color: "#FBBC04",
  },
  {
    value: "GDG",
    title: "Global Network",
    label: "part of the Google Developer Groups ecosystem with a local Bengaluru identity",
    color: "#34A853",
  },
];

const initiatives = [
  {
    title: "Technical Programs",
    color: "#4285F4",
    description:
      "High-signal sessions across Google Cloud, GenAI, Kubernetes, DevOps, platform engineering, and production systems.",
  },
  {
    title: "Hands-on Buildathons",
    color: "#EA4335",
    description:
      "Focused build formats where teams prototype, deploy, demo, and learn from real engineering constraints.",
  },
  {
    title: "Professional Exchange",
    color: "#34A853",
    description:
      "A network for developers, architects, platform engineers, and technology leaders to exchange practical perspective.",
  },
];

const pastEvents = [
  "Come for Cloud, Stay for Success",
  "Build with AI: GDG Cloud Bangalore Edition",
  "Google Cloud Community Day Bengaluru 2025",
];

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

export default function Home() {
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
          <a href="#top" className="flex items-center" aria-label="GDG Cloud Bengaluru home">
            <Image
              src="/logo.png"
              alt="GDG Cloud Bengaluru"
              width={195}
              height={30}
              priority
              className="h-7 w-auto"
            />
          </a>
          <div className="hidden items-center gap-8 md:flex">
            <a className="text-sm font-medium text-[#5F6368] hover:text-[#202124]" href="#programs">
              Focus Areas
            </a>
            <Link className="text-sm font-medium text-[#5F6368] hover:text-[#202124]" href="/events">
              Events
            </Link>
            <a className="text-sm font-medium text-[#5F6368] hover:text-[#202124]" href="#community">
              Membership
            </a>
          </div>
          <a
            href={chapterHref}
            className="inline-flex h-10 items-center rounded-full bg-[#1A73E8] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Join
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="mx-auto grid min-h-[calc(100vh-4.25rem)] w-full max-w-7xl items-center gap-16 px-5 py-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
          <div>
            <Image
              src="/logo.png"
              alt="GDG Cloud Bengaluru"
              width={325}
              height={50}
              priority
              className="mb-10 h-auto w-64 sm:w-80"
            />
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#DADCE0] bg-[#FFFFFF] px-4 py-2 text-sm font-medium text-[#5F6368]">
              <GoogleDots />
              <span>5K+ members across Bengaluru’s cloud community</span>
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-[#202124] sm:text-6xl lg:text-7xl">
              Where Bengaluru’s cloud practitioners learn, connect, and lead.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#5F6368]">
              GDG Cloud Bengaluru convenes developers, architects, platform
              engineers, and technology leaders to exchange practical knowledge
              across Google Cloud, GenAI, DevOps, and production infrastructure.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={chapterHref}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1A73E8] px-7 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Join the community
                <ArrowIcon />
              </a>
              <Link
                href="/events"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#DADCE0] px-7 text-sm font-semibold text-[#1A73E8] transition-colors hover:border-[#1A73E8]"
              >
                Explore events
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[#DADCE0] bg-[#F8F9FA] p-3">
            <div className="rounded-[1.5rem] border border-[#DADCE0] bg-[#FFFFFF] p-8">
              <SectionLabel>Next event</SectionLabel>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#202124]">
                DeployFest
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#5F6368]">
                A single-day Google Cloud and GenAI buildathon focused on live
                deployments, demos, judging, and a 7-hour deployment sprint.
              </p>
              <dl className="mt-8 grid gap-5 border-y border-[#DADCE0] py-6">
                {[
                  ["Date", "May 23, 2026"],
                  ["Venue", "Deutsche Bank Shared Services"],
                  ["Location", "Electronic City, Bengaluru"],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[6rem_1fr] gap-4">
                    <dt className="text-xs font-semibold uppercase text-[#5F6368]">
                      {label}
                    </dt>
                    <dd className="text-sm font-semibold text-[#202124]">{value}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/events"
                className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[#1A73E8] px-7 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                View DeployFest
                <ArrowIcon />
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-2 p-5" aria-hidden="true">
              <span className="h-1 rounded-full bg-[#4285F4]" />
              <span className="h-1 rounded-full bg-[#EA4335]" />
              <span className="h-1 rounded-full bg-[#FBBC04]" />
              <span className="h-1 rounded-full bg-[#34A853]" />
            </div>
          </aside>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8 lg:px-12">
          <div className="mb-8 flex items-center justify-between gap-6">
            <div>
              <SectionLabel>Community signals</SectionLabel>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#202124] sm:text-3xl">
                Scale, focus, and operating model at a glance.
              </h2>
            </div>
          </div>
          <div className="grid overflow-hidden rounded-3xl border border-[#DADCE0] bg-[#FFFFFF] sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <article
                key={stat.title}
                className="border-b border-[#DADCE0] p-6 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <span
                  className="mb-6 block h-1 w-12 rounded-full"
                  style={{ backgroundColor: stat.color }}
                  aria-hidden="true"
                />
                <p className="text-3xl font-semibold tracking-tight text-[#202124]">
                  {stat.value}
                </p>
                <h3 className="mt-5 text-sm font-semibold uppercase text-[#202124]">
                  {stat.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#5F6368]">
                  {stat.label}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="programs" className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Technical focus areas</SectionLabel>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#202124] sm:text-5xl">
              A program portfolio built around cloud depth and practical delivery.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#5F6368] sm:text-lg">
              Programs are shaped around practical talks, applied workshops,
              peer networking, and large-format cloud community experiences.
            </p>
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {initiatives.map((item) => (
              <article key={item.title} className="rounded-3xl border border-[#DADCE0] bg-[#F8F9FA] p-8">
                <span className="mb-8 block h-1 w-12 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true" />
                <h3 className="text-xl font-semibold tracking-tight text-[#202124]">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#5F6368]">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <SectionLabel>Event portfolio</SectionLabel>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#202124] sm:text-5xl">
                Previous programs show the community’s range and technical maturity.
              </h2>
            </div>
            <div className="divide-y divide-[#DADCE0] border-y border-[#DADCE0]">
              {pastEvents.map((event) => (
                <div key={event} className="flex items-center justify-between gap-8 py-6">
                  <p className="text-base font-semibold text-[#202124]">{event}</p>
                  <Link href="/events" className="shrink-0 text-sm font-semibold text-[#1A73E8] hover:text-[#202124]">
                    Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="community" className="mx-auto w-full max-w-5xl px-5 py-24 text-center sm:px-8 lg:px-12 lg:py-32">
          <div className="mb-8 flex justify-center">
            <GoogleDots />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-[#202124] sm:text-5xl">
            Be part of Bengaluru’s cloud engineering community.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5F6368] sm:text-lg">
            Join GDG Cloud Bengaluru to stay informed about upcoming programs,
            connect with peers, and contribute to a community focused on
            practical cloud excellence.
          </p>
          <a
            href={chapterHref}
            className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-[#1A73E8] px-7 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Join GDG Cloud Bengaluru
            <ArrowIcon />
          </a>
        </section>
      </main>

      <footer className="border-t border-[#DADCE0] bg-[#FFFFFF]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-10 text-sm text-[#5F6368] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <div>
            <Image src="/logo.png" alt="GDG Cloud Bengaluru" width={195} height={30} className="h-7 w-auto" />
            <p className="mt-3">© 2026 GDG Cloud Bengaluru.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <a href="#programs" className="hover:text-[#202124]">Focus Areas</a>
            <Link href="/events" className="hover:text-[#202124]">Events</Link>
            <a href={chapterHref} className="text-[#1A73E8] hover:text-[#202124]">Join</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
