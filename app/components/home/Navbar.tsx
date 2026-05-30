"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/public/logo.png";

type NavbarProps = {
  registerHref?: string;
};

export default function Navbar({ registerHref = "https://gdg.community.dev/gdg-cloud-bengaluru/" }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Impact", href: "/#program" },
    { name: "CFP", href: "/#calls" },
    { name: "Gallery", href: "/gallery" },
    { name: "Events", href: "/events" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/75 backdrop-blur-xl">
      <nav className="relative mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-5 sm:h-16 sm:px-8 lg:px-10">
        <a
          href="/#top"
          className="flex items-center z-50"
          aria-label="GDG Cloud Bengaluru home"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Image
            src={logo}
            alt="GDG Cloud Bengaluru"
            className="h-7 w-auto sm:h-8"
            priority
          />
        </a>

        {/* Desktop Menu */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              className="text-sm font-medium text-gray-500 transition-colors hover:text-black"
              href={link.href}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 z-50">
          <a
            href={registerHref}
            className="inline-flex h-10 items-center justify-center rounded-full bg-black px-4 text-xs font-semibold text-white transition-colors hover:bg-gray-800 sm:h-9 sm:px-5 sm:text-sm"
          >
            Register
          </a>

          {/* Mobile Menu Toggle Button */}
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
      </nav>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 top-[100%] w-full bg-white border-b border-gray-100 shadow-xl lg:hidden overflow-hidden"
          >
            <div className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b border-gray-100 last:border-none"
                >
                  <Link
                    href={link.href}
                    className="block w-full py-5 text-center text-lg font-semibold text-gray-800 transition-colors hover:bg-gray-50 active:bg-gray-50"
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
    </header>
  );
}
