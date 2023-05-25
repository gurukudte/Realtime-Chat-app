// import React, { useContext } from "react";
import "./SingleChatHeader.css";
import profilepic from "../../../assets/profilePic.jpg";
import ChatContext from "../../../context/chatContext";
import { useContext } from "react";

const SingleChatHeader = ({ newchats, clickHandler }) => {
  const { user, setActiveChat, chats } = useContext(ChatContext);

  return (
    <>
      {newchats?.map((chat, index) => {
        return (
          <li
            key={index}
            className="sidebar-chats"
            onClick={() => {
              setActiveChat(chat);
              if (typeof clickHandler !== "undefined") {
                clickHandler();
                chats.push(chat);
              }
            }}
          >
            <div className="sidebar-chats-dp">
              <img src={profilepic} alt="" />
            </div>
            <div className="sidebar-chats-info">
              {chat?.users?.map((chatuser, index) => {
                if (chatuser?.userName !== user?.userName) {
                  return (
                    <p key={index} className="chatName">
                      {chatuser?.userName}
                    </p>
                  );
                }
              })}
              <p className="lastName">{chat?.latestMessage?.content}</p>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default SingleChatHeader;
