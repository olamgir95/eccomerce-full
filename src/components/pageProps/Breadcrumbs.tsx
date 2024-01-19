import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useLocation } from "react-router-dom";

interface BreadcrumbsProps {
  prevLocation?: string;
  title: string;
  brandName?: string;
}

const Breadcrumbs = ({ prevLocation, title, brandName }: BreadcrumbsProps) => {
  const location = useLocation();
  const [locationPath, setLocationPath] = useState("");
  useEffect(() => {
    setLocationPath(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <Container sx={{ display: "flex", flexDirection: "row" }}>
      <div className="w-full py-10 xl:py-10 flex flex-col gap-3">
        <h1 className="text-5xl text-primeColor font-titleFont font-bold">
          {title}
        </h1>
        <p className="text-sm font-normal text-lightText capitalize flex items-center">
          <span> {prevLocation === "" ? "Home" : prevLocation}</span>

          <span className="px-1">
            <HiOutlineChevronRight />
          </span>
          <span className="capitalize font-semibold text-primeColor">
            {locationPath}
          </span>
        </p>
      </div>
      <h1>{brandName}</h1>
    </Container>
  );
};

export default Breadcrumbs;
