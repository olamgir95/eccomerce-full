import React, { useState } from "react";
import { motion } from "framer-motion";
import Banner from "../../assets/images/banner-24.png";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const Subscribe = () => {
  const [emailInfo, setEmailInfo] = useState<string>("");
  const [subscription, setSubscription] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  const emailValidation = (): RegExpMatchArray | null => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = (): void => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation()) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };
  return (
    <div
      data-aos="zoom-in"
      className="md:mb-20 mb-5 bg-gray-100 dark:bg-gray-800 h-[400px] md:!h-[300px] text-white flex justify-center items-center bg-fill bg-center md:!bg-contain "
      style={BannerImg}
    >
      <div className="container  ">
        <div className="space-y-6 md:max-w-xl flex justify-center mx-auto">
          <h1 className="lg:text-2xl !text-center sm:text-left text-base md:w-auto w-48 mt-5 md:mt-0 font-semibold">
            Get Notified About New Products
          </h1>
        </div>
        <div />
        <div className="w-full mt-3 mb-5 md:mt-5">
          {subscription ? (
            <motion.p
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full text-center text-base font-titleFont font-semibold text-green-600"
            >
              Subscribed Successfully !
            </motion.p>
          ) : (
            <div className=" w-full  xl:flex-row flex justify-center items-center gap-4">
              <div className="flex w-1/3 flex-col h-full relative">
                <input
                  onChange={(e) => setEmailInfo(e.target.value)}
                  value={emailInfo}
                  data-aos="fade-up"
                  type="text"
                  placeholder="Enter your email"
                  className="w-full lg:text-base md:text-sm md:p-3 p-1 pl-3 md:h-12 text-xs rounded text-black h-8 outline-none "
                />
                {errMsg && (
                  <p className="text-red-600 -bottom-6 left-1/3  opacity-100 absolute text-sm font-semibold font-titleFont text-center animate-bounce mt-3">
                    {errMsg}
                  </p>
                )}
              </div>
              <button
                onClick={handleSubscription}
                data-aos="fade-up"
                className="bg-white text-lightText md:w-1/6 w-20 md:h-12 h-8  md:text-sm text-xs lg:text-base rounded hover:bg-yellow-200 hover:text-yellow-700 hover:shadow-lg hover:text-[17px] hover:shadow-white duration-300 tracking-wide"
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
