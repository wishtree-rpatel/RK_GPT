import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { userAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/ChatItem";
import SendIcon from "@mui/icons-material/Send";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const assistantChats = [
  { role: "assistant", content: "Hello! How can I assist you today?" },
  { role: "user", content: "Feel free to ask me anything." },
  { role: "assistant", content: "I'm here to help!" },
  { role: "assistant", content: "Hello! How can I assist you today?" },
  { role: "user", content: "Feel free to ask me anything." },
  { role: "assistant", content: "I'm here to help!" },
  { role: "assistant", content: "Hello! How can I assist you today?" },
  { role: "user", content: "Feel free to ask me anything." },
  { role: "assistant", content: "I'm here to help!" },
];

type ChatMessageType = {
  role: string;
  content: string;
};
const Chat = () => {
  const navigate = useNavigate();
  const auth = userAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);

  const handleSubmit = async () => {
    try {
      console.log("value", inputRef.current?.value);
      const content = inputRef?.current?.value as string;
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
      const newMessage: ChatMessageType = { role: "user", content };
      setChatMessages((prev) => [...prev, newMessage]);
      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);   
    } catch (error) {
      toast.error("Something went wrong",{id:"chats"})
    }
   
  };
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const fetchAllUserChats = async () => {
    try {
      toast.loading("Loading chats", { id: "loadchats" });
      const {data} = await getUserChats();
      console.log("data",data)
      setChatMessages([...data]);
      toast.success("Successfully loaded chats", { id: "loadchats" });
    } catch (error) {
      console.log("error",error)
      toast.error("Loading failed", { id: "loadchats" });
    }
  };
  const deleteChats = async () => {
    console.log("inside deleted method")
    try {
      // toast.loading("deleting")
       await deleteUserChats();
      setChatMessages([]);
      toast.success("Chats deleted",{id:"chatdelete"})
    } catch (error) {
      toast.error("Something went wrong",{id:"chatdelete"})
    }
  }
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth?.user) {
      fetchAllUserChats();
    }
  },[auth]);
  useEffect(()=>{
    if(!auth?.user){
      return navigate("/login")
    }
  },[auth])
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
          mx: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            // height: "70vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name?.[0]}
            {auth?.user?.name?.split(" ")?.[1]?.[0] ?? ""}
          </Avatar>
          <Typography sx={{ mx: "auto" }}>You're talking to chatBOT</Typography>
          <Typography sx={{ mx: "auto", my: 4, p: 3 }}>
            You can ask some questions related to knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information.
          </Typography>
          <Button
            sx={{
              width: "200px",
              // my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              marginBottom: "20px",
              bgcolor: red[300],
              ":hover": { bgcolor: red.A400 },
            }}
            onClick={deleteChats}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: 600,
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, idx) => (
            // @ts-ignore
            <ChatItem key={idx} content={chat.content} role={chat.role} />
          ))}
        </Box>
        <div
          style={{
            width: "80%",
            margin: "auto",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            marginRight: "auto",
          }}
        >
          <input
            onKeyDown={handleKeyDown}
            // onKeyPress={}
            // onKeyUp={handleKeyDown}
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "20px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton
            sx={{ ml: "auto", color: "white" }}
            onClick={handleSubmit}
          >
            <SendIcon />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
