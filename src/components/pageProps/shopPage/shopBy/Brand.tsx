import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";
import { homeRetriever } from "../../../../pages/Home/useReduxHome";
import { useSelector } from "react-redux";
import { Seller } from "../../../../types/user";
import { useShopContext } from "../useShopContext";

const Brand = () => {
  const [showBrands, setShowBrands] = useState(true);
  const { topSellers } = useSelector(homeRetriever);
  const { updateTargetSearchObj } = useShopContext();

  const handleBrandChange = (value: string, category: string) => {
    updateTargetSearchObj(value, category);
  };

  return (
    <div>
      <div
        onClick={() => setShowBrands(!showBrands)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Brand" icons={true} />
      </div>
      {showBrands && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {topSellers?.map((brand: Seller) => (
              <li
                onClick={() => handleBrandChange(brand?._id, "brand")}
                key={brand?._id}
                className="border-b-[1px] cursor-pointer border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
              >
                {brand?.mb_nick}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Brand;
