import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);

  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.clear();
    toast.success("Logout Successfully");
    navigate("/login");
  };

  const menuItems = [
    { text: "All Blogs", path: "/blogs" },
    { text: "My Blogs", path: "/myblogs" },
    { text: "Create Blog", path: "/createblog" },
  ];

  return (
    <>
      <AppBar position="sticky" sx={{ background: "#1976d2" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Brand */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            BlogX
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {isLogin &&
              menuItems.map((item) => (
                <Button
                  key={item.text}
                  onClick={() => navigate(item.path)}
                  sx={{
                    backgroundColor: "#ffffff22",
                    color: "white",
                    borderRadius: "10px",
                    px: 2,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#ffffff44",
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}

            {!isLogin ? (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  sx={{
                    backgroundColor: "#43a047",
                    color: "white",
                    borderRadius: "20px",
                    px: 2,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#2e7d32",
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  sx={{
                    backgroundColor: "#0288d1",
                    color: "white",
                    borderRadius: "20px",
                    px: 2,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#0277bd",
                    },
                  }}
                >
                  Register
                </Button>
              </>
            ) : (
              <Button
                onClick={handleLogout}
                sx={{
                  backgroundColor: "#e53935",
                  color: "white",
                  borderRadius: "20px",
                  px: 2,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#c62828",
                  },
                }}
              >
                Logout
              </Button>
            )}
          </Box>

          {/* Mobile Hamburger */}
          <IconButton
            sx={{ display: { xs: "block", md: "none" }, color: "white" }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <List sx={{ width: 220 }}>
          {isLogin &&
            menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}

          {!isLogin ? (
            <>
              <ListItem
                button
                onClick={() => {
                  navigate("/login");
                  setMobileOpen(false);
                }}
              >
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  navigate("/register");
                  setMobileOpen(false);
                }}
              >
                <ListItemText primary="Register" />
              </ListItem>
            </>
          ) : (
            <ListItem
              button
              onClick={() => {
                handleLogout();
                setMobileOpen(false);
              }}
            >
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
