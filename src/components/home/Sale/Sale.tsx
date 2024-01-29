import React, { useEffect, useState } from "react";
import Heading from "../Products/Heading";
import Products from "../Products/Product";
import {
  actionDispatchHome,
  homeRetriever,
} from "../../../pages/Home/useReduxHome";
import { useSelector } from "react-redux";
import { Product } from "../../../types/product";
import { Container } from "@mui/material";
import ProductApiService from "../../../app/ApiServices/productApiService";
import { useDispatch } from "react-redux";

const Sale = (props: any) => {
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  const { saleProducts } = useSelector(homeRetriever);
  const { setSaleProducts } = actionDispatchHome(useDispatch());

  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getSaleProducts({
        order: "sale",
        limit: 10,
        page: 1,
      })
      .then((data) => {
        setSaleProducts(data);
      })
      .catch((err) => console.log(err));
  }, [productRebuild]);

  return (
    <div className="w-full pb-20" data-aos="zoom-out-left">
      <Container>
        <Heading heading="Our Best Discounts" />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-4">
          {saleProducts.slice(0, 4)?.map((productItem: Product) => {
            return (
              <Products
                setProductRebuild={setProductRebuild}
                product={productItem}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Sale;
