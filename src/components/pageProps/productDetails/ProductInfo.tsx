import React from "react";
import { Product } from "../../../types/product";
import { colors } from "../../../constants/shopFilterCategories";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useCombinedContext } from "../../../context/useCombinedContext";
import { ShoppingCart } from "@mui/icons-material";
interface ProductProps {
  productInfo: Product | null;
}

const ProductInfo = ({ productInfo }: ProductProps) => {
  const { useBasket } = useCombinedContext();
  const { onAdd } = useBasket;
  return (
    <div className="flex flex-col gap-5 ">
      <h2 className="text-4xl font-semibold">{productInfo?.product_name}</h2>
      <span className="flex gap-2">
        <span
          className={
            productInfo?.sale_price
              ? "line-through text-gray-500"
              : " xl:text-xl lg:text-lg text-base font-semibold"
          }
        >
          ${productInfo?.product_price}
        </span>
        {productInfo?.sale_price && (
          <p className="font-semibold ">
            <span className="text-red-600">${productInfo?.sale_price}</span>
          </p>
        )}
      </span>
      <p
        className="xl:text-sm text-lightText font-titleFont  first-line:tracking-widest
  first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900
  first-letter:mr-3 first-letter:float-left lg:text-xs text-[10px]"
      >
        {productInfo?.product_description}
      </p>
      <ul className="flex justify-start flex-col capitalize font-medium text-lg">
        <li className="flex gap-4">
          {colors.map((color) => {
            if (color.title === productInfo?.product_color)
              return (
                <li className="flex gap-1 items-center">
                  <span className="font-normal ">Colors:</span>
                  <span className="font-bold">
                    {productInfo?.product_color}
                  </span>
                  <span
                    style={{ backgroundColor: color.base }}
                    className={`w-4 h-4 border-gray-300 border-[1px] border-solid  `}
                  ></span>
                </li>
              );
            else return null;
          })}
          <span>
            Product size:
            <span className=" capitalize italic text-gray-600">
              {productInfo?.product_size}
            </span>
          </span>
        </li>

        <li>
          <CheckCircleIcon style={{ color: "green" }} /> Available:
          <span className="italic text-gray-600"> in stock</span>
        </li>
        <li>
          <CheckCircleIcon style={{ color: "green" }} /> Category:
          <span className="italic text-gray-600">
            {" "}
            {productInfo?.product_collection}
          </span>
        </li>
        <li>
          <CheckCircleIcon style={{ color: "green" }} /> Shipping Area:
          <span className="italic text-gray-600"> All over the world</span>
        </li>
        <li>
          <CheckCircleIcon style={{ color: "green" }} /> Shipping Fee:
          <span className="italic text-gray-600"> Free</span>
        </li>
      </ul>
      <button
        onClick={() => {
          onAdd(productInfo);
        }}
        className="w-full py-4 bg-orange-400 hover:bg-orange-500   rounded-md duration-300 text-white text-lg font-titleFont"
      >
        <ShoppingCart /> Add to Cart
      </button>
    </div>
  );
};

export default ProductInfo;
