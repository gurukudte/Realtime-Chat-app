import React, { useContext, useEffect } from "react";
import ChatContext from "../../context/chatContext";
import { useNavigate } from "react-router-dom";
import smile from "../../assets/smile.png";
import image1 from "../../assets/1.png"
import image2 from "../../assets/2.png"
import "./LandingPage.css";

const LandingPage = () => {
  const { user } = useContext(ChatContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(user).length > 0) {
      navigate("/chat");
    }
  }, [user]);
  return (
    <div className="landingpage-wrapper">
      <header>
        <div className="logo">
          <a href="/">Spark.Chat</a>
        </div>
        <nav>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </nav>
        <div className="actions">
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <button>
              <a href="/register">Get Started Free</a>
            </button>
          </li>
        </div>
      </header>
      <main>
        <div className="captions">
          <article>
            <h2>Start chatting with friends & family.</h2>
            <p>
              Great software that allows you to chat from any place at any time
              without any interruption.
            </p>
          </article>
          <button>
            <a href="/register">Starting Chatting Now</a>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -6.5 38 38">
              <g>
                <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                  <g
                    fill="white"
                    fillRule="nonzero"
                    transform="translate(-1511 -158)"
                  >
                    <g transform="translate(1350 120)">
                      <path d="M187.812 38.58l10.513 10.424.088.082c.352.349.557.809.587 1.352l-.002.183c-.025.43-.19.842-.514 1.21l-.123.127-10.549 10.462a2.005 2.005 0 01-2.822 0 1.985 1.985 0 010-2.822l7.284-7.224H163c-1.102 0-1.999-.889-1.999-1.99 0-1.102.897-1.992 2-1.992h29.04l-7.05-6.99a1.985 1.985 0 010-2.822 2.005 2.005 0 012.822 0z"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>{" "}
          </button>
        </div>
        <div className="visual">
          <div className="color-fill"></div>
          <div className="border-circle"></div>
          <div className="smile-girl">
            <img src={smile} alt="smilling-girl" />
          </div>
          <div className="chat1">
            <img src={image1} alt="chat1" />
          </div>
          <div className="chat2">
            <img src={image2} alt="chat2" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
