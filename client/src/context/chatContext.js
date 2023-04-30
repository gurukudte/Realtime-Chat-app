import { createContext, useEffect, useState } from "react";
import axios from "axios";

const ChatContext = createContext();

export const ChatsProvider = ({ children }) => {
  const BACKEND_URI =
    "https://realtime-chat-app-production-f1de.up.railway.app/";
  const [userName, setUserName] = useState("");
  const [user, setuser] = useState({});
  const [chats, setchats] = useState([]);
  const [people, setpeople] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [newchatcreated, setnewchatcreated] = useState(false);

  const getChats = async () => {
    try {
      if (userName !== "") {
        const res = await axios.get(`${BACKEND_URI}/api/chat/${userName}`);
        const peopleData = await axios.get(`${BACKEND_URI}/api/people`);
        setchats(res.data);
        setpeople(peopleData.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getChats();
    // eslint-disable-next-line
  }, [userName]);

  return (
    <ChatContext.Provider
      value={{
        BACKEND_URI,
        userName,
        setUserName,
        user,
        setuser,
        chats,
        people,
        setchats,
        activeChat,
        setActiveChat,
        newchatcreated,
        setnewchatcreated,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;

// chats?.map(()=>{})
