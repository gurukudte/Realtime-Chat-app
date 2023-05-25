import React, { useContext } from "react";
import "./SideBarNewChat.css";
import ChatContext from "../../../context/chatContext";
import SingleChatHeader from "../singlechatHeader/SingleChatHeader";

const SideBarNewChat = ({ status, set }) => {
  const { people, user, chats } = useContext(ChatContext);
  const clickHandler = () => {
    set("hide");
  };

  const chatusers = [];
  chats.map((chat) => {
    chat.users.map((chatuser) => {
      if (chatuser.userName !== user.userName) {
        chatusers.push(chatuser.userName);
      }
    });
  });

  const newchattocreate = people.filter(
    (person) => !chatusers.includes(person.userName)
  );

  const newchats = [];
  newchattocreate.map((newpeoplechat) => {
    if (newpeoplechat?.userName !== user?.userName) {
      const newChat = {
        id: newpeoplechat._id,
        chatName: "sender",
        isGroupChat: false,
        users: [user, newpeoplechat],
      };
      newchats.push(newChat);
    }
  });
  return (
    <div className={`sidebar-newchat ${status}`}>
      <div className="sidebar-newchat-wrapper">
        <div className="sidebar-newchat-header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={clickHandler}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <p>New Chat</p>
        </div>
        <div className="sidebar-newchat-search">
          <div className="sidebar-newchat-serch-background">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input type="text" placeholder="Search contacts" />
          </div>
        </div>
        <SingleChatHeader newchats={newchats} clickHandler={clickHandler} />
      </div>
    </div>
  );
};

export default SideBarNewChat;
