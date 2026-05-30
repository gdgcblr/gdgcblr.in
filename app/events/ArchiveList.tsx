"use client";

import { useState } from "react";
import type { EventData } from "../lib/sheets";

export default function ArchiveList({ archive }: { archive: EventData[] }) {
  const [visibleCount, setVisibleCount] = useState(10);

  const visibleEvents = archive.slice(0, visibleCount);
  const hasMore = visibleCount < archive.length;

  if (archive.length === 0) return null;

  return (
    <section className="mx-auto mt-32 w-full max-w-7xl px-5 sm:mt-48 sm:px-8 lg:px-10">
      <div className="mb-12 flex flex-col items-center border-b border-gray-100 pb-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Past Events.
        </h2>
        <p className="mt-4 text-gray-500">
          A track record of shipping and learning together.
        </p>
      </div>

      <div className="flex flex-col">
        {visibleEvents.map((item, i) => (
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
              <a
                href={item.link || "#"}
                className="hidden h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-colors group-hover:border-black group-hover:bg-black sm:flex"
              >
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
              </a>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-16 flex justify-center w-full">
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="group flex h-14 items-center justify-center gap-3 rounded-full border border-gray-200 bg-white px-8 font-semibold text-black transition-all duration-300 hover:scale-105 hover:border-black hover:bg-black hover:text-white hover:shadow-xl"
          >
            <span>View more</span>
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
