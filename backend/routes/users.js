const express = require("express");

const {
  register,
  login,
  updateUser,
  deleteUser,
  getUser,
  follow,
  unfollow,
  getFriends,
  updateUsername,
  updatePassword,
  profilepic,
  newUser,
  
} = require("../controllers/userController");
const router = express.Router();

//Register
router.route("/register").post(register);

//Login
router.route("/login").post(login);

//update User
router.route("/updateusername/:id").put(updateUsername);

//update password
router.route("/updatepassword").put(updatePassword)

//profile picture
router.route("/profilepicture").patch(profilepic);

//Delete user
router.route("/:id").delete(deleteUser);

//get user
router.route("/:id").get(getUser);

//get friends
router.route("/friends/:userId").get(getFriends);

//follow a user
router.route("/:id/follow").put(follow);

//unfollow a user
router.route("/:id/unfollow").put(unfollow);

//users near you
router.route("/newusers/:id").get(newUser);

module.exports = router;
