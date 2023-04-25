import "./App.css";
import { ChatsProvider } from "./context/chatContext";
import MainRouter from "./routers/MainRouter";

function App() {
  return (
    <ChatsProvider>
      <div className="App">
        <MainRouter />
      </div>
    </ChatsProvider>
  );
}

export default App;
