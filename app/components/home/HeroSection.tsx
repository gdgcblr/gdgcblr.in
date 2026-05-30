"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Medusae from "../ui/Medusae";

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

const titleText = "Welcome to GDG Cloud Bengaluru.";
const subtitleText = "Where Bengaluru's Builders Connect, Create, and Scale.";

type WordData = { word: string; startIdx: number };
const titleWords: WordData[] = [];
let _idx = 0;
titleText.split(" ").forEach((word) => {
  titleWords.push({ word, startIdx: _idx });
  _idx += word.length + 1; // +1 for the space
});
const totalChars = titleText.length;

type HeroSectionProps = {
  chapterHref: string;
};

export default function HeroSection({ chapterHref }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const glowRef = useRef<HTMLDivElement>(null);

  const [typeIndex, setTypeIndex] = useState(() =>
    shouldReduceMotion ? totalChars : 0,
  );
  const [showCursor, setShowCursor] = useState(() => !shouldReduceMotion);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setTypeIndex((prev) => {
          if (prev >= totalChars) {
            clearInterval(interval);
            setTimeout(() => setShowCursor(false), 1500);
            return prev;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }, 400);

    return () => clearTimeout(startDelay);
  }, [shouldReduceMotion]);

  const handleHeroMouse = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || !glowRef.current) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    glowRef.current.style.background = `radial-gradient(600px circle at ${x}% ${y}%, rgba(66,133,244,0.04), transparent 40%)`;
  };

  return (
    <section
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden pt-24 sm:min-h-[100vh] sm:pt-20"
      onMouseMove={handleHeroMouse}
    >
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: typeIndex >= totalChars ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 hidden sm:block pointer-events-none"
      >
        <div className="w-full h-full pointer-events-auto">
          <Medusae config={{ background: { color: "transparent" } }} />
        </div>
      </motion.div>

      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent"
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-[95rem] flex-col items-center px-5 text-center sm:px-8"
        variants={heroStagger}
        initial={shouldReduceMotion ? false : "hidden"}
        animate="show"
      >
        <h1 className="mt-8 w-full text-balance text-center text-[clamp(2.5rem,8vw,6.5rem)] font-extrabold leading-[1.1] tracking-[-0.04em] text-black sm:leading-[1.05] drop-shadow-sm">
          {titleWords.map(({ word, startIdx }, wIdx) => {
            const isLastWord = wIdx === titleWords.length - 1;
            const breakLine = word === "GDG";
            
            // Make "Welcome to" less bold
            const fontWeight = wIdx < 2 ? "font-medium" : "font-extrabold";

            return (
              <span key={wIdx}>
                {breakLine && <br />}
                <span className={`inline-block whitespace-nowrap text-black ${fontWeight}`}>
                  {word.split("").map((char, cIdx) => {
                    const globalIdx = startIdx + cIdx;
                    const isVisible = globalIdx < typeIndex;
                    const isCursor = globalIdx === typeIndex;

                    return (
                      <span key={cIdx} className="relative inline-block">
                        <span
                          className={isVisible ? "opacity-100" : "opacity-0"}
                        >
                          {char}
                        </span>
                        {isCursor && showCursor && (
                          <span className="absolute left-[-0.05em] top-[-0.05em] animate-pulse select-none font-light bg-gradient-to-b from-[#4285F4] via-[#EA4335] to-[#FBBC04] bg-clip-text text-transparent">
                            |
                          </span>
                        )}
                      </span>
                    );
                  })}
                  {!isLastWord && (
                    <span className="relative inline-block">
                      <span
                        className={
                          startIdx + word.length < typeIndex
                            ? "opacity-100"
                            : "opacity-0"
                        }
                      >
                        {"\u00A0"}
                      </span>
                      {startIdx + word.length === typeIndex && showCursor && (
                        <span className="absolute left-[-0.05em] top-[-0.05em] animate-pulse select-none font-light bg-gradient-to-b from-[#4285F4] via-[#EA4335] to-[#FBBC04] bg-clip-text text-transparent">
                          |
                        </span>
                      )}
                    </span>
                  )}
                  {isLastWord && typeIndex >= totalChars && showCursor && (
                    <span className="absolute animate-pulse select-none font-light bg-gradient-to-b from-[#4285F4] via-[#EA4335] to-[#FBBC04] bg-clip-text text-transparent">
                      |
                    </span>
                  )}
                </span>
              </span>
            );
          })}
        </h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl lg:text-2xl h-8 sm:h-10 lg:h-12 flex justify-center"
          initial="hidden"
          animate={typeIndex >= totalChars ? "show" : "hidden"}
          variants={shouldReduceMotion ? {} : fadeInBlur}
        >
          {subtitleText}
        </motion.p>

        <motion.div
          className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:mt-12 sm:w-auto sm:flex-row"
          initial="hidden"
          animate={typeIndex >= totalChars ? "show" : "hidden"}
          variants={shouldReduceMotion ? {} : fadeInBlur}
        >
          <motion.a
            href={chapterHref}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-black px-7 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-transform hover:scale-[1.02] sm:h-14 sm:w-auto sm:px-10 sm:text-base"
          >
            Join the community
          </motion.a>
          <Link
            href="/events"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-gray-50 px-7 text-sm font-semibold text-black transition-colors hover:bg-gray-100 sm:h-14 sm:w-auto sm:px-10 sm:text-base"
          >
            Explore events
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
