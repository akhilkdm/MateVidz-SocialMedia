import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './chatOnline.css'

function ChatOnline({ onlineUsers, currentId , setCurrentChat}) {
  const [friends, setFriends] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const tok = sessionStorage.getItem("token");
  const token = JSON.parse(tok);
  useEffect(() => {
    const getFriends = async () => {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        },
      };
      const res =  await axios.get("/users/friends/"+currentId , config ) ;
      console.log("res",res);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers?.includes(f._id)));
  }, [friends, onlineUsers]);
 console.log("onnn",currentId);
  
 const handleClick = async (user) => {
  try {
    const res = await axios.get(
      `/conversations/find/${currentId}/${user._id}`
    );
    setCurrentChat(res.data);
  } catch (err) {
    console.log(err);
  }
};
   
  return (
    <>
        <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              onClick={() => handleClick(o)}
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
    </>
  )
}

export default ChatOnline