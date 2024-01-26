import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import { TopBrands } from "../../components/home/TopBrands/TopBrands";
import Subscribe from "../../components/Subscribe/Subscribe";
import { useDispatch } from "react-redux";
import { actionDispatchHome } from "./useReduxHome";
import SellerApiService from "../../app/ApiServices/sellerApiService";
import TrendArticles from "../../components/home/TrendArticles/TrendArticles";
import ProductApiService from "../../app/ApiServices/productApiService";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import MemberApiService from "../../app/ApiServices/memberApiService";
import Events from "../Events/Events";
import HeaderBottom from "./../../components/home/Header/HeaderBottom";
import CommunityApiService from "../../app/ApiServices/communityApiService";
import Sale from "../../components/home/Sale/Sale";

const Home = () => {
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
  const { setTopSellers, setNewProducts, setNewEvents, setTrendArticles } =
    actionDispatchHome(useDispatch());

  useEffect(() => {
    const sellerService = new SellerApiService();
    const productService = new ProductApiService();
    const memberService = new MemberApiService();
    const communityService = new CommunityApiService();

    sellerService
      .getTopSellers({ order: "top", limit: 4 })
      .then((data) => {
        setTopSellers(data);
      })
      .catch((err) => console.log(err));

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

    communityService
      .getTargetArticles({
        bo_id: "all",
        page: 1,
        limit: 5,
        order: "art_views",
      })
      .then((data) => setTrendArticles(data))
      .catch((err) => console.log(err));
  }, [articlesRebuild]);

  return (
    <div>
      <HeaderBottom able={true} />
      <Banner />
      <BannerBottom />
      <TopBrands />
      <NewArrivals setProductRebuild={setArticlesRebuild} />
      <Sale />
      <Events />
      <TrendArticles setArticlesRebuild={setArticlesRebuild} />
      <Subscribe />
    </div>
  );
};

export default Home;
