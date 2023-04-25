import React, { useContext } from "react";
import "./SideBarNewChat.css";
import ChatContext from "../../../context/chatContext";
import SingleChatHeader from "../singlechatHeader/SingleChatHeader";

const SideBarNewChat = ({ status, set, chats }) => {
  const { setActiveChat, people, user, setchats } = useContext(ChatContext);
  const clickHandler = () => {
    set("hide");
  };

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

        {people?.length > 0
          ? people.map((person) => {
              if (person.userName !== user.userName)
                return (
                  <>
                    <SingleChatHeader
                      chatName={person?.userName}
                      messegecontent={"Hi there! I a using MyChats"}
                      clickHandler={() => {
                        if (chats?.length === 0) {
                          const newchat = {
                            chatName: "sender",
                            isGroupChat: false,
                            users: [user, person],
                          };
                          setchats((oldArray) => [...oldArray, newchat]);
                          clickHandler();
                          setActiveChat(newchat);
                        } else {
                          const ids = [];
                          chats.map((a) => {
                            return a.users.map((b) => {
                              return ids.push(b._id);
                            });
                          });
                          if (ids.includes(person._id)) {
                            console.log("chat already exist");
                          } else {
                            const newchat = {
                              chatName: "sender",
                              isGroupChat: false,
                              users: [user, person],
                            };
                            setchats((oldArray) => [...oldArray, newchat]);
                            clickHandler();
                            setActiveChat(newchat);
                          }
                        }
                      }}
                    />
                  </>
                );
            })
          : ""}
      </div>
    </div>
  );
};

export default SideBarNewChat;
