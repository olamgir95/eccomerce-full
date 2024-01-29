import { createSelector } from "reselect";
import { AppRootState } from "../../types/screen";

const selectProductDetail = (state: AppRootState) => state.productDetailPage;

export const retrieveComments = createSelector(
  selectProductDetail,
  (productDetailPage) => productDetailPage.comments
);
