import express from "express";
const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  res.status(200).json("welcom to home route");
});

export default homeRouter;
