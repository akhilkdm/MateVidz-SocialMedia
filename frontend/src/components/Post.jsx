import React, { useEffect } from "react";
import {
  Comment,
  Edit,
  Favorite,
  FavoriteBorder,
  MoreVert,

} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const users = localStorage.getItem("userInfo");
const currentUser = JSON.parse(users);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 10,
};

function Post({ post, h }) {
  const [user, setUser] = useState("");
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const PF = "http://localhost:8800/images/";
  const commentss = post.comments;
  const [comm, setComm] = useState(commentss);
  const [val, setVal] = useState("");
  const userdata = useSelector((state) => state?.userData?.value);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const opens = Boolean(anchorEl);
  const handleClicks = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloses = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setIsLiked(post.likes.includes(userdata?._id));
  }, [userdata?._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/${post?.userId}`);

      setUser(res.data);
    };
    fetchUser();
  }, []);

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
        username: userdata.username,
      });
      const results = result.data.comments;
      setComm(results);
    } catch (err) {
      console.log("error", err);
    }
  };

  //report section
  const handleReport= async()=>{
    console.log("hell")
    try {
      console.log("hii")
       const res=await axios.put("/posts/report/" + post._id , {
        userId: currentUser.user._id,
      });
      console.log(res)
      toast(res.data)
    } catch (err) {
      toast(err.response.data)
    }
  }

  return (
    
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          h ? (
            <Link to={`profile/${user._id}`}>
              <Avatar
                src={PF + user.profilePicture}
                aria-label="recipe"
              ></Avatar>
            </Link>
          ) : (
            <Avatar src={PF + user.profilePicture} aria-label="recipe"></Avatar>
          )
        }
        action={

          <div>
            <Button
              id="basic-button"
              aria-controls={opens ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={opens ? "true" : undefined}
              onClick={handleClicks}
            >
              <MoreVert />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={opens}
              onClose={handleCloses}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {userdata?.username === user?.username && (
                <Link to={`/editpost/${post._id}`}  sx={{textDecoration:"none"}}>
                  <IconButton aria-label="settings">
                    <MenuItem sx={{textDecoration:"none"}} onClick={handleCloses}><Button>Edit</Button></MenuItem>
                  </IconButton>
                </Link>
              )}

              <MenuItem onClick={handleCloses}><Button onClick={handleReport}>Report</Button></MenuItem>
            </Menu>
          </div>
        }
        title={user.username}
        subheader={format(post.createdAt)}
      />
      <ToastContainer/>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.desc}
        </Typography>
      </CardContent>

      {post.img && (
        <CardMedia
          component="img"
          height="20%"
          image={PF + post.img}
          alt="Paella dish"
        />
      )}

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            onClick={likeHandler}
            icon={
              post.likes.includes(userdata?._id) ? (
                <Favorite sx={{ color: "red" }} />
              ) : (
                <FavoriteBorder />
              )
            }
            checkedIcon={
              post.likes.includes(userdata?._id) ? (
                <FavoriteBorder />
              ) : (
                <Favorite sx={{ color: "red" }} />
              )
            }
          />
        </IconButton>
        <IconButton aria-label="comment">
          <Comment onClick={handleOpen} />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Comments
              </Typography>
              <div style={{ height: 200, overflowY: "scroll" }}>
                {comm.map((record) => {
                  return (
                    <h6>
                      <span style={{ fontWeight: "400", fontSize: "15px" }}>
                        {record.username}
                      </span>{" "}
                      <span>:</span>
                      <span style={{ fontWeight: "400", fontSize: "15px" }}>
                        {" "}
                        {record.text}
                      </span>
                    </h6>
                  );
                  // </div>
                })}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  if (e.target[0].value.length > 0) {
                    makeComment(e.target[0].value, post._id);
                    setVal("");
                  }
                }}
              >
                <TextField
                  id="standard-basic"
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                  label="Add your Comment"
                  variant="standard"
                />
              </form>
            </Box>
          </Modal>
        </IconButton>
      </CardActions>
      <Typography style={{ marginLeft: "15px", marginBottom: "10px" }}>
        {like} people liked
      </Typography>
    </Card>
  );
}

export default Post;
