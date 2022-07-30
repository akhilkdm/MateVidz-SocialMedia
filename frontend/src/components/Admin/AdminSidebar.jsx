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
        <hr class="sidebar-divider my-0" />

        <li class="nav-item active">
          <a class="nav-link">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span
              onClick={() => navigate("/admin")}
              style={{ cursor: "pointer" }}
            >
              All Users
            </span>
          </a>
        </li>

        <li class="nav-item active">
          <a class="nav-link">
            <i class="fas fa-fw fa-wrench"></i>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/reportedposts")}
            >
              Reported Posts
            </span>
          </a>
        </li>

  

        <hr class="sidebar-divider d-none d-md-block" />
{/* 
        <div class="text-center d-none d-md-inline">
          <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div> */}

        {/* <div class="sidebar-card d-none d-lg-flex">
          <a class="btn btn-success btn-sm">Logout</a>
        </div> */}
      </ul>
    </div>
  );
};

export default Admindashboard;
