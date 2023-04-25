import React, { useContext, useEffect, useState } from "react";
import { SideBar, Main } from "../../components";
import ChatContext from "../../context/chatContext";
import { io } from "socket.io-client";

let socket;
const Chat = () => {
  const [newChatr, setnewChatr] = useState({});
  const { user, chats, setchats } = useContext(ChatContext);

  useEffect(() => {
    socket = io("http://localhost:8080");
    socket.emit("setup", user);
  }, [user]);

  useEffect(() => {
    socket.on("chat recieved", (newChat) => {
      // setnewChatr(newChat.chat);
      setchats([...chats, newChat.chat]);
      // console.log(newMessegeReceived._id);
      // if (
      //   !selectedChatCompare ||
      //   selectedChatCompare._id === newMessegeReceived._id
      // ) {
      // } else {
      //   console.log(newMessegeReceived);
      //   setMesseges([...messeges, newMessegeReceived]);
      // }
    });
    console.log(chats);
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
