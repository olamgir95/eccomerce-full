import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProductSearchObj } from "../../../types/others";

interface ShopContextProps {
  targetSearchObj: ProductSearchObj;
  updateTargetSearchObj: (
    value?: string,
    category?: string,
    data?: { min?: number; max?: number }
  ) => void;
  setTargetSearchObj: React.Dispatch<React.SetStateAction<ProductSearchObj>>;
}

const ShopContext = createContext<ShopContextProps | undefined>(undefined);

interface ShopProviderProps {
  children: ReactNode;
}

export const ShopProvider: React.FC<ShopProviderProps> = ({ children }) => {
  const [targetSearchObj, setTargetSearchObj] = useState<ProductSearchObj>({
    page: 1,
    limit: 12,
    order: "createdAt",
    seller_mb_id: "",
    product_collection: "",
    product_color: "",
    product_price_min: 0,
    product_price_max: 0,
  });

  const updateTargetSearchObj = (
    value?: string,
    category?: string,
    data?: { min?: number; max?: number }
  ) => {
    if (category === "collection") {
      targetSearchObj.product_collection = value;
      targetSearchObj.product_color = "";
      //   targetSearchObj.page = 1;
    }
    if (category === "color") {
      targetSearchObj.product_color = value;
      targetSearchObj.product_collection = "";
      targetSearchObj.page = 1;
    }
    if (category === "price") {
      targetSearchObj.order = "product_price";
      targetSearchObj.product_price_min = data?.min;
      targetSearchObj.product_price_max = data?.max;
      targetSearchObj.product_collection = "";
      targetSearchObj.product_color = "";

      targetSearchObj.page = 1;
    }
    if (category === "brand") {
      targetSearchObj.product_collection = "";
      targetSearchObj.product_color = "";

      targetSearchObj.seller_mb_id = value;
      targetSearchObj.page = 1;
    }
    setTargetSearchObj({ ...targetSearchObj });
    if (category === "all") {
      setTargetSearchObj({ page: 1, limit: 12, order: "createdAt" });
    }
  };

  return (
    <ShopContext.Provider
      value={{ targetSearchObj, setTargetSearchObj, updateTargetSearchObj }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = (): ShopContextProps => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShopContext must be used within a ShopProvider");
  }

  return context;
};
