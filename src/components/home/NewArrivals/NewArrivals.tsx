import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import {
  actionDispatchHome,
  homeRetriever,
} from "../../../pages/Home/useReduxHome";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import { Product } from "../../../types/product";
import { settings } from "./SliderSetting";
import Products from "../Products/Product";
import ProductApiService from "../../../app/ApiServices/productApiService";
import { useDispatch } from "react-redux";

const NewArrivals = (props: any) => {
  const { newProducts } = useSelector(homeRetriever);
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  const { setNewProducts } = actionDispatchHome(useDispatch());

  useEffect(() => {
    const productService = new ProductApiService();

    productService
      .getNewProducts({
        order: "createdAt",
        limit: 10,
        page: 1,
      })
      .then((data) => {
        console.log("data", data);

        setNewProducts(data);
      })
      .catch((err) => console.log(err));
  }, [productRebuild]);

  return (
    <div className=" w-full pb-16">
      <Container className="">
        <Heading heading="New Arrivals" />
        <Slider {...settings}>
          {newProducts?.map((productItem: Product, index) => {
            const delay = 200 * index;
            return (
              <Products
                key={index}
                delay={delay}
                setProductRebuild={setProductRebuild}
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
