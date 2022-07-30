import * as React from "react";

import { Button, Card } from "@mui/material";

import DataTable from "react-data-table-component";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ReportsTable() {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [reportedPosts, setReportedPosts] = useState([]);
  const PF =process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get("/admin/reportedposts");
      console.log("dataaas", data);
      setReportedPosts(data);
    };
    fetchPosts();
  }, [refresh]);

  const deletePost = async (postId) => {
    console.log(postId, "khyaifnjfn");
    if (window.confirm(`Sure to Delete?`)) {
      var index = 0;
      reportedPosts.map((obj) => {
        console.log("fsdf", obj);
        if (obj._id == postId) {
          index = reportedPosts.indexOf(obj);
        }
      });
      const test = [...reportedPosts];

      test.splice(index, 1);
      setReportedPosts(test);
      try {
        await axios.delete("/admin/deletepost/"+postId);
        setRefresh(!refresh);
      } catch (error) {
        throw new error(error.response.data.message);
      }
    }
  };

  const columns = [
    {
      name: "Post Image",
      selector: (row) =><img src={PF+row.img} style={{height:"50px", width:"50px"}} alt="Image" /> ,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) =>  row.desc,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => deletePost(row._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <Card style={{ height: "100%", width: "80%" }}>
        <DataTable
          title={"Post Details"}
          columns={columns}
          data={reportedPosts}
          pagination
          fixedHeader
          highlightOnHover
          subHeader
          //   subHeaderComponent={
          //     <input
          //       type="text"
          //       placeholder="Search here..."
          //       className="w-25 form-control"
          //       value={search}
          //       onChange={(e) => {
          //         setsearch(e.target.value);
          //       }}
          //     />
          //   }
        />
      </Card>
    </div>
  );
}
