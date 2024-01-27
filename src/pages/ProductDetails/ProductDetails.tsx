import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import { Badge, Button, Checkbox, Container } from "@mui/material";
import { actionDispatch, shopRetriever } from "../ShopPage/useReduxShop";
import { useDispatch } from "react-redux";
import { Product } from "../../types/product";
import ProductApiService from "../../app/ApiServices/productApiService";
import { useSelector } from "react-redux";
import { verifyMemberData } from "../../app/ApiServices/verify";
import { Definer } from "../../lib/Definer";
import assert from "assert";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import MemberApiService from "../../app/ApiServices/memberApiService";
import { serverApi } from "../../lib/config";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const ProductDetails = () => {
  let { id } = useParams<{ id: string }>();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  const { setChosenProduct, setSaleProducts } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(shopRetriever);

  const productRelatedProcess = async () => {
    try {
      const productService = new ProductApiService();
      const product: Product = await productService.getChosenProduct(id);
      setChosenProduct(product);
    } catch (err: any) {
      console.log(`ERROR ::: productRelatedProcess, ${err.message}`);
    }
  };

  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getSaleProducts({
        order: "sale",
        limit: 10,
        page: 1,
      })
      .then((data) => {
        setSaleProducts(data);
      })
      .catch((err) => console.log(err));
    productRelatedProcess().then();
  }, [productRebuild]);

  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(verifyMemberData, Definer.auth_err1);
      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: "product",
        });
      assert.ok(like_result, Definer.general_err1);
      await sweetTopSmallSuccessAlert("success", 700, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeProductTop, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="w-full bg-gray-100 mx-auto border-b-[1px] border-b-gray-300 bg-cover bg-center pr_detail_container">
      <Container>
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" />
        </div>
        <div className="w-full bg-transparent backdrop-blur-md  grid grid-cols-1 md:grid-cols-3 xl:grid-cols-7 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full col-span-1">
            <ProductsOnSale setProductRebuild={setProductRebuild} />
          </div>
          <div
            className=" product_detail "
            style={{
              backgroundImage: `url(${serverApi}/${chosenProduct?.product_images[0]})`,
            }}
          >
            <Button className="like_view_btn" sx={{ left: "36px" }}>
              <Badge
                badgeContent={chosenProduct?.product_likes}
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Checkbox
                  {...label}
                  icon={<FavoriteBorder style={{ color: "white" }} />}
                  id={chosenProduct?._id}
                  onClick={targetLikeProduct}
                  checkedIcon={<Favorite style={{ color: "red" }} />}
                  checked={
                    chosenProduct?.me_liked &&
                    chosenProduct?.me_liked[0]?.my_favorite
                      ? true
                      : false
                  }
                />
              </Badge>
            </Button>
            <Button
              className="like_view_btn cursor-no-drop"
              sx={{ right: "36px" }}
            >
              <Badge
                badgeContent={chosenProduct?.product_views}
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Checkbox
                  icon={<RemoveRedEyeIcon style={{ color: "white" }} />}
                  checkedIcon={<RemoveRedEyeIcon style={{ color: "white" }} />}
                />
              </Badge>
            </Button>
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-3 p-4 xl:p-8 flex flex-col justify-center">
            <ProductInfo productInfo={chosenProduct} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetails;
