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
    <div className="grid grid-cols-2 gap-y-12 gap-x-4 py-12 md:grid-cols-4 md:gap-y-0">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`relative flex flex-col items-center px-6 text-center ${
            idx > 0
              ? "md:before:absolute md:before:left-0 md:before:top-1/2 md:before:-translate-y-1/2 md:before:h-12 md:before:w-px md:before:bg-gray-200"
              : ""
          }`}
        >
          <dt
            className={`text-6xl font-semibold tracking-tighter sm:text-7xl ${stat.color}`}
            style={{ lineHeight: 1 }}
          >
            {stat.value}
          </dt>
          <dd className="mt-4 text-sm font-medium text-gray-500">
            {stat.label}
          </dd>
        </div>
      ))}
    </div>
  );
}
