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
import { useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Animation } from "@mui/icons-material";
import "./signup.css"

const theme = createTheme();

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  console.log(errors);
  const username = useRef();

  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleSubmits = async (event) => {
    event.preventDefault();

    if(passwordAgain.current.value !== password.current.value){
      password.current.setCustomValidity("Passwords don't match")
    }else{
      const user={
        username: username.current.value,
        email: email.current.value, 
        password:password.current.value
      };
      console.log("user",user);
      try{
        await axios.post("/users/register",user)
        navigate('/login');
      }catch(err){
        console.log(err);
      }
    }
  };

  return (
    <div className="sig">
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
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
          <Typography component="h1" variant="h5" >
            SIGN UP
          </Typography>
          <form onSubmit={handleSubmit(onSubmit) && handleSubmits}>
            <Box noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    {...register("name", {
                      required: "Name is required",
                      pattern: {
                        value: /^[A-Za-z]+([\ A-Za-z]+)*/,
                        message: "Enter proper name",
                      },
                    })}
                    onKeyUp={()=>{
                      trigger("name")
                    }}
                    inputRef={username}
                    fullWidth
                    id="username"
                    label="User Name"
                    autoFocus
                  />
                  {errors.name && (
                    <small className="text-danger">{errors.name.message}</small>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="email"
                    id="email"
                    label="Email Address"
                    name="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                        message: "Invalid Email",
                      },
                    })}
                    onKeyUp={()=>{  
                      trigger("email")
                    }}
                    inputRef={email}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <small className="text-danger">
                      {errors.email.message}
                    </small>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    onKeyUp={()=>{
                      trigger("password")
                    }}
                    label="Password"
                    type="password"
                    id="password"
                    inputRef={password}
                    autoComplete="new-password"
                  />
                  {errors.password && (
                    <small className="text-danger">
                      {errors.password.message}
                    </small>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    {...register("repassword", {
                      required: "Confirm Password is required",
                    })}
                    onKeyUp={()=>{
                      trigger("repassword")
                    }}
                    label="Confirm Password"
                    type="password"
                    id="password"
                    inputRef={passwordAgain}
                    autoComplete="new-password"
                  />
                  {errors.repassword && (
                    <small className="text-danger">
                      {errors.repassword.message}
                    </small>
                  )}
                </Grid>
                <Grid item xs={12}>
                  {/* <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  /> */}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2,bgcolor:"black" }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" className="link" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}
