import {
  Box,
  Container,
  Stack,
  Pagination,
  PaginationItem,
  Button,
  Tabs,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TabPanel } from "@mui/lab";
import Tab from "@mui/material/Tab";
import {
  ArticleOutlined,
  Facebook,
  Groups2Outlined,
  Instagram,
  PersonAddOutlined,
  Settings,
  Telegram,
  YouTube,
} from "@mui/icons-material";
import MemberPosts from "./memberPosts";
import MemberFollowers from "./memberFollowers";
import MemberFollowings from "./memberFollowings";
import MySettings from "./mySettings";
import TuiEditor from "./TuiEditor";
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
import { sweetErrorHandling, sweetFailureProvider } from "../../lib/sweetAlert";

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

const MyPage = (props: any) => {
  const { setChosenMember, setChosenMemberArticles, setChosenSingleArticle } =
    actionDispatch(useDispatch());
  const { chosenMember, chosenMemberArticles, chosenSingleArticle } =
    useSelector(MemberRetriever);
  // Initializations
  const [value, setValue] = useState("1");
  const [memberArticleSearchObj, setMemberArticleSearchObj] =
    useState<SearchMemberArticlesObj>({ mb_id: "none", page: 1, limit: 3 });
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
  const [followRebuild, setFollowRebuild] = useState<boolean>(false);

  useEffect(() => {
    if (!verifyMemberData) {
      sweetFailureProvider("Please login first", true, true);
    }
    const communityService = new CommunityApiService();
    const memberService = new MemberApiService();

    communityService
      .getMemberCommunityArticles(memberArticleSearchObj)
      .then((data) => setChosenMemberArticles(data))
      .catch((err) => console.log(err));

    memberService
      .getChosenMember(verifyMemberData?._id)
      .then((data) => setChosenMember(data))
      .catch((err) => console.log(err));
  }, [memberArticleSearchObj, articlesRebuild, followRebuild]);

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
          setValue("5");
        })
        .catch((err) => console.log(err));
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
            <Stack className="my_page_right" data-aos="zoom-in-left">
              <Box className="order_info_box">
                <a onClick={() => setValue("6")} className="settings_btn">
                  <Settings color="primary" />
                </a>
                <Box className="info_box_item">
                  <div className="order_user_img">
                    <img src={verifyMemberData?.mb_image} alt="" />
                  </div>
                  <div className="order_user_info">
                    <span className="name">{chosenMember?.mb_nick}</span>
                    <span className="user_prof capitalize">
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
                    : "No additional information!"}
                </p>
                <Box className="maqola_yoz_sec">
                  <TabList
                    onChange={handleChange}
                    aria-labelledby="simple-tabpanel-label"
                  >
                    <Tab
                      value={"4"}
                      component={() => (
                        <Button
                          {...props}
                          variant="contained"
                          onClick={() => setValue("4")}
                        >
                          Create article
                        </Button>
                      )}
                    />
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
                        <span> My Articles</span>
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
                      <button
                        className="menu_box focus:outline-none focus:ring focus:ring-violet-300"
                        onClick={() => setValue("3")}
                      >
                        <PersonAddOutlined color="primary" />
                        <span>Following</span>
                      </button>
                    )}
                  />
                </Tabs>
              </Box>
            </Stack>
            <Stack className="my_page_left" data-aos="zoom-in-right">
              <Box className="box_left">
                <TabPanel value={"1"}>
                  <Box className="menu_name">My Articles</Box>
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
                              color="primary"
                            />
                          )}
                          onChange={handlePaginationChange}
                        />
                      </Box>
                    </Stack>
                  </Box>
                </TabPanel>
                <TabPanel value={"2"}>
                  <Box className="menu_name">Followers</Box>
                  <Box className="menu_content">
                    <MemberFollowers
                      actions_enabled={true}
                      mb_id={verifyMemberData?._id}
                      setFollowRebuild={setFollowRebuild}
                      followRebuild={followRebuild}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value={"3"}>
                  <Box className="menu_name">Following</Box>
                  <Box className="menu_content">
                    <MemberFollowings
                      actions_enabled={true}
                      mb_id={verifyMemberData?._id}
                      setFollowRebuild={setFollowRebuild}
                      followRebuild={followRebuild}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value={"4"}>
                  <Box className="menu_name">Create article</Box>
                  <Box className="menu_content">
                    <TuiEditor
                      setValue={setValue}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value={"5"}>
                  <Box className="menu_name">Chosen Article </Box>
                  <Box className="menu_content">
                    <TViewer chosenSingleArticle={chosenSingleArticle} />
                  </Box>
                </TabPanel>
                <TabPanel value={"6"}>
                  <Box className="menu_name">Change information</Box>
                  <Box className="menu_content">
                    <MySettings />
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

export default MyPage;
