import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { setAllProducts, setChosenProduct, setSaleProducts } from "./slice";
import {
  retrieveAllProducts,
  retrieveChosenProduct,
  retrieveSaleProducts,
} from "./selector";
import { Product } from "../../types/product";

//redux slice
export const actionDispatch = (dispatch: Dispatch) => ({
  setAllProducts: (data: Product[]) => dispatch(setAllProducts(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
  setSaleProducts: (data: Product[]) => dispatch(setSaleProducts(data)),
});

//redux selector
export const shopRetriever = createSelector(
  retrieveAllProducts,
  retrieveChosenProduct,
  retrieveSaleProducts,

  (allProducts, chosenProduct, saleProducts) => ({
    allProducts,
    chosenProduct,
    saleProducts,
  })
);
