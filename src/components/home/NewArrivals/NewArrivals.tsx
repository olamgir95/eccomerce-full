import React from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import { homeRetriever } from "../../../pages/Home/useReduxHome";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import { Product } from "../../../types/product";
import { settings } from "./SliderSetting";
import Products from "../Products/Product";

const NewArrivals = () => {
  const { newProducts } = useSelector(homeRetriever);

  return (
    <div className="w-full pb-16">
      <Container>
        <Heading heading="New Arrivals" />
        <Slider {...settings}>
          {newProducts?.map((productItem: Product) => {
            return <Products product={productItem} disable={false} />;
          })}
        </Slider>
        <div className="flex justify-center">
          <button className="text-center mt-5 cursor-pointer opacity-85 hover:opacity-100 bg-primary hover:shadow-lg hover:shadow-yellow-300 hover: text-white py-1 px-5 rounded-md">
            View all
          </button>
        </div>
      </Container>
    </div>
  );
};

export default NewArrivals;
