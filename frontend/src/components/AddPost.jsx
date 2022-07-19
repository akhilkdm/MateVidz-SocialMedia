import { EmojiEmotions, PermMedia } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function AddPost({ fetchpost }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//   const userdata = useSelector((state) => state.user.value);
//   console.log("state dtas", userdata.user.username);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [descrip, setDescrip] = useState("");

  const onImageChange = (event) => {
    setFile(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImg(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
    //   userId: userdata.user._id,
      desc: desc.current.value,
    };
    setDescrip("");
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/posts", newPost);
      fetchpost();

      setImg(null);
    } catch (error) {}
  };

  const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: "20px",
  });

  return (
    <>
      <Card sx={{margin:5}}>
        {/* <Typography variant="h6" color="gray" textAlign="center">
          Create Post
        </Typography> */}
        <form onSubmit={submitHandler}>
          <UserBox sx={{ marginLeft: 2 }}>
            <Avatar />
            <Typography variant="span" fontWeight={500}>
              {/* {userdata.user.username} */}
            </Typography>
          </UserBox>
          {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
          <CardContent>
            {/* {userdata && ( */}
              <TextField
                sx={{ width: "100%" }}
                id="standard-multiline-static"
                multiline
                rows={3}
                placeholder={
                  "Whats on your mind " +"?"
                }
                variant="standard"
                value={descrip}
                onChange={(e) => setDescrip(e.target.value)}
                inputRef={desc}
              />
            {/* )} */}
          </CardContent>
          <Stack sx={{ marginLeft: 2 }} direction="row" gap={1} mt={2} mb={3}>
            <div>
              <EmojiEmotions />
            </div>
            <label htmlFor="file">
              <PermMedia />
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                // onChange={(e) =>
                //   setFile(e.target.files[0])}
                onChange={onImageChange}
              />
            </label>
            {img && (
              <img
                style={{ width: 60, height: 50, objectFit: "cover" }}
                id="target"
                src={img}
              />
            )}
          </Stack>

          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button type="submit">Post</Button>
          </ButtonGroup>
        </form>
      </Card>
    </>
  );
}

export default AddPost;