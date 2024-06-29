import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Components/Register";
import BoardPets from "./Pages/BoardPets";

import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import Success from "./Components/Success";
import Failed from "./Components/Failed";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/boardpets" element={<BoardPets />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/paymentsuccess" element={<Success />} />
          <Route path="/paymentfailed" element={<Failed />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
