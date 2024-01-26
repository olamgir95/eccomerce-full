import { Stack } from "@mui/material";
import { Viewer } from "@toast-ui/react-editor";
import React, { useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";

const TViewer = (props: any) => {
  const { chosenSingleArticle } = props;
  const editorRef = useRef(null);

  return (
    <Stack className="tviewer">
      <Viewer ref={editorRef} initialValue={chosenSingleArticle?.art_content} />
    </Stack>
  );
};

export default TViewer;
