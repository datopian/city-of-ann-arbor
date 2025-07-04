import { Dataset } from "@/types/ckan";
import { ArrowSmallRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import {
  RecentlyAddedCard,
  RecentlyAddedCardVariant,
} from "./RecentlyAddedCard";

export function DatasetsSection({ datasets }: { datasets: Dataset[] }) {
  return (
    <section
      className="flex flex-col items-center gap-y-11"
      data-cy="recently-added-section"
    >
      <div className="text-center flex flex-col space-y-4">
        <h2 className="font-extrabold text-4xl">Datasets</h2>
        <p className="max-w-[570px] text-ann-arbor-primary-gray text-xl">
          Browse the city's data, available in a variety of formats, and gain
          valuable insights.
        </p>
        <Link
          href="/search?type=dataset"
          className="text-xl text-ann-arbor-primary-blue transition-all hover:opacity-80"
          data-cy="all-datasets-link"
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
