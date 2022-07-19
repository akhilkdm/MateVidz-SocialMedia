import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useRef } from "react";
// import { loginCall } from "../../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import {useForm} from "react-hook-form";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Animation } from "@mui/icons-material";
import "./login.css"
import {useDispatch} from "react-redux";
import {logIn} from "../../Redux/Slices/userdata" 


// const theme = createTheme();
 
export default function SignIn() {

  // const { register, handleSubmit, formState:{errors}} =useForm();
  const email = useRef();
  const password = useRef();
 const navigate= useNavigate()
 const[errr,setErrr] =useState();
 const dispatch= useDispatch();

 

  const handleSubmit = async(event) => {
    event.preventDefault();

    
try{
    const userCredential ={
      email: email.current.value, password: password.current.value
    }
    const res= await axios.post("users/login",userCredential)
      console.log("response",res.data.token);

   
       localStorage.setItem("userInfo", JSON.stringify(res.data));
       sessionStorage.setItem("token",JSON.stringify(res.data.token))
      toast("Successfully Logged In")
      navigate('/')
        dispatch(logIn(res.data.user))
    
   
  }catch(err){

   console.log(err.response.data)
     toast(err.response.data);
  }
  };

  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider  theme={darkTheme}>
    
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          bgcolor={"background.default"}
          color={"text.primary"}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "black" }}>
            <Animation />
          </Avatar>
          <Typography component="h1" variant="h5">
            LOGIN
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box noValidate sx={{ mt: 1 ,color:"black"}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                inputRef={email}
                autoComplete="email"
                autoFocus
               
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                inputRef={password}
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
              className="button"
                type="submit"
                
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2 }}
                style={{backgroundColor:"black" }}
               
              >
             Log in
              </Button>
              <ToastContainer/>
              <Grid container>
                <Grid item xs>
                 
                </Grid>
                <Grid item>
                  <Link to="/signup"  className="link" >
                    {"Don't have an account? Sign Up"}
                  </Link>

                
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
