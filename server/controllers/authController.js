import User from "../models/userModel.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const Secret = process.env.SECRET_KEY;

const register = async (req, res) => {
  const { email, userName, password } = req.body;

  try {
    const userExist = await User.find({ email });
    console.log(userExist);
    if (userExist.length === 0) {
      const user = await User.create({
        email,
        userName,
        password: CryptoJS.AES.encrypt(password, Secret),
      });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(500).jspn("something went wrong");
      }
    } else {
      res.status(400).json("User Already exist with same Email ID");
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: { $eq: email } });
    if (user) {
      const originalpassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);
      if (originalpassword == password) {
        const accessToken = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          Secret,
          { expiresIn: "9h" }
        );
        const { password, ...info } = user._doc;
        res.status(200).json({ ...info, accessToken });
      } else {
        res.status(401).json("Wrong Username or password");
      }
    } else {
      res.status(400).json(`User not found with email: ${email}`);
    }
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

export { register, login };
