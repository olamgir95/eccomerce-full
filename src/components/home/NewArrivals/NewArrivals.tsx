import React from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import { homeRetriever } from "../../../pages/Home/useReduxHome";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import { Product } from "../../../types/product";
import { settings } from "./SliderSetting";
import Products from "../Products/Product";

const NewArrivals = (props: any) => {
  const { newProducts } = useSelector(homeRetriever);

  return (
    <div className="w-full pb-16">
      <Container>
        <Heading heading="New Arrivals" />
        <Slider {...settings}>
          {newProducts?.map((productItem: Product, index) => {
            const delay = 200 * index;
            return (
              <Products
                delay={delay}
                setProductRebuild={props.setProductRebuild}
                product={productItem}
                filter={"new"}
              />
            );
          })}
        </Slider>
      </Container>
    </div>
  );
};

export default NewArrivals;
