import Image from "next/image";
import Link from "next/link";

export function PopularDashboards() {
  return (
    <section className="flex flex-col items-center gap-y-11">
      <div className="text-center flex flex-col space-y-4">
        <h2 className="font-extrabold text-4xl">Popular dashboards</h2>
        <p className="max-w-[570px] text-[#534F5D] text-xl">
          Dive into our popular dashboards to see what’s happening in Ann Arbor
          - from traffic patterns to tree cover.
        </p>
        <Link href="#" className="text-xl text-primaryblue">
          <span className="underline">All dashboards</span> →
        </Link>
      </div>
      <div>
        <div className="border-[2px] border-[#D9D9D9] p-3 rounded-[5px] space-y-10">
          <div className="aspect-video relative rounded-[5px] overflow-hidden">
            <Image
              src="/images/dashboard-mock-1.png"
              alt="Dashboard 1"
              fill={true}
            />
          </div>

          <div className="space-y-3 px-2 max-w-lg">
            <h3 className="font-bold text-3xl">
              City Budget Expenditures by Department – FY2024
            </h3>
            <p className="text-[#6E6E6E] text-sm leading-[20px] line-clamp-4 text-ellipsis h-[6em]">
              Detailed breakdown of city expenditures by department and program
              for the fiscal year 2024. Includes general fund allocations,
              capital improvements, and grant-funded initiatives.{" "}
            </p>
          </div>

          <div className="px-2 pb-5">
            <button className="bg-accent text-white font-bold px-3 py-2 rounded-[5px]">
              Explore dashboard →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
