import { Stack } from "@mui/material";
import React from "react";
import Admindashboard from "../../components/Admin/AdminSidebar";
import UserTable from "../../components/Admin/UserTable/UserTable";

function AdminHome() {
  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        <Admindashboard />
       <UserTable/>
      </Stack>
    </div>
  );
}

export default AdminHome;
