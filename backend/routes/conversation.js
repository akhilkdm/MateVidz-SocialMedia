const express = require("express");
const { newCon, getCon } = require("../controllers/conversationController");
const router = express.Router();

//new conversation
router.route("/").post(newCon);

//get conversation
router.route("/:userId").get(getCon);




module.exports = router;