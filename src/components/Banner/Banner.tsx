import { useRef } from "react";

import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgTwo3,
  bannerImgTwo4,
  bannerImgTwo5,
  bannerImgTwo6,
} from "../../assets/images";
import Image from "../designLayouts/Image";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

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
    <div className="home_banner">
      <Swiper {...swiperOptions}>
        <SwiperSlide className="flex items-center justify-center">
          <Image className="h-full w-full object-cover" imgSrc={bannerImgOne} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-sxl mt-40 font-semibold mb-[30px] lg:text-[64px] lg:leading-tight lg:max-w-[888px] backdrop-blur-[2px] text-primeColor  ">
              Creative Home Simpify your Furniture
            </h1>
            <h2 className="mb-[30px] max-w-[672px] mx-auto lg:mb-[65px] lg:text-xl">
              subtitle
            </h2>
            <button className="shop-button mt-4 bg-springGreen hover:bg-[rgba(255,255,255, 0.6)] px-[35px] py-[9px] mb-[160px] text-xl rounded-md backdrop-blur-md transition lg:px-[80px] lg:py-[16px] lg:mb-[194px]  ">
              Shop Now
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <Image
            className="h-full w-full object-contain"
            imgSrc={bannerImgTwo}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-sxl mt-40 font-semibold mb-[30px] lg:text-[64px] lg:leading-tight lg:max-w-[888px] backdrop-blur-[2px] text-primary   ">
              Creative Home Simpify your Furniture
            </h1>
            <h2 className="mb-[30px] max-w-[672px] mx-auto lg:mb-[65px] lg:text-xl">
              subtitle
            </h2>
            <button className="shop-button mt-4 bg-springGreen hover:bg-[rgba(255,255,255, 0.6)] px-[35px] py-[9px] mb-[160px] text-xl rounded-md backdrop-blur-md transition lg:px-[80px] lg:py-[16px] lg:mb-[194px]  ">
              Shop Now
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <Image
            className="h-full w-full object-contain"
            imgSrc={bannerImgTwo3}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-sxl mt-40 font-semibold mb-[30px] lg:text-[64px] lg:leading-tight lg:max-w-[888px] backdrop-blur-[2px] text-primary   ">
              Creative Home Simpify your Furniture
            </h1>
            <h2 className="mb-[30px] max-w-[672px] mx-auto lg:mb-[65px] lg:text-xl">
              subtitle
            </h2>
            <button className="shop-button mt-4 bg-springGreen hover:bg-[rgba(255,255,255, 0.6)] px-[35px] py-[9px] mb-[160px] text-xl rounded-md backdrop-blur-md transition lg:px-[80px] lg:py-[16px] lg:mb-[194px]  ">
              Shop Now
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <Image
            className="h-full w-full object-contain"
            imgSrc={bannerImgTwo4}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-sxl mt-40 font-semibold mb-[30px] lg:text-[64px] lg:leading-tight lg:max-w-[888px] backdrop-blur-[2px] text-primary   ">
              Creative Home Simpify your Furniture
            </h1>
            <h2 className="mb-[30px] max-w-[672px] mx-auto lg:mb-[65px] lg:text-xl">
              subtitle
            </h2>
            <button className="shop-button mt-4 bg-springGreen hover:bg-[rgba(255,255,255, 0.6)] px-[35px] py-[9px] mb-[160px] text-xl rounded-md backdrop-blur-md transition lg:px-[80px] lg:py-[16px] lg:mb-[194px]  ">
              Shop Now
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <Image
            className="h-full w-full object-contain"
            imgSrc={bannerImgTwo5}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-sxl mt-40 font-semibold mb-[30px] lg:text-[64px] lg:leading-tight lg:max-w-[888px] backdrop-blur-[2px] text-delayedYellow   ">
              Creative Home Simpify your Furniture
            </h1>
            <h2 className="mb-[30px] max-w-[672px] mx-auto lg:mb-[65px] lg:text-xl">
              subtitle
            </h2>
            <button className="shop-button mt-4 bg-springGreen hover:bg-[rgba(255,255,255, 0.6)] px-[35px] py-[9px] mb-[160px] text-xl rounded-md backdrop-blur-md transition lg:px-[80px] lg:py-[16px] lg:mb-[194px]  ">
              Shop Now
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <Image
            className="h-full w-full object-contain"
            imgSrc={bannerImgTwo6}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-sxl mt-40 font-semibold mb-[30px] lg:text-[64px] lg:leading-tight lg:max-w-[888px] backdrop-blur-[2px] text-primary   ">
              Creative Home Simpify your Furniture
            </h1>
            <h2 className="mb-[30px] max-w-[672px] mx-auto lg:mb-[65px] lg:text-xl">
              subtitle
            </h2>
            <button className="shop-button mt-4 bg-springGreen hover:bg-[rgba(255,255,255, 0.6)] px-[35px] py-[9px] mb-[160px] text-xl rounded-md backdrop-blur-md transition lg:px-[80px] lg:py-[16px] lg:mb-[194px]  ">
              Shop Now
            </button>
          </div>
        </SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
};

export default Banner;
