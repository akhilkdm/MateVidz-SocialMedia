const express = require("express");
const { newMsg, getMsg } = require("../controllers/messageController");
const router = express.Router();

// add a message 
router.route("/").post(newMsg);

//get messages
router.route("/:conversationId").get(getMsg);

module.exports = router;