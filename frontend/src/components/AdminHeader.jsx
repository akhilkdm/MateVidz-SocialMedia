import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogIn } from "../Redux/Slices/admindata";

export default function AdminHeader() {
  const admin = localStorage.getItem("adminInfo");
  const dispatch = useDispatch();

  const json = JSON.parse(admin);

  const navigate = useNavigate();

  const logout=()=>{
    localStorage.removeItem("adminInfo");
    dispatch(adminLogIn(""));
    navigate("/adminlogin")
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MateVidz Admin
          </Typography>
          <Button
            color="inherit"
            onClick={logout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
