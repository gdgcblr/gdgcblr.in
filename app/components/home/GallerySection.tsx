"use client";

import SectionHeading from "./SectionHeading";
import MagicBento from "../ui/MagicBento";

const galleryHighlights = [
  {
    title: "Community Day Bengaluru 2025",
    label: "Flagship",
    image: "/gallery/community-day.jpg",
    className: "md:col-span-2 lg:col-span-2 md:row-span-2 lg:row-span-2",
    glowColor: "66, 133, 244", // Google Blue
  },
  {
    title: "Cloud Observability Summit",
    label: "Deep Dive",
    image: "/gallery/observability.jpg",
    className: "md:col-span-1 lg:col-span-1",
    glowColor: "234, 67, 53", // Google Red
  },
  {
    title: "Women Techmakers",
    label: "Meetup",
    image: "/gallery/cloudforall.jpg",
    className: "md:col-span-1 lg:col-span-1",
    glowColor: "251, 188, 4", // Google Yellow
  },
  {
    title: "Build with AI",
    label: "Workshop",
    image: "/gallery/ccdspeaker1.jpg",
    className: "md:col-span-2 lg:col-span-2 md:row-span-2 lg:row-span-2",
    glowColor: "52, 168, 83", // Google Green
  },
  {
    title: "DevFest 2024",
    label: "Conference",
    image: "/gallery/community-day.jpg",
    className: "md:col-span-1 lg:col-span-1",
    glowColor: "251, 188, 4", // Google Yellow
  },
  {
    title: "Come for Cloud",
    label: "Demos",
    image: "/gallery/cfcsfs.jpg",
    className: "md:col-span-1 lg:col-span-1",
    glowColor: "66, 133, 244", // Google Blue
  },
];

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="bg-gray-50 px-5 py-20 sm:px-8 sm:py-32 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 max-w-2xl sm:mb-16">
          <SectionHeading
            title="Where Bengaluru's developers come together."
            text="Explore highlights from our past conferences, hands-on workshops, and meetups. See how we connect, learn, and grow as a community."
          />
        </div>

        <MagicBento
          cards={galleryHighlights}
          textAutoHide={false}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={550}
          particleCount={15}
          glowColor="66, 133, 244" // Google Blue
        />
      </div>
    </section>
  );
}
