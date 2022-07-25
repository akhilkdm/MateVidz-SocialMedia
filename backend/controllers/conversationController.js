const Conversation = require("../models/Conversation");
const router = require("../routes/conversation");

//---------new conversation-------
const newCon = async (req, res) => {
  console.log("rew body", req.body);
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    console.log("err", err);
    res.status(500).json(err);
  }
};

//----------get a conversation of a user-----
const getCon = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  newCon,
  getCon
};
