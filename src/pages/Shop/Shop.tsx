import React, { useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
// import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import { Container } from "@mui/material";
import ShopBanner from "./ShopBanner";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const itemsPerPageFromBanner = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
  };

  return (
    <div>
      <ShopBanner />
      <Container>
        <Breadcrumbs title="Products" />

        <div className="w-full h-full flex pb-20 gap-10">
          <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
            <ShopSideNav />
          </div>
          <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
            <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
