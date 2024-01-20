import React, { useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import { Container } from "@mui/material";
import { TopBrands } from "../../components/home/TopBrands/TopBrands";
import Subscribe from "../../components/Subscribe/Subscribe";
import { useDispatch } from "react-redux";
import { actionDispatchHome } from "./useReduxHome";
import SellerApiService from "../../app/ApiServices/sellerApiService";
import TrendArticles from "../../components/home/TrendArticles/TrendArticles";
import ProductApiService from "../../app/ApiServices/productApiService";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import MemberApiService from "../../app/ApiServices/memberApiService";
import Events from "../Events/Events";
import HeaderBottom from "./../../components/home/Header/HeaderBottom";

const Home = () => {
  const {
    setTopSellers,
    setNewProducts,
    setTrendProducts,
    setNewEvents,
    setTrendArticles,
  } = actionDispatchHome(useDispatch());

  //selector: store => store
  useEffect(() => {
    // backend data request =>
    const sellerService = new SellerApiService();
    const productService = new ProductApiService();
    const memberService = new MemberApiService();
    sellerService
      .getTopSellers({ order: "top", limit: 4 })
      .then((data) => {
        setTopSellers(data);
      })
      .catch((err) => console.log(err));

    productService
      .getNewProducts({
        order: "createdAt",
        limit: 5,
        page: 1,
      })
      .then((data) => {
        console.log("data", data);

        setNewProducts(data);
      })
      .catch((err) => console.log(err));

    productService
      .getTrendProducts({
        order: "product_likes",
        limit: 4,
        page: 1,
      })
      .then((data) => {
        console.log("data", data);

        setTrendProducts(data);
      })
      .catch((err) => console.log(err));

    memberService
      .getNewEvents({
        order: "event_views",
        limit: 4,
        page: 1,
      })
      .then((data) => {
        console.log("data", data);

        setNewEvents(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <HeaderBottom able={true} />
      <Banner />
      <BannerBottom />
      <TopBrands />
      <NewArrivals />
      <BestSellers />
      <Events />
      <TrendArticles />
      <Subscribe />
    </div>
  );
};

export default Home;
