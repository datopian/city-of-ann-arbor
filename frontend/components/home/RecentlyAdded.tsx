import { Dataset } from "@/types/ckan";
import { ArrowSmallRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import {
  RecentlyAddedCard,
  RecentlyAddedCardVariant,
} from "./RecentlyAddedCard";

export function RecentlyAdded({ datasets }: { datasets: Dataset[] }) {
  return (
    <section className="flex flex-col items-center gap-y-11">
      <div className="text-center flex flex-col space-y-4">
        <h2 className="font-extrabold text-4xl">Recently added</h2>
        <p className="max-w-[570px] text-ann-arbor-primary-gray text-xl">
          Explore recently added datasets and gain valuable insights into the
          city of Ann Arbor trends.
        </p>
        <Link
          href="#"
          className="text-xl text-ann-arbor-primary-blue transition-all hover:opacity-80"
        >
          <span className="underline">All datasets</span>
          <ArrowSmallRightIcon className="inline w-6" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {datasets.map((d, i) => {
          return (
            <RecentlyAddedCard
              key={`recently-added-dataset-${d.name}`}
              dataset={d}
              variant={i as RecentlyAddedCardVariant}
            />
          );
        })}
      </div>
    </section>
  );
}
