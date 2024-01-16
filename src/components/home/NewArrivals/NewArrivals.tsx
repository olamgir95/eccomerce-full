import React from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import { homeRetriever } from "../../../pages/Home/useReduxStore";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Box, Button, Container, Stack } from "@mui/material";
import { MonetizationOn } from "@mui/icons-material";
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
          {newProducts.map((productItem: Product) => {
            return <Products product={productItem} disable={false} />;
          })}
        </Slider>
      </Container>
    </div>
  );
};

export default NewArrivals;
