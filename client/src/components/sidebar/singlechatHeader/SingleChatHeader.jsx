// import React, { useContext } from "react";
import "./SingleChatHeader.css";
import profilepic from "../../../assets/profilePic.jpg";
import ChatContext from "../../../context/chatContext";
import { useContext } from "react";

const SingleChatHeader = ({ chats }) => {
  const { user, setActiveChat } = useContext(ChatContext);

  return (
    <>
      {chats?.map((chat) => {
        return (
          <li
            key={chat?._id ? chat?._id : chat?.id}
            className="sidebar-chats"
            onClick={() => {
              setActiveChat(chat);
            }}
          >
            <div className="sidebar-chats-dp">
              <img src={profilepic} alt="" />
            </div>
            <div className="sidebar-chats-info">
              {chat?.users?.map((chatuser) => {
                if (chatuser?.userName !== user?.userName) {
                  return (
                    <p key={chatuser?._id} className="chatName">
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
  // console.log(chatName)
};

export default SingleChatHeader;
