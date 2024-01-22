import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdSwitchAccount } from "react-icons/md";
import { useSelector } from "react-redux";
import { shopRetriever } from "../../pages/ShopPage/useReduxShop";
import useBasket from "../../constants/useBasket";

const SpecialCase = () => {
  const { cartItems } = useBasket();
  useEffect(() => {
    console.log("Updated cartItems:", cartItems);
  }, [cartItems]);
  return (
    <div className="fixed w-screen max-w-fit top-52 right-0 z-20 hidden md:flex flex-col gap-2">
      <Link to="/signin">
        <div className="bg-white w-16 z-20 right-1 absolute h-[70px] rounded-md flex flex-col gap-1 hover:text-orange-500 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
          <div className="flex justify-center items-center ">
            <MdSwitchAccount className="text-2xl -translate-x-12  group-hover:translate-x-3 transition-transform duration-200" />

            <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-semibold font-titleFont">Profile</p>
        </div>
      </Link>
      <Link to="/cart">
        <div className="bg-white w-16 top-20 right-1 absolute h-[70px] rounded-md hover:text-orange-500 flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer ">
          <div className="flex justify-center items-center">
            <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

            <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-semibold font-titleFont">Buy Now</p>
          {cartItems.length > 0 && (
            <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex countItems justify-center font-semibold">
              {cartItems.length}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default SpecialCase;
