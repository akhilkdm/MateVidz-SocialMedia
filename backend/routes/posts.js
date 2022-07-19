const router = require("express").Router();
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  timelinePost,
  userPost,
  comm,
  editPost,
} = require("../controllers/postController");
const Post = require("../models/Post");
const User = require("../models/User");
const {verifyToken} = require("../middlewares/jwtCheck")

//create a post
router.route("/").post(createPost);

//edit a post
router.route("/editpost/:postId").get(editPost)

//update a post
router.route("/updatepost").patch(updatePost);

//delete a post
router.route("/:id").delete(deletePost);

//like & dislike a post
router.route("/:id/like").put(likePost);

//comment a post
router.route("/comment").patch(comm);

//get a post
router.route("/:id").get(getPost);

//get timeline posts
router.route("/timeline/:userId").get(verifyToken,timelinePost);

//get user posts
router.route("/profile/:username").get(userPost);

module.exports = router;
