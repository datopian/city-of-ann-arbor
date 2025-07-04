import { Dataset } from "@/types/ckan";
import { PopularDashboardCard } from "./PopularDashboardCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export function VisualizationsCarousel({
  visualizations,
}: {
  visualizations: Dataset[];
}) {
  return (
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
          {visualizations?.map((v) => {
            return (
              <SwiperSlide
                key={`${v.ann_arbor_dataset_type}-${v.id}`}
                data-cy={`${v.ann_arbor_dataset_type}-card-${v.id}`}
              >
                <PopularDashboardCard dashboard={v} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="flex justify-center mt-12">
          <div id="pagination"></div>
        </div>
      </div>
    </div>
  );
}
