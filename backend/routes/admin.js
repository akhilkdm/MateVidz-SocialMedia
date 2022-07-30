const { getAllusers, editUser, getUser, blockUser, unblockUser, reportedPost, deletePost, deletePosts } = require('../controllers/adminController');

const router= require('express').Router();

//get all users
router.route("/").get(getAllusers);


// router.route("/edituser/:userId").get(getUser)

//block user
router.route("/blockuser/:userId").patch(blockUser)

//unblock user
router.route("/unblockuser/:userId").patch(unblockUser) 

//reported posts
router.route("/reportedposts").get(reportedPost);

//delete Posts
router.route("/deletepost/:postId").delete(deletePosts)




module.exports = router;