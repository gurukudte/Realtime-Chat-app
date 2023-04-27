import { Route, Routes } from "react-router-dom";
import { Register, Chat, Login } from "../components";

const EachRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default EachRouter;
