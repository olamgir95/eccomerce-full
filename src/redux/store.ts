import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import reduxLogger from "redux-logger";
import { HomePageReducer } from "../pages/Home/slice";
import { ShopPageReducer } from "../pages/ShopPage/slice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,
    shopPage: ShopPageReducer,
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
