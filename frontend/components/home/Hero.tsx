import { Group } from "@portaljs/ckan";
import Link from "next/link";
import SearchForm from "./SearchForm";

export default function HeroSection({ groups }: { groups: Group[] }) {
  return (
    <div className="pt-[156px]">
      <div className="custom-container mx-auto">
        <div className="flex flex-col lg:items-center gap-y-7">
          <h1 className="lg:max-w-[478px] font-bold text-3xl text-[40px] lg:text-6xl flex flex-col text-center !leading-snug">
            <span className="text-lg lg:text-4xl">City of Ann Arbor</span> Open
            Data Portal
          </h1>
          <div className="max-w-[580px] w-full">
            <SearchForm />
          </div>
          <div className="flex flex-row flex-wrap justify-center gap-x-1 gap-y-2 lg:gap-x-2 lg:gap-y-5 max-w-3xl">
            {groups.slice(0, groups.length <= 8 ? 8 : 7).map((g, i) => (
              <Link
                key={g.id}
                href={`#${g.name}`}
                className={`text-black text-sm lg:text-xl px-3 lg:px-5 py-1 lg:py-2 rounded-[5px] bg-ann-arbor-groups-${
                  i + 1
                } transition-all hover:bg-opacity-70`}
              >
                {g.title}
              </Link>
            ))}
            {groups.length > 8 && (
              <Link
                href="/topics"
                className={`text-black text-sm lg:text-xl px-3 lg:px-5 py-1 lg:py-2 rounded-[5px] bg-ann-arbor-groups-8 transition-all hover:bg-opacity-70`}
              >
                +{groups.length - 7} more
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
