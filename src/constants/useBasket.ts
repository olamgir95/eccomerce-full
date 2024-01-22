import { useEffect, useState } from "react";
import { CartItem } from "../types/others";
import { Product } from "../types/product";

const useBasket = () => {
  const cartJson: string | null = localStorage.getItem("cart_data");
  const currentCart = cartJson ? JSON.parse(cartJson) : [];
  const [cartItems, setCartItems] = useState<CartItem[]>(currentCart);

  const onAdd = (product: any) => {
    console.log("product", product);

    const exist: any = cartItems?.find(
      (item: CartItem) => item?._id === product?._id
    );
    console.log("exist", exist);

    if (exist) {
      const cart_updated = cartItems?.map((item: CartItem) =>
        item._id === product._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
      console.log("cart", cartItems);
    } else {
      const new_item: CartItem = {
        _id: product._id,
        quantity: 1,
        price: product.product_price,
        image: product?.product_images[0],
        name: product.product_name,
      };
      console.log("cartitems", cartItems);

      const cart_updated = [...cartItems, { ...new_item }];
      console.log("new", cart_updated);

      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
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
