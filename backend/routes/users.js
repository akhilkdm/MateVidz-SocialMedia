const express = require("express");

const {
  register,
  login,
  updateUser,
  deleteUser,
  getUser,
  follow,
  unfollow,
  
} = require("../controllers/userController");
const router = express.Router();

//Register
router.route("/register").post(register);

//Login
router.route("/login").post(login);

//update User
router.route("/:id").put(updateUser);

//Delete user
router.route("/:id").delete(deleteUser);

//get user
router.route("/:id").get(getUser);

//follow a user
router.route("/:id/follow").put(follow);

//unfollow a user
router.route("/:id/unfollow").put(unfollow);

module.exports = router;
