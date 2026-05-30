"use client";

import SectionHeading from "./SectionHeading";
import StatsGrid from "./StatsGrid";

export default function StatsSection() {
  return (
    <section
      id="program"
      className="px-5 pt-10 pb-4 sm:px-8 sm:pt-32 sm:pb-12 lg:px-10 lg:pt-48 lg:pb-16"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 sm:gap-16">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            title="A massive network of builders."
            text="We've grown into one of the largest and most active developer communities in the region, bringing together thousands of engineers, founders, and students."
            centered={true}
          />
        </div>
        <StatsGrid />
      </div>
    </section>
  );
}
