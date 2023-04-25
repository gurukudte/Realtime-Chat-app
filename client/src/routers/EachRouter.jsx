import { Route, Routes } from "react-router-dom";
import { SelectUser, Chat } from "../components";

const EachRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SelectUser />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default EachRouter;
