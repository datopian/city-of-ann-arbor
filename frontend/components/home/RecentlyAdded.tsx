import Link from "next/link";
import { RecentlyAddedCard } from "./RecentlyAddedCard";

export function RecentlyAdded() {
  return (
    <section className="flex flex-col items-center gap-y-11">
      <div className="text-center flex flex-col space-y-4">
        <h2 className="font-extrabold text-4xl">Recently added</h2>
        <p className="max-w-[570px] text-[#534F5D] text-xl">
          Explore recently added datasets and gain valuable insights into the
          city of Ann Arbor trends.
        </p>
        <Link href="#" className="text-xl text-primaryblue">
          <span className="underline">All datasets</span> →
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <RecentlyAddedCard variant={0}/>
        <RecentlyAddedCard variant={1}/>
        <RecentlyAddedCard variant={2}/>
        <RecentlyAddedCard variant={3}/>
        <RecentlyAddedCard variant={4}/>
        <RecentlyAddedCard variant={5}/>
      </div>
    </section>
  );
}
