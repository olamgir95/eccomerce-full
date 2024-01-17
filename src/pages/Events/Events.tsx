import { Box, Container, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import { homeRetriever } from "../Home/useReduxStore";
import { useSelector } from "react-redux";
import { serverApi } from "../../lib/config";
import { Event } from "../../types/event";
import Heading from "../../components/home/Products/Heading";

export default function Events() {
  const events_list = [
    {
      title: "Bo'yin Foodga marhamat",
      desc: "Yangicha Uslubda Yangicha Ta'm va Yangicha his",
      author: "Abdurahmon Mufid",
      date: "2023/11/16",
      location: "Toshkent, Nurafshon ko'cha",
      img: "/restaurant/boyinfood.png",
    },
    {
      title: "Katta Chegirma endi Bellissimoda",
      desc: "Yangicha Uslubda Yangicha Ta'm va Yangicha his",
      author: "BellissiomoUz",
      date: "2023/10/16",
      location: "Toshkent, Qo'yliq",
      img: "/restaurant/bellissimo.png",
    },
    {
      title: "Bo'yin Foodga marhamat",
      desc: "Yangicha Uslubda Yangicha Ta'm va Yangicha his",
      author: "Abdurahmon Mufid",
      date: "2023/11/16",
      location: "Toshkent, Nurafshon ko'cha",
      img: "/restaurant/boyinfood.png",
    },
    {
      title: "Bo'yin Foodga marhamat",
      desc: "Yangicha Uslubda Yangicha Ta'm va Yangicha his",
      author: "Abdurahmon Mufid",
      date: "2023/11/16",
      location: "Toshkent, Nurafshon ko'cha",
      img: "/restaurant/boyinfood.png",
    },
    {
      title: "Bo'yin Foodga marhamat",
      desc: "Yangicha Uslubda Yangicha Ta'm va Yangicha his",
      author: "Abdurahmon Mufid",
      date: "2023/11/16",
      location: "Toshkent, Nurafshon ko'cha",
      img: "/restaurant/boyinfood.png",
    },
    {
      title: "Bo'yin Foodga marhamat",
      desc: "Yangicha Uslubda Yangicha Ta'm va Yangicha his",
      author: "Abdurahmon Mufid",
      date: "2023/11/16",
      location: "Toshkent, Nurafshon ko'cha",
      img: "/restaurant/boyinfood.png",
    },
  ];
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
              return (
                <SwiperSlide
                  key={event._id}
                  className="events_info_frame w-96 h-96"
                >
                  {/* <div className="relative w-full h-full flex flex-col items-center"> */}
                  {/* <div className="w-full h-full"> */}
                  <img
                    src={image_path}
                    className="w-full h-3/4 object-cover rounded-10"
                    alt=""
                  />
                  {/* </div> */}
                  <div className=" bottom-5  transform  p-5 h-1/4 bg-white shadow-lg rounded-8">
                    <div className="w-full flex flex-row justify-between items-center">
                      <div className="flex flex-col">
                        <div className="event_title_speaker">
                          <strong>{event.event_title}</strong>
                          <div className="event_organizator">
                            <img src="/icons/speaker.svg" alt="" />
                            <p className="spec_text_author">
                              {event?.member_data?.mb_nick}
                            </p>
                          </div>
                        </div>
                        <p className="text_desc">{event.event_description}</p>
                        <div className="bott_info">
                          <div className="bott_info_main">
                            <img src="/icons/calendar.svg" alt="" />{" "}
                            {event.event_date}
                          </div>
                          <div className="bott_info_main">
                            <img src="/icons/location.svg" alt="" />
                            {event.event_location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                </SwiperSlide>
              );
            })}
            {newEvents.map((event: Event) => {
              const image_path = `${serverApi}/${event?.event_image}`;
              return (
                <SwiperSlide
                  key={event._id}
                  className="events_info_frame w-96 h-96"
                >
                  <div className="relative w-full h-full flex flex-col items-center">
                    <div className="w-full h-full">
                      <img
                        src={image_path}
                        className="w-full h-full object-cover rounded-10"
                        alt=""
                      />
                    </div>
                    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 p-10 w-90 bg-white shadow-lg rounded-8">
                      <div className="w-full flex flex-row justify-between items-center">
                        <div className="flex flex-col">
                          <div className="event_title_speaker">
                            <strong>{event.event_title}</strong>
                            <div className="event_organizator">
                              <img src="/icons/speaker.svg" alt="" />
                              <p className="spec_text_author">
                                {event?.member_data?.mb_nick}
                              </p>
                            </div>
                          </div>
                          <p className="text_desc">{event.event_description}</p>
                          <div className="bott_info">
                            <div className="bott_info_main">
                              <img src="/icons/calendar.svg" alt="" />{" "}
                              {event.event_date}
                            </div>
                            <div className="bott_info_main">
                              <img src="/icons/location.svg" alt="" />
                              {event.event_location}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
            {newEvents.map((event: Event) => {
              const image_path = `${serverApi}/${event?.event_image}`;
              return (
                <SwiperSlide key={event._id} className="events_info_frame">
                  <div className="relative w-full h-full flex flex-col items-center">
                    <div className="w-full h-full">
                      <img
                        src={image_path}
                        className="w-full h-full object-cover rounded-10"
                        alt=""
                      />
                    </div>
                    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 p-10 w-90 bg-white shadow-lg rounded-8">
                      <div className="w-full flex flex-row justify-between items-center">
                        <div className="flex flex-col">
                          <div className="event_title_speaker">
                            <strong>{event.event_title}</strong>
                            <div className="event_organizator">
                              <img src="/icons/speaker.svg" alt="" />
                              <p className="spec_text_author">
                                {event?.member_data?.mb_nick}
                              </p>
                            </div>
                          </div>
                          <p className="text_desc">{event.event_description}</p>
                          <div className="bott_info">
                            <div className="bott_info_main">
                              <img src="/icons/calendar.svg" alt="" />{" "}
                              {event.event_date}
                            </div>
                            <div className="bott_info_main">
                              <img src="/icons/location.svg" alt="" />
                              {event.event_location}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
            {newEvents.map((event: Event) => {
              const image_path = `${serverApi}/${event?.event_image}`;
              return (
                <SwiperSlide key={event._id} className="events_info_frame">
                  <div className="relative w-full h-full flex flex-col items-center">
                    <div className="w-full h-full">
                      <img
                        src={image_path}
                        className="w-full h-full object-cover rounded-10"
                        alt=""
                      />
                    </div>
                    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 p-10 w-90 bg-white shadow-lg rounded-8">
                      <div className="w-full flex flex-row justify-between items-center">
                        <div className="flex flex-col">
                          <div className="event_title_speaker">
                            <strong>{event.event_title}</strong>
                            <div className="event_organizator">
                              <img src="/icons/speaker.svg" alt="" />
                              <p className="spec_text_author">
                                {event?.member_data?.mb_nick}
                              </p>
                            </div>
                          </div>
                          <p className="text_desc">{event.event_description}</p>
                          <div className="bott_info">
                            <div className="bott_info_main">
                              <img src="/icons/calendar.svg" alt="" />{" "}
                              {event.event_date}
                            </div>
                            <div className="bott_info_main">
                              <img src="/icons/location.svg" alt="" />
                              {event.event_location}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
            {newEvents.map((event: Event) => {
              const image_path = `${serverApi}/${event?.event_image}`;
              return (
                <SwiperSlide key={event._id} className="events_info_frame">
                  <div className="relative w-full h-full flex flex-col items-center">
                    <div className="w-full h-full">
                      <img
                        src={image_path}
                        className="w-full h-full object-cover rounded-10"
                        alt=""
                      />
                    </div>
                    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 p-10 w-90 bg-white shadow-lg rounded-8">
                      <div className="w-full flex flex-row justify-between items-center">
                        <div className="flex flex-col">
                          <div className="event_title_speaker">
                            <strong>{event.event_title}</strong>
                            <div className="event_organizator">
                              <img src="/icons/speaker.svg" alt="" />
                              <p className="spec_text_author">
                                {event?.member_data?.mb_nick}
                              </p>
                            </div>
                          </div>
                          <p className="text_desc">{event.event_description}</p>
                          <div className="bott_info">
                            <div className="bott_info_main">
                              <img src="/icons/calendar.svg" alt="" />{" "}
                              {event.event_date}
                            </div>
                            <div className="bott_info_main">
                              <img src="/icons/location.svg" alt="" />
                              {event.event_location}
                            </div>
                          </div>
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
