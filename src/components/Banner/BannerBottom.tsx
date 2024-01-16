import React from "react";
import { MdLocalShipping } from "react-icons/md";
import { CgRedo } from "react-icons/cg";
import { RiSecurePaymentFill } from "react-icons/ri";

const BannerBottom = () => {
  return (
    <div className="w-full bg-white border-b-[1px] py-4 border-b-gray-200 px-4">
      <div className="max-w-container mx-auto h-20 flex flex-col md:flex-row justify-between items-center">
        <div
          data-aos="fade-right"
          className="flex items-center gap-2 max-w-80 transition-all hover:translate-y-1 text-base lg:text-lg xl:text-xl  shadow-sm hover:shadow-lg  duration-300 p-2 lg:p-4 xl:p-8 bg-card_bg_02 rounded-md"
        >
          <span className="font-bold font-titleFont w-6 text-center ">2</span>
          <p className="text-lightText  ">Two years warranty</p>
        </div>
        <div
          data-aos="fade-right"
          className="flex md:w-auto items-center gap-2 w-72 shadow-sm transition-all hover:translate-y-1 text-base lg:text-lg xl:text-xl hover:shadow-lg  duration-300 p-4 lg:p-8 bg-card_bg_04 rounded-md"
        >
          <span className=" text-center w-6 ml-1">
            <RiSecurePaymentFill />
          </span>
          <p className="text-lightText ">Secure Payment</p>
        </div>
        <div
          data-aos="fade-left"
          className="flex md:w-auto items-center gap-2 w-72 shadow-sm transition-all hover:translate-y-1 text-base lg:text-lg xl:text-xl hover:shadow-lg  duration-300 p-2 lg:p-4 xl:p-8 bg-card_bg_01 rounded-md"
        >
          <span className=" text-center w-6 ml-1">
            <MdLocalShipping />
          </span>
          <p className="text-lightText ">Free shipping</p>
        </div>

        <div
          data-aos="fade-left"
          className="flex md:w-auto items-center gap-2 w-72 shadow-sm hover:shadow-lg text-base lg:text-lg xl:text-xl transition-all hover:translate-y-1  duration-300 p-2 lg:p-4 xl:p-8 bg-card_bg_03 rounded-md"
        >
          <span className=" text-center w-6">
            <CgRedo />
          </span>
          <p className="text-lightText w-full">Return policy in 30 days</p>
        </div>
      </div>
    </div>
  );
};

export default BannerBottom;
