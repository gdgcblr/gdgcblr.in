import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us | GDG Cloud Bengaluru",
  description: "Get in touch with the core community team.",
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center px-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-gray-600 transition-colors hover:text-[#34A853] uppercase"
          >
            &larr; Back to Home
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-3xl px-5 py-24 sm:px-8 lg:py-32">
        <p className="text-sm font-semibold tracking-widest text-[#34A853] uppercase mb-4">
          Get in touch
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
          Contact Us
        </h1>

        <div className="mt-12 space-y-10 text-base leading-relaxed text-gray-700">
          <p>
            Whether you want to partner with us, speak at an upcoming event, or
            just have a question about the community, we'd love to hear from
            you. Please choose the most relevant channel below to reach the
            organizing team.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 mt-10">
            {/* General Inquiries */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <h3 className="text-xl font-semibold text-black mb-2">
                General Inquiries
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                For questions about attendance, schedule, or community matters.
              </p>
              <a
                href="mailto:gdgcblr@gmail.com"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                gdgcblr@gmail.com &rarr;
              </a>
            </div>

            {/* Sponsorships */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <h3 className="text-xl font-semibold text-black mb-2">
                Sponsorship & Venues
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                To host an event at your office or partner with our community.
              </p>
              <a
                href="mailto:gdgcblr@gmail.com"
                className="inline-flex items-center text-sm font-medium text-[#34A853] hover:text-green-700"
              >
                gdgcblr@gmail.com &rarr;
              </a>
            </div>
          </div>

          <section className="mt-16 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-semibold text-black tracking-tight mb-4">
              Social Media
            </h2>
            <p className="mb-6">
              You can also reach out or stay updated by following our official
              channels:
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="font-medium text-black hover:text-[#4285F4] transition-colors"
              >
                Twitter / X (@gdgcblr)
              </a>
              <a
                href="#"
                className="font-medium text-black hover:text-[#4285F4] transition-colors"
              >
                LinkedIn (GDG Cloud Bengaluru)
              </a>
              <a
                href="#"
                className="font-medium text-black hover:text-[#4285F4] transition-colors"
              >
                Official Google Developers Community Page
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
