import express from "express";
import connectDB from "./config/connect.js";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import cors from "cors";
import chatRouter from "./routes/chatRouter.js";
import messegeRouter from "./routes/messegeRouter.js";
import { Server } from "socket.io";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api", chatRouter);
app.use("/api/messege", messegeRouter);

app.use("/", (req, res) => {
  res.status(200).json("Welcome to RealTime-Chat-app-API");
});
const server = app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
  connectDB();
});
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    // console.log(userData?._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    // console.log("user joined room " + room);
  });

  socket.on("join public", (room) => {
    socket.join(room);
    // console.log("user joined room " + room);
  });

  socket.on("new messege", (newMessegeReceived) => {
    let chat = newMessegeReceived.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.map((user) => {
      if (user?._id == newMessegeReceived.sender._id) return;
      socket.in(user._id).emit("messege recieved", newMessegeReceived);
    });
  });

  socket.on("new chat", (newChat) => {
    let { chat, sentuser } = newChat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.map((user) => {
      if (user?._id == sentuser?._id) {
      } else {
        console.log(user?._id);
        socket.in(user?._id).emit("chat recieved", newChat);
      }
    });
  });
});
