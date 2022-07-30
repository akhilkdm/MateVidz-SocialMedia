import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";

import AddPost from "./AddPost";


function Feed({userId,home}) {
  const [posts, setPosts] = useState([]);

  const tok = sessionStorage.getItem("token");
  const token = JSON.parse(tok);

  const user = localStorage.getItem("userInfo");
  const userinfo = JSON.parse(user);

  const fetchPosts = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
        "auth-token": token,
      },
    };
   
    const res = userId
      ? await axios.get("/posts/profile/" + userId, config)
      : await axios.get(`posts/timeline/${userinfo?.user?._id}`, config);
    setPosts(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };

  useEffect(() => {
    fetchPosts();
  }, []);



  return (
    <Box flex={5} p={2} sx={{ display: { sm: "block" } }}>
     {userinfo?.user._id === userId && ( <AddPost fetchpost={fetchPosts} /> ) }
     {home && ( <AddPost fetchpost={fetchPosts} /> ) }
      {posts.map((p) => (
        <Post h={home} key={p._id} post={p} />
      ))}
    </Box>
  );
}

export default Feed;
