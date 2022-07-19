import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
function EditPost() {
  const navigate = useNavigate();
  const postId = useParams().postId;
  const [post, setPost] = useState({});
  const [desc, setDesc] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  //  const userdata = useSelector((state)=> state.user.value)

  const users = localStorage.getItem("userInfo");
  const userdata = JSON.parse(users);

  console.log("postid", postId);

  console.log("data", userdata.user);
  const tok = sessionStorage.getItem("token");
  const token = JSON.parse(tok);
  console.log("tok", token);
  useEffect(() => {
    const editpost = async () => {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        },
      };

      const res = await axios.get(`/posts/editpost/${postId}`);

      setPost(res.data);
      setDesc(res.data.desc);
    };
    editpost();
  }, [postId]);

  const submitPost = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        },
      };
      const res = await axios.patch("/posts/updatepost", {
        desc,
        postId: post._id,
      });
      console.log("result 123", res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const submitDelete = async () => {
    try {
      const ress = await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          marginTop: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card sx={{ maxWidth: 345, marginTop: 10 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={PF + post.img}
              alt="green iguana"
            />
            <CardContent>
              <TextField
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></TextField>
              {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
            </CardContent>
            <Button
              onClick={() => submitPost()}
              sx={{ marginLeft: 7, backgroundColor: "blue", color: "white" }}
            >
              Update
            </Button>
            <Button
              onClick={() => submitDelete()}
              sx={{ backgroundColor: "red", marginLeft: 2, color: "white" }}
            >
              Delete
            </Button>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
}

export default EditPost;
