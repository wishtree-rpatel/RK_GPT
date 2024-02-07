import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { toast } from "react-hot-toast";
import CustomizedInput from "../components/shared/CustomizedInput";
import { userAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import robotPng from ""

const SignUp = () => {

  //Accessing provider
  const auth = userAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(
      "email",
      formData.get("email"),
      "password",
      formData.get("password")
    );
    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name,email, password);
      toast.success("sign Up Successfully", { id: "signup" });
      return navigate("/login")
    } catch (error) {
      toast.error("Sign Up Failed", { id: "signup" });
    }
  };
  useEffect(()=>{
    if(auth?.user){
      return navigate("/chat")
    }
  },[auth])
  return (
    <div style={{ display: "flex", width: "100%", height: "100%", flex: "1" }}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img
          src="../../public/airobot.png"
          alt="Robot"
          style={{ width: "50%" }}
        />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, sm: 1, md: "0.5" }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
      >
        <form
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign={"center"}
              padding={2}
              fontWeight={600}
            >
              SignUp
            </Typography>
            <CustomizedInput type="text" label="Name" name="name"/>
            <CustomizedInput type="email" label="Email" name="email" />
            <CustomizedInput type="password" label="password" name="password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                mx: "auto",
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",

                ":hover": { bgcolor: "white", color: "black" },
              }}
              endIcon={<LoginIcon />}
            >
              SignUp
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default SignUp;
