import { createSlice } from "@reduxjs/toolkit";
import { ShopPageState } from "../../types/screen";

const initialState: ShopPageState = {
  allProducts: [],
  chosenProduct: null,
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
  },
});

export const { setAllProducts, setChosenProduct } = ShopPageSlice.actions;

export const ShopPageReducer = ShopPageSlice.reducer;
