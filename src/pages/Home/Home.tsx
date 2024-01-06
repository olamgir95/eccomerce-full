import React from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import YearProduct from "../../components/home/YearProduct/YearProduct";
import { Container } from "@mui/material";
import { TopBrands } from "../../components/home/TopBrands/TopBrands";

const Home = () => {
  return (
    <div>
      <Banner />
      <BannerBottom />
      <Container>
        <TopBrands />
        <NewArrivals />
        <BestSellers />
        <YearProduct />
        <SpecialOffers />
      </Container>
    </div>
  );
};

export default Home;
