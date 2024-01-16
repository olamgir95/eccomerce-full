import React, { useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";

import { Container } from "@mui/material";
import { TopBrands } from "../../components/home/TopBrands/TopBrands";
import Subscribe from "../../components/Subscribe/Subscribe";
import { useDispatch } from "react-redux";
import { actionDispatch } from "./useReduxStore";
import SellerApiService from "../../app/ApiServices/sellerApiService";
import TrendArticles from "../../components/home/TrendArticles/TrendArticles";

const Home = () => {
  const {
    setTopSellers,
    setNewProducts,
    setTrendProducts,
    setNewEvents,
    setTrendArticles,
  } = actionDispatch(useDispatch());

  //selector: store => store
  useEffect(() => {
    // backend data request =>
    const sellerService = new SellerApiService();

    sellerService
      .getTopSellers()
      .then((data) => {
        setTopSellers(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Banner />
      <BannerBottom />
      <Container>
        <TopBrands />
        <TrendArticles />
      </Container>
      <Subscribe />
    </div>
  );
};

export default Home;
