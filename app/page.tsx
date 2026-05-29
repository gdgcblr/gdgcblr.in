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
    text: "Bring a session with practical takeaways for builders working across cloud and AI.",
    cta: "Submit a proposal",
    href: chapterHref,
    image: "/gallery/ccdspeaker1.jpg",
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

function SectionIntro({ title, text }: { title: string; text: string }) {
  return (
    <div className="max-w-2xl">
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
              initial="hidden"
              animate={typeIndex >= totalChars ? "show" : "hidden"}
              variants={shouldReduceMotion ? {} : fadeInBlur}
            >
              <motion.a
                href={chapterHref}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-black px-10 text-base font-semibold text-white shadow-lg shadow-black/10 transition-transform hover:scale-[1.02]"
              >
                Join the community
              </motion.a>
              <Link
                href="/events"
                className="inline-flex h-14 items-center justify-center rounded-full bg-gray-50 px-10 text-base font-semibold text-black transition-colors hover:bg-gray-100"
              >
                Explore events
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Zigzag & Stats Layout: Program & Calls ── */}
        <section id="program" className="px-5 py-32 sm:px-8 lg:px-10 lg:py-48">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-32 lg:gap-48">
            {/* Premium Stats Layout */}
            <div className="flex flex-col gap-12">
              <div className="max-w-2xl">
                <SectionIntro
                  title="A massive network of builders."
                  text="We've grown into one of the largest and most active developer communities in the region, bringing together thousands of engineers, founders, and students."
                />
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 sm:gap-6">
                {[
                  {
                    value: "5K+",
                    label: "Developers in Network",
                    color: "bg-[#4285F4]",
                  },
                  {
                    value: "40+",
                    label: "Tech Events Hosted",
                    color: "bg-[#EA4335]",
                  },
                  {
                    value: "120+",
                    label: "Expert Speakers",
                    color: "bg-[#FBBC04]",
                  },
                  {
                    value: "8+",
                    label: "Years Active",
                    color: "bg-[#34A853]",
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="group relative flex flex-col items-start justify-end overflow-hidden rounded-[2rem] bg-gray-50 p-6 sm:p-8 ring-1 ring-gray-200 transition-all duration-500 hover:bg-white hover:ring-gray-300 hover:shadow-xl"
                  >
                    <div
                      className={`absolute top-0 right-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full blur-3xl transition-opacity duration-500 opacity-20 group-hover:opacity-50 ${stat.color}`}
                    />

                    <div
                      className={`mb-8 h-1.5 w-10 rounded-full ${stat.color} transition-transform duration-500 group-hover:scale-125 group-hover:translate-x-1`}
                    />

                    <dt className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
                      {stat.value}
                    </dt>
                    <dd className="mt-3 text-[10px] sm:text-xs font-bold text-gray-500 tracking-widest uppercase">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </div>
            </div>

            {/* Zigzag Block 2: Call for proposals */}
            <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
              <div className="relative aspect-[4/3] w-full">
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] ring-1 ring-gray-900/5">
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
                  title="Speak at our next event."
                  text={communityCalls[0].text}
                />
                <a
                  href={communityCalls[0].href}
                  className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-black px-10 text-base font-semibold text-white transition-all hover:bg-gray-900 hover:shadow-lg hover:shadow-black/20"
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
                  title="Open your doors to the builders."
                  text={communityCalls[1].text}
                />
                <a
                  href={communityCalls[1].href}
                  className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-10 text-base font-semibold text-black ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:shadow-lg hover:shadow-gray-200"
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
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] ring-1 ring-gray-900/5">
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

        {/* ── Past Events (Premium Carousel Layout) ── */}

        <section className="px-5 py-24 sm:px-8 lg:px-10 bg-white">
          <div className="mx-auto w-full max-w-7xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-medium tracking-tight text-black sm:text-4xl">
                Past Events
              </h2>
              <a
                href="/events"
                className="inline-flex h-10 items-center justify-center rounded-full bg-gray-50 px-6 text-sm font-medium text-black ring-1 ring-gray-200 transition-colors hover:bg-gray-100"
              >
                View all
              </a>
            </div>

            {/* Grid */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none" }}
            >
              {[
                {
                  title: "Google Cloud Community Day 2025",
                  date: "March 15, 2025",
                  tag: "Flagship",
                  image: "/gallery/ccdspeaker1.jpg",
                },
                {
                  title: "Build with AI: Masterclass",
                  date: "February 10, 2025",
                  tag: "Workshop",
                  image: "/gallery/observability.jpg",
                },
                {
                  title: "DevFest Bengaluru 2024",
                  date: "December 5, 2024",
                  tag: "Conference",
                  image: "/gallery/ccdspeaker1.jpg",
                },
                {
                  title: "Google I/O Extended 2024",
                  date: "July 20, 2024",
                  tag: "Meetup",
                  image: "/gallery/observability.jpg",
                },
                {
                  title: "Women Techmakers 2024",
                  date: "April 10, 2024",
                  tag: "Summit",
                  image: "/gallery/ccdspeaker1.jpg",
                },
                {
                  title: "Cloud Next Recap 2023",
                  date: "October 12, 2023",
                  tag: "Meetup",
                  image: "/gallery/observability.jpg",
                },
              ].map((event, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col gap-4 cursor-pointer flex-shrink-0 w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-start"
                >
                  {/* Image container */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-gray-50">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  {/* Content */}
                  <div className="flex flex-col gap-2 px-1">
                    <h3 className="text-xl font-semibold text-black leading-[1.3] tracking-tight">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                      <span>{event.date}</span>
                      <span className="text-gray-300">|</span>
                      <span>{event.tag}</span>
                    </div>
                    <div className="mt-1 flex items-center text-sm font-medium text-gray-900">
                      View event
                      <svg
                        className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrows */}
            <div className="mt-12 flex items-center justify-end gap-3">
              <button
                onClick={() => scroll("left")}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-50 ring-1 ring-gray-200 transition-colors hover:bg-gray-100"
              >
                <svg
                  className="h-4 w-4 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-50 ring-1 ring-gray-200 transition-colors hover:bg-gray-100"
              >
                <svg
                  className="h-4 w-4 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
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
                title="Where Bengaluru's developers come together."
                text="Explore highlights from our past conferences, hands-on workshops, and meetups. See how we connect, learn, and grow as a community."
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

        {/* ── Massive Minimal Footer ── */}
        <section className="flex flex-col items-center justify-between bg-white px-5 sm:px-8 lg:px-10 pt-48 pb-12 min-h-[70vh]">
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[90rem]">
            <p className="text-[11px] font-semibold text-gray-800 tracking-wide mb-2 sm:mb-6 uppercase">
              Thats
            </p>
            <h2
              className="text-[15vw] sm:text-[18vw] leading-none font-semibold text-[#111111] text-center select-none"
              style={{ letterSpacing: "-0.05em" }}
            >
              GDG<span className="text-[#4285F4]">C</span>
              <span className="inline-block -translate-y-[0.12em] text-[#34A853]">
                BLR
              </span>
            </h2>
            <p className="text-[11px] font-semibold text-gray-800 tracking-wide mb-2 sm:mb-6 uppercase">
              For you
            </p>
          </div>

          <div className="w-full max-w-[90rem] flex flex-col gap-6 md:flex-row md:items-end md:justify-between mt-32">
            <div className="flex items-center">
              <span className="text-xl font-medium text-gray-500 tracking-tight select-none">
                GDG Cloud Bengaluru
              </span>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              <Link
                href="/code-of-conduct"
                className="hover:text-black transition-colors"
              >
                Code of Conduct
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:text-black transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/code-of-conduct"
                className="hover:text-black transition-colors"
              >
                Community Guidelines
              </Link>
              <Link
                href="/contact"
                className="hover:text-black transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
