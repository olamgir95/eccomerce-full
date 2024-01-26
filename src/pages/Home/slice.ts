import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../types/screen";

const initialState: HomePageState = {
  topSellers: [],
  newProducts: [],
  saleProducts: [],
  newEvents: [],
  trendArticles: [],
};

const HomePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setTopSellers: (state, action) => {
      state.topSellers = action.payload;
    },
    setNewProducts: (state, action) => {
      state.newProducts = action.payload;
    },
    setSaleProducts: (state, action) => {
      state.saleProducts = action.payload;
    },
    setNewEvents: (state, action) => {
      state.newEvents = action.payload;
    },
    setTrendArticles: (state, action) => {
      state.trendArticles = action.payload;
    },
  },
});

export const {
  setTopSellers,
  setNewProducts,
  setTrendArticles,
  setNewEvents,
  setSaleProducts,
} = HomePageSlice.actions;

export const HomePageReducer = HomePageSlice.reducer;
