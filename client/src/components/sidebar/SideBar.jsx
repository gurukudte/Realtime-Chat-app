import React, { useContext, useState } from "react";
import "./SideBar.css";
import ChatContext from "../../context/chatContext";
import profilepic from "../../assets/profilePic.jpg";
import SingleChatHeader from "./singlechatHeader/SingleChatHeader";
import SideBarNewChat from "./sidebar-newchat/SideBarNewChat";

const SideBar = () => {
  const { chats, user } = useContext(ChatContext);
  const [newChattoggle, setnewChattoggle] = useState("hide");

  const clickHandler = () => {
    setnewChattoggle("show");
  };

  return (
    <>
      <div className="sidebar">
        <div
          className={`sidebar-chat ${
            newChattoggle === "hide" ? "show" : "hide"
          }`}
        >
          <nav>
            <div className="sidebar-header-profilepic">
              <img src={profilepic} alt="" />
              <p>{user?.userName}</p>
            </div>
            <div className="sidebar-header-icon">
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
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                />
              </svg>
            </div>
          </nav>
          <SingleChatHeader chats={chats} />
        </div>
        <SideBarNewChat
          status={newChattoggle}
          set={setnewChattoggle}
          chats={chats}
        />
      </div>
    </>
  );
};

export default SideBar;
