import React, { useContext, useEffect, useRef, useState } from "react";
import "./MainChat.css";
import profilepic from "../../../assets/profilePic.jpg";
import axios from "axios";
import ChatContext from "../../../context/chatContext";

let selectedChatCompare;
const MainChat = ({ activeChat, socket }) => {
  const ref = useRef("");
  const { user, BACKEND_URI } = useContext(ChatContext);
  const [message, setMessage] = useState("");
  const [messeges, setMesseges] = useState([]);
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const getAllMesseges = async () => {
    if (activeChat?._id) {
      try {
        const { data } = await axios.get(
          `${BACKEND_URI}/api/messege/${activeChat._id}`
        );
        setMesseges(data);
        socket.emit("join chat", activeChat?._id);
        socket.emit("join public", "public");
      } catch (error) {
        console.log(error);
      }
    } else {
      setMesseges([]);
    }
  };

  //sending messege to backend to create a chat & send messege
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      if (activeChat._id) {
        const { data } = await axios.post(
          `${BACKEND_URI}/api/messege/${user._id}`,
          { chatId: activeChat._id, content: message }
        );

        socket.emit("new messege", data);
        setMesseges([...messeges, data]);
        ref.current.value = "";
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
  const MessegesHTML = () => {
    return (
      messeges?.length > 0 &&
      messeges.map((mess) => {
        return (
          <>
            <div
              className={mess.sender._id === user._id ? "sender" : "receiver"}
            >
              {" "}
              <p>{mess.content}</p>
            </div>
          </>
        );
      })
    );
  };
  useEffect(() => {
    MessegesHTML();
  }, [messeges]);

  useEffect(() => {
    getAllMesseges();

    selectedChatCompare = activeChat;
  }, [activeChat]);

  useEffect(() => {
    socket.on("messege recieved", (newMessegeReceived) => {
      console.log(selectedChatCompare._id);
      console.log(newMessegeReceived._id);
      if (
        !selectedChatCompare ||
        selectedChatCompare._id === newMessegeReceived._id
      ) {
      } else {
        console.log(newMessegeReceived);
        setMesseges([...messeges, newMessegeReceived]);
      }
    });
  });

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
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      <div className="main-chat-content">
        <div className="main-chat-content-wrapper">
          <MessegesHTML />
        </div>
      </div>
      <div className="main-chat-footer">
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
            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
          />
        </svg>
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
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
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
