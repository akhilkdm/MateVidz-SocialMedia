const Post = require("../models/Post");
const User = require("../models/User");
const { post } = require("../routes/posts");

getAllusers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log("errorrrr", err);
    res.status(500).json(err);
  }
};

getUser = async (req, res) => {
  const id = req.params.userId;

  const user = await User.findById(id);

  if (user) {
    res.json(user);
  } else {
    res.status(400);
    throw new Error("User not Found");
  }
};

editUser = async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const id = req.params.userId;
    console.log(email, name, id);
    const user = await User.findByIdAndUpdate(id, {
      name: name,
      email: email,
    });
    res.json(user);
    console.log(user);
  } catch (error) {}
};

blockUser = async (req, res) => {
  try {
    const id = req.params.userId;
    console.log("blockid", id);
    const user = await User.findByIdAndUpdate(
      id,
      {
        isBlock: true,
      },
      {
        new: true,
      }
    );
    res.json(user);

    console.log(user);
  } catch (error) {}
};

unblockUser = async (req, res) => {
  try {
    const id = req.params.userId;
    console.log("unblockid", id);
    const user = await User.findByIdAndUpdate(
      id,
      {
        isBlock: false,
      },
      {
        new: true,
      }
    );
    res.json(user);

    console.log(user);
  } catch (error) {}
};

reportedPost = async (req, res) => {
  try {
    var reported=[];
    const posts = await Post.find();
    posts.map((data) => {
      const num = data.reports.length;
      if (num > 1) {
        reported.push(data);
      }
    });
    if (reported) {
      res.status(200).json(reported);
    } else {
      res.status(500).json("NO reported posts");
    }
  } catch (err) {
    console.log(err);
  }
};

deletePosts = async (req, res) => {
  console.log(req.params.postId,"fdslkfjskd");
  try {
    const user = await Post.findById(req.params.postId);
    await user.remove();
    res.json({});
  } catch (error) {
    res.json(error);
  }
};


module.exports = {
  getAllusers,
  editUser,
  getUser,
  blockUser,
  unblockUser,
  reportedPost,
  deletePosts
};
