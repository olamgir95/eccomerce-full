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
import { useCombinedContext } from "../../../context/useCombinedContext";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { CssVarsProvider, IconButton } from "@mui/joy";

const Products = (props: any) => {
  const navigate = useNavigate();
  const { useBasket } = useCombinedContext();
  const { onAdd } = useBasket;
  const { product, setProductRebuild, filter } = props;
  const { pathname } = useLocation();
  const chosenProduct = (id: string) => {
    navigate(`/product/${id}`);
  };

  const targetLike = async (e: any, id: string) => {
    try {
      e.stopPropagation();
      assert.ok(verifyMemberData, Definer.auth_err1);
      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: id,
          group_type: "product",
        });
      assert.ok(like_result, Definer.general_err1);

      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLike, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };

  const image_path = `${serverApi}/${product?.product_images[0]}`;
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={props.delay}
      onClick={() => chosenProduct(product?._id)}
      className={
        pathname === "/"
          ? "w-full  relative group px-2 rounded-2xl"
          : "w-full max-w-[290px] relative group px-2"
      }
    >
      <div className="max-w-80 max-h-80 relative overflow-hidden rounded-2xl">
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
          {product?.sale_price ? (
            <Badge text="Sale" />
          ) : filter === "new" ? (
            <Badge text="New" />
          ) : (
            ""
          )}
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
              className="product_features relative pr-5"
              onClick={(e) => {
                targetLike(e, product?._id);
              }}
            >
              Add to Wish List
              <CssVarsProvider>
                <span>
                  <IconButton
                    aria-label="Like ninimal photography"
                    size="md"
                    variant="solid"
                    color="neutral"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      bottom: 0,
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,0.4)",
                    }}
                  >
                    {product?.me_liked[0]?.my_favorite ? (
                      <Favorite
                        style={{
                          fill: product?.me_liked[0]?.my_favorite
                            ? "red"
                            : "white",
                        }}
                      />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                </span>
              </CssVarsProvider>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full h-20 flex items-center justify-between px-4">
        <div className="flex flex-col">
          <h3 className="lg:text-base text-sm font-medium max-w-36">
            {product?.product_name}
          </h3>
          <p className="text-sm font-normal text-[#767676] capitalize">
            {product?.product_color}
          </p>
        </div>
        <div className="flex items-center flex-col">
          <div className="flex items-center gap-1">
            <div>{product?.product_likes ?? 0}</div>
            {product?.product_likes > 1 ? "likes" : "like"}
          </div>
          <span>
            <span
              className={
                product?.sale_price
                  ? "line-through text-gray-500"
                  : "text-primeColor text-lg font-medium"
              }
            >
              ${product?.product_price}
            </span>
            {product?.sale_price && (
              <p className="font-semibold ">
                <span className="text-red-600">${product?.sale_price}</span>
              </p>
            )}
          </span>
        </div>
      </div>
      {product?.sale_price && (
        <div className="absolute top-5 text-vividPink  font-semibold right-3 flex gap-1">
          15% <MdOutlineLabelImportant className="text-red-600 text-2xl" />
        </div>
      )}
    </div>
  );
};

export default Products;
