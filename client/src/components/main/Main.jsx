import React, { useContext } from "react";
import ChatContext from "../../context/chatContext";
import "./Main.css";
import MainWelcome from "./mainWelcome/MainWelcome";
import MainChat from "./mainChat/MainChat";

const Main = () => {
  const { activeChat } = useContext(ChatContext);
  return (
    <div className="main">
      {Object?.keys(activeChat)?.length > 0 ? (
        <MainChat  />
      ) : (
        <MainWelcome />
      )}
    </div>
  );
};

export default Main;
