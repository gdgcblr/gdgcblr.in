"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import logo from "@/public/logo.png";

type NavbarProps = {
  registerHref?: string;
};

const spring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 30,
  mass: 1,
};

export default function Navbar({ registerHref = "https://gdg.community.dev/gdg-cloud-bengaluru/" }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrolledRef = useRef(false);

  const { scrollY } = useScroll();

  // Hysteresis: scroll down past 60 → pill, scroll back up past 20 → full
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!scrolledRef.current && latest > 60) {
      scrolledRef.current = true;
      setIsScrolled(true);
    } else if (scrolledRef.current && latest < 20) {
      scrolledRef.current = false;
      setIsScrolled(false);
    }
  });

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Impact", href: "/#program" },
    { name: "CFP", href: "/cfp" },
    { name: "Gallery", href: "/gallery" },
    { name: "Events", href: "/events" },
  ];

  return (
    <>
      {/* Outer wrapper: handles the vertical offset (top padding) */}
      <motion.header
        className="fixed inset-x-0 top-0 z-50 pointer-events-none"
        initial={false}
        animate={{ paddingTop: isScrolled ? 16 : 0 }}
        transition={spring}
      >
        {/* Horizontal centering track */}
        <motion.div
          className="mx-auto pointer-events-none"
          initial={false}
          animate={{
            paddingLeft: isScrolled ? "5%" : "0%",
            paddingRight: isScrolled ? "5%" : "0%",
            maxWidth: isScrolled ? 960 : 9999,
          }}
          transition={spring}
        >
          {/* The actual navbar surface */}
          <motion.nav
            className="pointer-events-auto relative w-full will-change-[border-radius,box-shadow,background-color]"
            initial={false}
            animate={{
              borderRadius: isScrolled ? 9999 : 0,
              backgroundColor: isScrolled
                ? "rgba(255, 255, 255, 0.78)"
                : "rgba(255, 255, 255, 0.6)",
              boxShadow: isScrolled
                ? "0 0 0 1px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)"
                : "0 1px 0 0 rgba(0,0,0,0.06), 0 0 0 rgba(0,0,0,0), 0 0 0 rgba(0,0,0,0), inset 0 0 0 rgba(255,255,255,0)",
            }}
            transition={spring}
            style={{
              backdropFilter: "blur(20px) saturate(1.4)",
              WebkitBackdropFilter: "blur(20px) saturate(1.4)",
            }}
          >
            <div className="mx-auto flex h-14 sm:h-16 w-full items-center px-5 sm:px-6 lg:px-10">
              {/* Left — logo */}
              <div className="flex flex-1 items-center min-w-0 overflow-hidden">
                <a
                  href="/#top"
                  className="flex items-center z-50 shrink-0 group"
                  aria-label="GDG Cloud Bengaluru home"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Image
                    src={logo}
                    alt="GDG Cloud Bengaluru"
                    className="h-6 w-auto sm:h-7 transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </a>
              </div>

              {/* Center — nav links */}
              <div className="hidden items-center gap-6 lg:flex">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    className="text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-black whitespace-nowrap"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Right — register + mobile toggle */}
              <div className="flex flex-1 items-center justify-end gap-4 z-50 min-w-0">
                <a
                  href={registerHref}
                  className="inline-flex h-9 items-center justify-center rounded-full bg-black px-4 text-xs font-medium text-white transition-all duration-200 hover:bg-gray-800 hover:scale-[1.04] active:scale-[0.97] sm:px-5 sm:text-sm"
                >
                  Register
                </a>

                {/* Mobile Menu Toggle */}
                <button
                  className="flex flex-col items-center justify-center gap-[4px] w-8 h-8 lg:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <span
                    className={`block h-[2px] w-5 bg-black transition-transform duration-300 ${
                      isMobileMenuOpen ? "translate-y-[6px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`block h-[2px] w-5 bg-black transition-opacity duration-300 ${
                      isMobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`block h-[2px] w-5 bg-black transition-transform duration-300 ${
                      isMobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.nav>
        </motion.div>
      </motion.header>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[40] bg-white/90 lg:hidden flex items-center justify-center"
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{
                    delay: i * 0.04 + 0.08,
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    className="text-3xl font-medium text-gray-800 transition-colors duration-200 hover:text-black"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
