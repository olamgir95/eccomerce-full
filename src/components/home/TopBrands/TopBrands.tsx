import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Favorite } from "@mui/icons-material";
import { CssVarsProvider } from "@mui/joy/styles";
import { CardOverflow, IconButton } from "@mui/joy";
import { homeRetriever } from "../../../pages/Home/useReduxHome";
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
import { MdOutlineLocationOn } from "react-icons/md";
import { useCombinedContext } from "../../../constants/useCombinedContext";

export const TopBrands = () => {
  const { topSellers } = useSelector(homeRetriever);
  const refs: any = useRef([]);
  const { setBrandName, handleBrandChange } = useCombinedContext();
  const navigate = useNavigate();

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
      }
      console.log("ref test", refs.current);
    } catch (err: any) {
      console.log("targetLikeTop, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="mt-14 mb-12">
      <Container>
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

        <div>
          <div className="flex flex-wrap w-full place-items-center items-center justify-center gap-4">
            {topSellers?.map((seller: Seller, index: number) => {
              const imag_path = `${serverApi}/${seller?.mb_image}`;
              const delay = 200 * index;
              return (
                <CssVarsProvider key={seller?._id}>
                  <Card
                    data-aos="fade-up"
                    data-aos-delay={delay}
                    sx={{
                      minHeight: 430,
                      maxWidth: 290,
                      width: "100%",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleBrandChange(seller?._id, "brand");
                      setBrandName(seller?.mb_nick);
                      navigate("/shop");
                    }}
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
                        startDecorator={<MdOutlineLocationOn />}
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
                          className="mr-1"
                        >
                          {seller?.mb_likes}
                        </div>
                        {seller?.mb_likes > 1 ? "likes" : "like"}
                      </Typography>
                    </CardOverflow>
                  </Card>
                </CssVarsProvider>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};
