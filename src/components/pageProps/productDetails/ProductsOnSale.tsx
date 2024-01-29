import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { useNavigate } from "react-router-dom";
import { shopRetriever } from "../../../pages/ShopPage/useReduxShop";

const ProductsOnSale = (props: any) => {
  const navigate = useNavigate();
  const chosenProduct = (id: string) => {
    navigate(`/product/${id}`);
    props.setProductRebuild(new Date());
  };
  const { saleProducts } = useSelector(shopRetriever);

  return (
    <div className="overflow-x-auto max-h-[500px] border-r border-gray-300 ">
      <h3 className="font-titleFont text-xl overflow-y-hidden  font-semibold mb-6 underline underline-offset-4 mt-5 decoration-[1px]">
        Products on sale
      </h3>
      <div className="flex flex-col gap-2  whitespace-nowrap overflow-x-auto">
        {saleProducts?.map((item) => {
          const image_path = `${serverApi}/${item?.product_images[0]}`;
          return (
            <div
              key={item._id}
              onClick={() => chosenProduct(item?._id)}
              className="flex items-center hover:bg-gray-300 cursor-pointer h-[113px]  gap-4 border-b-[1px] border-b-gray-300 py-2"
            >
              <div className="w-2/5">
                <img
                  className="w-full bg-center bg-cover"
                  src={image_path}
                  alt={image_path}
                />
              </div>
              <div className="flex w-3/5 flex-col gap-2 font-titleFont lg:text-xs text-[10px]">
                <p className=" font-medium ">
                  {item?.product_name.split(" ").slice(0, 2).join(" ")}
                </p>
                <span className="flex gap-2">
                  <span
                    className={
                      item?.sale_price
                        ? "line-through text-gray-500"
                        : "text-primeColor text-lg font-medium"
                    }
                  >
                    ${item?.product_price}
                  </span>
                  {item?.sale_price && (
                    <p className="font-semibold ">
                      <span className="text-red-600">${item?.sale_price}</span>
                    </p>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsOnSale;
