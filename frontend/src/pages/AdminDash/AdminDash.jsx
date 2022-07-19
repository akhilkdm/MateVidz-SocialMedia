import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  useGridApiContext,
} from "@mui/x-data-grid";
import { Button, Card } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import DataTable from "react-data-table-component";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Block } from "@mui/icons-material";

export default function AdminDash() {
  const navigate = useNavigate();
  const [userDetails, setuserDetails] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setsearch] = useState("");
  const [filterValue, setfilterValue] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get("/admin");
      setuserDetails(data);
      setfilterValue(data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const result = userDetails.filter((users) => {
      return users.name.toLowerCase().match(search.toLowerCase());
    });
    setfilterValue(result);
  }, [search]);

  const blockuser = async (userId) => {
    console.log(userId, "khyaifnjfn");

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log("userrrid", userId);
      await axios
        .patch(`/admin/blockuser/${userId}`, {
          config,
        })
        .then((result) => {
          console.log("result", result.data);
          const newData = userDetails.map((item) => {
            if (item._id == result.data._id) {
              return result.data;
            } else {
              return item;
            }
          });
          console.log("newdata", newData);
          setuserDetails(newData);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const unblockuser = async (userId) => {
    console.log(userId, "khyaifnjfn");

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log("userrrid", userId);
      await axios
        .patch(`/admin/unblockuser/${userId}`, {
          config,
        })
        .then((result) => {
          console.log("result", result.data);
          const newData = userDetails.map((item) => {
            if (item._id == result.data._id) {
              return result.data;
            } else {
              return item;
            }
          });
          console.log("newdata", newData);
          setuserDetails(newData);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },

    {
      name: "",
      cell: (row) =>
        row.isBlock ? (
          <Button
            variant="outlined"
            color="error"
            startIcon={<Block />}
            onClick={() => unblockuser(row._id)}
          >
            UnBlock
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="error"
            startIcon={<Block />}
            onClick={() => blockuser(row._id)}
          >
            Block
          </Button>
        ),
    },
  ];
  return (
    <React.Fragment>
      {/* <Header/> */}

      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "150px" }}
      >
        <Card style={{ height: "100%", width: "80%" }}>
          <DataTable
            title={"User Details"}
            columns={columns}
            data={userDetails}
            pagination
            fixedHeader
            highlightOnHover
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search here..."
                className="w-25 form-control"
                value={search}
                onChange={(e) => {
                  setsearch(e.target.value);
                }}
              />
            }
          />
        </Card>
      </div>
    </React.Fragment>
  );
}
