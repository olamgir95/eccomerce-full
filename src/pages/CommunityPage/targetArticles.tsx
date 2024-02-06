import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Checkbox, Link, Stack } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import assert from "assert";
import MemberApiService from "../../app/ApiServices/memberApiService";
import { verifyMemberData } from "../../app/ApiServices/verify";
import { Definer } from "../../lib/Definer";
import { retrieveTargetArticles } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { sweetErrorHandling } from "../../lib/sweetAlert";
import { Article } from "../../types/Article";
import { serverApi } from "../../lib/config";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import "dayjs/locale/en";
import relativeTime from "dayjs/plugin/relativeTime";
import { CssVarsProvider } from "@mui/joy";
import { useNavigate } from "react-router-dom";

const CommunitysRetriever = createSelector(
  retrieveTargetArticles,
  (targetArticles) => ({
    targetArticles,
  })
);

const TargetArticles = (props: any) => {
  const { targetArticles } = useSelector(CommunitysRetriever);
  const { setArticlesRebuild } = props;
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const navigate = useNavigate();
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
      setArticlesRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeTop, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };
  dayjs.locale("en");
  dayjs.extend(relativeTime);

  return (
    <Stack className="articles_wrapper">
      {targetArticles?.map((article: Article, index) => {
        const artImage = article?.art_image
          ? `${serverApi}/${article?.art_image}`
          : "default.svg";
        const userImage = article?.member_data?.mb_image
          ? `${serverApi}/${article?.member_data?.mb_image}`
          : "/user.png";
        const formattedDate = dayjs(article?.createdAt).fromNow();
        const delay = 200 * index;
        return (
          <Link
            key={article?._id}
            className="all_article_box"
            href={`/member-page/other?mb_id=${article?.mb_id}&art_id=${article?._id}`}
          >
            <CssVarsProvider>
              <Card
                data-aos="zoom-out-left"
                data-aos-delay={delay}
                variant="plain"
                sx={{
                  width: 360,
                  bgcolor: "initial",
                  p: 0,
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <AspectRatio ratio="4/3" className="rounded-none">
                    <figure>
                      <img
                        src={artImage}
                        srcSet={artImage}
                        loading="lazy"
                        alt={article?.art_subject}
                        className="cursor-pointer "
                      />
                    </figure>
                  </AspectRatio>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    paddingX: 2,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/member-page/other?mb_id=${article?.mb_id}`);
                  }}
                  className="cursor-pointer"
                >
                  <Avatar className="w-12 h-12  object-none" src={userImage} />
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
                      navigate(`/member-page/other?mb_id=${article?.mb_id}`);
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
                  <span className="-mt-8">{formattedDate}</span>
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
                    article?.me_liked && article?.me_liked[0]?.my_favorite
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
            <Box
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                alignSelf: "flex-start",
                mt: -5,
                px: "18px",
              }}
            >
              <Typography
                level="h2"
                noWrap
                className={
                  "text-base text-primeColor font-titleFont font-medium"
                }
              >
                {article?.art_subject}
              </Typography>
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
};

export default TargetArticles;
