"use client";

export default function FooterBrand() {
  return (
    <div className="hidden w-full max-w-[90rem] flex-1 flex-col items-center justify-center sm:flex">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-800 sm:mb-6">
        That's
      </p>
      <h2
        className="text-center text-[15vw] font-semibold leading-none text-[#111111] sm:text-[18vw]"
        style={{ letterSpacing: "-0.05em" }}
      >
        GDG<span className="text-[#4285F4]">C</span>
        <span className="inline-block -translate-y-[0.12em] text-[#34A853]">
          BLR
        </span>
      </h2>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-800 sm:mb-6">
        For you
      </p>
    </div>
  );
}
