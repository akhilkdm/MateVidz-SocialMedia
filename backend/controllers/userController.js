const User = require("../models/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

//register
const register = async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

//login
const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    if (!user.isBlock) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      console.log("userid", user._id);
      res.status(200).json({ user, token });
    } else {
      res.status(500).json("your account has been blocked");
    }
  } else {
    res.status(500).json("Invalid username or password");
  }
};

//update user
const updateUser = async (req, res) => {
  if (req.body.userId == req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account");
  }
};

//  update user sid
const updateUsername = async (req, res) => {
  console.log("update", req.params);
  try {
    const user = await User.findByIdAndUpdate(req.body.userId, {
      $set: { username: req.body.username },
    });

    res.status(200).json("Accont has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

//update password
const updatePassword = async (req, res) => {
  const { currentpassword, newpassword, userId } = req.body;

  let user = await User.findOne({ _id: userId });
  if (user) {
    await bcrypt
      .compare(currentpassword, user.password)
      .then(async (status) => {
        if (status) {
          const salt = await bcrypt.genSalt(10);
          const newPassword = await bcrypt.hash(newpassword, salt);
          await User.findByIdAndUpdate(
            userId,
            {
              password: newPassword,
            },
            {
              new: true,
            }
          ).then((response) => {
            if (response) {
              res.status(200).json("Password changed");
            } else {
              console.log("error");
              res.status(500).json("Password not updated");
            }
          });
        } else {
          res.status(400).json("Please enter the current Password properly");
        }
      });
  }
};

//profile picture
const profilepic = async (req, res) => {
  console.log("req.body", req.body);
  const user = await User.findByIdAndUpdate(req.body.userId, {
    $set: { profilePicture: req.body.profilePicture },
  }).then((resp) => {
    res.status(200);
  });
};

//delete user
const deleteUser = async (req, res) => {
  if (req.body.userId == req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account");
  }
};

//get user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;

    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get friends
const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
};

//follow user
const follow = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        const currentUser1 = await User.findById(req.body.userId);
        res.status(200).json(currentUser1);
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can't follow yourself");
  }
};

//unfollow
const unfollow = async (req, res) => {
  console.log("unfollow");
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        const currentUser1 = await User.findById(req.body.userId);
        res.status(200).json(currentUser1);
      } else {
        res.status(403).json("You don't follow this account");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can't unfollow yourself");
  }
};

//new users
const newUser = async (req, res) => {
console.log("params",req.params)
  const currentUser = await User.findById(req.params.id);
  console.log("cuurent user",currentUser);
  const friends = await Promise.all(
    currentUser.following.map((friendId) => {
      return User.findById({ _id: friendId });  
    })
  );
  friends.unshift(currentUser);
  const users = await User.find({ _id: { $nin: friends } });
  res.status(200).json(users);
};

module.exports = {
  register,
  login,
  updateUser,
  updateUsername,
  updatePassword,
  profilepic,
  deleteUser,
  getUser,
  follow,
  unfollow,
  getFriends,
  newUser,
};
