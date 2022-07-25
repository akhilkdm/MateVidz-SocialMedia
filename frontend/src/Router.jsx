import React, { useEffect } from "react";
import Home from "./pages/home/Home";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/Signup";
import Profile from "./pages/profile/Profile";
import AdminLogin from "./pages/adminLogin/AdminLogin";

import AdminHeader from "./components/AdminHeader";
import EditPost from "./components/EditPost";
import AdminHome from "./pages/AdminHome/AdminHome";
import { useSelector } from "react-redux";
import EditProfile from "./pages/EditProfile/EditProfile";
import Messenger from "./pages/messenger/Messenger";

function Router() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const user = localStorage.getItem("userInfo");

  //   if (user) {
  //     navigate("/");
  //   }else{
  //     navigate('/login')
  //   }
  // }, []);

  const users = useSelector((state)=>state.userData.value);

  const user = localStorage.getItem("userInfo");
  const admin = localStorage.getItem("adminInfo");

  return (
    <Routes>
      <Route path="/" element={users ? <Home /> : <Login />}></Route>
      <Route path="/login" element={users ? <Home /> : <Login />}></Route>
      <Route path="/signup" element={users ? <Home /> : <SignUp />}></Route>
      <Route path="/profile/:id" element={users ? <Profile /> : <Login />}></Route>
      <Route
        path="/editpost/:postId"
        element={user ? <EditPost /> : <Login />}
      ></Route>
      <Route path="/editprofile/:id" element={[<EditProfile/>]} ></Route>
      <Route path="/messenger" element={<Messenger/>}></Route>

      <Route
        path="/adminlogin"
        element={admin ? [<AdminHeader />, <AdminHome />] : <AdminLogin />}
      ></Route>
      <Route
        path="/admin"
        element={admin ? [<AdminHeader />, <AdminHome />] : <AdminLogin />}
      ></Route>

      <Route
        path="/admin/block/:userId"
        element={admin ? [<AdminHeader />, <AdminHome />] : <AdminLogin />}
      ></Route>
      <Route
        path="/admin/unblock/:userId"
        element={admin ? [<AdminHeader />, <AdminHome />] : <AdminLogin />}
      ></Route>
    </Routes>
  );
}

export default Router;
