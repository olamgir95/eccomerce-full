import { createSlice } from "@reduxjs/toolkit";
import { OrdersPageState } from "../../types/screen";

const initialState: OrdersPageState = {
  processOrders: [],
  finishedOrders: [],
};

const OrdersPageSlice = createSlice({
  name: "ordersPage",
  initialState,
  reducers: {
    setProcessOrders: (state, action) => {
      state.processOrders = action.payload;
    },
    setFinishedOrders: (state, action) => {
      state.finishedOrders = action.payload;
    },
  },
});

export const { setProcessOrders, setFinishedOrders } = OrdersPageSlice.actions;

export const OrdersPageReducer = OrdersPageSlice.reducer;
