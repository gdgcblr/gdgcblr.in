"use client";

import Link from "next/link";

export default function FooterNav() {
  return (
    <div className="mt-16 flex w-full max-w-[90rem] flex-col items-center gap-8 text-center sm:mt-32 md:flex-row md:items-end md:justify-between md:text-left">
      <div className="flex items-center">
        <span className="select-none text-xl font-medium tracking-tight text-gray-500">
          GDG Cloud Bengaluru
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[11px] font-medium uppercase tracking-wide text-gray-500 md:justify-end">
        <Link href="/gallery" className="transition-colors hover:text-black">
          Gallery
        </Link>
        <Link href="/code-of-conduct" className="transition-colors hover:text-black">
          Code of Conduct
        </Link>
        <Link href="/privacy-policy" className="transition-colors hover:text-black">
          Privacy Policy
        </Link>
        <Link href="/code-of-conduct" className="transition-colors hover:text-black">
          Community Guidelines
        </Link>
        <Link href="/contact" className="transition-colors hover:text-black">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
