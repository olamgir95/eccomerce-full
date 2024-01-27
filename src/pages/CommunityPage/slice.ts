import { createSlice } from "@reduxjs/toolkit";
import { CommunityPageState } from "../../types/screen";

const initialState: CommunityPageState = {
  targetArticles: [],
};

const CommunityPageSlice = createSlice({
  name: "communityPage",
  initialState,
  reducers: {
    setTargetArticles: (state, action) => {
      state.targetArticles = action.payload;
    },
  },
});

export const { setTargetArticles } = CommunityPageSlice.actions;

export const CommunityPageReducer = CommunityPageSlice.reducer;
