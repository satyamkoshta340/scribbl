import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import "./styles/main.scss";

import Home from "./ui/home";
import Landing from "./ui/landing";
import WaitingHall from "./ui/waitingHall";
import GamePlay from "./ui/gamePlay";
function App() {
  const [name, setName] = useState("");
  const [flag, setFlag] = useState(false);
  const [timer, setTimer] = useState(80);
  const [rounds, setRounds] = useState(5);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home name={name} setName = {setName} setFlag={setFlag}/>}></Route>
        <Route path="/landing/:id" element={<Landing name={name} setName = {setName} flag={flag} />} />
        <Route path="/waitingHall/:id" element={<WaitingHall timer={timer} rounds={rounds} setRounds={setRounds} setTimer={setTimer} />} />
        <Route path="/gamePlay/:id" element={<GamePlay timer={timer} rounds={rounds} setRounds={setRounds} name={name} />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>404</p>
            </main>
          }
        />
      </Routes>
    </Router>
    
  );
}

export default App;

