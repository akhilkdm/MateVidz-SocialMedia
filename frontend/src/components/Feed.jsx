import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import AddPost from "./AddPost";

function Feed() {
  const [posts, setPosts] = useState([]);

  const tok = sessionStorage.getItem("token");
  const token = JSON.parse(tok);
  console.log("tokeenn", tok);
 

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    const userinfo = JSON.parse(user);
    console.log("userinfo", userinfo.user._id);
    const fetchPosts = async () => {
      const config = {
        headers: {
          "content-type": "application/json",
          "auth-token": token,
        },
      };
      const res = await axios.get(
        `posts/timeline/${userinfo.user._id}`,
        config
      );
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, []);

  return (
    
    <Box flex={5} p={2} sx={{ display: { sm: "block" } }}>
      <AddPost/>
      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}

    </Box>
  );
}

export default Feed;
