import { Box } from "@mui/material";
import React from "react";
import TypingAnim from "../components/TypingAnim";

function Home() {
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <TypingAnim />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          gap: 5,
          my: 10,
        }}
      >
        <img
          src="../../public/robot.png"
          alt="robot"
          style={{ width: "200px", margin: "auto" }}
        />
        <img
          src="../../public/openai.png"
          alt="openai"
          className="image-inverted rotate"
          style={{ width: "200px", margin: "auto" }}
        />
      </Box>
      <Box display={"flex"} width={"100%"} mx={"auto"}>
        <img
          src="../../public/chat.png"
          alt="chatbot"
          style={{
            display: "flex",
            margin: "auto",
            width: "60%",
            borderRadius: 20,
            boxShadow: "-5px -5px 50px #64f3d5",
            marginTop: 20,
          }}
        />
      </Box>
    </Box>
  );
}

export default Home;
