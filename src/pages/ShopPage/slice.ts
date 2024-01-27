import { createSlice } from "@reduxjs/toolkit";
import { ShopPageState } from "../../types/screen";

const initialState: ShopPageState = {
  allProducts: [],
  chosenProduct: null,
  saleProducts: [],
};

const ShopPageSlice = createSlice({
  name: "shopPage",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setSaleProducts: (state, action) => {
      state.saleProducts = action.payload;
    },
  },
});

export const { setAllProducts, setChosenProduct, setSaleProducts } =
  ShopPageSlice.actions;

export const ShopPageReducer = ShopPageSlice.reducer;
