import React, { useCallback, useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Typography from "@mui/joy/Typography";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import CommunityApiService from "../../app/ApiServices/communityApiService";
import { serverApi } from "../../lib/config";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import { ArticleInput } from "../../types/Article";

const TuiEditor = (props: any) => {
  const { setValue, setArticlesRebuild } = props;
  const editorRef = useRef(null);
  const [communityArticleData, setCommunityArticleData] =
    useState<ArticleInput>({
      art_subject: "",
      bo_id: "",
      art_content: "",
      art_image: "",
    });
  const events = { load: function (param: any) {} };
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["image", "table", "link"],
    ["ul", "ol", "task"],
  ];

  //handler

  const uploadImage = async (image: any) => {
    try {
      const communityService = new CommunityApiService();
      const image_name = await communityService.uploadImageToServer(image);

      communityArticleData.art_image = image_name;
      setCommunityArticleData({ ...communityArticleData });

      const source = `${serverApi}/${image_name}`;
      return source;
    } catch (err) {
      console.log(`ERROR ::: uploadImage, ${err}`);
    }
  };

  const changeCategoryHandler = useCallback(
    (e: any) => {
      communityArticleData.bo_id = e.target.value;
      setCommunityArticleData({ ...communityArticleData });
    },
    [communityArticleData.bo_id]
  );

  const changeTitleHandler = (e: any) => {
    communityArticleData.art_subject = e.target.value;
    setCommunityArticleData({ ...communityArticleData });
    console.log("test", communityArticleData.art_subject);
  };

  const handleRegisterButton = async () => {
    try {
      console.log("communityArticleData", communityArticleData);
      const editor: any = editorRef.current;
      const art_content = editor?.getInstance().getHTML();
      communityArticleData.art_content = art_content;
      assert.ok(
        communityArticleData.art_content !== "" &&
          communityArticleData.bo_id !== "" &&
          communityArticleData.art_subject !== "",
        Definer.input_err1
      );
      const communityService = new CommunityApiService();
      await communityService.createArticle(communityArticleData);
      await sweetTopSmallSuccessAlert("Article is created successfull");
      setValue("1");
      setArticlesRebuild(new Date());
    } catch (err) {
      console.log(`ERROR ::: handleRegisterButton, ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  const addImageHook = {
    addImageBlobHook: async (image: any, callback: any) => {
      const uploadImageURL = await uploadImage(image);
      console.log("uploadimage", uploadImageURL);
      callback(uploadImageURL);

      return false;
    },
  };

  return (
    <Stack className="writing_article">
      <Stack className="header_sec">
        <Box className="form_category">
          <Typography className="category">Category</Typography>
          <FormControl className="form_control">
            <Select
              value={communityArticleData?.bo_id}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              onChange={changeCategoryHandler}
            >
              <MenuItem value="">Choose Category</MenuItem>
              <MenuItem value={"celebrity"}>Celebrity</MenuItem>
              <MenuItem value={"evaluation"}>Review Furniture</MenuItem>
              <MenuItem value={"story"}>Story</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className="form_category">
          <Typography className="category">Subject</Typography>
          <TextField
            id="filled-basic"
            label="Subject"
            variant="filled"
            className="form_control"
            value={communityArticleData?.art_subject}
            onChange={changeTitleHandler}
          />
        </Box>
      </Stack>
      <Editor
        ref={editorRef}
        initialValue=" "
        placeholder="Type here"
        previewStyle="vertical"
        height="440px"
        toolbarItems={toolbarItems}
        hooks={addImageHook}
        events={events}
        initialEditType="wysiwyg"
        usageStatistics={false}
      />
      <Box className="reg_btn">
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegisterButton}
        >
          Register
        </Button>
      </Box>
    </Stack>
  );
};

export default TuiEditor;
