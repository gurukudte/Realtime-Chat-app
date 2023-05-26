import React, { useContext, useState } from "react";
import "./SideBar.css";
import ChatContext from "../../context/chatContext";
import profilepic from "../../assets/profilePic.jpg";
import SingleChatHeader from "./singlechatHeader/SingleChatHeader";
import SideBarNewChat from "./sidebar-newchat/SideBarNewChat";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const { chats, user } = useContext(ChatContext);
  const [newChattoggle, setnewChattoggle] = useState("hide");
  const [logouttoggle, setlogouttoggle] = useState(false);

  const navigate = useNavigate();

  const clickHandler = () => {
    setnewChattoggle("show");
  };
  const logouttoggleclickhandler = () => {
    setlogouttoggle(!logouttoggle);
  };
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
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
                fill="#aebac1"
                className="icon-chat"
                viewBox="0 0 16 16"
                onClick={clickHandler}
              >
                <path d="M0 2a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4.414a1 1 0 00-.707.293L.854 15.146A.5.5 0 010 14.793V2zm3.5 1a.5.5 0 000 1h9a.5.5 0 000-1h-9zm0 2.5a.5.5 0 000 1h9a.5.5 0 000-1h-9zm0 2.5a.5.5 0 000 1h5a.5.5 0 000-1h-5z"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#aebac1"
                viewBox="0 0 32 32"
                className="icon-options"
                onClick={logouttoggleclickhandler}
              >
                <path d="M12.15 28.012v-.85c.019-.069.05-.131.063-.2.275-1.788 1.762-3.2 3.506-3.319 1.95-.137 3.6.975 4.137 2.787.069.238.119.488.181.731v.85c-.019.056-.05.106-.056.169-.269 1.65-1.456 2.906-3.081 3.262-.125.025-.25.063-.375.094h-.85c-.056-.019-.113-.05-.169-.056-1.625-.262-2.862-1.419-3.237-3.025-.037-.156-.081-.3-.119-.444zm7.888-24.024v.85c-.019.069-.05.131-.056.2-.281 1.8-1.775 3.206-3.538 3.319-1.944.125-3.588-1-4.119-2.819-.069-.231-.119-.469-.175-.7v-.85c.019-.056.05-.106.063-.162.3-1.625 1.244-2.688 2.819-3.194.206-.069.425-.106.637-.162h.85c.056.019.113.05.169.056 1.631.269 2.863 1.419 3.238 3.025l.113.437zm-.001 11.587v.85c-.019.069-.05.131-.063.2-.281 1.794-1.831 3.238-3.581 3.313-1.969.087-3.637-1.1-4.106-2.931-.05-.194-.094-.387-.137-.581v-.85c.019-.069.05-.131.063-.2.275-1.794 1.831-3.238 3.581-3.319 1.969-.094 3.637 1.1 4.106 2.931.05.2.094.394.137.588z"></path>
              </svg>
              <div
                className={`logout ${logouttoggle ? "show" : "hide"}`}
                onClick={logoutHandler}
              >
                <span>Log out</span>
              </div>
            </div>
          </nav>
          <SingleChatHeader newchats={chats} />
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
