import React from "react";
import Heading from "../Products/Heading";
import Products from "../Products/Product";
import { homeRetriever } from "../../../pages/Home/useReduxHome";
import { useSelector } from "react-redux";
import { Product } from "../../../types/product";
import { Container } from "@mui/material";

const BestSellers: React.FC = () => {
  const { trendProducts } = useSelector(homeRetriever);
  return (
    <div className="w-full pb-20">
      <Container>
        <Heading heading="Our Bestsellers" />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-4">
          {trendProducts?.map((productItem: Product) => {
            return <Products product={productItem} disable={true} />;
          })}
        </div>
      </Container>
    </div>
  );
};

export default BestSellers;
