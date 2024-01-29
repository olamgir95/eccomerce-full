import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import useBasket from "../../constants/useBasket";
import { serverApi } from "../../lib/config";
import { CartItem } from "../../types/others";
import { useCombinedContext } from "../../context/useCombinedContext";

const ItemCard = ({ item }: any) => {
  const { useBasket } = useCombinedContext();
  const { onAdd, onRemove, onDelete } = useBasket;
  const image_path = `${serverApi}/${item?.image}`;

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <img className="w-32 h-32" src={image_path} alt="productImage" />
        <h1 className="font-titleFont font-semibold">{item?.name}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          <span
            className={
              item.sale_price
                ? " line-through text-gray-400"
                : "text-black mr-2"
            }
          >
            $ {item.price}
          </span>
          {item?.sale_price && (
            <span className="text-red-500 ml-2"> ${item.sale_price}</span>
          )}
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <span
            onClick={() => onRemove(item)}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
          <p>{item?.quantity}</p>
          <span
            onClick={() => onAdd(item)}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            +
          </span>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>$ {item?.sale_price ?? item?.price}</p>
        </div>
        <ImCross
          onClick={() => onDelete(item)}
          className="text-primeColor hover:text-red-500 duration-300 mr-4 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ItemCard;
