import React, { useEffect } from "react";
import {
  Comment,
  Edit,
  Favorite,
  FavoriteBorder,
  MoreVert,
  Send,
  Share,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const users = localStorage.getItem("userInfo");
const currentUser = JSON.parse(users);

function Post({ post }) {
  const [user, setUser] = useState({});
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const PF = "http://localhost:8800/images/";
  const commentss = post.comments;
  const [comm, setComm] = useState(commentss);
  const [val,setVal] = useState("");
  const userdata = useSelector((state) => state);
  

  

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser.user._id));
  }, [currentUser?.user?._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      await axios.put("/posts/" + post._id + "/like", {
        userId: currentUser.user._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const makeComment = async (text, postId) => {
    console.log("texttt", text, postId);
    try {
      const result = await axios.patch("/posts/comment", {
        postId,
        text,
        username: currentUser.user.username,
      });
      const results = result.data.comments;
      setComm(results);
    } catch (err) {
      console.log("error", err);
    }
  };

  console.log("commentssss", post.comments);
  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Link to={`profile/${user.username}`}>
            <Avatar src={user.profilePicture} aria-label="recipe"></Avatar>
          </Link>
        }
        action={
          <Link to={`/editpost/${post._id}`}>
            <IconButton aria-label="settings">
              {currentUser.user.username && user.username && <Edit />}
              {/* <MoreVert /> */}
            </IconButton>
          </Link>
        }
        title={user.username}
        subheader={format(post.createdAt)}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.desc}
        </Typography>
      </CardContent>

      <CardMedia
        component="img"
        height="20%"
        image={PF + post.img}
        alt="Paella dish"
      />

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            onClick={likeHandler}
            icon={
              post.likes.includes(currentUser.user._id) ? (
                <Favorite sx={{ color: "red" }} />
              ) : (
                <FavoriteBorder />
              )
            }
            checkedIcon={
              post.likes.includes(currentUser.user._id) ? (
                <FavoriteBorder />
              ) : (
                <Favorite sx={{ color: "red" }} />
              )
            }
          />
        </IconButton>
        <IconButton aria-label="comment">
          <Comment />
        </IconButton>
        <span>{like} people liked</span>
      </CardActions>

      <CardContent sx={{ marginBottom: 3 }}>
        {comm.map((record) => {
          return (
            <h6>
              <span style={{ fontWeight: "500" }}>{record.username}</span>{" "}
              <span>:</span>
              {record.text}
            </h6>
          );
        })}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("length",e.target[0].value.length);
            if (e.target[0].value.length > 0 ) {
              makeComment(e.target[0].value, post._id);
              setVal("")
            }
          }}
        >
          <TextField id="standard-basic" value={val} onChange={(e)=>setVal(e.target.value)} label="Comments" variant="standard" />
          <Send type="submit" sx={{ marginTop: 2, marginLeft: 2 }} />
        </form>
      </CardContent>
    </Card>
  );
}

export default Post;
