import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import { Container, Pagination, PaginationItem, Stack } from "@mui/material";
import ShopBanner from "./ShopBanner";
import ProductApiService from "../../app/ApiServices/productApiService";
import { useDispatch } from "react-redux";
import { actionDispatch, shopRetriever } from "./useReduxShop";
import { useSelector } from "react-redux";
import Products from "../../components/home/Products/Product";
import { Product } from "../../types/product";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SellerApiService from "../../app/ApiServices/sellerApiService";
import { actionDispatchHome, homeRetriever } from "../Home/useReduxHome";
import { Seller } from "../../types/user";
import HeaderBottom from "./../../components/home/Header/HeaderBottom";
import { useCombinedContext } from "../../constants/useCombinedContext";

const ShopPage = () => {
  const { allProducts } = useSelector(shopRetriever);
  const { setAllProducts, setChosenProduct } = actionDispatch(useDispatch());
  const {
    targetSearchObj,
    setTargetSearchObj,
    setBrandName,
    handleBrandChange,
    brandName,
  } = useCombinedContext();
  const { setTopSellers } = actionDispatchHome(useDispatch());
  const { topSellers } = useSelector(homeRetriever);

  useEffect(() => {
    const productService = new ProductApiService();
    const sellerService = new SellerApiService();
    productService
      .getAllProducts(targetSearchObj)
      .then((data) => setAllProducts(data))
      .catch((err) => console.log(err));

    sellerService
      .getTopSellers({ order: "all", limit: 10 })
      .then((data) => {
        setTopSellers(data);
      })
      .catch((err) => console.log(err));
  }, [targetSearchObj, brandName]);

  const handlePaginationChange = (event: any, value: number) => {
    targetSearchObj.page = value;
    setTargetSearchObj({ ...targetSearchObj });
  };

  return (
    <div>
      <ShopBanner />
      <HeaderBottom able={false} />
      <Container>
        <Breadcrumbs title="Products" brandName={brandName} />
        <div className="w-full h-full flex pb-20 gap-10">
          <div className="w-[15%] lgl:w-[20%] hidden mdl:inline-flex h-full">
            <ShopSideNav />
          </div>
          <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
            <div className="flex  items-center gap-3">
              {topSellers?.map((brand: Seller) => (
                <button
                  onClick={() => {
                    handleBrandChange(brand?._id, "brand");
                    setBrandName(brand?.mb_nick);
                  }}
                  key={brand?._id}
                  className=" bg-white hover:bg-blue-500 text-gray focus:cursor-default  hover:text-white focus:text-white focus:bg-blue-500 font-bold py-2 px-4 rounded "
                >
                  {brand?.mb_nick}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-evenly">
              {allProducts?.map((productItem: Product) => {
                return (
                  <Products
                    product={productItem}
                    disable={false}
                    setBrandname={setBrandName}
                  />
                );
              })}
            </div>
            <Stack className="flex justify-end items-center">
              <Pagination
                count={
                  targetSearchObj?.page >= 3 ? targetSearchObj?.page + 2 : 3
                }
                page={targetSearchObj.page}
                renderItem={(item) => (
                  <PaginationItem
                    components={{
                      previous: ArrowBackIcon,
                      next: ArrowForwardIcon,
                    }}
                    {...item}
                    color="primary"
                  />
                )}
                onChange={handlePaginationChange}
              />
            </Stack>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShopPage;
