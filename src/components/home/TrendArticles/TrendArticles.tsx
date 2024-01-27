import React, { useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { homeRetriever } from "../../../pages/Home/useReduxHome";
import { Article } from "../../../types/Article";
import { serverApi } from "../../../lib/config";
import { Box, Container } from "@mui/system";
import { Checkbox } from "@mui/material";
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

const TrendArticles = (props: any) => {
  dayjs.locale("en");
  dayjs.extend(relativeTime);
  const navigate = useNavigate();
  const { trendArticles } = useSelector(homeRetriever);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { setArticlesRebuild } = props;
  const targetLikeHandler = async (e: any) => {
    try {
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
          <p data-aos="fade-up" className="text-sm text-primary">
            What our customers are saying
          </p>
          <h1 data-aos="fade-up" className=" my-2 text-3xl font-bold">
            Testimonials
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            A space where customers share their experiences and feedback about
            your products and services
          </p>
        </div>
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {trendArticles?.map((article: Article) => {
              const image = article?.art_image
                ? `${serverApi}/${article?.member_data?.mb_image}`
                : "user.png";
              const formattedDate = dayjs(article?.createdAt).fromNow();

              return (
                <div className="my-6">
                  <div
                    key={article?._id}
                    className="flex flex-col gap-4 shadow-lg py-8 px-6
                     mx-4 rounded-xl dark:bg-gray-800 bg-primary/10
                     max-w-[480px] h-[390px] relative"
                    onClick={() =>
                      navigate(
                        `/member-page/other?mb_id=${article?.mb_id}&art_id=${article?._id}`
                      )
                    }
                  >
                    <div className="evaluation font-semibold font-serif">
                      <p>{article?.art_subject}</p>
                    </div>
                    <div className="mb-4">
                      <img
                        src={image}
                        alt=""
                        className="rounded-full bg-contain w-24 h-24 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(
                            `/member-page/other?mb_id=${article?.mb_id}`
                          );
                        }}
                      />
                    </div>
                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/member-page/other?mb_id=${article?.mb_id}`);
                      }}
                      className="cursor-pointer"
                    >
                      <h1 className="text-xl font-bold text-black/80 dark:text-light">
                        {article?.member_data?.mb_nick}
                      </h1>
                    </p>
                    <div className="flex flex-col items-center gap-4">
                      <div className="space-y-3">
                        <p className="text-xs text-left text-gray-500 h-20">
                          {article?.art_content}
                        </p>
                      </div>
                    </div>
                    <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                      ,,
                    </p>
                    <div className="flex justify-between items-center">
                      <p>{formattedDate}</p>
                      <p className="evaluation_text">
                        <Checkbox
                          {...label}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite style={{ fill: "red" }} />}
                          id={article?._id}
                          onClick={targetLikeHandler}
                          checked={
                            article?.me_liked &&
                            article?.me_liked[0]?.my_favorite
                              ? true
                              : false
                          }
                        />
                        <span className="ml-1">{article?.art_likes}</span>
                      </p>
                      <div className=" flex gap-1">
                        <RemoveRedEyeIcon />
                        <span className="ml-1">{article?.art_views}</span>
                      </div>
                    </div>
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
