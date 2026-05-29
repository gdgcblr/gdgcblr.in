"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Particles from "./components/Particles";
import logo from "@/public/logo.png";
import Link from "next/link";

const chapterHref = "https://gdg.community.dev/gdg-cloud-bengaluru/";
const registerHref =
  "https://gdg.community.dev/events/details/google-gdg-cloud-bengaluru-presents-deployfest/";

/* ── Animation variants ── */

const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeInBlur = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const headlineStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.008 } },
};

const wordPop = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const typeChar = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.01 },
  },
};

const heroWords = [
  "Where Bengaluru's Builders ",
  "Connect, Create, and Scale.",
];
const googleColors = ["#4285F4", "#EA4335", "#FBBC04", "#34A853"];

/* ── Data ── */

const communityCalls = [
  {
    title: "Call for proposals",
    label: "Speakers, workshops, demos",
    text: "Bring a session with practical takeaways for builders working across cloud, AI, platforms, and production systems.",
    cta: "Submit a proposal",
    href: chapterHref,
    image: "/gallery/observability.jpg",
  },
  {
    title: "Venue interest",
    label: "Host partner, campus, workspace",
    text: "Offer a space for meetups, labs, or build days. The community team coordinates agenda, format, and follow-up.",
    cta: "Offer a venue",
    href: chapterHref,
    image: "/gallery/cloudforall.jpg",
  },
];

const galleryHighlights = [
  {
    title: "Community Day Bengaluru 2025",
    tag: "Conference",
    image: "/gallery/community-day.jpg",
    className: "md:col-span-7 md:row-span-2",
  },
  {
    title: "Cloud Observability Summit",
    tag: "Summit",
    image: "/gallery/observability.jpg",
    className: "md:col-span-5",
  },
  {
    title: "Come for Cloud, Stay for Success",
    tag: "Demos",
    image: "/gallery/cfcsfs.jpg",
    className: "md:col-span-3",
  },
  {
    title: "Cloud for all",
    tag: "Meetup",
    image: "/gallery/cloudforall.jpg",
    className: "md:col-span-2",
  },
];

/* ── Helper components ── */

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

function SectionIntro({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold tracking-tight text-blue-600">
        {label}
      </p>
      <h2 className="mt-4 text-balance text-[clamp(2.1rem,4.4vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-black">
        {title}
      </h2>
      <p className="mt-5 max-w-xl text-pretty text-base leading-8 text-gray-600 sm:text-lg">
        {text}
      </p>
    </div>
  );
}

