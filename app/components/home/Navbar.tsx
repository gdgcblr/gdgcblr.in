"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

type NavbarProps = {
  registerHref: string;
};

export default function Navbar({ registerHref }: NavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/75 backdrop-blur-xl">
      <nav className="relative mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-5 sm:h-16 sm:px-8 lg:px-10">
        <a
          href="/#top"
          className="flex items-center"
          aria-label="GDG Cloud Bengaluru home"
        >
          <Image
            src={logo}
            alt="GDG Cloud Bengaluru"
            className="h-7 w-auto sm:h-8"
            priority
          />
        </a>
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
          <a
            className="text-sm font-medium text-gray-500 transition-colors hover:text-black"
            href="/"
          >
            Home
          </a>
          <a
            className="text-sm font-medium text-gray-500 transition-colors hover:text-black"
            href="/#program"
          >
            Impact
          </a>
          <a
            className="text-sm font-medium text-gray-500 transition-colors hover:text-black"
            href="/#calls"
          >
            CFP
          </a>
          <Link
            className="text-sm font-medium text-gray-500 transition-colors hover:text-black"
            href="/gallery"
          >
            Gallery
          </Link>
          <Link
            className="text-sm font-medium text-gray-500 transition-colors hover:text-black"
            href="/events"
          >
            Events
          </Link>
        </div>
        <a
          href={registerHref}
          className="inline-flex h-10 items-center justify-center rounded-full bg-black px-4 text-xs font-semibold text-white transition-colors hover:bg-gray-800 sm:h-9 sm:px-5 sm:text-sm"
        >
          Register
        </a>
      </nav>
    </header>
  );
}
