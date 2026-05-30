"use client";

import Image from "next/image";

const pastEvents = [
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
];

export default function PastEventsSection() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 overflow-hidden">
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee-scroll 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 flex flex-col items-center justify-center text-center gap-6 sm:mb-16">
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-5xl">
              Past Events
            </h2>
            <p className="max-w-xl text-sm text-gray-600 sm:text-base">
              Explore the highlights, workshops, and moments from our previous
              gatherings.
            </p>
          </div>
        </div>
      </div>

      {/* Infinite Marquee Container - Bleeds out of max-w-7xl for full width scroll */}
      <div className="relative flex w-full pb-8">
        <div className="flex w-max animate-marquee gap-4 sm:gap-6 pl-4 sm:pl-6">
          {/* Double map for seamless looping */}
          {[...pastEvents, ...pastEvents].map((event, idx) => (
            <div
              key={idx}
              className="group flex w-[85vw] flex-shrink-0 cursor-pointer flex-col gap-4 sm:w-[350px] lg:w-[400px]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-50">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 85vw, 400px"
                />
              </div>
              <div className="flex flex-col gap-2 px-1">
                <h3 className="text-lg font-semibold leading-[1.3] tracking-tight text-black sm:text-xl">
                  {event.title}
                </h3>
                <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                  <span>{event.date}</span>
                  <span className="text-gray-300">|</span>
                  <span>{event.tag}</span>
                </div>
                <div className="mt-1 flex items-center text-sm font-medium text-gray-900 transition-colors group-hover:text-[#1A73E8]">
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
      </div>
      <div className="mx-auto align-center">
        <a
          href="/events"
          className="inline-flex h-10 items-center justify-center rounded-full bg-gray-50 px-6 text-sm font-semibold text-black ring-1 ring-gray-200 transition-colors hover:bg-gray-100"
        >
          View all
        </a>
      </div>
    </section>
  );
}
