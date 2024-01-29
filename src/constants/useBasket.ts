import { useState } from "react";
import { CartItem } from "../types/others";
import { verifyMemberData } from "../app/ApiServices/verify";
import assert from "assert";
import { Definer } from "../lib/Definer";
import { sweetErrorHandling } from "../lib/sweetAlert";

const useBasket = () => {
  const cartJson: string | null = localStorage.getItem("cart_data");
  const currentCart = cartJson ? JSON.parse(cartJson) : [];
  const [cartItems, setCartItems] = useState<CartItem[]>(currentCart);

  const onAdd = async (product: any) => {
    try {
      assert.ok(verifyMemberData, Definer.auth_err1);

      const exist: any = cartItems?.find(
        (item: CartItem) => item?._id === product?._id
      );

      if (exist) {
        const cart_updated = cartItems?.map((item: CartItem) =>
          item._id === product._id
            ? { ...exist, quantity: exist.quantity + 1 }
            : item
        );
        setCartItems(cart_updated);
        localStorage.setItem("cart_data", JSON.stringify(cart_updated));
      } else {
        const new_item: CartItem = {
          _id: product._id,
          quantity: 1,
          price: product.product_price,
          sale_price: product.sale_price,
          image: product?.product_images[0],
          name: product.product_name,
        };
        console.log("cartitems", new_item);

        const cart_updated = [...cartItems, { ...new_item }];
        console.log("cartUpted", cart_updated);

        setCartItems(cart_updated);
        localStorage.setItem("cart_data", JSON.stringify(cart_updated));
      }
    } catch (err: any) {
      console.log(err.message);
      sweetErrorHandling(err).then();
    }
  };
  console.log("new", cartItems);

  const onRemove = (input: CartItem) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id
    );
    if (exist.quantity === 1) {
      const cartUpdate = cartItems.filter(
        (item: CartItem) => item._id !== input._id
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cart_data", JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity - 1 }
          : item
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cart_data", JSON.stringify(cartUpdate));
    }
  };

  const onDelete = (input: CartItem) => {
    const cartUpdate = cartItems.filter(
      (item: CartItem) => item._id !== input._id
    );
    setCartItems(cartUpdate);
    localStorage.setItem("cart_data", JSON.stringify(cartUpdate));
  };

  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cart_data");
  };

  return {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
  };
};

export default useBasket;
