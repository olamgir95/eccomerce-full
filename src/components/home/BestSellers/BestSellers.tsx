import React from "react";
import Heading from "../Products/Heading";
import Products from "../Products/Product";
import { homeRetriever } from "../../../pages/Home/useReduxStore";
import { useSelector } from "react-redux";
import { Product } from "../../../types/product";

const BestSellers: React.FC = () => {
  const { trendProducts } = useSelector(homeRetriever);
  return (
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {trendProducts.map((productItem: Product) => {
          return <Products product={productItem} disable={true} />;
        })}
      </div>
    </div>
  );
};

export default BestSellers;
