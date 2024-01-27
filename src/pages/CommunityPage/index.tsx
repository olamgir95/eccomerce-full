import {
  Box,
  Container,
  Stack,
  Tab,
  Pagination,
  PaginationItem,
} from "@mui/material";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TabPanel } from "@mui/lab";
import TargetArticles from "./targetArticles";
import { Article, SearchArticlesObj } from "../../types/Article";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetArticles } from "./slice";
import { useDispatch } from "react-redux";
import CommunityApiService from "../../app/ApiServices/communityApiService";
import "./community.css";

//redux slice
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetArticles: (data: Article[]) => dispatch(setTargetArticles(data)),
});

export function CommunityPage(props: any) {
  const { setTargetArticles } = actionDispatch(useDispatch());

  // Initializations
  const [value, setValue] = useState("1");
  const [searchArticleObj, setSearchArticleObj] = useState<SearchArticlesObj>({
    bo_id: "all",
    page: 1,
    limit: 5,
  });

  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());

  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService
      .getTargetArticles(searchArticleObj)
      .then((data) => setTargetArticles(data))
      .catch((err) => console.log(err));
  }, [searchArticleObj, articlesRebuild]);

  // Handler
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    searchArticleObj.page = 1;
    switch (newValue) {
      case "1":
        searchArticleObj.bo_id = "all";
        break;
      case "2":
        searchArticleObj.order = "art_likes";
        break;
      case "3":
        searchArticleObj.bo_id = "evaluation";
        break;
      case "4":
        searchArticleObj.bo_id = "story";
        break;
    }
    setSearchArticleObj({ ...searchArticleObj });

    setValue(newValue);
  };

  const handlePagination = (event: ChangeEvent<unknown>, page: number) => {
    searchArticleObj.page = page;
    setSearchArticleObj({ ...searchArticleObj });
  };

  return (
    <div className="community_page">
      <div className="community_frame">
        <Container className="community_container">
          <Stack className="community_stack">
            <Stack className="community_all_frame" inputMode={"text"}>
              <TabContext value={value}>
                <Box className="article_tabs">
                  <Box className="community_table">
                    <TabList
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="All Articles" value={"1"} />
                      <Tab label="Trend Articles" value={"2"} />
                      <Tab label="Review Furniture" value={"3"} />
                      <Tab label="Story" value={"4"} />
                    </TabList>
                  </Box>
                </Box>
                <Stack className="article_main">
                  <TabPanel value="1">
                    <TargetArticles setArticlesRebuild={setArticlesRebuild} />
                  </TabPanel>
                  <TabPanel value="2">
                    <TargetArticles setArticlesRebuild={setArticlesRebuild} />
                  </TabPanel>
                  <TabPanel value="3">
                    <TargetArticles setArticlesRebuild={setArticlesRebuild} />
                  </TabPanel>
                  <TabPanel value="4">
                    <TargetArticles setArticlesRebuild={setArticlesRebuild} />
                  </TabPanel>
                </Stack>
                <Box className="article_bott">
                  <Pagination
                    count={
                      searchArticleObj.page >= 3 ? searchArticleObj.page + 1 : 3
                    }
                    page={searchArticleObj.page}
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
                    onChange={handlePagination}
                  />
                </Box>
              </TabContext>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
