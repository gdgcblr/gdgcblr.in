import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Code of Conduct | GDG Cloud Bengaluru",
  description: "Our community guidelines and code of conduct.",
};

export default function CodeOfConduct() {
  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center px-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-gray-600 transition-colors hover:text-blue-600 uppercase"
          >
            &larr; Back to Home
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-3xl px-5 py-24 sm:px-8 lg:py-32">
        <p className="text-sm font-semibold tracking-widest text-[#4285F4] uppercase mb-4">
          Community Guidelines
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
          Code of Conduct
        </h1>

        <div className="mt-12 space-y-8 text-base leading-relaxed text-gray-700">
          <p>
            When you join the GDG Cloud Bengaluru community, you are joining a network
            of professionals, learners, and enthusiasts dedicated to building the future
            of technology. We are committed to providing a harassment-free and inclusive
            experience for everyone.
          </p>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-black tracking-tight mb-4">
              Our Pledge
            </h2>
            <p>
              In the interest of fostering an open and welcoming environment, we as
              community members, organizers, and speakers pledge to making participation
              in our project and our community a harassment-free experience for everyone,
              regardless of age, body size, disability, ethnicity, sex characteristics,
              gender identity and expression, level of experience, education,
              socio-economic status, nationality, personal appearance, race, religion,
              or sexual identity and orientation.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-black tracking-tight mb-4">
              Expected Behavior
            </h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>Be respectful and inclusive of all attendees.</li>
              <li>Use welcoming and inclusive language.</li>
              <li>Be respectful of differing viewpoints and experiences.</li>
              <li>Gracefully accept constructive criticism.</li>
              <li>Focus on what is best for the community.</li>
              <li>Show empathy towards other community members.</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-black tracking-tight mb-4">
              Unacceptable Behavior
            </h2>
            <p>
              Harassment includes offensive verbal comments related to gender, gender
              identity and expression, age, sexual orientation, disability, physical
              appearance, body size, race, ethnicity, religion, technology choices,
              sexual images in public spaces, deliberate intimidation, stalking,
              following, harassing photography or recording, sustained disruption of
              talks or other events, inappropriate physical contact, and unwelcome sexual
              attention.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-black tracking-tight mb-4">
              Reporting Guidelines
            </h2>
            <p>
              If you are being harassed, notice that someone else is being harassed,
              or have any other concerns, please contact an organizer immediately or
              email our core team. We will respect confidentiality requests for the
              purpose of protecting victims of abuse.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
