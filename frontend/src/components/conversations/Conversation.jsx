import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./conversation.css";

export default function Conversation({conversation, currentUser}) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER




  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    console.log("friendId",friendId)
    const getUser = async () => {
      try {
        const res = await axios("/users/" + friendId);
        setUser(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser,conversation]);

 
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user?.profilePicture ? PF + user?.profilePicture : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"}
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
