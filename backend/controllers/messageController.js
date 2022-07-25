const Message = require("../models/Message");

//------ new message-------
const newMsg = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

//---------get messages--------
const getMsg = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages)
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  newMsg,
  getMsg
};
