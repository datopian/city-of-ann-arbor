import { ArrowSmallRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export function PopularDashboardCard() {
  return (
    <div className="border-[2px] border-[#D9D9D9] p-3 rounded-[5px] space-y-10 bg-white">
      <div className="aspect-video relative rounded-[5px] overflow-hidden">
        <Image
          src="/images/dashboard-mock-1.png"
          alt="Dashboard 1"
          fill={true}
        />
      </div>

      <div className="space-y-3 px-2">
        <h3 className="font-bold text-3xl">
          City Budget Expenditures by Department – FY2024
        </h3>
        <p className="text-[#6E6E6E] text-sm leading-[20px] line-clamp-4 text-ellipsis h-[6em]">
          Detailed breakdown of city expenditures by department and program for
          the fiscal year 2024. Includes general fund allocations, capital
          improvements, and grant-funded initiatives.{" "}
        </p>
      </div>

      <div className="px-2 pb-5">
        <button className="bg-ann-arbor-accent-green text-white font-bold px-3 py-2 rounded-[5px] flex items-center">
          Explore dashboard
          <ArrowSmallRightIcon className="inline w-6" />
        </button>
      </div>
    </div>
  );
}
