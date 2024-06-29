import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Components/Login";
import BoardPets from "./Pages/BoardPets";
import Navbar from "./Components/Navbar"
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/boardpets" element={<BoardPets />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;