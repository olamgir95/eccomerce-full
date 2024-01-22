import { createSelector } from "reselect";
import { AppRootState } from "../../types/screen";

const selectMemberPage = (state: AppRootState) => state.memberPage;

export const retrieveChosenMember = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.chosenMember
);

export const retrieveChosenMemberArticles = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.chosenMemberArticles
);

export const retrieveChosenSingleArticle = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.chosenSingleArticle
);
export const retrieveMemberFollowers = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.memberFollowers
);
export const retrieveMemberFollowings = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.memberFollowings
);
