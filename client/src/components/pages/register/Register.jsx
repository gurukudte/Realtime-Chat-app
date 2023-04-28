import React, { useContext, useState } from "react";
import "./Register.css";
import ChatContext from "../../../context/chatContext";
import { useNavigate } from "react-router-dom";
import Axios from "../../../utils/axiosAPI";

const SelectUser = () => {
  const { setuser, setUserName ,BACKEND_URI} = useContext(ChatContext);
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const click = async (event) => {
    event.preventDefault();
    console.log(userData);
    const registerResponse = await Axios(
      "POST",
      `${BACKEND_URI}/api/auth/register`,
      userData
    );
    if (registerResponse.status === 200) {
      const loginResponse = await Axios(
        "POST",
        `${BACKEND_URI}/api/auth/login`,
        userData
      );
      if (loginResponse.status === 200) {
        setUserName(loginResponse.data.userName);
        setuser(loginResponse.data);
        setUserData({
          userName: "",
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/chat");
        }, 350);
      }
    }
  };
  const InputchangeHandler = (value, field) => {
    setUserData({ ...userData, [field]: value });
  };
  return (
    <div className="selectuser">
      <div className="selectuser-signup-wrapper">
        <div className="selectuser-signup-wrapper-heading">
          <h3>Get Started Now</h3>
          <p>Enter your credentials to access your account</p>
        </div>
        <div className="selectuser-signup-wrapper-form">
          <form
            onSubmit={(e) => {
              click(e);
            }}
          >
            <label htmlFor="username">
              Username
              <input
                type="text"
                value={userData.userName}
                maxLength="10"
                onChange={(e) => {
                  InputchangeHandler(e.target.value, "userName");
                }}
              />
            </label>
            <label htmlFor="email">
              Email address
              <input
                type="email"
                value={userData.email}
                onChange={(e) => {
                  InputchangeHandler(e.target.value, "email");
                }}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                value={userData.password}
                minLength={6}
                onChange={(e) => {
                  InputchangeHandler(e.target.value, "password");
                }}
              />
            </label>
            <div className="selectuser-signup-wrapper-form-terms">
              <input type="checkbox" name="terms" />
              <p>
                I agree to the <a href="/mk">Terms & Privacy</a>
              </p>
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
        <div className="selectuser-signup-wrapper-signin">
          <p>
            Have an account?<a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectUser;
