import type { Metadata } from "next";
import Navbar from "../components/home/Navbar";
import FooterSection from "../components/home/FooterSection";
import MasonryGallery from "./MasonryGallery";

export const metadata: Metadata = {
  title: "Gallery | GDG Cloud Bengaluru",
  description:
    "Explore the vibrant community memories, workshops, hackathons, and flagship events of GDG Cloud Bengaluru.",
};

const galleryImages = [
  {
    src: "/gallery/community-day.jpg",
    alt: "Community Day Bengaluru 2025 Flagship Event",
  },
  { src: "/gallery/ccdspeaker1.jpg", alt: "Speaker at Cloud Community Day" },
  {
    src: "/gallery/observability.jpg",
    alt: "Cloud Observability Summit Deep Dive",
  },
  {
    src: "/gallery/cloudforall.jpg",
    alt: "Women Techmakers and Cloud For All Meetup",
  },
  { src: "/gallery/cfcsfs.jpg", alt: "Come for Cloud, Stay for Success Demos" },
  { src: "/gallery/ccdspeaker.jpg", alt: "Keynote presentation at DevFest" },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-40">
        <section className="mx-auto flex w-full max-w-7xl flex-col px-5 sm:px-8 lg:px-10">
          <div className="mb-16 flex flex-col items-center text-center sm:mb-24">
            <h1 className="text-balance text-6xl font-bold tracking-tighter sm:text-7xl lg:text-[8rem] lg:leading-[0.9]">
              Our <span className="text-gray-300">Memories.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-gray-600 sm:text-xl">
              A visual journey through our hackathons, deep-dives, community
              days, and the amazing developers who make it all happen.
            </p>
          </div>

          <MasonryGallery images={galleryImages} />
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
