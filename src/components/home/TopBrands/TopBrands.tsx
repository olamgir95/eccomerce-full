import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Favorite } from "@mui/icons-material";
import { CssVarsProvider } from "@mui/joy/styles";
import { CardOverflow, IconButton } from "@mui/joy";
import { SellersRetriever } from "../../../pages/Home/useReduxStore";
import { useSelector } from "react-redux";
import { Seller } from "../../../types/user";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../../app/ApiServices/memberApiService";
import { useRef } from "react";
import { verifyMemberData } from "../../../app/ApiServices/verify";
import { serverApi } from "../../../lib/config";
import { useNavigate } from "react-router-dom";

export const TopBrands = () => {
  const { topSellers } = useSelector(SellersRetriever);
  const refs: any = useRef([]);

  const navigate = useNavigate();

  const chosenRestaurantHandler = (id: string) => {
    navigate(`/sellers/${id}`);
  };

  const targetLikeTop = async (e: any, id: string) => {
    try {
      assert.ok(verifyMemberData, Definer.auth_err1);
      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: id,
          group_type: "member",
        });
      assert.ok(like_result, Definer.general_err1);

      if (like_result.like_status > 0) {
        e.target.style.fill = "red";
        refs.current[like_result.like_ref_id].innerHTML++;
      } else {
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
        await sweetTopSmallSuccessAlert("success", 700, false);
      }
      console.log("ref test", refs.current);
    } catch (err: any) {
      console.log("targetLikeTop, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Selling Brands for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Our Brands
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Best Luxury Furniture Brands Worth Spending Your Money
          </p>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 place-items-center gap-5">
            {/* card section */}
            {topSellers.map(
              (seller: Seller, index: number) => {
                const imag_path = `${serverApi}/${seller?.mb_image}`;
                const delay = 200 * index;
                return (
                  <CssVarsProvider key={seller?._id}>
                    <Card
                      data-aos="fade-up"
                      data-aos-delay={delay}
                      sx={{
                        minHeight: 430,
                        maxWidth: 300,
                        width: "100%",
                        cursor: "pointer",
                      }}
                      onClick={() => chosenRestaurantHandler(seller?._id)}
                    >
                      <CardCover>
                        <img
                          src={imag_path}
                          loading="lazy"
                          alt=""
                          className="bg-cover bg-center"
                        />
                      </CardCover>
                      <CardCover
                        sx={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                        }}
                      />
                      <CardContent sx={{ justifyContent: "flex-end" }}>
                        <Typography level="h2" textColor="#fff" mb={1}>
                          {seller?.mb_nick}
                        </Typography>
                        <Typography
                          startDecorator={
                            <LocationOnRoundedIcon sx={{ color: "white" }} />
                          }
                          textColor="neutral.300"
                        >
                          {seller?.mb_address}
                        </Typography>
                      </CardContent>
                      <CardOverflow
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 1.5,
                          py: 1.5,
                          px: "var(--Card-padding)",
                          borderTop: "1px solid",
                        }}
                      >
                        <IconButton
                          aria-label="Like ninimal photography"
                          size="md"
                          variant="solid"
                          color="neutral"
                          sx={{
                            position: "absolute",
                            zIndex: 2,
                            borderRadius: "50%",
                            right: "1rem",
                            bottom: 45,
                            transform: "translateY(50%)",
                            color: "rgba(0,0,0,0.4)",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Favorite
                            style={{
                              fill: seller?.me_liked[0]?.my_favorite
                                ? "red"
                                : "white",
                            }}
                            onClick={(e) => targetLikeTop(e, seller?._id)}
                          />
                        </IconButton>
                        <Typography
                          sx={{
                            fontWeight: "md",
                            color: "neutral.300",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          {seller?.mb_views}
                          <VisibilityIcon
                            sx={{ fontSize: 20, marginLeft: "5px" }}
                          />
                        </Typography>
                        <Box sx={{ width: 2, bgcolor: "divider" }} />
                        <Typography
                          sx={{
                            fontWeight: "md",
                            color: "neutral.300",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <div
                            ref={(element) =>
                              (refs.current[seller?._id] = element)
                            }
                          >
                            {seller?.mb_likes}
                          </div>
                          <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                        </Typography>
                      </CardOverflow>
                    </Card>
                  </CssVarsProvider>
                );
              }
              // <div
              //   data-aos="fade-up"
              //   data-aos-delay={seller?.aosDelay}
              //   key={seller?._idd}
              //   className="space-y-3"
              // >
              //   <img
              //     src={seller?.mb_image}
              //     alt=""
              //     className="h-[220px] w-[150px] object-cover rounded-md"
              //   />
              //   <div>
              //     <h3 className="font-semibold">{seller?.mb_description}</h3>
              //     <p className="text-sm text-gray-600">{seller?.color}</p>
              //     <div className="flex items-center gap-1">
              //       <FaStar className="text-yellow-400" />
              //       <span>{seller?.rating}</span>
              //     </div>
              //   </div>
              // </div>
            )}
          </div>
          {/* view all button */}
          <div className="flex justify-center">
            <button className="text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md">
              View All Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
