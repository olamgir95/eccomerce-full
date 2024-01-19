import React from "react";
import Category from "./shopBy/Category";
import Color from "./shopBy/Color";
import Price from "./shopBy/Price";

const ShopSideNav = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category />
      <Color />
      <Price />
    </div>
  );
};

export default ShopSideNav;
