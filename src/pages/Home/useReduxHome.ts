import { Dispatch, createSelector } from "@reduxjs/toolkit";
import {
  setNewProducts,
  setTopSellers,
  setSaleProducts,
  setNewEvents,
  setTrendArticles,
} from "./slice";
import {
  retrieveNewProducts,
  retrieveTopSellers,
  retrieveSaleProducts,
  retrieveNewEvents,
  retrieveTrendArticles,
} from "./selector";
import { Seller } from "../../types/user";
import { Product } from "../../types/product";
import { Event } from "../../types/event";
import { Article } from "../../types/Article";

//redux slice
export const actionDispatchHome = (dispatch: Dispatch) => ({
  setTopSellers: (data: Seller[]) => dispatch(setTopSellers(data)),
  setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
  setSaleProducts: (data: Product[]) => dispatch(setSaleProducts(data)),
  setNewEvents: (data: Event[]) => dispatch(setNewEvents(data)),
  setTrendArticles: (data: Article[]) => dispatch(setTrendArticles(data)),
});

//redux selector
export const homeRetriever = createSelector(
  retrieveTopSellers,
  retrieveNewProducts,
  retrieveSaleProducts,
  retrieveNewEvents,
  retrieveTrendArticles,
  (topSellers, newProducts, saleProducts, newEvents, trendArticles) => ({
    topSellers,
    newProducts,
    saleProducts,
    newEvents,
    trendArticles,
  })
);
