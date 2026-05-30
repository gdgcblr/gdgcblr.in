"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import SectionHeading from "./SectionHeading";

type OpportunitiesSectionProps = {
  chapterHref: string;
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function OpportunitiesSection({
  chapterHref,
}: OpportunitiesSectionProps) {
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

  return (
    <section
      id="calls"
      className="px-5 py-16 sm:px-8 sm:py-32 lg:px-10 lg:py-48"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 sm:gap-32 lg:gap-48">
        <motion.div
          className="grid items-center gap-10 sm:gap-16 lg:grid-cols-2 lg:gap-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={fadeUpVariants}
            className="relative aspect-[4/3] w-full"
          >
            <div className="relative h-full w-full overflow-hidden rounded-2xl ring-1 ring-gray-900/5">
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src={communityCalls[0].image}
                  alt={communityCalls[0].title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                  <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {communityCalls[0].title}
                  </h3>
                  <p className="mt-2 text-white/80">
                    {communityCalls[0].label}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeUpVariants}>
            <SectionHeading
              title="Speak at our next event."
              text={communityCalls[0].text}
            />
            <a
              href={communityCalls[0].href}
              className="group relative mt-8 inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 text-sm font-semibold text-white ring-1 ring-gray-200 transition-all hover:border-transparent hover:ring-transparent sm:h-14 sm:w-auto sm:px-10 sm:text-base"
            >
              <span className="absolute inset-0 z-0 h-full w-full -translate-x-full rounded-full bg-gradient-to-r from-[#34A853] via-[#FBBC04] to-[#EA4335] transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                {communityCalls[0].cta}
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
              </span>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid items-center gap-10 sm:gap-16 lg:grid-cols-2 lg:gap-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUpVariants} className="order-2 lg:order-1">
            <SectionHeading
              title="Open your doors to the builders."
              text={communityCalls[1].text}
            />
            <a
              href={communityCalls[1].href}
              className="group relative mt-8 inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-7 text-sm font-semibold text-black ring-1 ring-gray-200 transition-all hover:border-transparent hover:ring-transparent sm:h-14 sm:w-auto sm:px-10 sm:text-base"
            >
              <span className="absolute inset-0 z-0 h-full w-full -translate-x-full rounded-full bg-gradient-to-r from-[#34A853] via-[#FBBC04] to-[#EA4335] transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                {communityCalls[1].cta}
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
              </span>
            </a>
          </motion.div>
          <motion.div
            variants={fadeUpVariants}
            className="relative order-1 aspect-[4/3] w-full lg:order-2"
          >
            <div className="relative h-full w-full overflow-hidden rounded-2xl ring-1 ring-gray-900/5">
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src={communityCalls[1].image}
                  alt={communityCalls[1].title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                  <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {communityCalls[1].title}
                  </h3>
                  <p className="mt-2 text-white/80">
                    {communityCalls[1].label}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
