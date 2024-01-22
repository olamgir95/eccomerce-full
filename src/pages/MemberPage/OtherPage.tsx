import {
  Box,
  Container,
  Stack,
  Tab,
  Pagination,
  PaginationItem,
  Button,
  Tabs,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TabPanel } from "@mui/lab";
import {
  ArticleOutlined,
  Facebook,
  Groups2Outlined,
  Instagram,
  PersonAddOutlined,
  Telegram,
  YouTube,
} from "@mui/icons-material";
import MemberPosts from "./memberPosts";
import MemberFollowers from "./memberFollowers";
import MemberFollowings from "./memberFollowings";
import TViewer from "./TViewer";
import {
  retrieveChosenMember,
  retrieveChosenMemberArticles,
  retrieveChosenSingleArticle,
} from "./selector";
import {
  setChosenMember,
  setChosenMemberArticles,
  setChosenSingleArticle,
} from "./slice";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import CommunityApiService from "../../app/ApiServices/communityApiService";
import { Member } from "../../types/user";
import { Article, SearchMemberArticlesObj } from "../../types/Article";
import { verifyMemberData } from "../../app/ApiServices/verify";
import MemberApiService from "../../app/ApiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import { Definer } from "../../lib/Definer";
import FollowApiService from "../../app/ApiServices/followApiService";
import assert from "assert";
import { useNavigate } from "react-router-dom";
import { serverApi } from "../../lib/config";

//redux slice
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
  setChosenMemberArticles: (data: Article[]) =>
    dispatch(setChosenMemberArticles(data)),
  setChosenSingleArticle: (data: Article) =>
    dispatch(setChosenSingleArticle(data)),
});

//redux selector
const MemberRetriever = createSelector(
  retrieveChosenMember,
  retrieveChosenMemberArticles,
  retrieveChosenSingleArticle,
  (chosenMember, chosenMemberArticles, chosenSingleArticle) => ({
    chosenMember,
    chosenMemberArticles,
    chosenSingleArticle,
  })
);

