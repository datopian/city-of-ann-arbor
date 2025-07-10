import Link from "next/link";
import { ArrowSmallRightIcon } from "@heroicons/react/20/solid";
import { Dataset } from "@/types/ckan";
import { VisualizationsCarousel } from "./VisualizationsCarousel";

export function DashboardsSection({ dashboards }: { dashboards: Dataset[] }) {
  return (
    <section
      className="mt-24 flex flex-col items-center gap-y-11"
      data-cy="dashboards-section"
    >
      <div className="text-center flex flex-col lg:space-y-4">
        <h2 className="font-extrabold text-2xl lg:text-4xl">Dashboards</h2>
        <p className="p-5 lg:p-0 max-w-[570px] text-ann-arbor-primary-gray text-xl">
          Our dashboards provide visualization and analysis, complementing our
          raw datasets.
        </p>
        <Link
          href="/search?type=dashboard"
          className="text-xl text-ann-arbor-primary-blue transition-all hover:opacity-80"
          data-cy="all-dashboards-link"
        >
          <span className="underline">All dashboards</span>{" "}
          <ArrowSmallRightIcon className="inline w-6" />
        </Link>
      </div>
      <VisualizationsCarousel visualizations={dashboards} />
    </section>
  );
}
