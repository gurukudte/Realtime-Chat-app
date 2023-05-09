import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connect.js";
import authRouter from "./routes/authRouter.js";
import chatRouter from "./routes/chatRouter.js";
import messegeRouter from "./routes/messegeRouter.js";
import homeRouter from "./routes/homeRouter.js";
import { Server } from "socket.io";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

//Express middlewears
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

//Express Routes
app.use("/api/auth", authRouter);
app.use("/api", chatRouter);
app.use("/api/messege", messegeRouter);

//Express test-routes
app.use("/home", homeRouter);
app.get("/", (req, res) => {
  res.status(200).json("Welcome to chat-app");
});

//socket Server
const server = app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
  connectDB();
});
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(socket.handshake.query);
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
