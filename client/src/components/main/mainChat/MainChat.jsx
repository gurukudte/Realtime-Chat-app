import React, { useContext, useRef, useState } from "react";
import "./MainChat.css";
import profilepic from "../../../assets/profilePic.jpg";
import axios from "axios";
import ChatContext from "../../../context/chatContext";

// let selectedChatCompare;
const MainChat = () => {
  const ref = useRef("");
  const { user, BACKEND_URI, socket, messeges, setMesseges, activeChat } =
    useContext(ChatContext);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  //sending messege to backend to create a chat & send messege
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      if (activeChat._id) {
        const newMessege = {
          chat: activeChat,
          content: message,
          sender: user,
        };
        ref.current.value = "";

        setMesseges([...messeges, newMessege]);
        socket.emit("new messege", newMessege);
        const { data } = await axios.post(
          `${BACKEND_URI}/api/messege/${user._id}`,
          { chatId: activeChat._id, content: message }
        );
      } else {
        const createChat = async (b, c) => {
          const { data } = await axios.post(
            `${BACKEND_URI}/api/chat/${user._id}`,
            {
              userId: b,
            }
          );
          const chatData = {
            chat: data,
            sentuser: user,
          };
          socket.emit("new chat", chatData);
          const { _id } = data;
          if (_id) {
            const { data } = await axios.post(
              `${BACKEND_URI}/api/messege/${user._id}`,
              { chatId: _id, content: c }
            );
            socket.emit("new messege", data);
            setMesseges([...messeges, data]);
          }
        };
        activeChat?.users?.map((a) => {
          if (a._id !== user._id) {
            const res = createChat(a._id, message);
            console.log(res);
          }
        });
        ref.current.value = "";
      }
    }
  };

  //generating messege threads as HTML
  const MessegesHTML = () => {
    if (messeges?.length > 0) {
      return (
        messeges?.length > 0 &&
        messeges?.map((mess) => {
          return (
            <div
              key={mess?._id ? mess?._id : message}
              className={
                mess?.sender?._id === user?._id ? "sender" : "receiver"
              }
            >
              <p>{mess?.content}</p>
            </div>
          );
        })
      );
    }
  };

  return (
    <div className="main-chat">
      <div className="main-chat-header">
        <div className="main-chat-header-chatinfo">
          <div className="main-chat-header-profilepic">
            <img src={profilepic} alt="" />
          </div>
          <div className="main-chat-header-name">
            <p>
              {activeChat?.users?.map((a) => {
                if (a._id !== user._id) {
                  return a.userName;
                }
              })}
            </p>
          </div>
        </div>
        <div className="main-chat-header-options">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#aebac1"
              fillRule="evenodd"
              d="M10 5a5 5 0 100 10 5 5 0 000-10zm-7 5a7 7 0 1112.606 4.192l5.101 5.1a1 1 0 01-1.414 1.415l-5.1-5.1A7 7 0 013 10z"
              clipRule="evenodd"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#aebac1"
            viewBox="0 0 32 32"
            className="icon-options"
          >
            <path d="M12.15 28.012v-.85c.019-.069.05-.131.063-.2.275-1.788 1.762-3.2 3.506-3.319 1.95-.137 3.6.975 4.137 2.787.069.238.119.488.181.731v.85c-.019.056-.05.106-.056.169-.269 1.65-1.456 2.906-3.081 3.262-.125.025-.25.063-.375.094h-.85c-.056-.019-.113-.05-.169-.056-1.625-.262-2.862-1.419-3.237-3.025-.037-.156-.081-.3-.119-.444zm7.888-24.024v.85c-.019.069-.05.131-.056.2-.281 1.8-1.775 3.206-3.538 3.319-1.944.125-3.588-1-4.119-2.819-.069-.231-.119-.469-.175-.7v-.85c.019-.056.05-.106.063-.162.3-1.625 1.244-2.688 2.819-3.194.206-.069.425-.106.637-.162h.85c.056.019.113.05.169.056 1.631.269 2.863 1.419 3.238 3.025l.113.437zm-.001 11.587v.85c-.019.069-.05.131-.063.2-.281 1.794-1.831 3.238-3.581 3.313-1.969.087-3.637-1.1-4.106-2.931-.05-.194-.094-.387-.137-.581v-.85c.019-.069.05-.131.063-.2.275-1.794 1.831-3.238 3.581-3.319 1.969-.094 3.637 1.1 4.106 2.931.05.2.094.394.137.588z"></path>
          </svg>
        </div>
      </div>
      <div className="main-chat-content">
        <div className="main-chat-content-wrapper">
          <MessegesHTML />
        </div>
      </div>
      <div className="main-chat-footer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 20 20">
          <g>
            <g
              fill="#aebac1"
              fillRule="evenodd"
              stroke="none"
              strokeWidth="0.5"
            >
              <g fill="#aebac1" transform="translate(-380 -5759)">
                <g transform="translate(56 160)">
                  <path d="M340 5607a2 2 0 11-3.999.001A2 2 0 01340 5607m-10 2a2 2 0 11-.001-3.999A2 2 0 01330 5609m8.904 2.453c-.962 5.478-8.846 5.374-9.808-.104-.105-.598.386-.934.994-.934h7.82c.608 0 1.099.44.994 1.038M334 5617c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m0-18c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10"></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="#aebac1"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
          />
        </svg>
        <input
          ref={ref}
          type="text"
          placeholder="Type a message"
          autoFocus
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#aebac1"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="#aebac1"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
          />
        </svg>
      </div>
    </div>
  );
};

export default MainChat;
