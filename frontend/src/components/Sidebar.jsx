import { Chat, Home, ModeNight } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Sidebar({mode,setMode}) {
  return (
    <Box flex={1} p={2}
    sx={{display:{xs:"none",sm:"block"}}}>
        <Box position="fixed">
            
      <List>
        <Link style={{textDecoration:"none"}} to={"/messenger"}>
        <ListItem disablePadding>
          <ListItemButton component="a" >
            <ListItemIcon>
             <Chat/>
            </ListItemIcon>
            <ListItemText primary="Chats" />
          </ListItemButton>
        </ListItem>
        </Link>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#home">
            <ListItemIcon>
             <Home/>
            </ListItemIcon>
            <ListItemText primary="Homepage" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#home">
            <ListItemIcon>
             <Home/>
            </ListItemIcon>
            <ListItemText primary="Homepage" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#home">
            <ListItemIcon>
             <Home/>
            </ListItemIcon>
            <ListItemText primary="Homepage" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#home">
            <ListItemIcon>
             <ModeNight/>
            </ListItemIcon>
            <Switch onChange={e=>setMode(mode==="light" ? "dark" : "light")}/>
          </ListItemButton>
        </ListItem>
      </List>
        </Box>
    </Box>
  );
}

export default Sidebar;
