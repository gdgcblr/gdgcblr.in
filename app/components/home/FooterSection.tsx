"use client";

import FooterBrand from "./FooterBrand";
import FooterNav from "./FooterNav";

export default function FooterSection() {
  return (
    <section className="flex min-h-[28vh] flex-col items-center justify-between bg-white px-5 pt-12 pb-8 sm:min-h-[50vh] sm:px-8 sm:pt-24 sm:pb-12 lg:min-h-[70vh] lg:px-10 lg:pt-48">
      <FooterBrand />
      <FooterNav />
    </section>
  );
}
