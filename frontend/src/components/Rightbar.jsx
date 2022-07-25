import { Avatar, Box, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Add, Remove } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { logIn } from "../Redux/Slices/userdata";
import "./rightBar.css";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [newFriends, setNewFriends] = useState([]);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.userData.value);

  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(currentUser.following?.includes(user?._id));
  }, [user?._id]);

  console.log("current User", currentUser._id);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user?._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const crntuserId = currentUser._id;
  console.log("crntuserId", crntuserId);
  useEffect(() => {
    const newFriends = async () => {
      try {
        const newFriendList = await axios.get(`/users/newusers/${crntuserId}`);
        setNewFriends(newFriendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    newFriends();
  }, []);

  console.log("friedsss", newFriends);

  const handleClick = async () => {
    try {
      if (followed) {
        const res = await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        console.log("response", res.data);
        dispatch(logIn(res.data));
      } else {
        const resp = await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        console.log("reapondfdgagf", resp.data);
        dispatch(logIn(resp.data));
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const ProfileRightbar = () => {
    return (
      <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
        <Box width={300}>
          {user?.username !== currentUser.username && (
            <button className="rightbarFollowButton" onClick={handleClick}>
              {followed ? "Unfollow" : "Follow"}
              {followed ? <Remove /> : <Add />}
            </button>
          )}
          {user?.username === currentUser.username && (
            <Link to={`/editprofile/${currentUser._id}`}>
              <button className="rightbarFollowButton">Edit Profile</button>
            </Link>
          )}
          <h4 className="rightbarTitle">User information</h4>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Name:</span>
              <span className="rightbarInfoValue">{user?.username}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Email:</span>
              <span className="rightbarInfoValue">{user?.email}</span>
            </div>
            <div className="rightbarInfoItem"></div>
          </div>
          <h4 className="rightbarTitle">User friends</h4>
          <div className="rightbarFollowings">
            {friends.map((friend) => (
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            ))}
          </div>
        </Box>
      </Box>
    );
  };

  const HomeRightbar = () => {
    return (
      <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
        <Box position="fixed" width={300}>
          <Typography variant="h6" fontWeight={100}>
            Friends Around You
          </Typography>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {newFriends.map((newuser) => (
              <ListItem>
                <ListItemAvatar>
                  <Link to={`profile/${newuser._id}`}>
                    <Avatar
                      src={
                        newuser?.profilePicture
                          ? PF + newuser?.profilePicture
                          : PF + "person/noAvatar.png"
                      }
                    ></Avatar>
                  </Link>
                </ListItemAvatar>
                <ListItemText primary={newuser.username} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    );
  };

  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed" width={300}>
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </Box>
    </Box>
  );
}
