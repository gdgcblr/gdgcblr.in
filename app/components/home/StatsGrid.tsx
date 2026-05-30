"use client";

const stats = [
  {
    value: "8000+",
    label: "Developers in Network",
    color: "text-[#1A73E8]",
  },
  {
    value: "40+",
    label: "Tech Events Hosted",
    color: "text-[#EA4335]",
  },
  {
    value: "120+",
    label: "Expert Speakers",
    color: "text-[#FBBC04]",
  },
  {
    value: "8+",
    label: "Years Active",
    color: "text-[#34A853]",
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-y-10 border-y border-gray-200 py-10 md:grid-cols-4 md:gap-y-0">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`flex flex-col items-center px-4 text-center ${
            idx % 2 === 1 ? "border-l border-gray-200" : ""
          } md:border-l md:border-gray-200 md:first:border-none`}
        >
          <dt
            className={`text-4xl font-medium tracking-tight sm:text-5xl ${stat.color}`}
          >
            {stat.value}
          </dt>
          <dd className="mt-3 max-w-[140px] text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 sm:text-xs">
            {stat.label}
          </dd>
        </div>
      ))}
    </div>
  );
}
