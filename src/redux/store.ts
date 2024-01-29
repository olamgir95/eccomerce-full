import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import reduxLogger from "redux-logger";
import { HomePageReducer } from "../pages/Home/slice";
import { ShopPageReducer } from "../pages/ShopPage/slice";
import { MemberPageReducer } from "../pages/MemberPage/slice";
import { CommunityPageReducer } from "../pages/CommunityPage/slice";
import { OrdersPageReducer } from "../pages/OrdersPage/slice";
import { PrDetailPageReducer } from "../pages/ProductDetails/slice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,
    shopPage: ShopPageReducer,
    memberPage: MemberPageReducer,
    communityPage: CommunityPageReducer,
    ordersPage: OrdersPageReducer,
    productDetailPage: PrDetailPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
