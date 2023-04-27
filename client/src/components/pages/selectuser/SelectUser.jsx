import React, { useContext } from "react";
import "./selectuser.css";
import ChatContext from "../../../context/chatContext";
import { useNavigate } from "react-router-dom";

const SelectUser = () => {
  const { setUserName } = useContext(ChatContext);

  const navigate = useNavigate();
  const clickHandler = (name) => {
    setUserName(name);
    setTimeout(() => {
      navigate("/chat");
    }, 350);
  };
  return (
    <div className="selectuser">
      <button
        onClick={() => {
          clickHandler("user-1");
        }}
      >
        Login as user-1
      </button>
      <button
        onClick={() => {
          clickHandler("user-2");
        }}
      >
        Login as user-2
      </button>
      <button
        onClick={() => {
          clickHandler("user-3");
        }}
      >
        login as user-3
      </button>
      <button
        onClick={() => {
          clickHandler("user-4");
        }}
      >
        login as user-4
      </button>
    </div>
  );
};

export default SelectUser;
