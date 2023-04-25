import User from "../models/userModel.js";
import Message from "../models/messegeModel.js";
import Chat from "../models/chatModel.js";

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  const { currentUserid } = req.params;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: currentUserid,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "userName");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "userName phone",
    });

    const hi = await Chat.findByIdAndUpdate(
      { _id: chatId },
      { latestMessage: message }
    );

    res.status(200).json(message);
  } catch (error) {
    res.status(400);
  }
};

const getAllmesseges = async (req, res) => {
  const { chatid } = req.params;
  try {
    const allMesseges = await Message.find({ chat: chatid })
      .populate("sender", "userName")
      .populate("chat.users")

    if (allMesseges.length > 0) {
      res.status(200).json(allMesseges);
    } else {
      res.status(500).json("something went wrong");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export { sendMessage, getAllmesseges };
