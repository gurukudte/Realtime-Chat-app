import React from "react";
import { BrowserRouter } from "react-router-dom";
import EachRouter from "./EachRouter";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <EachRouter />
    </BrowserRouter>
  );
};

export default MainRouter;
