import { useRef } from "react";

import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
  bannerImgFour,
} from "../../assets/images";
import Image from "../designLayouts/Image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

interface AutoplayProps {
  delay: number;
  disableOnInteraction: boolean;
}

interface PaginationProps {
  clickable: boolean;
}

interface SwiperProps {
  spaceBetween: number;
  centeredSlides: boolean;
  autoplay: AutoplayProps;
  pagination: PaginationProps;
  navigation: boolean;
  modules: any[]; // You can be more specific with the types if needed
  onAutoplayTimeLeft: (s: any, time: number, progress: number) => void;
  className: string;
}
const Banner = () => {
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty(
        "--progress",
        String(1 - progress)
      );
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };
  const swiperOptions: SwiperProps = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
    },
    navigation: true,
    modules: [Autoplay, Pagination, Navigation],
    onAutoplayTimeLeft: onAutoplayTimeLeft,
    className: "mySwiper",
  };
  return (
    <>
      <Swiper {...swiperOptions}>
        <SwiperSlide>
          <Image className="h-full cover" imgSrc={bannerImgOne} />
        </SwiperSlide>
        <SwiperSlide>
          <Image className="h-full cover" imgSrc={bannerImgTwo} />
        </SwiperSlide>
        <SwiperSlide>
          <Image className="" imgSrc={bannerImgThree} />
        </SwiperSlide>
        <SwiperSlide>
          <Image className="h-full cover" imgSrc={bannerImgFour} />
        </SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
};

export default Banner;
