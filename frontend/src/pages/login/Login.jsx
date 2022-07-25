import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState} from "react";
import { useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Avatar } from "@mui/material";
import { Animation } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logIn } from "../../Redux/Slices/userdata";

const theme = createTheme();

export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = {
        email: email.current.value,
        password: password.current.value,
      };
      const res = await axios.post("users/login", userCredential);
      console.log("response", res.data);
     
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      sessionStorage.setItem("token", JSON.stringify(res.data.token));
      toast("Successfully Logged In");
      navigate("/");
      dispatch(logIn(res.data.user));
    } catch (err) {
      console.log(err.response.data);
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
    <div className="loginmain">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "black" }}>
              <Animation />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              fontWeight={800}
              className="loginhead"
            >
              LOGIN
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box noValidate sx={{ mt: 1 }}>
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

                <Button
                  className="button"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 5, mb: 2 }}
                  style={{ backgroundColor: "black" }}
                >
                  Log in
                </Button>
                <ToastContainer />
                <Grid container>
                  <Grid item>
                    <Link to="/signup" className="link">
                      {"Don't have an account? Sign Up"}
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
