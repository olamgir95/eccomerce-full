import { createSlice } from "@reduxjs/toolkit";
import { MemberPageState } from "../../types/screen";

const initialState: MemberPageState = {
  chosenMember: null,
  chosenMemberArticles: [],
  chosenSingleArticle: null,
  memberFollowers: [],
  memberFollowings: [],
};

const MemberPageSlice = createSlice({
  name: "memberPage",
  initialState,
  reducers: {
    setChosenMember: (state, action) => {
      state.chosenMember = action.payload;
    },
    setChosenMemberArticles: (state, action) => {
      state.chosenMemberArticles = action.payload;
    },
    setChosenSingleArticle: (state, action) => {
      state.chosenSingleArticle = action.payload;
    },
    setMemberFollowers: (state, action) => {
      state.memberFollowers = action.payload;
    },
    setMemberFollowings: (state, action) => {
      state.memberFollowings = action.payload;
    },
  },
});

export const {
  setChosenMember,
  setChosenMemberArticles,
  setMemberFollowings,
  setMemberFollowers,
  setChosenSingleArticle,
} = MemberPageSlice.actions;

export const MemberPageReducer = MemberPageSlice.reducer;