/* ── Page ── */

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const glowRef = useRef<HTMLDivElement>(null);

  // Typewriter state
  const totalChars = heroWords[0].length + heroWords[1].length;
  const [typeIndex, setTypeIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (shouldReduceMotion) {
      setTypeIndex(totalChars);
      setShowCursor(false);
      return;
    }

    // Start typing after a small delay
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setTypeIndex((prev) => {
          if (prev >= totalChars) {
            clearInterval(interval);
            setTimeout(() => setShowCursor(false), 1500); // Disappear after 1.5s
            return prev;
          }
          return prev + 1;
        });
      }, 30); // Typing speed
      return () => clearInterval(interval);
    }, 400);

    return () => clearTimeout(startDelay);
  }, [totalChars, shouldReduceMotion]);

  const handleHeroMouse = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || !glowRef.current) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    glowRef.current.style.background = `radial-gradient(600px circle at ${x}% ${y}%, rgba(66,133,244,0.04), transparent 40%)`;
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/75 backdrop-blur-xl">
        <nav className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <a
            href="#top"
            className="flex items-center"
            aria-label="GDG Cloud Bengaluru home"
          >
            <Image
              src={logo}
              alt="GDG Cloud Bengaluru"
              className="h-8 w-auto"
              priority
            />
          </a>
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
            <a
              className="text-sm font-medium text-gray-500 transition-colors hover:text-black"
              href="#program"
            >
              Program
            </a>
            <a
              className="text-sm font-medium text-gray-500 transition-colors hover:text-black"
              href="#calls"
            >
              Calls
            </a>
            <a
              className="text-sm font-medium text-gray-500 transition-colors hover:text-black"
              href="#gallery"
            >
              Gallery
            </a>
            <Link
              className="text-sm font-medium text-gray-500 transition-colors hover:text-black"
              href="/events"
            >
              Events
            </Link>
          </div>
          <a
            href={registerHref}
            className="inline-flex h-9 items-center justify-center rounded-full bg-black px-5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Register
          </a>
        </nav>
      </header>

      <main id="top">
        {/* ── Hero ── */}
        <section
          className="relative flex min-h-[95vh] flex-col items-center justify-center overflow-hidden pt-20"
          onMouseMove={handleHeroMouse}
        >
          {/* Subtle Aurora orbs for light background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            aria-hidden="true"
          >
            <div
              className="aurora-orb blur-[120px]"
              style={{
                background: "#4285F4",
                width: "40vw",
                height: "40vw",
                top: "-12%",
                left: "10%",
                animation: "aurora-1 22s ease-in-out infinite",
              }}
            />
            <div
              className="aurora-orb blur-[120px]"
              style={{
                background: "#EA4335",
                width: "34vw",
                height: "34vw",
                top: "8%",
                right: "2%",
                animation: "aurora-2 26s ease-in-out infinite",
              }}
            />
            <div
              className="aurora-orb blur-[120px]"
              style={{
                background: "#34A853",
                width: "30vw",
                height: "30vw",
                bottom: "0%",
                left: "5%",
                animation: "aurora-3 24s ease-in-out infinite",
              }}
            />
          </div>

          <Particles />

          {/* Mouse-tracking glow */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute inset-0 mix-blend-multiply"
            aria-hidden="true"
          />

          {/* Bottom fade */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent"
            aria-hidden="true"
          />

          {/* Hero content */}
          <motion.div
            className="relative z-10 mx-auto flex w-full max-w-[95rem] flex-col items-center px-5 text-center sm:px-8"
            variants={heroStagger}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="show"
          >
            {/* Google colors accent bar */}
            {/* <motion.div
              className="flex gap-1.5"
              variants={shouldReduceMotion ? {} : fadeInBlur}
            >
              {googleColors.map((color, i) => (
                <motion.span
                  key={color}
                  className="h-1 w-8 rounded-full"
                  style={{ backgroundColor: color }}
                  initial={shouldReduceMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: 0.3 + i * 0.08,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              ))}
            </motion.div> */}

            {/* Headline — Literal typewriter effect with moving cursor */}
            <h1 className="mt-8 w-full text-center text-[clamp(2.5rem,5.5vw,6.5rem)] font-medium leading-[1.05] tracking-[-0.04em] text-black">
              {heroWords.map((line, i) => {
                const isLine2 = i === 1;
                const startIndex = isLine2 ? heroWords[0].length : 0;

                return (
                  <span key={i} className="block w-full text-center">
                    {line.split("").map((char, j) => {
                      const globalIndex = startIndex + j;
                      const isVisible = globalIndex < typeIndex;
                      const isCursor = globalIndex === typeIndex;

                      return (
                        <span
                          key={`${i}-${j}`}
                          className="relative inline-block"
                        >
                          <span
                            className={isVisible ? "opacity-100" : "opacity-0"}
                          >
                            {char === " " ? "\u00A0" : char}
                          </span>
                          {isCursor && showCursor && (
                            <span className="absolute left-[-0.05em] top-[-0.05em] animate-pulse font-light select-none bg-gradient-to-b from-[#4285F4] via-[#EA4335] to-[#FBBC04] bg-clip-text text-transparent">
                              |
                            </span>
                          )}
                        </span>
                      );
                    })}
                    {/* Anchor for end-of-line cursor */}
                    <span className="relative inline-block">
                      <span className="opacity-0">{"\u00A0"}</span>
                      {i === 0 &&
                        typeIndex === heroWords[0].length &&
                        showCursor && (
                          <span className="absolute left-[-0.05em] top-[-0.05em] animate-pulse font-light select-none bg-gradient-to-b from-[#4285F4] via-[#EA4335] to-[#FBBC04] bg-clip-text text-transparent">
                            |
                          </span>
                        )}
                      {i === 1 && typeIndex >= totalChars && showCursor && (
                        <span className="absolute left-[-0.05em] top-[-0.05em] animate-pulse font-light select-none bg-gradient-to-b from-[#4285F4] via-[#EA4335] to-[#FBBC04] bg-clip-text text-transparent">
                          |
                        </span>
                      )}
                    </span>
                  </span>
                );
              })}
            </h1>

            <motion.div
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
              variants={shouldReduceMotion ? {} : fadeInBlur}
            >
              <motion.a
                href={chapterHref}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-black px-8 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-transform hover:scale-[1.02]"
              >
                Join the community
              </motion.a>
              <Link
                href="/events"
                className="inline-flex h-12 items-center justify-center rounded-full bg-gray-50 px-8 text-sm font-semibold text-black transition-colors hover:bg-gray-100"
              >
                Explore events
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Zigzag Layout: Program & Calls ── */}
        <section id="program" className="px-5 py-32 sm:px-8 lg:px-10 lg:py-48">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-32 lg:gap-48">
            {/* Zigzag Block 1: The Platform */}
            <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
              <div className="order-2 lg:order-1">
                <SectionIntro
                  label="Antigravity 2.0"
                  title="Your command center for multiple agents."
                  text="Run autonomous coding agents, execute shell commands directly, and manage background subagents all from your keyboard in real-time."
                />
                <div className="mt-8 flex gap-6">
                  <div>
                    <dt className="text-3xl font-semibold tracking-tight text-black">
                      40+
                    </dt>
                    <dd className="mt-1 text-sm text-gray-500">Events run</dd>
                  </div>
                  <div>
                    <dt className="text-3xl font-semibold tracking-tight text-black">
                      5K+
                    </dt>
                    <dd className="mt-1 text-sm text-gray-500">Devs reached</dd>
                  </div>
                </div>
              </div>
              <div className="relative order-1 aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-gray-50 p-1 lg:order-2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-green-100 opacity-50" />
                <div className="relative h-full w-full rounded-[1.8rem] bg-white shadow-xl shadow-black/5 ring-1 ring-gray-900/5 p-8">
                  <div className="flex h-full flex-col">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                      <div className="h-3 w-3 rounded-full bg-red-400" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400" />
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                    </div>
                    <div className="mt-6 flex-1 space-y-4">
                      <div className="h-10 w-3/4 rounded-lg bg-gray-100" />
                      <div className="h-32 w-full rounded-lg bg-gray-50 border border-gray-100" />
                      <div className="h-10 w-1/2 rounded-lg bg-blue-50 text-blue-600 flex items-center px-4 text-sm font-medium">
                        Executing tasks...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Zigzag Block 2: Call for proposals */}
            <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
              <div className="relative aspect-[4/3] w-full">
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white p-2 shadow-xl shadow-black/5 ring-1 ring-gray-900/5">
                  <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={communityCalls[0].image}
                      alt={communityCalls[0].title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 backdrop-blur-md ring-1 ring-white/30 mb-3">
                        <span className="text-xs font-medium text-white tracking-wide uppercase">
                          Open Now
                        </span>
                      </div>
                      <h3 className="text-3xl font-semibold text-white tracking-tight">
                        {communityCalls[0].title}
                      </h3>
                      <p className="mt-2 text-white/80">
                        {communityCalls[0].label}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <SectionIntro
                  label="Community Calls"
                  title="Bring the speaker, the room, or the next problem."
                  text={communityCalls[0].text}
                />
                <a
                  href={communityCalls[0].href}
                  className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-black px-8 text-sm font-semibold text-white transition-all hover:bg-gray-900 hover:shadow-lg hover:shadow-black/20"
                >
                  {communityCalls[0].cta}
                  <svg
                    className="h-4 w-4"
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
                </a>
              </div>
            </div>

            {/* Zigzag Block 3: Host a venue */}
            <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
              <div className="order-2 lg:order-1">
                <SectionIntro
                  label="Venues"
                  title="Open your doors to the builders."
                  text={communityCalls[1].text}
                />
                <a
                  href={communityCalls[1].href}
                  className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-black ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:shadow-lg hover:shadow-gray-200"
                >
                  {communityCalls[1].cta}
                  <svg
                    className="h-4 w-4"
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
                </a>
              </div>
              <div className="relative order-1 aspect-[4/3] w-full lg:order-2">
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white p-2 shadow-xl shadow-black/5 ring-1 ring-gray-900/5">
                  <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={communityCalls[1].image}
                      alt={communityCalls[1].title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 backdrop-blur-md ring-1 ring-white/30 mb-3">
                        <span className="text-xs font-medium text-white tracking-wide uppercase">
                          Partner With Us
                        </span>
                      </div>
                      <h3 className="text-3xl font-semibold text-white tracking-tight">
                        {communityCalls[1].title}
                      </h3>
                      <p className="mt-2 text-white/80">
                        {communityCalls[1].label}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Gallery Grid (Light Theme) ── */}
        <section
          id="gallery"
          className="bg-gray-50 px-5 py-32 sm:px-8 lg:px-10"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-16 max-w-2xl">
              <SectionIntro
                label="Community record"
                title="Proof from rooms where builders showed up."
                text="The strongest signal for the next event is the archive: conferences, summits, demo nights, and focused meetups across Bengaluru."
              />
            </div>

            <div className="grid grid-cols-2 gap-4 md:auto-rows-[16rem] md:grid-cols-12">
              {galleryHighlights.map((item) => (
                <motion.article
                  key={item.title}
                  className={`group relative min-h-[16rem] overflow-hidden rounded-[1.5rem] bg-gray-200 ${item.className}`}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 35vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                      {item.tag}
                    </p>
                    <h3 className="mt-2 text-pretty text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      {item.title}
                    </h3>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="px-5 py-32 sm:px-8 lg:px-10">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center text-center">
            <h2 className="max-w-4xl text-balance text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.95] tracking-[-0.04em] text-black">
              Build with the community.
            </h2>
            <div className="mt-10">
              <a
                href={registerHref}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-blue-600 px-10 text-base font-semibold text-white shadow-xl shadow-blue-600/20 transition-transform hover:scale-[1.02]"
              >
                Register for DeployFest
                <ArrowIcon />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 bg-white px-5 py-12 text-sm text-gray-500 sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={logo}
              alt="GDG Cloud Bengaluru"
              className="h-7 w-auto grayscale opacity-70 transition-all hover:grayscale-0 hover:opacity-100"
            />
            <span>© 2026 GDG Cloud Bengaluru.</span>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 font-medium">
            <a href="#program" className="hover:text-black transition-colors">
              Program
            </a>
            <a href="#calls" className="hover:text-black transition-colors">
              Calls
            </a>
            <a href="#gallery" className="hover:text-black transition-colors">
              Gallery
            </a>
            <Link href="/events" className="hover:text-black transition-colors">
              Events
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
