import axios from 'axios';
import React, { useEffect, useState } from 'react'

import Rightbar from '../../components/Rightbar'

function Profile(post) {
    const [user, setUser] = useState({});


    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(`/users/${post.userId}`);
          setUser(res.data);
        };
        fetchUser();
      }, [post.userId]);
  return (
    <div>
       
        <Rightbar/>
    </div>
  )
}

export default Profile