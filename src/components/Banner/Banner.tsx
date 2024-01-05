import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
  bannerImgFour,
} from "../../assets/images";
import Image from "../designLayouts/Image";
import { Container } from "@mui/material";

const Banner = () => {
  const [dotActive, setDocActive] = useState<number>(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev: number, next: number) => {
      setDocActive(next);
    },
    appendDots: (dots: JSX.Element) => (
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "50%",
          transform: "rotateZ(-90deg)",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                color: "#262626",
                borderRight: "3px #262626 solid",
                padding: "8px 0",
                cursor: "pointer",
                // transform: "rotateY(90deg)",
              }
            : {
                width: "30px",
                color: "transparent",
                borderRight: "3px white solid",
                padding: "8px 0",
                cursor: "pointer",
              }
        }
      >
        0{i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots: JSX.Element) => (
            <div
              style={{
                position: "absolute",
                bottom: "5%",
                left: "50%",
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: (i: number) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "25px",
                      color: "#262626",
                      borderRight: "3px #262626 solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
                  : {
                      width: "25px",
                      color: "transparent",
                      borderRight: "3px white solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };
  return (
    <div className="p-0">
      <Slider {...settings}>
        <Link to="/offer">
          <div>
            <Image className={"h-[800px] w-full"} imgSrc={bannerImgOne} />
          </div>
        </Link>
        <Link to="/offer">
          <div>
            <Image className={"h-[800px] w-full"} imgSrc={bannerImgTwo} />
          </div>
        </Link>
        <Link to="/offer">
          <div>
            <Image className={"h-[800px] w-full"} imgSrc={bannerImgThree} />
          </div>
        </Link>
        <Link to="/offer">
          <div>
            <Image className={"h-[800px] w-full"} imgSrc={bannerImgFour} />
          </div>
        </Link>
      </Slider>
    </div>
  );
};

export default Banner;
