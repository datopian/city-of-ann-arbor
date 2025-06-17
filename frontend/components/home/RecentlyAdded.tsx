import { ArrowSmallRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { RecentlyAddedCard } from "./RecentlyAddedCard";

export function RecentlyAdded() {
  return (
    <section className="flex flex-col items-center gap-y-11">
      <div className="text-center flex flex-col space-y-4">
        <h2 className="font-extrabold text-4xl">Recently added</h2>
        <p className="max-w-[570px] text-ann-arbor-primary-gray text-xl">
          Explore recently added datasets and gain valuable insights into the
          city of Ann Arbor trends.
        </p>
        <Link href="#" className="text-xl text-ann-arbor-primary-blue">
          <span className="underline">All datasets</span>
          <ArrowSmallRightIcon className="inline w-6" />
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <RecentlyAddedCard variant={0} />
        <RecentlyAddedCard variant={1} />
        <RecentlyAddedCard variant={2} />
        <RecentlyAddedCard variant={3} />
        <RecentlyAddedCard variant={4} />
        <RecentlyAddedCard variant={5} />
      </div>
    </section>
  );
}
