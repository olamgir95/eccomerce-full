import { createSelector } from "reselect";
import { AppRootState } from "../../types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveTopSellers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topSellers
);

export const retrieveNewProducts = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newProducts
);

export const retrieveSaleProducts = createSelector(
  selectHomePage,
  (HomePage) => HomePage.saleProducts
);

export const retrieveNewEvents = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newEvents
);

export const retrieveTrendArticles = createSelector(
  selectHomePage,
  (HomePage) => HomePage.trendArticles
);
