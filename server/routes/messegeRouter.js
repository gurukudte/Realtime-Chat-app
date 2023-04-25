import express from "express";
import {
  sendMessage,
  getAllmesseges,
} from "../controllers/messegeController.js";
const messegeRouter = express.Router();

messegeRouter.post("/:currentUserid", sendMessage);
messegeRouter.get("/:chatid", getAllmesseges);

export default messegeRouter;
