import {
  AppBar,
  Avatar,
  Badge,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Animation, Mail, Notifications } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { logIn } from "../Redux/Slices/userdata";


const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});



const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled("div")(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]:{
    display:"flex"
  }
}));

const UserBox = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    [theme.breakpoints.up("sm")]:{
        display:"none"
      }
  }));

function Navbar() {
    const [open,setOpen]=useState(false)
    
const dispatch =useDispatch()
   
 const history = useNavigate()
const data={}
    const logout= ()=>{
      localStorage.removeItem('userInfo');
      sessionStorage.removeItem('token');
      dispatch(logIn(data))
      history('/login')
    }
  return (
    <AppBar position="sticky" sx={{bgcolor:"black"}}>
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          MateVidz
        </Typography>
        <Animation sx={{ display: { xs: "block", sm: "none" } }} />
        <Search >
          <InputBase placeholder="Search..."  />
        </Search>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={4} color="error">
            <Notifications />
          </Badge>
          
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            onClick={e=>setOpen(true)}
          />
        
        </Icons>
        <UserBox onClick={e=>setOpen(true)}>
        {/* <Link to={`/profile/${user.username}`}> */}
        <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          {/* </Link> */}
          <Typography variant="span">Poetry</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
      
        open={open}
        onClose={(e)=>setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
       {/* <Link to={`/profile/${user.username}`}></Link> */}
        
        
         <MenuItem >Profile</MenuItem>
        <MenuItem >My account</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Navbar;
