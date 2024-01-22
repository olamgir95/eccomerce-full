import { CloudDownload } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import MemberApiService from "../../app/ApiServices/memberApiService";
import { verifyMemberData } from "../../app/ApiServices/verify";
import { MemberUpdateData } from "../../types/user";
import { Definer } from "../../lib/Definer";
import assert from "assert";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";

const MySettings = (prop: any) => {
  const [file, setFile] = useState(verifyMemberData?.mb_image);
  const [memberUpdate, setMemberUpdate] = useState<MemberUpdateData>({
    mb_nick: "",
    mb_phone: "",
    mb_address: "",
    mb_description: "",
    mb_image: "",
  });

  //handler
  const handleNickChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    memberUpdate.mb_nick = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    memberUpdate.mb_phone = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    memberUpdate.mb_address = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    memberUpdate.mb_description = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };

  const handleImageChange = (e: any) => {
    try {
      const file = e.target.files[0];
      const fileType = file["type"],
        validTypes = ["image/jpg", "image/jpeg", "image/png"];
      assert.ok(file && validTypes.includes(fileType), Definer.input_img);
      memberUpdate.mb_image = file;
      setMemberUpdate({ ...memberUpdate });
      setFile(URL.createObjectURL(file));
    } catch (err) {
      console.log(`ERROR ::: handleImageChange ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  const handleSubmitButton = async () => {
    try {
      const memberService = new MemberApiService();
      const result = await memberService.updateMemberData(memberUpdate);
      assert.ok(result, Definer.general_err1);
      await sweetTopSmallSuccessAlert(
        "Information modified successfully!",
        700,
        false
      );
      window.location.reload();
    } catch (err) {
      console.log(`ERROR ::: handleSubmitButton ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Stack className="my_settings_page">
      <Box className="member_media_frame">
        <img src={file} alt="" />
        <Box className="media_change_box">
          <span>Rasm Yuklash</span>
          <p>JPG, JPEG, PNG rasmlarni yuklay olasiz!</p>
          <Button
            component="label"
            className="download"
            onChange={handleImageChange}
          >
            <CloudDownload />
            <input type="file" hidden />
          </Button>
        </Box>
      </Box>
      <Box className="name_input">
        <label htmlFor="">Ism</label>
        <input
          onChange={handleNickChange}
          type="text"
          defaultValue={verifyMemberData?.mb_nick}
          name="mb_nick"
        />
      </Box>
      <Box className="info_input">
        <Box className="phone_input">
          <label htmlFor="">Tel raqam</label>
          <input
            onChange={handlePhoneChange}
            type="text"
            defaultValue={verifyMemberData?.mb_phone}
            name="mb_phone"
          />
        </Box>
        <Box className="address_input">
          <label htmlFor="">Address</label>
          <input
            onChange={handleAddressChange}
            type="text"
            defaultValue={verifyMemberData?.mb_address ?? "manzil kiritilmagan"}
            name="mb_address"
          />
        </Box>
      </Box>
      <Box className="add_info">
        <label htmlFor="">Malumot</label>
        <textarea
          onChange={handleDescriptionChange}
          cols={30}
          name="mb_description"
          id=""
          defaultValue={verifyMemberData?.mb_description ?? "mavjud emas"}
        ></textarea>
      </Box>
      <Box className="save_btn">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitButton}
        >
          Saqlash
        </Button>
      </Box>
    </Stack>
  );
};

export default MySettings;
