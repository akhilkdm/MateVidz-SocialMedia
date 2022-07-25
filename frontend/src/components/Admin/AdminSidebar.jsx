import React from "react";
import "./adminSidebar.css";
import { useNavigate } from "react-router-dom";




const Admindashboard = () => {

  const navigate = useNavigate();

  return (
    <div id="wrapper">
      <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a
          class="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
          </div>
          <div class="sidebar-brand-text mx-3">
            Sup Admin <sup>2</sup>
          </div>
        </a>

        <hr class="sidebar-divider my-0" />

        <li class="nav-item active">
          <a class="nav-link" >
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span
            onClick={() => navigate("/admin")}
            style={{cursor:"pointer"}}>All Users</span>
          </a>
        </li>

        <li class="nav-item active">
          
          <a  class="nav-link" >
            <i class="fas fa-fw fa-wrench"></i>
            <span  style={{cursor:"pointer"}}
            onClick={() => navigate("/adminproff")}
            >Professional Users</span>
            
          </a>
        </li>

        

     



        
            {/* <i class="fas fa-fw fa-chart-area"></i> */}
          

        
            {/* <i class="fas fa-fw fa-table"></i> */}
         

        <hr class="sidebar-divider d-none d-md-block" />

        <div class="text-center d-none d-md-inline">
          <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>

        <div class="sidebar-card d-none d-lg-flex">
          <a class="btn btn-success btn-sm">Logout</a>
        </div>
      </ul>

     

      
    </div>
  );
};

export default Admindashboard;