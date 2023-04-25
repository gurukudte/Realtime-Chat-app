import { createContext, useEffect, useState } from "react";
import axios from "axios";

const ChatContext = createContext();

export const ChatsProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [user, setuser] = useState({});
  const [chats, setchats] = useState([]);
  const [people, setpeople] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [newchatcreated, setnewchatcreated] = useState(false);

  

  const getChats = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/chat/${userName}`);
      const userData = await axios.get(`http://localhost:8080/api/${userName}`);
      const peopleData = await axios.get(`http://localhost:8080/api/people`);
      setuser(userData.data);
      setchats(res.data);
      setpeople(peopleData.data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getChats();
  }, [userName, newchatcreated]);

  return (
    <ChatContext.Provider
      value={{
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
