import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const ChatContext = createContext();
let socket;
let selectedChatCompare;
export const ChatsProvider = ({ children }) => {
  const BACKEND_URI = process.env.REACT_APP_SERVER_URI;
  const [isLoggedin, setisLoggedin] = useState(false);
  const [user, setuser] = useState({});
  const [chats, setchats] = useState([]);
  const [people, setpeople] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [messeges, setMesseges] = useState([]);

  const userExist = Object.keys(user).length;

  const getChats = async () => {
    try {
      if (Object.keys(user).length > 0) {
        const res = await axios.get(`${BACKEND_URI}/api/chat/${user.userName}`);
        const peopleData = await axios.get(`${BACKEND_URI}/api/people`);
        setpeople(peopleData.data);
        setchats(res.data);
      } else {
        const userExist = JSON.parse(localStorage.getItem("user"));
        if (userExist) {
          setuser(userExist);
          setisLoggedin(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //getting all messeges for the active-chat
  const getAllMesseges = async () => {
    if (activeChat?._id) {
      try {
        const { data } = await axios.get(
          `${BACKEND_URI}/api/messege/${activeChat._id}`
        );
        setMesseges(data);
        socket.emit("join chat", activeChat?._id);
      } catch (error) {
        console.log(error);
      }
    } else {
      setMesseges([]);
    }
  };

  useEffect(() => {
    if (userExist > 0) {
      socket = io(BACKEND_URI);
      socket.emit("setup", user);
      socket.emit("join public", "public");

      setInterval(() => {
        if (!document.hidden) {
          socket.emit("online", user);
        } else {
          socket.emit("disconnected", user);
        }
      }, 5000);
    }
    getChats();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    getAllMesseges();

    selectedChatCompare = activeChat;
    // eslint-disable-next-line
  }, [activeChat]);

  useEffect(() => {
    if (activeChat?._id) {
      try {
      } catch (error) {
        console.log(error);
      }
    }
  });

  useEffect(() => {
    if (activeChat?._id) {
      try {
        socket.on("chat recieved", (newChat) => {
          setchats([...chats, newChat.chat]);
        });
        socket.on("messege recieved", (newMessegeReceived) => {
          if (
            !selectedChatCompare ||
            selectedChatCompare._id === newMessegeReceived._id
          ) {
          } else {
            setMesseges([...messeges, newMessegeReceived]);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <ChatContext.Provider
      value={{
        BACKEND_URI,
        socket,
        isLoggedin,
        setisLoggedin,
        user,
        setuser,
        chats,
        messeges,
        setMesseges,
        people,
        setchats,
        activeChat,
        setActiveChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
