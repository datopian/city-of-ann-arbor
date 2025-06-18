import { Dashboard } from "@/types/ckan";
import { ArrowSmallRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export function PopularDashboardCard({ dashboard }: { dashboard: Dashboard }) {
  return (
    <div className="border-[2px] border-[#D9D9D9] p-3 rounded-[5px] space-y-10 bg-white">
      <div className="aspect-video relative rounded-[5px] overflow-hidden">
        <Image
          src={
            dashboard.image_url ?? "/images/dashboard-fallback.jpg"
          }
          alt="Dashboard 1"
          fill={true}
          className={"object-cover"}
        />
      </div>

      <div className="space-y-3 px-2">
        <h3 className="font-bold text-3xl line-clamp-2 h-[4.5rem]">
          {dashboard.title}
        </h3>
        <p className="text-[#6E6E6E] text-sm leading-[20px] line-clamp-4 text-ellipsis h-[5.5em]">
          {dashboard.notes ? (
            dashboard.notes
          ) : (
            <span className="italic">N/A</span>
          )}
        </p>
      </div>

      <div className="px-2 pb-5">
        <a
          href={`#dashboard-${dashboard.name}`}
          className="w-fit bg-ann-arbor-accent-green transition-all hover:bg-opacity-90 text-white font-bold px-3 py-2 rounded-[5px] flex items-center"
        >
          Explore dashboard
          <ArrowSmallRightIcon className="inline w-6" />
        </a>
      </div>
    </div>
  );
}
