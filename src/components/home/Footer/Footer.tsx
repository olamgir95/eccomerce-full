import React from "react";
import footerLogo from "../../../assets/images/logo.png";
import Banner from "../../../assets/images/footer-pattern.jpg";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";
import { navBarList } from "../../../constants/navbar";
import { verifyMemberData } from "../../../app/ApiServices/verify";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const Footer = () => {
  const { pathname } = useLocation();
  console.log("pathnaME", pathname);

  const feature = [
    "Home Harmony",
    "Elegance Enclave",
    "Design Delights",
    "Stylish Spaces",
    "Interior Inspirations",
    "Comfort Corners",
    "Chic Dwellings",
    "Modern Classics",
  ];

  return (
    <div style={BannerImg} className="text-white pt-10 ">
      <div data-aos="zoom-in" className="container custom-scroll-container ">
        <div className="md:grid grid-cols-4 pb-44 pt-5 px-10">
          <div className="py-8 px-4 col-span-2">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              <img src={footerLogo} alt="" className="max-w-[50px]" />
              Shopsy
            </h1>
            <div className="grid grid-cols-2 gap-5 items-start text-sm font-bold">
              {feature.map((vl, index) => {
                return (
                  <p className="" key={index}>
                    {vl}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="col-span-1">
            <div>
              <div className="py-9 px-4">
                <h1 className="text-xl text-center md:text-3xl font-bold sm:text-left mb-5">
                  Links
                </h1>
                <ul className="grid grid-cols-2 gap-5">
                  {navBarList?.map(({ link, title }) => {
                    if (!verifyMemberData && title === "My page") {
                      return null;
                    }

                    if (
                      (verifyMemberData && title === "Sign In") ||
                      (verifyMemberData && title === "Sign Up")
                    ) {
                      return null;
                    }

                    return (
                      <li
                        className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                        key={title}
                      >
                        <span>{title}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* social links */}
          </div>
          <div className="py-9 col-span-1">
            <div className="flex items-center gap-10">
              <a href="#">
                <FaInstagram className="text-3xl" />
              </a>
              <a href="#">
                <FaFacebook className="text-3xl" />
              </a>
              <a href="https://www.linkedin.com/in/olamgir-ollomurodov-228571270/">
                <FaLinkedin className="text-3xl" />
              </a>
              <a href="https://github.com/olamgir95">
                <FaGithub className="text-3xl" />
              </a>
            </div>
            <div className="mt-10">
              <div className="flex items-center gap-3">
                <FaLocationArrow />
                <p>Suwon, Gyeonggi-do South Korea</p>
              </div>
              <div className="flex items-center gap-3 mt-10">
                <FaMobileAlt />
                <p>010-4042-5681</p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-end text-gray-700">
          ©2024 shopsy. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
