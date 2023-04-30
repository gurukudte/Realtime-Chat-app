import "./App.css";
import { ChatsProvider } from "./context/chatContext";
import MainRouter from "./routers/MainRouter";

function App() {
  console.log(process.env.REACT_APP_SERVER_URI)
  return (
    <ChatsProvider>
      <div className="App">
        <MainRouter />
      </div>
    </ChatsProvider>
  );
}

export default App;
