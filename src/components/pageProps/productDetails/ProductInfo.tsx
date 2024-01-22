import React from "react";
import { useDispatch } from "react-redux";
import { Product } from "../../../types/product";
import { colors } from "../../../constants/shopFilterCategories";
import { CheckCircleOutline } from "@mui/icons-material";
// import { addToCart } from "../../../redux/orebiSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
interface ProductProps {
  productInfo: Product | null;
}

const ProductInfo = ({ productInfo }: ProductProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo?.product_name}</h2>
      <p className="text-xl font-semibold">${productInfo?.product_price}</p>
      <p className="text-base text-lightText font-titleFont  ">
        {productInfo?.product_description}
      </p>
      <p className="text-sm">Be the first to leave a review.</p>
      <ul className="flex justify-start flex-col capitalize font-medium text-lg">
        {colors.map((color) => {
          if (color.title === productInfo?.product_color)
            return (
              <li className="flex gap-1 items-center">
                <span className="font-normal ">Colors:</span>
                <span className="font-bold">{productInfo?.product_color}</span>
                <span
                  style={{ backgroundColor: color.base }}
                  className={`w-4 h-4 border-gray-300 border-[1px] border-solid  `}
                ></span>
              </li>
            );
          else return null;
        })}
        <li>
          <CheckCircleIcon style={{ color: "green" }} /> Available:
          <span> in stock</span>
        </li>
        <li>
          <CheckCircleIcon style={{ color: "green" }} /> Category:
          <span> {productInfo?.product_collection}</span>
        </li>
        <li>
          <CheckCircleIcon style={{ color: "green" }} /> Shipping Area:
          <span> All over the world</span>
        </li>
        <li>
          <CheckCircleIcon style={{ color: "green" }} /> Shipping Fee:
          <span> Free</span>
        </li>
      </ul>
      <button
        // onClick={() =>
        //   dispatch(
        //     addToCart({
        //       _id: productInfo.id,
        //       productName: productInfo.productName,
        //       quantity: 1,
        //       img: productInfo.img,
        //       badge: productInfo.badge,
        //       price: productInfo.price,
        //       color: productInfo.color,
        //       des: "",
        //     })
        //   )
        // }
        className="w-full py-4 bg-orange-400 hover:bg-orange-500   rounded-md duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductInfo;
