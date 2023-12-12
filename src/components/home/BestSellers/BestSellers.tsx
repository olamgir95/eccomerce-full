import React from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
} from "../../../assets/images/index";
import { ProductProps } from "../../../types/product";

const BestSellers: React.FC = () => {
  const products: ProductProps[] = [
    {
      _id: "1011",
      img: bestSellerOne,
      productName: "Flower Base",
      price: "35.00",
      color: "Blank and White",
      badge: true,
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
      quantity: 0,
    },
    {
      _id: "1012",
      img: bestSellerTwo,
      productName: "New Backpack",
      price: "180.00",
      color: "Gray",
      badge: false,
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
      quantity: 0,
    },
    {
      _id: "1013",
      img: bestSellerThree,
      productName: "Household materials",
      price: "25.00",
      color: "Mixed",
      badge: true,
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
      quantity: 0,
    },
    {
      _id: "1014",
      img: bestSellerFour,
      productName: "Travel Bag",
      price: "220.00",
      color: "Black",
      badge: false,
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
      quantity: 0,
    },
  ];

  return (
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {products.map((product) => (
          <Product
            key={product._id}
            _id={product._id}
            img={product.img}
            productName={product.productName}
            price={product.price}
            color={product.color}
            badge={product.badge}
            des={product.des}
            quantity={product.quantity}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
