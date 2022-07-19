import React, { useEffect } from 'react'
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
import AdminDash from './pages/AdminDash/AdminDash';
import EditUser from './pages/AdminDash/EditUser';
import AdminHeader from './components/AdminHeader';
import EditPost from './components/EditPost';

function Router() {
    const navigate = useNavigate();
    // useEffect(() => {
    //   const user = localStorage.getItem("userInfo");
    
    //   if (user) {
    //     navigate("/");
    //   }else{
    //     navigate('/login')
    //   }
    // }, []);

  
    const user = localStorage.getItem("userInfo");
    const admin = localStorage.getItem("adminInfo");
  
    return (
      <Routes>
        <Route path="/" element={ user ? <Home /> : <Login />}></Route>
        <Route path="/login" element={user ? <Home /> : <Login />}></Route>
        <Route path="/signup" element={user ? <Home /> :<SignUp />}></Route>
        <Route path="/profile" element={user ? <Profile/> : <Login/>}></Route>
        <Route path="/editpost/:postId" element={user ? <EditPost/> :<Login/>} ></Route>
       


        <Route path="/adminlogin" element={admin ? [ <AdminHeader/>,  <AdminDash />] :<AdminLogin />}></Route>
        <Route path="/admin" element={admin ?[ <AdminHeader/>,  <AdminDash />]: <AdminLogin />}></Route>
      
        <Route path='/admin/block/:userId' element={admin ?[ <AdminHeader/>,  <AdminDash />]: <AdminLogin />}></Route>
        <Route path='/admin/unblock/:userId' element={admin ?[ <AdminHeader/>,  <AdminDash />]: <AdminLogin />}></Route>
      </Routes>
    );
}
 
export default Router