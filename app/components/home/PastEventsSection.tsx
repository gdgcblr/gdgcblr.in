"use client";

import Image from "next/image";
import type { EventData } from "@/app/lib/sheets";

const fallbackGalleryImages = [
  "/gallery/community-day.jpg",
  "/gallery/observability.jpg",
  "/gallery/cloudforall.jpg",
  "/gallery/ccdspeaker1.jpg",
  "/gallery/cfcsfs.jpg",
  "/gallery/ccdspeaker.jpg",
];

function getEventImage(event: EventData, index: number): string {
  // 1. If an image is specified in Google Sheets (local /gallery/ path or external URL), use it
  if (event.image && event.image.trim()) {
    return event.image.trim();
  }
  // 2. Keyword fallback matching
  const lower = event.title.toLowerCase();
  if (lower.includes("observability")) return "/gallery/observability.jpg";
  if (lower.includes("community day")) return "/gallery/community-day.jpg";
  if (lower.includes("cloud for all")) return "/gallery/cloudforall.jpg";
  if (lower.includes("come for cloud")) return "/gallery/cfcsfs.jpg";
  // 3. Carousel rotation fallback
  return fallbackGalleryImages[index % fallbackGalleryImages.length];
}

type PastEventsSectionProps = {
  events?: EventData[];
};

export default function PastEventsSection({ events = [] }: PastEventsSectionProps) {
  // Only display archived events (where isUpcoming is false)
  const archivedEvents = events.filter((e) => !e.isUpcoming);

  if (archivedEvents.length === 0) {
    return null;
  }

  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 overflow-hidden">
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee-scroll 45s linear infinite;
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

      {/* Infinite Marquee Container */}
      <div className="relative flex w-full pb-8">
        <div className="flex w-max animate-marquee gap-4 sm:gap-6 pl-4 sm:pl-6">
          {/* Double map for seamless looping */}
          {[...archivedEvents, ...archivedEvents].map((event, idx) => {
            const eventImg = getEventImage(event, idx);
            return (
              <a
                key={`${event.title}-${idx}`}
                href={event.link || "/events"}
                target={event.link?.startsWith("http") ? "_blank" : undefined}
                rel={event.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex w-[85vw] flex-shrink-0 cursor-pointer flex-col gap-4 sm:w-[350px] lg:w-[400px]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-50 border border-gray-100">
                  <Image
                    src={eventImg}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 85vw, 400px"
                  />
                </div>
                <div className="flex flex-col gap-2 px-1">
                  <h3 className="text-lg font-semibold leading-[1.3] tracking-tight text-black sm:text-xl group-hover:text-black transition-colors line-clamp-1">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                    <span>{event.date}</span>
                    {event.tag && (
                      <>
                        <span className="text-gray-300">|</span>
                        <span>{event.tag}</span>
                      </>
                    )}
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
              </a>
            );
          })}
        </div>
      </div>
      <div className="mt-8 flex justify-center w-full">
        <a
          href="/events"
          className="inline-flex h-10 items-center justify-center rounded-full bg-gray-50 px-6 text-sm font-semibold text-black ring-1 border border-black/10 transition-colors hover:bg-gray-100"
        >
          View all
        </a>
      </div>
    </section>
  );
}
