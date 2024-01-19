import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { setAllProducts, setChosenProduct } from "./slice";
import { retrieveAllProducts, retrieveChosenProduct } from "./selector";
import { Product } from "../../types/product";

//redux slice
export const actionDispatch = (dispatch: Dispatch) => ({
  setAllProducts: (data: Product[]) => dispatch(setAllProducts(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

//redux selector
export const shopRetriever = createSelector(
  retrieveAllProducts,
  retrieveChosenProduct,

  (allProducts, chosenProduct) => ({
    allProducts,
    chosenProduct,
  })
);
