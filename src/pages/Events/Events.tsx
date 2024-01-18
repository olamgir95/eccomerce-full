import { Box, Container, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { homeRetriever } from "../Home/useReduxHome";
import { useSelector } from "react-redux";
import { serverApi } from "../../lib/config";
import { Event } from "../../types/event";
import Heading from "../../components/home/Products/Heading";
import { HiOutlinePhone } from "react-icons/hi";
import dayjs from "dayjs";
import { BiCalendarEvent } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsPersonBadge } from "react-icons/bs";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function Events() {
  const { newEvents } = useSelector(homeRetriever);

  return (
    <div className="events_frame">
      <Container sx={{ overflow: "hidden" }}>
        <Stack className="events_main">
          <Box className="events_text">
            <Heading heading={"Events"} />
          </Box>
          <Box className="prev_next_frame">
            <img src="icons/arrow-left.svg" className="button-prev" alt="" />
            <div className="dot_frame_pagination swiper-pagination"></div>
            <img src="icons/arrow-right.svg" className="button-next" alt="" />
          </Box>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={false}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            {newEvents.map((event: Event) => {
              const image_path = `${serverApi}/${event?.event_image}`;
              const formattedDate = dayjs(event?.event_date).format(
                "YYYY-MM-DD HH:mm"
              );

              return (
                <SwiperSlide
                  key={event._id}
                  className="events_info_frame w-96 h-96 relative"
                >
                  <img
                    src={image_path}
                    className="w-full h-1/2  object-cover rounded-10"
                    alt=""
                  />
                  <div className=" bottom-5  transform  p-2 h-[224px] rounded-b-2xl bg-white shadow-lg rounded-8">
                    <div className="w-full flex flex-row justify-between items-center">
                      <div className="flex flex-col">
                        <div className="event_title_speaker">
                          <strong className=" -mt-1">
                            {event.event_title}
                          </strong>
                          <div className="event_organizator">
                            <img src="/icons/speaker.svg" alt="" />
                            <p className=" text-primeColor flex items-center gap-1 mt-2">
                              <BsPersonBadge />
                              {event?.member_data?.mb_nick}
                            </p>
                          </div>
                        </div>
                        <p className="text_desc text-sm text-gray-500 mt-1">
                          {event.event_description}
                        </p>
                        <div className="flex mt-2 text-sm justify-between">
                          <div className="flex items-center  gap-1">
                            <BiCalendarEvent />
                            {formattedDate}
                          </div>
                          <div className="flex items-center  gap-1">
                            <HiOutlinePhone />
                            {event?.member_data?.mb_phone}
                          </div>
                        </div>
                        <div className="flex mt-2 items-center text-sm  gap-1">
                          <MdOutlineLocationOn />
                          {event.event_location}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
      </Container>
    </div>
  );
}
