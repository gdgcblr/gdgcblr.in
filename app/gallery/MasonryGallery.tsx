"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
  span?: string; // Optional class for row/col span if we used grid, but we use masonry here
};

export default function MasonryGallery({ images }: { images: GalleryImage[] }) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>div:not(:first-child)]:mt-4">
        {images.map((img, i) => (
          <div
            key={i}
            className="group relative break-inside-avoid overflow-hidden rounded-2xl bg-gray-100 cursor-zoom-in"
            onClick={() => setSelectedImage(img)}
          >
            {/* The wrapper handles aspect ratio naturally in masonry, but we need next/image to fill it correctly without fixed height. 
                Setting layout="responsive" or using width/height with 0 and 100vw allows native sizing */}
            <img
              src={img.src}
              alt={img.alt}
              className="w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
              loading="lazy"
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10 mix-blend-overlay" />
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute right-6 top-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            aria-label="Close modal"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* High-res Image */}
          <div 
            className="relative h-full max-h-[90vh] w-full max-w-[90vw]"
            onClick={(e) => e.stopPropagation()} // Prevent clicks on image from closing modal
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="h-full w-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
