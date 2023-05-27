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
        <div className="sidebar-newchat-groupchat">
          <div className="sidebar-newchat-groupchat-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
              viewBox="0 0 28 28"
            >
              <g>
                <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                  <g fill="#fdf7f7" fillRule="nonzero">
                    <path d="M17.75 18c.966 0 1.75.784 1.75 1.75v2.002l-.008.108c-.31 2.127-2.22 3.149-5.425 3.149-3.193 0-5.134-1.01-5.553-3.112L8.5 21.75v-2c0-.966.784-1.75 1.75-1.75h7.5zm.494-6h6.006c.966 0 1.75.784 1.75 1.75v2.002l-.008.108c-.31 2.127-2.22 3.149-5.425 3.149l-.168-.002a2.752 2.752 0 00-2.47-2.001L17.75 17h-.922a4.491 4.491 0 001.672-3.5c0-.526-.09-1.03-.256-1.5zM3.75 12h6.006c-.166.47-.256.974-.256 1.5 0 1.33.578 2.527 1.496 3.35l.176.15h-.922c-1.262 0-2.326.85-2.65 2.01l-.033-.001c-3.193 0-5.134-1.01-5.553-3.112L2 15.75v-2c0-.966.784-1.75 1.75-1.75zM14 10a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm6.5-6a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm-13 0a3.5 3.5 0 110 7 3.5 3.5 0 010-7z"></path>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <span>New Group</span>
        </div>
        <SingleChatHeader newchats={newchats} clickHandler={clickHandler} />
      </div>
    </div>
  );
};

export default SideBarNewChat;
