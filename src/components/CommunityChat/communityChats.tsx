import { Avatar, Box, Button, Modal, Stack } from "@mui/material";
import React, {
  ChangeEvent,
  FC,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SendIcon from "@mui/icons-material/Send";
import { SocketContext } from "../../context/socket";
import {
  ChatGreetMsg,
  ChatInfoUsers,
  ChatMessage,
  NewMessageProps,
} from "../../types/others";
import { sweetErrorHandling, sweetFailureProvider } from "../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import { verifyMemberData } from "../../app/ApiServices/verify";
import { RippleBadge } from "../../app/MaterialTheme/styled";
import { BiMessage } from "react-icons/bi";
import { CloseRounded, MessageRounded } from "@mui/icons-material";
import "../../pages/CommunityPage/community.css";

const NewMessage: FC<NewMessageProps> = ({ data, key }) => {
  if (!data) {
    return null;
  }

  const { mb_id, msg, mb_nick, mb_image } = data;
  if (mb_id === verifyMemberData?._id) {
    return (
      <Box className="chat_main_right">
        <div className="msg_right">{msg}</div>
      </Box>
    );
  } else {
    return (
      <Box className="chat_main_left">
        <Avatar alt={mb_nick} src={mb_image ?? "/comunity/user1.svg"} />
        <div className="msg_left">{msg}</div>
      </Box>
    );
  }
  return null;
};

const CommunityChats = () => {
  const msgInputRef: any = useRef(null);
  const [messageList, setMessageList] = useState<Array<ReactElement<any>>>([]);
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("hello");
  }, []);

  useEffect(() => {
    socket?.connect();
    //@ts-ignore
    socket?.on("connect", (msg: any) => {
      console.log("Client connected");
    });

    socket?.on("newMsg", (new_msg: ChatMessage) => {
      setMessageList((prevList) => [
        ...prevList,
        <NewMessage data={new_msg} key={prevList.length} />,
      ]);
      console.log("Client: new message");
    });

    socket?.on("greetMsg", (new_msg: ChatGreetMsg) => {
      setMessageList((prevList) => [
        ...prevList,
        <p
          style={{
            textAlign: "center",
            fontSize: "large",
            fontFamily: "Poppins",
          }}
        >
          {new_msg.text}, dear {verifyMemberData?.mb_nick ?? "guest"}
        </p>,
      ]);
      console.log("Client: greet message");
    });

    socket?.on("infoUsers", (msg: ChatInfoUsers) => {
      console.log("Client: info users");
      setOnlineUsers(msg.total);
    });

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  //Handler//

  const getInputMessageHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setMessage(text);
    },
    [message]
  );

  const getKeyHandler = (e: any) => {
    try {
      if (e.key === "Enter") {
        assert.ok(message, Definer.input_err2);
        onSendBtnHandler();
      }
    } catch (err: any) {
      console.log(`getKeyHandler, ERROR: ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  const onSendBtnHandler = () => {
    try {
      if (!verifyMemberData) {
        msgInputRef.current.value = "";
        sweetFailureProvider("Please login first", true);
        return;
      }

      msgInputRef.current.value = "";
      assert.ok(message, Definer.input_err2);

      const mb_image_url = verifyMemberData?.mb_image ?? "/comunity/user1.svg";
      socket?.emit("createMsg", {
        msg: message,
        mb_id: verifyMemberData?._id,
        mb_nick: verifyMemberData?.mb_nick,
        mb_image: mb_image_url,
      });
      setMessage("");
    } catch (err: any) {
      console.log(`onSendBtnHandler, ERROR: ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  useEffect(() => {
    const handleBodyScroll = () => {
      document.body.style.overflow = open ? "scroll" : "scroll";
    };

    handleBodyScroll();

    return () => {};
  }, [open]);

  return (
    <div className="relative">
      <Button
        className={open ? "bg-red-500 chat_btn " : "chat_btn bg-[#007665]"}
        onClick={() => setOpen(!open)}
      >
        {open ? <CloseRounded /> : <MessageRounded />}
      </Button>

      <Stack className={`chat_frame ${open ? "open" : ""}`}>
        <Box className="chat_top">
          Live Chatting
          <RippleBadge
            style={{ margin: "-30px 0 0 20px" }}
            badgeContent={onlineUsers}
          />
        </Box>
        <Stack className="chat_content">
          <span className="chiziq"></span>
          <Box className="chat_main">
            <Box className="chat_main_left">
              <div className="msg_left">Enjoy the live chatting !</div>
            </Box>
            {messageList}
          </Box>
        </Stack>
        <Box className="chat_bott">
          <input
            ref={msgInputRef}
            type="text"
            name="message"
            className="msg_input"
            placeholder="Type message"
            onChange={getInputMessageHandler}
            onKeyDown={getKeyHandler}
          />
          <button className="send_msg_btn" onClick={onSendBtnHandler}>
            <SendIcon />
          </button>
        </Box>
      </Stack>
    </div>
  );
};

export default CommunityChats;
