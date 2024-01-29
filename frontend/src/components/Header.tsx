import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import Logo from "./shared/Logo";
import { userAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  const auth = userAuth();
  return (
    <div>
      <AppBar
        sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
      >
        <Toolbar sx={{ display: "flex" }}>
          <Logo />
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                text="Go To Chat"
                textColor="black"
                bg="#00fffc"
                to="/chat"
              />
              <NavigationLink
                text="Logout"
                textColor="white"
                bg="#51538f"
                to="/"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                text="Login"
                textColor="black"
                bg="#00fffc"
                to="/login"
              />
              <NavigationLink
                text="Signup"
                textColor="white"
                bg="#51538f"
                to="/signup"
              />
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
