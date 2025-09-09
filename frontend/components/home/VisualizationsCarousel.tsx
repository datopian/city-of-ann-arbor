import { Dataset } from "@/types/ckan";
import { PopularDashboardCard } from "./PopularDashboardCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CarouselNavButton from "./CarouselNavButton";

const PrevButton = ({
  identifier,
  isVisible
}: {
  identifier: string;
  isVisible: boolean;
}) => (
  <div
    className={`nav-prev-button--${identifier} absolute top-[40%] z-50 ml-[-1.9rem] ${isVisible ? 'block' : 'hidden'
      } -translate-y-2/4 opacity-0 transition-all hover:opacity-100 peer-hover:opacity-100 md:left-24 lg:block`}
  >
    <CarouselNavButton orientation="left" />
  </div>
);

const NextButton = ({
  identifier,
  isVisible
}: {
  identifier: string;
  isVisible: boolean;
}) => (
  <div
    className={`nav-next-button--${identifier} right-[calc(0px + 10rem)] absolute top-[40%] z-50 ${isVisible ? 'block' : 'hidden'
      } -translate-y-2/4 opacity-0 transition-all hover:opacity-100 peer-hover:opacity-100 md:right-16 lg:block`}
  >
    <CarouselNavButton orientation="right" />
  </div>
);

export function VisualizationsCarousel({
  visualizations,
  identifier = '',
}: {
  visualizations: Dataset[];
  identifier?: string;
}) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const prevEl = `.nav-prev-button${identifier ? '--' + identifier : ''}`;
  const nextEl = `.nav-next-button${identifier ? '--' + identifier : ''}`;

  return (
    <div className="w-full bg-gradient-to-t from-[#EBF5EC26] via-[#E2F1E4] via-20% to-[#FFFFFF] to-65% relative">
      <div className="w-full px-5 lg:px-24 pb-28 peer">
        <Swiper
          spaceBetween={35}
          slidesPerView={3}
          breakpoints={{
            0: {
              slidesPerView: 1,
              slidesPerGroup: 1,
            },
            768: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
          }}
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: prevEl,
            nextEl: nextEl,
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onInit={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
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
      </div>
      <PrevButton identifier={identifier} isVisible={!isBeginning} />
      <NextButton identifier={identifier} isVisible={!isEnd} />
    </div>
  );
}
