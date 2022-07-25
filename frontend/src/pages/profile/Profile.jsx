import "./profile.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Feed from "../../components/Feed";
import Rightbar from "../../components/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Edit, Image } from "@mui/icons-material";
import { useSelector } from "react-redux";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState("");
  const [filee, setFilee] = useState();
  const userId = useParams().id;
  console.log("userid", userId);
  const currentUser = useSelector((state) => state.userData?.value);
  console.log("helloooo", currentUser?._id);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/${userId}`);
      setUser(res.data);
      console.log("resultsss", res.data);
    };
    fetchUser();
  }, [userId]);

  console.log("fileeeee", filee);

  const handProImg = async (e) => {
    e.preventDefault();
    console.log("file", filee);
    if (filee) {
      console.log("sjayua", filee);
      const data = new FormData();
      const fileName = Date.now() + filee.name;
      data.append("name", fileName);
      data.append("file", filee);
      var profilePicture = fileName;
      try {
       const res= await axios.post("/upload", data);
       console.log("res",res);
      } catch (err) {
        console.log(err);
      }
    }try{
      console.log("userimg",user)
     const respimg= await axios.patch("/users/profilepicture",{userId,profilePicture});
       console.log("respimg",respimg)
    }catch(error){}
  };

  return (
    <>
      <Navbar />
      <div className="profile">
        <Sidebar sx={{ display: { xs: "block", lg: "none" } }} />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user?.coverPicture
                    ? PF + user.coverPicture
                    : "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                alt=""
              />
                 {currentUser?._id === userId && (
              <form >
                <label htmlFor="fil" className="imageicon">
               
                  <Edit htmlFor="fil" style={{ marginLeft: "500px" }} />
                
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="fil"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setFilee(e.target.files[0])}
                  />
                </label>
               <button onClick={handProImg} >pic</button>
              </form>
              )}
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userId={userId} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
