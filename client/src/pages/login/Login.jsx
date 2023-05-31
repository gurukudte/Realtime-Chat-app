import React, { useContext, useState } from "react";
import "./Login.css";
import ChatContext from "../../context/chatContext";
import { useNavigate } from "react-router-dom";
import Axios from "../../utils/axiosAPI";

const SelectUser = () => {
  const { setuser, BACKEND_URI, setisLoggedin } = useContext(ChatContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  //Intializing React Router Navigate
  const navigate = useNavigate();
  const click = async (event) => {
    event.preventDefault();

    //sending login request to backend
    const loginResponse = await Axios(
      "POST",
      `${BACKEND_URI}/api/auth/login`,
      userData
    );

    //checking that loginresponse is a success & proceeding for chat page
    if (loginResponse.status === 200) {
      setuser(loginResponse.data);
      setUserData({
        email: "",
        password: "",
      });
      localStorage.setItem("user", JSON.stringify(loginResponse.data));
      setisLoggedin(true);
      navigate("/chat");
    }
  };

  //Input change funtion to save userdata
  const InputchangeHandler = (value, field) => {
    setUserData({ ...userData, [field]: value });
  };
  return (
    <div className="selectuser">
      <div className="selectuser-signup-wrapper">
        <div className="selectuser-signup-wrapper-heading">
          <h3>Welcome Back!</h3>
          <p>Enter your credentials to access your account</p>
        </div>
        <div className="selectuser-signup-wrapper-form">
          <form
            onSubmit={(e) => {
              click(e);
            }}
          >
            <label htmlFor="email">
              Email address
              <input
                autoComplete="username"
                type="email"
                autoFocus="autoFocus"
                value={userData.email}
                onChange={(e) => {
                  InputchangeHandler(e.target.value, "email");
                }}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                autoComplete="password"
                type="password"
                value={userData.password}
                minLength={6}
                onChange={(e) => {
                  InputchangeHandler(e.target.value, "password");
                }}
              />
            </label>
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="selectuser-signup-wrapper-signin">
          <p>
            Don't have an account?<a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectUser;
