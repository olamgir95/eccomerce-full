import React, { useRef } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useLocation, useNavigate } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { verifyMemberData } from "../../../app/ApiServices/verify";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../../app/ApiServices/memberApiService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useCombinedContext } from "../../../constants/useCombinedContext";

const Products = (props: any) => {
  const navigate = useNavigate();
  const { useBasket } = useCombinedContext();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket;
  const { product, disable } = props;
  const { pathname } = useLocation();
  const refs: any = useRef([]);
  const chosenProduct = (id: string) => {
    navigate(`/product/${id}`);
  };

  const targetLike = async (e: any, id: string) => {
    try {
      assert.ok(verifyMemberData, Definer.auth_err1);
      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: id,
          group_type: "product",
        });
      assert.ok(like_result, Definer.general_err1);

      if (like_result.like_status > 0) {
        e.target.style.fill = "red";
        refs.current[like_result.like_ref_id].innerHTML++;
      } else {
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
      }
      console.log("ref test", refs.current);
    } catch (err: any) {
      console.log("targetLike, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };

  const image_path = `${serverApi}/${product?.product_images[0]}`;
  return (
    <div
      onClick={() => chosenProduct(product?._id)}
      className={
        pathname === "/"
          ? "w-full  relative group px-2 rounded-2xl"
          : "w-full max-w-[290px] relative group px-2"
      }
    >
      <div className="max-w-80 max-h-80 relative overflow-y-hidden rounded-2xl">
        <div>
          <Image
            className={
              product?.product_name === "Closet Wardrobe"
                ? "scale-90 hover:scale-100 w-full  h-[318px] transition-all"
                : "w-full bg-cover  h-[318px] hover:scale-110  transition-all"
            }
            imgSrc={image_path}
          />
        </div>
        <div className="absolute top-4 left-3">
          {!disable && <Badge text="New" />}
        </div>
        <div className="w-full h-28 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li
              className="product_features"
              onClick={(e) => {
                e.stopPropagation();
                onAdd(product);
              }}
            >
              Add to Cart
              <span>
                <FaShoppingCart className="text-primary" />
              </span>
            </li>
            <li
              onClick={() => chosenProduct(product?._id)}
              className="product_features"
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant className="text-red-500 text-xl" />
              </span>
            </li>
            <li
              className="product_features"
              onClick={(e) => {
                targetLike(e, product?._id);
                e.stopPropagation();
              }}
            >
              Add to Wish List
              <span>
                <BsSuitHeartFill fill="red" />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full h-20 flex items-center justify-between px-4">
        <div className="flex flex-col">
          <h3 className="text-base font-medium">{product?.product_name}</h3>
          <p className="text-sm font-normal text-[#767676] capitalize">
            {product?.product_color}
          </p>
        </div>
        <div className="flex items-center flex-col">
          <div className="flex items-center gap-1">
            <div ref={(element) => (refs.current[product?._id] = element)}>
              {product?.mb_likes ?? 0}
            </div>
            {product?.mb_likes > 1 ? "likes" : "like"}
          </div>
          <span className="text-primeColor text-lg font-medium">
            ${product?.product_price}
          </span>
        </div>
      </div>
      {disable && (
        <div className="absolute top-1 right-3">
          <MdOutlineLabelImportant className="text-red-500 text-2xl" />
        </div>
      )}
    </div>
  );
};

export default Products;
