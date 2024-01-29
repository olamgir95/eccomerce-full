import { createSlice } from "@reduxjs/toolkit";
import { ProductDetailPage } from "../../types/screen";

const initialState: ProductDetailPage = {
  comments: [],
};

const PrDetailPageSlice = createSlice({
  name: "productDetailPage",
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const { setComments } = PrDetailPageSlice.actions;

export const PrDetailPageReducer = PrDetailPageSlice.reducer;
