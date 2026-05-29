"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type EventDetail = [string, string];

type EventsHeroProps = {
  deployFestHref: string;
  eventDetails: EventDetail[];
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

export default function EventsHero({ deployFestHref, eventDetails }: EventsHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto grid min-h-[calc(100vh-4.25rem)] w-full max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:min-h-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:px-12">
      <div>
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#DADCE0] bg-[#FFFFFF] px-4 py-2 text-sm font-semibold text-[#3C4043]">
          <GoogleDots />
          <span>Events calendar</span>
        </div>
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tight text-[#202124]">
          DeployFest and GDG Cloud Bengaluru events.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#3C4043]">
          A year-round series of build days, labs, and community meetups.
          DeployFest is the flagship buildathon with a focused sprint and
          live demos.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <motion.a
            href={deployFestHref}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1A73E8] px-7 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(26,115,232,0.3)] transition-opacity hover:opacity-90"
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            Register for DeployFest
            <ArrowIcon />
          </motion.a>
          <a
            href="#archive"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[#DADCE0] px-7 text-sm font-semibold text-[#1A73E8] transition-colors hover:border-[#1A73E8] hover:text-[#202124]"
          >
            View archive
          </a>
        </div>
      </div>

      <aside className="relative lg:min-h-[30rem]">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-[#DADCE0] bg-[#0B1220] lg:min-h-[30rem]">
          <motion.div
            className="absolute inset-0"
            animate={shouldReduceMotion ? { scale: 1 } : { scale: 1.04 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 6, ease: "easeOut" }
            }
          >
            <Image
              src="/gallery/observability.jpg"
              alt="Audience listening to a GDG Cloud Bengaluru session"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
          </motion.div>
          <div
            className="absolute inset-0 bg-gradient-to-tr from-[#0B1220]/95 via-[#0B1220]/55 to-transparent"
            aria-hidden="true"
          />
          <motion.div
            className="absolute -right-10 top-14 h-40 w-40 rounded-full bg-[#1A73E8]/20 blur-3xl"
            animate={
              shouldReduceMotion
                ? { opacity: 0.35, scale: 1 }
                : { opacity: [0.35, 0.6, 0.35], scale: [1, 1.12, 1] }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }
            aria-hidden="true"
          />
          <div className="relative flex h-full flex-col justify-between p-7 sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-white/70">Featured program</p>
              <div className="relative h-14 w-14">
                <motion.span
                  className="absolute inset-0 rounded-full border border-white/30"
                  animate={
                    shouldReduceMotion
                      ? { opacity: 0.4, scale: 1 }
                      : { opacity: [0.6, 0], scale: [1, 1.6] }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 3, repeat: Infinity, ease: "easeOut" }
                  }
                />
                <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                DeployFest
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/80">
                A single-day buildathon focused on shipping working deployments
                and sharing live demos.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-white/80">
              <span className="rounded-full bg-white/15 px-3 py-1">
                May 23, 2026
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1">
                Deutsche Bank, Bengaluru
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1">
                Single-day buildathon
              </span>
            </div>
          </div>
        </div>
        <motion.div
          className="mt-6 rounded-[1.25rem] border border-[#DADCE0] bg-[#FFFFFF] p-5 lg:absolute lg:-left-8 lg:top-14 lg:w-[18rem]"
          animate={
            shouldReduceMotion ? { y: 0 } : { y: [0, -8, 0] }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
          }
        >
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5F6368]">
            Event essentials
          </p>
          <dl className="mt-4 grid gap-3">
            {eventDetails.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[5rem_1fr] gap-3">
                <dt className="text-[11px] font-semibold uppercase text-[#5F6368]">
                  {label}
                </dt>
                <dd className="text-sm font-semibold text-[#202124]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </aside>
    </section>
  );
}
