import React from 'react'
import Add from '../../components/Add'
import Feed from '../../components/Feed'
import Navbar from '../../components/Navbar'
import Rightbar from '../../components/Rightbar'
import Sidebar from '../../components/Sidebar'
import { useState } from "react";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import {useDispatch,useSelector} from "react-redux"
import AddPost from '../../components/AddPost'


function Home() {

 

  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const ussf= useSelector((state)=> state.userData.value )
  // console.log("usersss //..",ussf);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
      
          <Sidebar setMode={setMode} mode={mode}/>
          <Feed home />
          <Rightbar />
        
        </Stack>
        <Add />
      </Box>
    </ThemeProvider>
  );
}

export default Home
