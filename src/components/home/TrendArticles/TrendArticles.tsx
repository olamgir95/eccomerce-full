import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { homeRetriever } from "../../../pages/Home/useReduxHome";
import { Article } from "../../../types/Article";
import { serverApi } from "../../../lib/config";
import { Box, Container } from "@mui/system";
import { Checkbox, Stack } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import assert from "assert";

import dayjs from "dayjs";
import { verifyMemberData } from "../../../app/ApiServices/verify";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../../app/ApiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { settings } from "./sliderSetting";
import "dayjs/locale/en";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
import {
  AspectRatio,
  Avatar,
  Card,
  CssVarsProvider,
  IconButton,
  Typography,
} from "@mui/joy";
import "../../../pages/CommunityPage/community.css";

const TrendArticles = (props: any) => {
  dayjs.locale("en");
  dayjs.extend(relativeTime);
  const navigate = useNavigate();
  const { trendArticles } = useSelector(homeRetriever);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { setArticlesRebuild } = props;
  const targetLikeHandler = async (e: any) => {
    try {
      e.stopPropagation();
      assert.ok(verifyMemberData, Definer.auth_err1);
      const memberService = new MemberApiService();
      const id = e.target.id,
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: id,
          group_type: "article",
        });
      assert.ok(like_result, Definer.general_err1);
      await sweetTopSmallSuccessAlert("success", 700, false);
      setArticlesRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeTop, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="py-10 mb-10">
      <Container>
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="lg:text-base text-sm text-primary">
            What our customers are saying
          </p>
          <h1
            data-aos="fade-up"
            className=" my-2 text-2xl lg:text-4xl font-bold"
          >
            Testimonials
          </h1>
          <p data-aos="fade-up" className="lg:text-base text-sm text-gray-400">
            A space where customers share their experiences and feedback about
            your products and services
          </p>
        </div>
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {trendArticles?.map((article: Article) => {
              const userImage = article?.art_image
                ? `${serverApi}/${article?.member_data?.mb_image}`
                : "user.png";
              const artImage = article?.art_image
                ? `${serverApi}/${article?.art_image}`
                : "default.svg";
              const formattedDate = dayjs(article?.createdAt).fromNow();

              return (
                <div className="my-6">
                  <div
                    key={article?._id}
                    className="flex flex-col gap-4 shadow-lg 
                     mx-4 rounded-xl dark:bg-gray-800 bg-primary/10
                     max-w-[480px] h-[390px] relative"
                  >
                    <CssVarsProvider>
                      <Card
                        variant="plain"
                        sx={{
                          width: "100%",
                          height: 390,
                          bgcolor: "initial",
                          p: 0,
                        }}
                      >
                        <Box sx={{ position: "relative" }}>
                          <AspectRatio className=" rounded-b-none h-[280px]">
                            <img
                              src={artImage}
                              srcSet={artImage}
                              loading="lazy"
                              alt={article?.art_subject}
                              className="cursor-pointer w-full  bg-center bg-fill"
                            />
                          </AspectRatio>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                            paddingX: 2,
                            mt: -4,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/member-page/other?mb_id=${article?.mb_id}`
                            );
                          }}
                          className="cursor-pointer"
                        >
                          <Avatar
                            className="w-12 h-12 art_user_img"
                            src={userImage}
                          />
                          <Typography
                            sx={{
                              fontSize: "md",
                              textTransform: "capitalize",
                              fontWeight: "lg",
                              display: "flex",
                              flexDirection: "column",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(
                                `/member-page/other?mb_id=${article?.mb_id}`
                              );
                            }}
                            className="cursor-pointer"
                          >
                            {article?.member_data?.mb_nick}
                            <span className=" text-gray-600 italic ">
                              {article?.bo_id}
                            </span>
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            gap: 8,
                            px: "16px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "md",
                              textTransform: "capitalize",
                              fontWeight: "lg",
                            }}
                          ></Typography>
                          <span className="-mt-16">{formattedDate}</span>
                        </Box>
                        <Box className="mt-0 items-center px-4 flex justify-between gap-6">
                          <Typography
                            level="h2"
                            noWrap
                            className={
                              " text-primeColor font-titleFont lg:text-base text-sm  font-medium"
                            }
                          >
                            {article?.art_subject}
                          </Typography>
                          <IconButton
                            className="text-blue-400 lg:text-base text-sm "
                            onClick={() =>
                              navigate(
                                `/member-page/other?mb_id=${article?.mb_id}&art_id=${article?._id}`
                              )
                            }
                          >
                            Read More
                          </IconButton>
                        </Box>
                      </Card>
                    </CssVarsProvider>
                    <Stack className="view">
                      <Box className="evaluation_text">
                        <span className="-mr-1">{article?.art_likes}</span>
                        <Checkbox
                          {...label}
                          onChange={targetLikeHandler}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite style={{ fill: "red" }} />}
                          id={article?._id}
                          checked={
                            article?.me_liked &&
                            article?.me_liked[0]?.my_favorite
                              ? true
                              : false
                          }
                          sx={{ cursor: "pointer" }}
                        />
                      </Box>
                      <Box className="eye" onClick={(e) => e.stopPropagation()}>
                        <span>{article?.art_views}</span>
                        <RemoveRedEyeIcon />
                      </Box>
                    </Stack>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </Container>
    </div>
  );
};

export default TrendArticles;
