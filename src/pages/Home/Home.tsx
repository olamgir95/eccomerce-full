import React from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";

import { Container } from "@mui/material";

const Home = () => {
  return (
    <Container className="w-full mx-auto">
      <Banner />
      <BannerBottom />
    </Container>
  );
};

export default Home;
