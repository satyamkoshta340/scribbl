import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import "./styles/main.scss";

import Home from "./ui/home";
import Landing from "./ui/landing";
import WaitingHall from "./ui/waitingHall";
import GamePlay from "./ui/gamePlay";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/landing/:id" element={<Landing />} />
        <Route path="/waitingHall/:id" element={<WaitingHall />} />
        <Route path="/gamePlay/:id" element={<GamePlay />} />
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

