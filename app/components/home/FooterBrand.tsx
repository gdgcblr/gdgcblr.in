"use client";

export default function FooterBrand() {
  return (
    <div className="hidden w-full max-w-[90rem] flex-1 flex-col items-center justify-center sm:flex">
      <div className="mb-4 sm:mb-8 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-500">
        Crafted By
      </div>

      <h2
        className="text-center text-[15vw] font-black leading-none text-black sm:text-[16vw] lg:text-[18vw]"
        style={{ letterSpacing: "-0.06em" }}
      >
        GDG
        <span className="inline-block -translate-y-[0.10em] text-[#4285F4] transition-transform duration-500 hover:-translate-y-[0.15em]">
          C
        </span>
        <span className="text-black">BLR</span>
      </h2>

      <p className="mt-4 sm:mt-8 text-sm font-medium tracking-wider text-gray-500 sm:text-base">
        For Bengaluru Builders.
      </p>
    </div>
  );
}
