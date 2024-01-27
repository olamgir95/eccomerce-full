import { createSelector } from "reselect";
import { AppRootState } from "../../types/screen";

const selectShopPage = (state: AppRootState) => state.shopPage;

export const retrieveAllProducts = createSelector(
  selectShopPage,
  (ShopPage) => ShopPage.allProducts
);

export const retrieveChosenProduct = createSelector(
  selectShopPage,
  (ShopPage) => ShopPage.chosenProduct
);

export const retrieveSaleProducts = createSelector(
  selectShopPage,
  (shopPage) => shopPage.saleProducts
);
