// import React, { useContext } from "react";
import "./SingleChatHeader.css";
import profilepic from "../../../assets/profilePic.jpg";
// import ChatContext from "../../../context/chatContext";

const SingleChatHeader = ({ clickHandler, chatName, messegecontent }) => {
  return (
    <div className="sidebar-chats" onClick={() => clickHandler()}>
      <div className="sidebar-chats-dp">
        <img src={profilepic} alt="" />
      </div>
      <div className="sidebar-chats-info">
        <p className="chatName">{chatName}</p>
        <p className="lastName">{messegecontent}</p>
      </div>
    </div>
  );
};

export default SingleChatHeader;
