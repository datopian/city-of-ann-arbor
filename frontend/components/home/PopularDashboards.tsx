import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { PopularDashboardCard } from "./PopularDashboardCard";

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
      <div className="w-full bg-gradient-to-t from-[#EBF5EC26] via-[#E2F1E4] via-20% to-[#FFFFFF] to-65%">
        <div className="w-full px-24 pb-28 ">
          <Swiper
            spaceBetween={35}
            slidesPerView={3}
            modules={[Pagination]}
            pagination={{ clickable: true, el: "#pagination" }}
          >
            <SwiperSlide>
              <PopularDashboardCard />
            </SwiperSlide>
            <SwiperSlide>
              <PopularDashboardCard />
            </SwiperSlide>

            <SwiperSlide>
              <PopularDashboardCard />
            </SwiperSlide>

            <SwiperSlide>
              <PopularDashboardCard />
            </SwiperSlide>
          </Swiper>
          <div className="flex justify-center mt-12">
            <div id="pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
