import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Avatar,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { getCurrentUserProfile } from "../managers/ProfileManager";

export const Layout = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("auth_token");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [profile, setProfile] = useState({});

  const token = localStorage.getItem("auth_token")

  useEffect(() => {
    getCurrentUserProfile(token).then((data) => setProfile(data));
  }, [token]);


  const theme = createTheme({
    palette: {
      primary: {
        main: "#EC6938",
      },
      secondary: {
        main: "#FFFFE2",
      },
    },
    typography: {
      fontFamily: "DM Sans, sans- serif",
      h1: {
        fontSize: "2rem",
        fontWeight: 500,
      },
      h2: {
        fontSize: "1.8rem",
        fontWeight: 500,
      },
    },
  });

  return (
    <div>
      {isLoggedIn && (
        <AppBar position="static" color="primary" sx={{ backgroundColor: "white" }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Toolbar>
              <Avatar
                component={Link}
                to="/"
                edge="start"
                alt="home"
                sx={{ borderRadius: 0, height: 50, width: 65 }}
                src="https://i.imgur.com/ARG9Bfat.png"
              />
              <Box flexGrow={1} />
              <IconButton
                color="inherit"
                onClick={(e) => setMenuAnchor(e.currentTarget)}
              >
                <Avatar alt="Profile" src={profile.picture} />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={() => setMenuAnchor(null)}
              >
                <MenuItem component={Link} to="/myProfile">
                  Profile
                </MenuItem>
                <MenuItem component={Link} to="/myProfile/edit">
                  EditProfile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("auth_token");
                    navigate("/login", { replace: true });
                    setMenuAnchor(null);
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>

            </Toolbar>
          </ThemeProvider>
        </AppBar>
      )}
      <div>{children}</div>
    </div>
  );
};