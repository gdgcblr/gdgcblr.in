"use client";

type SectionHeadingProps = {
  title: string;
  text: string;
  centered?: boolean;
};

export default function SectionHeading({ title, text, centered = false }: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <h2 className="mt-4 text-balance text-[clamp(2rem,7vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-black sm:text-[clamp(2.1rem,4.4vw,4.8rem)] sm:leading-[0.98]">
        {title}
      </h2>
      <p className={`mt-5 max-w-xl text-pretty text-sm leading-7 text-gray-600 sm:text-base sm:leading-8 lg:text-lg ${centered ? "mx-auto" : ""}`}>
        {text}
      </p>
    </div>
  );
}
