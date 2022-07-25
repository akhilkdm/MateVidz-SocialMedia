import { MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  TextField,
  Typography,
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

  const tok = sessionStorage.getItem("token");
  const token = JSON.parse(tok);

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
      <div>
        {" "}
        <Navbar />
      </div>

      <Box
        flex={4}
        p={2}
        sx={{
          height: "400px",
          flexGrow: 1,
          margin: "30px auto",
          maxWidth: "700px",
          padding: "20px",
          textAlingn: "center",
          bodersolid: "5px",
        }}
      >
        <Card>
          {post.img && (
            <CardMedia
              component="img"
              height="15%"
              image={PF + post?.img}
              alt="Paella dish"
            />
          )}
          <CardContent>
            <TextField
              style={{ marginBottom: 10 }}
              sx={{ width: "100%" }}
              id="desc"
              value={desc}
              name="comments"
              rows={3}
              onChange={(e) => setDesc(e.target.value)}
              variant="standard"
            />
          </CardContent>
          <CardActions disableSpacing sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{ bgcolor: "green" }}
              onClick={submitPost}
            >
              Update
            </Button>

            <Button
              variant="contained"
              sx={{ bgcolor: "red", marginLeft: "15px" }}
              onClick={submitDelete}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </Box>

      {/* </div> */}
    </>
  );
}

export default EditPost;
