import Link from "next/link";
import SearchForm from "./SearchForm";

const MOCKED_GROUPS = [
  {
    title: "Parks & Recreation",
    color: "ann-arbor-groups-1",
  },
  {
    title: "Elections",
    color: "ann-arbor-groups-2",
  },
  {
    title: "Police Department",
    color: "ann-arbor-groups-3",
  },
  {
    title: "Parking Services",
    color: "ann-arbor-groups-4",
  },
  {
    title: "Parks & Recreation",
    color: "ann-arbor-groups-5",
  },
  {
    title: "Elections",
    color: "ann-arbor-groups-6",
  },
  {
    title: "Police Department",
    color: "ann-arbor-groups-7",
  },
  {
    title: "+7 more",
    color: "ann-arbor-groups-8",
  },
];

export default function HeroSection() {
  return (
    <div className="pt-[156px]">
      <div className="custom-container mx-auto">
        <div className="flex flex-col lg:items-center gap-y-7">
          <h1 className="lg:max-w-[478px] font-bold text-3xl text-[40px] lg:text-6xl flex flex-col text-center !leading-snug">
            <span className="text-lg lg:text-4xl">City of Ann Arbor</span> Open Data Portal
          </h1>
          <SearchForm />
          <div className="flex flex-row flex-wrap justify-center gap-x-1 gap-y-2 lg:gap-x-2 lg:gap-y-5 max-w-3xl">
            {MOCKED_GROUPS.map((g) => (
              <Link
                key={g.color}
                href="#"
                className={`text-black text-sm lg:text-xl px-3 lg:px-5 py-1 lg:py-2 rounded-[5px] bg-${g.color} transition-all hover:bg-opacity-70`}
              >
                {g.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
