import React, { useEffect } from "react";
import { TabPanel } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import { targetOrdersRetriever } from ".";
import { useSelector } from "react-redux";
import { Product } from "../../types/product";
import { serverApi } from "../../lib/config";
import OrderApiService from "../../app/ApiServices/orderApiService";
import { sweetErrorHandling } from "../../lib/sweetAlert";
import { useLocation } from "react-router-dom";

const FinishedOrders = (props: any) => {
  const { finishedOrders } = useSelector(targetOrdersRetriever);
  const { pathname } = useLocation();
  useEffect(() => {
    try {
      if (finishedOrders.length > 0) {
        let order_id = finishedOrders[0]?._id;

        const data = { order_id: order_id, order_status: "deleted" };

        const orderServer = new OrderApiService();
        orderServer.updateStatusOfOrder(data).then();
      }
    } catch (err) {
      console.log("Error in deleting the Order", err);
      sweetErrorHandling(err).then();
    }
  }, [props.orderRebuild, pathname]);

  return (
    <TabPanel value="2">
      <Stack>
        {finishedOrders?.map((order, ind) => {
          return (
            <Box className="order_main_box" key={ind}>
              <Box className="order_box_scroll">
                {order?.order_items?.map((item, index) => {
                  const product: Product = order.product_data.filter(
                    (vl) => vl._id === item?.product_id
                  )[0];
                  const image = `${serverApi}/${product?.product_images[0]}`;
                  return (
                    <Box className="order_box_item" key={index}>
                      <Box>
                        <img src={image} alt="" className="order_dish_img" />
                        <p className="title_dish">{product?.product_name}</p>
                      </Box>
                      <Box className="price_box">
                        <p>${item?.item_price}</p>
                        <svg
                          width="18"
                          height="17"
                          viewBox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M10.8173 8.50003L14.1508 5.35172C14.6529 4.87752 14.6529 4.10867 14.1508 3.63446C13.6487 3.16026 12.8347 3.16026 12.3326 3.63446L8.99906 6.78277L5.66555 3.63446C5.16345 3.16026 4.34938 3.16026 3.84728 3.63446C3.34518 4.10867 3.34518 4.87752 3.84728 5.35172L7.18078 8.50003L3.84728 11.6483C3.34518 12.1226 3.34518 12.8914 3.84728 13.3656C4.34938 13.8398 5.16345 13.8398 5.66555 13.3656L8.99906 10.2173L12.3326 13.3656C12.8347 13.8398 13.6487 13.8398 14.1508 13.3656C14.6529 12.8914 14.6529 12.1226 14.1508 11.6483L10.8173 8.50003Z"
                            fill="#6D778B"
                          />
                        </svg>
                        <p>{item?.item_quantity}</p>
                        <svg
                          width="18"
                          height="16"
                          viewBox="0 0 18 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M2.57227 10.6666C2.57227 11.5082 3.2545 12.1904 4.09608 12.1904H13.9056C14.7472 12.1904 15.4294 11.5082 15.4294 10.6666C15.4294 9.82504 14.7472 9.14281 13.9056 9.14281H4.09608C3.2545 9.14281 2.57227 9.82504 2.57227 10.6666ZM2.57227 5.33329C2.57227 6.17486 3.2545 6.8571 4.09608 6.8571L13.9056 6.8571C14.7472 6.8571 15.4294 6.17486 15.4294 5.33329C15.4294 4.49171 14.7472 3.80948 13.9056 3.80948H4.09608C3.2545 3.80948 2.57227 4.49171 2.57227 5.33329Z"
                            fill="#6D778B"
                          />
                        </svg>
                        <p className="price">
                          ${item?.item_quantity * item?.item_price}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="total_price_box finished_price">
                <Box className="boxTotal">
                  <p>Price</p>
                  <p>
                    ${order?.order_total_amount - order?.order_delivery_cost}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.71438 7.28569V2.8333C9.71438 2.16267 9.17072 1.61902 8.50009 1.61902C7.82946 1.61902 7.28581 2.16267 7.28581 2.8333V7.28569H2.83343C2.16279 7.28569 1.61914 7.82934 1.61914 8.49997C1.61914 9.1706 2.16279 9.71426 2.83343 9.71426H7.28581V14.1666C7.28581 14.8373 7.82946 15.3809 8.50009 15.3809C9.17072 15.3809 9.71438 14.8373 9.71438 14.1666V9.71426H14.1668C14.8374 9.71426 15.381 9.1706 15.381 8.49997C15.381 7.82934 14.8374 7.28569 14.1668 7.28569H9.71438Z"
                      fill="#6D778B"
                    />
                    <mask
                      id="mask0_1293_1487"
                      maskUnits="userSpaceOnUse"
                      x="1"
                      y="1"
                      width="15"
                      height="15"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.71438 7.28569V2.8333C9.71438 2.16267 9.17072 1.61902 8.50009 1.61902C7.82946 1.61902 7.28581 2.16267 7.28581 2.8333V7.28569H2.83343C2.16279 7.28569 1.61914 7.82934 1.61914 8.49997C1.61914 9.1706 2.16279 9.71426 2.83343 9.71426H7.28581V14.1666C7.28581 14.8373 7.82946 15.3809 8.50009 15.3809C9.17072 15.3809 9.71438 14.8373 9.71438 14.1666V9.71426H14.1668C14.8374 9.71426 15.381 9.1706 15.381 8.49997C15.381 7.82934 14.8374 7.28569 14.1668 7.28569H9.71438Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_1293_1487)"></g>
                  </svg>
                  <p>Shipping</p>
                  <p>${order?.order_delivery_cost}</p>
                  <svg
                    width="18"
                    height="16"
                    viewBox="0 0 18 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.57227 10.6666C2.57227 11.5082 3.2545 12.1904 4.09608 12.1904H13.9056C14.7472 12.1904 15.4294 11.5082 15.4294 10.6666C15.4294 9.82504 14.7472 9.14281 13.9056 9.14281H4.09608C3.2545 9.14281 2.57227 9.82504 2.57227 10.6666ZM2.57227 5.33329C2.57227 6.17486 3.2545 6.8571 4.09608 6.8571L13.9056 6.8571C14.7472 6.8571 15.4294 6.17486 15.4294 5.33329C15.4294 4.49171 14.7472 3.80948 13.9056 3.80948H4.09608C3.2545 3.80948 2.57227 4.49171 2.57227 5.33329Z"
                      fill="#6D778B"
                    />
                  </svg>
                  <p>Total</p>
                  <p>${order?.order_total_amount}</p>
                </Box>
                <p className="text-[#43BB59] font-semibold italic">
                  Payment Completed
                </p>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
};

export default FinishedOrders;
