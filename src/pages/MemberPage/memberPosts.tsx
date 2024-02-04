import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Checkbox, Link, Stack } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Article } from "../../types/Article";
import { serverApi } from "../../lib/config";
import dayjs from "dayjs";
import assert from "assert";
import { verifyMemberData } from "../../app/ApiServices/verify";
import { Definer } from "../../lib/Definer";
import { sweetErrorHandling } from "../../lib/sweetAlert";
import MemberApiService from "../../app/ApiServices/memberApiService";
import "dayjs/locale/en";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";

const MemberPosts = (props: any) => {
  const {
    chosenMemberArticles,
    renderChosenArticleHandler,
    setArticlesRebuild,
  } = props;
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
    <Stack className="post_content">
      {chosenMemberArticles?.map((article: Article) => {
        const image = article?.art_image
          ? `${serverApi}/${article?.art_image}`
          : "/default.svg";
        const formattedDate = dayjs(article?.createdAt).fromNow();
        return (
          <Link
            className="all_article_box"
            key={article?._id}
            onClick={() => renderChosenArticleHandler(article?._id)}
          >
            <Box className="all_article_img">
              <img src={image} alt="" />
            </Box>
            <Box className="all_article_container">
              <Box
                className="user_prof cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/member-page/other?mb_id=${article?.mb_id}`);
                }}
              >
                <img
                  src={
                    article?.member_data?.mb_image
                      ? `${serverApi}/${article.member_data.mb_image}`
                      : "user.png"
                  }
                  alt=""
                />
                <span>{article?.member_data?.mb_nick}</span>
              </Box>
              <Box className="evaluation">
                <span>{article?.bo_id}</span>
                <p>{article?.art_subject}</p>
              </Box>
              <Box className="views">
                <p>{formattedDate}</p>
                <p
                  className="evaluation_text"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ fill: "red" }} />}
                    id={article?._id}
                    onClick={(e) => {
                      e.stopPropagation();
                      targetLikeHandler(e);
                    }}
                    checked={
                      article?.me_liked && article?.me_liked[0]?.my_favorite
                        ? true
                        : false
                    }
                  />
                  <span>{article?.art_likes}</span>
                </p>
                <Box className="eye">
                  <RemoveRedEyeIcon />
                  <span>{article?.art_views}</span>
                </Box>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
};

export default MemberPosts;
