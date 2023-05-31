import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "../context/chatContext";
import { Route, Routes } from "react-router-dom";
import { Protected } from "../components";
import { Register, Chat, Login,LandingPage } from "../pages";

const EachRouter = () => {
  const { isLoggedin } = useContext(ChatContext);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/chat"
        element={
          <Protected isLoggedin={isLoggedin}>
            <Chat />
          </Protected>
        }
      />
    </Routes>
  );
};

export default EachRouter;
