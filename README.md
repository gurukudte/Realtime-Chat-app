# Realtime-Chat-app
Full-Stack Whatsapp Clone using MERN Stack and Socket.io

[Visit Now](https://realtime-chat-app-gurukudte.vercel.app/) 🚀

## 🖥️ Tech Stack
**Frontend:**

![reactjs](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)&nbsp;
![react-router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)&nbsp;

**Backend:**

![nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)&nbsp;
![expressjs](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)&nbsp;
![mongodb](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)&nbsp;
![jwt](	https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)&nbsp;

**Realtime Communication:**

![socketio](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)

## 🚀 Features
- Login/Signup User Account
- Login using Email
- Add singal Chat

## Installation

- `git clone <this_url> && cd <repo_name>`
- install npm on client and server
  - `cd client`
  - `npm install`
  - `cd server`
  - `npm install`
- Configure Server
  - Create `.env` file in `server`
  - Update `.env` file with `PORT=8080,MONGO_URI=<your_Mongo_database_link> ,SECRET_KEY=<your_secret>, CLIENT_URI = "http://localhost:3000"`
- Configure Client
  - Create `.env` file in `client`
  - Update `.env` file with `REACT_APP_SERVER_URI = http://localhost:8080`
- Running the application in development mode
  - Development Mode (Client only): `cd client` then `npm start` then open `http://localhost:3000` in a browser
  - Development Mode (Server only): `cd server` then `npm run dev` then open `http://localhost:8080` in a browser
- Default Credentials : 
    - Email : `wolverine@gmail.com` , Password : `wolverine`
    - Email : `ironman@gmail.com` , Password : `ironman`