import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | GDG Cloud Bengaluru",
  description: "How we handle your data and privacy.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center px-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-gray-600 transition-colors hover:text-[#EA4335] uppercase"
          >
            &larr; Back to Home
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-3xl px-5 py-24 sm:px-8 lg:py-32">
        <p className="text-sm font-semibold tracking-widest text-[#EA4335] uppercase mb-4">
          Data & Security
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
          Privacy Policy
        </h1>

        <div className="mt-12 space-y-8 text-base leading-relaxed text-gray-700">
          <p>
            At GDG Cloud Bengaluru, we respect your privacy and are committed to
            protecting your personal data. This Privacy Policy outlines the types of
            information we collect, how it is used, and the steps we take to ensure
            your personal information is handled appropriately.
          </p>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-black tracking-tight mb-4">
              Information We Collect
            </h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong>Personal Data:</strong> Email addresses, names, and contact
                information when you voluntarily submit it via RSVPs, feedback forms,
                or newsletter subscriptions.
              </li>
              <li>
                <strong>Event Media:</strong> Photographs and video recordings captured
                during our meetups, conferences, and virtual events.
              </li>
              <li>
                <strong>Usage Data:</strong> Anonymous analytical data on how our website
                is accessed and used, to improve user experience.
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-black tracking-tight mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>To manage event registrations and communicate important updates.</li>
              <li>To answer inquiries and provide community support.</li>
              <li>To publish highlights, recaps, and promotional materials featuring event media.</li>
              <li>To analyze site performance and improve our technical resources.</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-black tracking-tight mb-4">
              Data Sharing
            </h2>
            <p>
              We do not sell or rent your personal information to third parties. Data
              may be shared with core organizers and official Google Developer Groups
              platforms solely for the purpose of community management. We may also
              share information if required by law or to protect the rights and safety
              of our community.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-black tracking-tight mb-4">
              Your Rights
            </h2>
            <p>
              You have the right to request access to the personal data we hold about
              you. You may also request corrections to any inaccurate data or ask for
              your data to be deleted. To exercise these rights, please contact us
              directly.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
