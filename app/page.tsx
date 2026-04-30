import Image from "next/image";
import Link from "next/link";

const chapterHref = "https://gdg.community.dev/gdg-cloud-bengaluru/";
const registerHref =
  "https://gdg.community.dev/events/details/google-gdg-cloud-bengaluru-presents-deployfest/";
const callForProposalsHref = chapterHref;
const venueInterestFormHref = chapterHref;

const utilityDetails = [
  ["Date", "May 23, 2026"],
  ["Time", "9:00 AM to 8:00 PM IST"],
  ["Venue", "Deutsche Bank, Bengaluru"],
];

const initiatives = [
  {
    title: "Cloud Infrastructure & Architectures",
    color: "#4285F4",
    description:
      "Distributed systems, cloud architecture patterns, scalability, reliability, and platform design for production.",
  },
  {
    title: "AI & Applied Machine Learning",
    color: "#EA4335",
    description:
      "Practical AI workflows with Gemini, Vertex AI, model evaluation, and delivery-focused ML engineering.",
  },
  {
    title: "Web Technologies",
    color: "#34A853",
    description:
      "Modern frontend and full-stack engineering across performance, developer tooling, and product delivery.",
  },
  {
    title: "Open Source Contributions",
    color: "#FBBC04",
    description:
      "Community-driven collaboration through OSS projects, code contributions, mentorship, and maintainer-led sessions.",
  },
];

const communityStats = [
  ["40+", "Events till now"],
  ["5K+", "Developers reached"],
  ["120+", "Sessions hosted"],
  ["80+", "Speakers and mentors"],
];

type CommunityCall = {
  title: string;
  label: string;
  summary: string;
  points: string[];
  color: string;
  href: string;
  cta: string;
};

const communityCalls: CommunityCall[] = [
  {
    title: "Call for Proposals",
    label: "Speakers · Workshops · Demos",
    summary:
      "Share your engineering experience with the community through technical talks, workshops, and practical walkthroughs.",
    points: [
      "Cloud, AI, DevOps, Kubernetes, and platform engineering topics",
      "Real implementation stories and production learnings",
      "Accepted sessions are featured in upcoming event programs",
    ],
    color: "#4285F4",
    href: callForProposalsHref,
    cta: "Submit proposal",
  },
  {
    title: "Venue Interest Form",
    label: "Host Partner · Campus · Workspace",
    summary:
      "Want to host a GDG Cloud Bengaluru session or event day? Share your venue details and collaboration intent.",
    points: [
      "Suitable for meetups, workshops, and community day formats",
      "Support options: space, A/V, logistics, and local coordination",
      "Team follows up with fit, dates, and event requirements",
    ],
    color: "#34A853",
    href: venueInterestFormHref,
    cta: "Submit venue interest",
  },
];

const galleryOverlayStyles = {
  feature: {
    gradient: "h-36 sm:h-44",
    content: "p-5 sm:p-7",
    tag: "text-xs sm:text-sm",
    title: "text-lg leading-tight sm:text-2xl sm:leading-[1.15]",
    detail: "mt-2 hidden text-sm leading-6 text-white sm:block sm:text-base",
  },
  medium: {
    gradient: "h-28 sm:h-36",
    content: "p-5 sm:p-6",
    tag: "text-[11px] sm:text-xs",
    title: "text-base leading-tight sm:text-xl",
    detail: "mt-2 hidden text-xs leading-5 text-white sm:block sm:text-sm",
  },
  compact: {
    gradient: "h-24 sm:h-32",
    content: "p-5 sm:p-5",
    tag: "text-[11px] sm:text-xs",
    title: "text-[15px] leading-tight sm:text-lg",
    detail: "mt-1 hidden text-xs leading-5 text-white md:block",
  },
} as const;

type GalleryOverlayVariant = keyof typeof galleryOverlayStyles;

type GalleryHighlight = {
  title: string;
  tag: string;
  color: string;
  tileClass: string;
  overlay: GalleryOverlayVariant;
  image: string;
};

