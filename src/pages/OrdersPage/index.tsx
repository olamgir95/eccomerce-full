import { Box, Container, Divider, Stack, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import FinishedOrders from "./FinishedOrders";
import ProcessOrders from "./processOrders";
import { setFinishedOrders, setProcessOrders } from "./slice";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { retrieveProcessOrders, retrieveFinishedOrders } from "./selector";
import { Order } from "../../types/order";
import { useDispatch } from "react-redux";
import OrderApiService from "../../app/ApiServices/orderApiService";
import { verifyMemberData } from "../../app/ApiServices/verify";
import "./order.css";
//redux slice
const actionDispatch = (dispatch: Dispatch) => ({
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
});

//redux selector
export const targetOrdersRetriever = createSelector(
  retrieveProcessOrders,
  retrieveFinishedOrders,
  (processOrders, finishedOrders) => ({
    processOrders,
    finishedOrders,
  })
);

export function OrdersPage(props: any) {
  const { setProcessOrders, setFinishedOrders } = actionDispatch(useDispatch());
  const [orderRebuild, setOrderRebuild] = useState<Date>(new Date());
  const [value, setValue] = useState("1");

  useEffect(() => {
    const orderService = new OrderApiService();

    orderService
      .getMyOrders("process")
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));
    orderService
      .getMyOrders("finished")
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderRebuild]);

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="order_page">
      <Container className="order_container" maxWidth="lg">
        <Stack className="order_left" data-aos="zoom-in-left">
          <TabContext value={value}>
            <Box className="order_nav_frame">
              <Box className="order_table">
                <TabList
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className={"order_nav gap-40"}
                >
                  <Tab
                    label="Process"
                    value={"1"}
                    sx={{ marginRight: "200px", fontSize: "16px" }}
                  />
                  <Tab label="Finished" value={"2"} sx={{ fontSize: "16px" }} />
                </TabList>
              </Box>
            </Box>
            <Stack className="order_main_content">
              <ProcessOrders
                setValue={setValue}
                setOrderRebuild={setOrderRebuild}
              />
              <FinishedOrders orderRebuild={orderRebuild} />
            </Stack>
          </TabContext>
        </Stack>
        <Stack className="order_right" data-aos="zoom-in-right">
          <Box className="order_info_box">
            <Box className="info_box_item">
              <div className="order_user_img">
                <img src={verifyMemberData?.mb_image ?? "user.png"} alt="" />
              </div>
              <div className="order_user_info">
                <span className="name">{verifyMemberData?.mb_nick}</span>
                <span className="user_prof">
                  {verifyMemberData?.mb_type
                    ? verifyMemberData.mb_type
                    : "User"}
                </span>
              </div>
            </Box>
            <Divider />
            <Box className="location">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 3C8.13 3 5 6.13 5 10C5 15.25 12 21 12 21C12 21 19 15.25 19 10C19 6.13 15.87 3 12 3ZM12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                  fill="#2E3A59"
                />
              </svg>
              {verifyMemberData?.mb_address
                ? verifyMemberData?.mb_address
                : "Address not entered."}
            </Box>
          </Box>
          <Stack className="pay_container">
            <Box className="order_pay">
              <Box className="card_number">
                Card number : 5243 4090 2002 7495
              </Box>
              <Box className="card_date">07 / 24</Box>
              <Box className="card_date">CVV : 010</Box>
              <Box className="card_name">Ismoilov Akmaljon</Box>
            </Box>
            <Box className="pay_brands">
              <img src="/payment.png" alt="" />
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
