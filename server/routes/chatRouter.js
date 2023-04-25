import express from "express";
import {
  getChats,
  getallUsers,
  userDetail,
  accessChat
} from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.get("/chat/:user", getChats);
chatRouter.post("/chat/:currentUserid", accessChat);
chatRouter.get("/people", getallUsers);
chatRouter.get("/:user", userDetail);


export default chatRouter;