const galleryHighlights: GalleryHighlight[] = [
  {
    title: "Community Day Bengaluru 2025",
    tag: "Conference",
    color: "#EA4335",
    tileClass: "col-span-1 sm:col-span-4 sm:row-span-2",
    overlay: "feature",
    image: "/gallery/community-day.jpg",
  },
  {
    title: "Come for Cloud, Stay for Success",
    tag: "Demos",
    color: "#4285F4",
    tileClass: "col-span-1 sm:col-span-2 sm:row-span-1",
    overlay: "compact",
    image: "/gallery/cfcsfs.jpg",
  },
  {
    title: "Cloud Observability Summit",
    tag: "Summit",
    color: "#4285F4",
    tileClass: "col-span-1 sm:col-span-2 sm:row-span-2",
    overlay: "compact",
    image: "/gallery/observability.jpg",
  },
  {
    title: "Cloud for all",
    tag: "Meetup",
    color: "#FBBC04",
    tileClass: "col-span-1 sm:col-span-2 sm:row-span-1",
    overlay: "compact",
    image: "/gallery/cloudforall.jpg",
  },
  {
    title: "Cloudtoberfest",
    tag: "Meetup",
    color: "#34A853",
    tileClass: "col-span-1 sm:col-span-2 sm:row-span-1",
    overlay: "compact",
    image: "/gallery/cloudtoberfest.jpeg",
  },
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
          <a
            href="#top"
            className="flex items-center"
            aria-label="GDG Cloud Bengaluru home"
          >
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
            <a
              className="text-sm font-medium text-[#5F6368] hover:text-[#202124]"
              href="#top"
            >
              Spotlight
            </a>
            <a
              className="text-sm font-medium text-[#5F6368] hover:text-[#202124]"
              href="#focus-areas"
            >
              Core Initiatives
            </a>
            <a
              className="text-sm font-medium text-[#5F6368] hover:text-[#202124]"
              href="#calls-forms"
            >
              CFP & Venue
            </a>
            <a
              className="text-sm font-medium text-[#5F6368] hover:text-[#202124]"
              href="#gallery"
            >
              Hall of Fame
            </a>
            <Link
              className="text-sm font-medium text-[#5F6368] hover:text-[#202124]"
              href="/events"
            >
              Events
            </Link>
          </div>
          <a
            href={registerHref}
            className="inline-flex h-10 items-center rounded-full bg-[#1A73E8] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Register
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="mx-auto grid min-h-[calc(100vh-4.25rem)] w-full max-w-7xl items-center gap-16 px-5 py-16 sm:px-8 sm:py-20 lg:h-[calc(100svh-4.25rem)] lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,36rem)] lg:gap-10 lg:px-12 lg:py-6 xl:gap-14">
          <div className="lg:pr-4">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#DADCE0] bg-[#FFFFFF] px-4 py-2 text-sm font-medium text-[#5F6368] lg:mb-6">
              <GoogleDots />
              <span>5K+ members across Bengaluru’s cloud community</span>
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-[#202124] sm:text-6xl lg:max-w-3xl lg:text-7xl">
              A cloud community built for developers who ship.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#5F6368] lg:mt-6">
              GDG Cloud Bengaluru brings together developers, architects, and
              platform engineers for practical learning in Google Cloud, GenAI,
              Kubernetes, DevOps, and production systems.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:mt-8">
              <a
                href={registerHref}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1A73E8] px-7 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Register for DeployFest
                <ArrowIcon />
              </a>
              <Link
                href="/events"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#DADCE0] px-7 text-sm font-semibold text-[#1A73E8] transition-colors hover:border-[#1A73E8]"
              >
                View all events
              </Link>
            </div>
          </div>

          <aside className="w-full rounded-[2rem] border border-[#DADCE0] bg-[#F8F9FA] p-3 lg:ml-auto">
            <div className="rounded-[1.5rem] border border-[#DADCE0] bg-[#FFFFFF] p-8 lg:p-6">
              <SectionLabel>Next event utility panel</SectionLabel>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#202124]">
                DeployFest
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#5F6368]">
                A single-day Google Cloud and GenAI buildathon focused on live
                deployments, demos, judging, and a 7-hour deployment sprint.
              </p>
              <dl className="mt-8 grid gap-4 border-t border-[#DADCE0] pt-6 lg:mt-6 lg:gap-3 lg:pt-5">
                {utilityDetails.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[6rem_1fr] gap-4">
                    <dt className="text-xs font-semibold uppercase text-[#5F6368]">
                      {label}
                    </dt>
                    <dd className="text-sm font-semibold text-[#202124]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-6">
                <a
                  href={registerHref}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#1A73E8] px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Register now
                  <ArrowIcon />
                </a>
                <a
                  href={chapterHref}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-[#DADCE0] px-6 text-sm font-semibold text-[#1A73E8] transition-colors hover:border-[#1A73E8]"
                >
                  Contact organizers
                </a>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 p-5" aria-hidden="true">
              <span className="h-1 rounded-full bg-[#4285F4]" />
              <span className="h-1 rounded-full bg-[#EA4335]" />
              <span className="h-1 rounded-full bg-[#FBBC04]" />
              <span className="h-1 rounded-full bg-[#34A853]" />
            </div>
          </aside>
        </section>

        <section
          id="focus-areas"
          className="mx-auto w-full max-w-7xl scroll-mt-24 border-y border-[#ECEFF1] bg-[#FCFCFD] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28"
        >
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <SectionLabel>Technical focus areas</SectionLabel>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-[#202124] sm:text-5xl">
                Core initiatives that define our community programs.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#5F6368] sm:text-lg">
                Every track is designed for practical implementation, clear
                architecture thinking, and measurable developer growth.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 rounded-2xl border border-[#DADCE0] bg-[#F8F9FA] p-6">
              {communityStats.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-xl border border-[#DADCE0] bg-[#FFFFFF] px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#BDC1C6] hover:bg-[#F8F9FA]"
                >
                  <p className="text-2xl font-semibold tracking-tight text-[#202124]">
                    {value}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase leading-5 text-[#5F6368]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-4">
            {initiatives.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#DADCE0] bg-[#FFFFFF] p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#BDC1C6] hover:bg-[#F8F9FA]"
              >
                <span
                  className="mb-7 block h-1 w-12 rounded-full"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <h3 className="text-lg font-semibold tracking-tight text-[#202124]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#5F6368]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="calls-forms"
          className="mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28"
        >
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <SectionLabel>Open community calls</SectionLabel>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#202124] sm:text-5xl">
                Call for proposals and venue interest forms.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#5F6368] sm:text-lg">
                We are actively onboarding speakers and host partners for
                upcoming sessions. Use the links below to submit your interest.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {communityCalls.map((call) => (
                <article
                  key={call.title}
                  className="rounded-2xl border border-[#DADCE0] bg-[#FFFFFF] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#BDC1C6] hover:bg-[#F8F9FA]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="h-1.5 w-10 rounded-full"
                      style={{ backgroundColor: call.color }}
                      aria-hidden="true"
                    />
                    <span className="rounded-full border border-[#DADCE0] bg-[#F8F9FA] px-3 py-1 text-xs font-semibold uppercase text-[#5F6368]">
                      Open
                    </span>
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#5F6368]">
                    {call.label}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#202124]">
                    {call.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#5F6368]">
                    {call.summary}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-[#5F6368]">
                    {call.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span
                          className="mt-2 h-1.5 w-1.5 rounded-full bg-[#1A73E8]"
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={call.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1A73E8] hover:text-[#202124]"
                  >
                    {call.cta}
                    <ArrowIcon />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="gallery"
          className="mx-auto w-full max-w-7xl scroll-mt-24 border-y border-[#ECEFF1] bg-[#FCFCFD] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28"
        >
          <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <SectionLabel>Community gallery</SectionLabel>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#202124] sm:text-5xl">
                Moments from builds, talks, labs, and demo nights.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#5F6368] sm:text-lg">
                A visual wall of how the community operates: practical sessions,
                collaborative problem-solving, and real project outcomes.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:auto-rows-[9rem] sm:grid-cols-6">
              {galleryHighlights.map((item) =>
                (() => {
                  const overlay = galleryOverlayStyles[item.overlay];
                  return (
                    <article
                      key={item.title}
                      className={`group relative aspect-square overflow-hidden rounded-2xl border border-[#DADCE0] bg-[#F8F9FA] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#BDC1C6] sm:aspect-auto ${item.tileClass}`}
                    >
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="absolute inset-0 object-cover"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          priority={false}
                        />
                      )}
                      {!item.image && (
                        <>
                          <div
                            className="absolute inset-0"
                            style={{
                              background: `linear-gradient(135deg, ${item.color}2B 0%, #F8F9FA 55%, #FFFFFF 100%)`,
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
                        </>
                      )}
                      <div
                        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#202124]/95 via-[#202124]/75 to-transparent ${overlay.gradient}`}
                        aria-hidden="true"
                      />

                      <div
                        className={`relative flex h-full flex-col justify-between ${overlay.content}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p
                            className={`font-semibold uppercase tracking-wide text-[#5F6368] ${overlay.tag}`}
                          >
                            {item.tag}
                          </p>
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: item.color }}
                            aria-hidden="true"
                          />
                        </div>

                        <div>
                          <h3
                            className={`font-semibold tracking-tight text-white ${overlay.title}`}
                          >
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </article>
                  );
                })(),
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#DADCE0] bg-[#FFFFFF]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-10 text-sm text-[#5F6368] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <div>
            <Image
              src="/logo.png"
              alt="GDG Cloud Bengaluru"
              width={195}
              height={30}
              className="h-7 w-auto"
            />
            <p className="mt-3">© 2026 GDG Cloud Bengaluru.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <a href="#top" className="hover:text-[#202124]">
              Spotlight
            </a>
            <a href="#focus-areas" className="hover:text-[#202124]">
              Core Initiatives
            </a>
            <a href="#calls-forms" className="hover:text-[#202124]">
              CFP & Venue
            </a>
            <a href="#gallery" className="hover:text-[#202124]">
              Hall of Fame
            </a>
            <Link href="/events" className="hover:text-[#202124]">
              Events
            </Link>
            <a
              href={registerHref}
              className="text-[#1A73E8] hover:text-[#202124]"
            >
              Register
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
