import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";

const userDetail = async (req, res) => {
  const { user } = req.params;
  try {
    const users = await User.findOne({ userName: user });

    // const { password, ...info } = users;
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong");
  }
};

const getChats = async (req, res) => {
  const { user } = req.params;
  try {
    const userExist = await User.findOne({ userName: user });
    const userChats = await Chat.find({
      users: { $elemMatch: { $eq: userExist?._id } },
    })
      .populate("users", "userName")
      .populate("latestMessage");
    res.status(200).json(userChats);
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong");
  }
};

const getallUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong");
  }
};

const accessChat = async (req, res) => {
  const { userId } = req.body;
  const { currentUserid } = req.params;
  // console.log(userId)

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: currentUserid } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [currentUserid, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
};

export { getChats, getallUsers, userDetail, accessChat };
