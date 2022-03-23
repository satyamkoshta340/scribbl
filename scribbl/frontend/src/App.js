import React from "react";
import Chat from "./components/chat";
import Canvas from "./components/canvas";
import "./styles/main.scss";

function App() {
  return (
    <div className="App">
      <Chat />
      <Canvas />
    </div>
  );
}

export default App;

