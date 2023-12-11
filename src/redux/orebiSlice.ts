import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrebiState } from "../types/createSlice";
import { ProductProps } from "../types/product";

const initialState: OrebiState = {
  userInfo: [],
  products: [],
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductProps>) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action: PayloadAction<ProductProps>) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    drecreaseQuantity: (state, action: PayloadAction<ProductProps>) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item?.quantity === 1) {
        item.quantity = 1;
      } else {
        //@ts-ignore
        item.quantity--;
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
} = orebiSlice.actions;

export default orebiSlice.reducer;
