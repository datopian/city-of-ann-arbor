import Link from "next/link";
import { ArrowSmallRightIcon } from "@heroicons/react/20/solid";
import { Dataset } from "@/types/ckan";
import { VisualizationsCarousel } from "./VisualizationsCarousel";

export function MapsSection({ maps }: { maps: Dataset[] }) {
  return (
    <section
      className="flex flex-col items-center gap-y-11"
      data-cy="maps-section"
    >
      <div className="text-center flex flex-col lg:space-y-4">
        <h2 className="font-extrabold text-2xl lg:text-4xl">Maps</h2>
        <p className="p-5 lg:p-0 max-w-[570px] text-ann-arbor-primary-gray text-xl">
          Explore the GIS maps and resources created by the city's A2Spatial
          team.
        </p>
        <Link
          href="/search?type=map"
          className="text-xl text-ann-arbor-primary-blue transition-all hover:opacity-80"
          data-cy="all-maps-link"
        >
          <span className="underline">All maps</span>{" "}
          <ArrowSmallRightIcon className="inline w-6" />
        </Link>
      </div>
      <VisualizationsCarousel visualizations={maps} />
    </section>
  );
}
