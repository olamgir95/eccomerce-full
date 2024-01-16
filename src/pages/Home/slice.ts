import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../types/screen";

const initialState: HomePageState = {
  topSellers: [],
  newProducts: [],
  trendProducts: [],
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
    setTrendProducts: (state, action) => {
      state.trendProducts = action.payload;
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
  setTrendProducts,
} = HomePageSlice.actions;

export const HomePageReducer = HomePageSlice.reducer;
