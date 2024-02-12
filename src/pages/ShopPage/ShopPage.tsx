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
import { useCombinedContext } from "../../context/useCombinedContext";

const ShopPage = () => {
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  const { allProducts } = useSelector(shopRetriever);
  const { setAllProducts } = actionDispatch(useDispatch());
  const {
    targetSearchObj,
    setTargetSearchObj,
    setBrandName,
    handleBrandChange,
    brandName,
  } = useCombinedContext();
  const { setTopSellers } = actionDispatchHome(useDispatch());
  const { topSellers } = useSelector(homeRetriever);
  const { filter, handleNewSaleChange } = useCombinedContext();

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
  }, [targetSearchObj, brandName, productRebuild, filter]);

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
              {topSellers?.map((brand: Seller, index) => {
                const delay = 200 * index;
                return (
                  <button
                    onClick={() => {
                      handleBrandChange(brand?._id, "brand");
                      setBrandName(brand?.mb_nick);
                    }}
                    data-aos="zoom-in-left"
                    data-aos-delay={delay}
                    key={brand?._id}
                    className=" bg-white border-solid border-violet-500 border hover:text-violet-500 text-gray 
                  focus:cursor-default   focus:text-violet-600 focus:font-bold  font-bold py-2 px-4 rounded "
                  >
                    {brand?.mb_nick}
                  </button>
                );
              })}
              <div className="flex gap-5">
                <button
                  data-aos="zoom-in-left"
                  data-aos-delay={1200}
                  onClick={() => handleNewSaleChange("", "sale")}
                  className=" bg-white border-solid border-blue-500 border hover:text-blue-500 text-gray *:focus:cursor-default   focus:text-blue-600 focus:font-bold  font-bold py-1 px-3 rounded "
                >
                  Sale Products
                </button>
                <button
                  data-aos="zoom-in-left"
                  data-aos-delay={1400}
                  onClick={() => handleNewSaleChange("", "new")}
                  className=" bg-white border-solid border-blue-500 border hover:text-blue-500 text-gray focus:cursor-default   focus:text-blue-600 focus:font-bold  font-bold py-1 px-3 rounded "
                >
                  New Arrivals
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-evenly">
              {allProducts.slice(0, 12)?.map((productItem: Product) => {
                return (
                  <Products
                    product={productItem}
                    disable={false}
                    setProductRebuild={setProductRebuild}
                    filter={filter}
                  />
                );
              })}
            </div>
            <Stack className="flex justify-end items-center">
              {allProducts.length > 0 && allProducts.length % 12 === 0 ? (
                <Pagination
                  count={
                    targetSearchObj.page >= 3 ? targetSearchObj.page + 1 : 3
                  }
                  page={targetSearchObj.page}
                  renderItem={(item) => (
                    <PaginationItem
                      components={{
                        previous: ArrowBackIcon,
                        next:
                          targetSearchObj.page === 0
                            ? () => null
                            : ArrowForwardIcon, // Hide next button if page is 0
                      }}
                      {...item}
                      color="primary"
                    />
                  )}
                  onChange={handlePaginationChange}
                />
              ) : allProducts.length === 0 ? (
                <span className="font-normal text-xl mt-40">
                  No data available!
                </span>
              ) : (
                targetSearchObj.page > 1 && (
                  <div>
                    <Pagination
                      count={targetSearchObj.page}
                      page={targetSearchObj.page}
                      renderItem={(item) => (
                        <PaginationItem
                          components={{
                            previous: ArrowBackIcon,
                            next: () => null, // Hide the next button
                          }}
                          {...item}
                          color="primary"
                        />
                      )}
                      onChange={handlePaginationChange}
                      disabled={false}
                    />
                  </div>
                )
              )}
            </Stack>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShopPage;
