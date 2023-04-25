import React, { useContext, useEffect, useState } from "react";
import { SideBar, Main } from "../../components";
import ChatContext from "../../context/chatContext";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

let socket;
const Chat = () => {
  const { user, chats, setchats, BACKEND_URI } = useContext(ChatContext);
  const navigate = useNavigate();

  useEffect(() => {
    const userExist = Object.keys(user);
    if (userExist.length === 0) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    socket = io(BACKEND_URI);
    socket.emit("setup", user);
  }, [user]);

  useEffect(() => {
    socket.on("chat recieved", (newChat) => {
      setchats([...chats, newChat.chat]);
    });
  });

  return (
    <>
      <section className="layout">
        <SideBar />
        <Main socket={socket} />
      </section>
    </>
  );
};

export default Chat;
