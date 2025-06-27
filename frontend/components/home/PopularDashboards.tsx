import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { PopularDashboardCard } from "./PopularDashboardCard";
import { ArrowSmallRightIcon } from "@heroicons/react/20/solid";
import { Dataset } from "@/types/ckan";

export function PopularDashboards({ dashboards }: { dashboards: Dataset[] }) {
  return (
    <section
      className="mt-24 flex flex-col items-center gap-y-11"
      data-cy="popular-dashboards-section"
    >
      <div className="text-center flex flex-col lg:space-y-4">
        <h2 className="font-extrabold text-2xl lg:text-4xl">
          Popular dashboards
        </h2>
        <p className="p-5 lg:p-0 max-w-[570px] text-ann-arbor-primary-gray text-xl">
          Dive into our popular dashboards to see what’s happening in Ann Arbor
          - from traffic patterns to tree cover.
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
      <div className="w-full bg-gradient-to-t from-[#EBF5EC26] via-[#E2F1E4] via-20% to-[#FFFFFF] to-65%">
        <div className="w-full px-5 lg:px-24 pb-28 ">
          <Swiper
            spaceBetween={35}
            slidesPerView={3}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            modules={[Pagination]}
            pagination={{ clickable: true, el: "#pagination" }}
          >
            {dashboards.map((d) => {
              return (
                <SwiperSlide key={`dashboard-${d.id}`} data-cy={`dashboard-card-${d.id}`}>
                  <PopularDashboardCard dashboard={d} />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="flex justify-center mt-12">
            <div id="pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