const OtherPage = (props: any) => {
  const navigate = useNavigate();
  const { chosen_mb_id, chosen_art_id } = props;
  console.log("chosen", chosen_mb_id);
  console.log("chosen", chosen_art_id);

  const { setChosenMember, setChosenMemberArticles, setChosenSingleArticle } =
    actionDispatch(useDispatch());
  const { chosenMember, chosenMemberArticles, chosenSingleArticle } =
    useSelector(MemberRetriever);
  // Initializations
  const [value, setValue] = useState("1");
  const [memberArticleSearchObj, setMemberArticleSearchObj] =
    useState<SearchMemberArticlesObj>({
      mb_id: chosen_mb_id,
      page: 1,
      limit: 4,
    });
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
  const [followRebuild, setFollowRebuild] = useState<boolean>(false);

  useEffect(() => {
    if (chosen_mb_id === verifyMemberData?._id) {
      navigate("/member-page");
    }

    const communityService = new CommunityApiService();
    if (chosen_art_id) {
      communityService.getChosenArticle(chosen_art_id).then((data) => {
        setChosenSingleArticle(data);
        setValue("4");
      });
    }
    communityService
      .getMemberCommunityArticles(memberArticleSearchObj)
      .then((data) => setChosenMemberArticles(data))
      .catch((err) => console.log(err));
  }, [memberArticleSearchObj, chosen_mb_id, articlesRebuild]);

  useEffect(() => {
    if (chosen_mb_id === verifyMemberData?._id) {
      navigate("/member-page");
    }

    const memberService = new MemberApiService();

    memberService
      .getChosenMember(memberArticleSearchObj?.mb_id)
      .then((data) => setChosenMember(data))
      .catch((err) => console.log(err));
  }, [verifyMemberData, chosen_mb_id, followRebuild]);

  // Handler
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    page: number
  ) => {
    memberArticleSearchObj.page = page;
    setMemberArticleSearchObj({ ...memberArticleSearchObj });
  };

  const renderChosenArticleHandler = async (art_id: string) => {
    try {
      const communityService = new CommunityApiService();
      communityService
        .getChosenArticle(art_id)
        .then((data) => {
          setChosenSingleArticle(data);
          setValue("4");
        })
        .catch((err) => console.log(err));
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const subscribeHandler = async (e: any) => {
    try {
      assert.ok(verifyMemberData, Definer.auth_err1);

      const followService = new FollowApiService();
      await followService.subscribe(e.target.value);

      setFollowRebuild(!followRebuild);
      await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const unSubscribeHandler = async (e: any) => {
    try {
      assert.ok(verifyMemberData, Definer.auth_err1);

      const followingService = new FollowApiService();
      await followingService.unsubscribe(e.target.value);

      await sweetTopSmallSuccessAlert("unsubscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="my_page">
      <Container className="my_page_container">
        <TabContext value={value}>
          <Stack className="my_page_frame">
            <Stack className="my_page_right">
              <Box className="order_info_box">
                <Box className="info_box_item">
                  <div className="order_user_img">
                    <img
                      src={
                        chosenMember?.mb_image
                          ? `${serverApi}/${chosenMember?.mb_image}`
                          : "/download.png"
                      }
                      alt=""
                    />
                    <img
                      className="svg"
                      src="/restaurant/user_per.png"
                      alt=""
                    />
                  </div>
                  <div className="order_user_info">
                    <span className="name">
                      {chosenMember?.mb_nick.toLocaleUpperCase()}
                    </span>
                    <span className="user_prof">
                      {chosenMember?.mb_type.toLowerCase()}
                    </span>
                  </div>
                </Box>
                <Box className="user_media_box">
                  <Facebook color="primary" />
                  <Instagram color="primary" />
                  <Telegram color="primary" />
                  <YouTube color="primary" />
                </Box>
                <Box className="user_media_box">
                  <p>Followers: {chosenMember?.mb_subscriber_cnt}</p>
                  <p>Followings: {chosenMember?.mb_follow_cnt}</p>
                </Box>
                <p className="user_media_box">
                  {chosenMember?.mb_description
                    ? chosenMember?.mb_description
                    : "Qo'shimcha ma'lumot kititilmagan"}
                </p>
                <Box className="maqola_yoz_sec">
                  <TabList
                    onChange={handleChange}
                    aria-labelledby="simple-tabpanel-label"
                  >
                    {chosenMember?.me_followed &&
                    chosenMember?.me_followed[0]?.my_following ? (
                      <Tab
                        value={"4"}
                        component={() => (
                          <Button
                            value={chosenMember?._id}
                            variant="contained"
                            className="btn_cancel"
                            onClick={unSubscribeHandler}
                          >
                            Unfollow
                          </Button>
                        )}
                      />
                    ) : (
                      <Tab
                        value={"4"}
                        component={() => (
                          <Button
                            value={chosenMember?._id}
                            variant="contained"
                            className="btn_follow"
                            onClick={subscribeHandler}
                          >
                            Follow
                          </Button>
                        )}
                      />
                    )}
                  </TabList>
                </Box>
              </Box>
              <Box className="my_page_menu">
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={{ borderRight: 1, borderColor: "divider", width: "95%" }}
                >
                  <Tab
                    value={"1"}
                    component={() => (
                      <div
                        className="menu_box focus:outline-none focus:ring focus:ring-violet-300"
                        onClick={() => setValue("1")}
                      >
                        <ArticleOutlined color="primary" />
                        <span> All Articles</span>
                      </div>
                    )}
                  />
                  <Tab
                    value={"2"}
                    component={() => (
                      <div
                        className="menu_box focus:outline-none focus:ring focus:ring-violet-300"
                        onClick={() => setValue("2")}
                      >
                        <Groups2Outlined color="primary" />
                        <span>Followers</span>
                      </div>
                    )}
                  />
                  <Tab
                    value={"3"}
                    component={() => (
                      <div className="menu_box" onClick={() => setValue("3")}>
                        <PersonAddOutlined color="primary" />
                        <span>Following</span>
                      </div>
                    )}
                  />
                </Tabs>
              </Box>
            </Stack>
            <Stack className="my_page_left">
              <Box className="box_left">
                <TabPanel value="1">
                  <Box className="menu_name"> Maqolalar</Box>
                  <Box className="menu_content">
                    <MemberPosts
                      chosenMemberArticles={chosenMemberArticles}
                      renderChosenArticleHandler={renderChosenArticleHandler}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                    <Stack className="pagination">
                      <Box className="bottom_box">
                        <Pagination
                          count={
                            memberArticleSearchObj.page >= 3
                              ? memberArticleSearchObj.page + 1
                              : 3
                          }
                          page={memberArticleSearchObj.page}
                          renderItem={(item) => (
                            <PaginationItem
                              components={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                              }}
                              {...item}
                              color="secondary"
                            />
                          )}
                          onChange={handlePaginationChange}
                        />
                      </Box>
                    </Stack>
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <Box className="menu_name">Followers</Box>
                  <Box className="menu_content">
                    <MemberFollowers
                      actions_enabled={false}
                      mb_id={chosen_mb_id}
                      setFollowRebuild={setFollowRebuild}
                      followRebuild={followRebuild}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="3">
                  <Box className="menu_name">Following</Box>
                  <Box className="menu_content">
                    <MemberFollowings
                      actions_enabled={false}
                      mb_id={chosen_mb_id}
                      setFollowRebuild={setFollowRebuild}
                      followRebuild={followRebuild}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="4">
                  <Box className="menu_name">Tanlangan Maqola</Box>
                  <Box className="menu_content">
                    <TViewer chosenSingleArticle={chosenSingleArticle} />
                  </Box>
                </TabPanel>
              </Box>
            </Stack>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
};

export default OtherPage;
