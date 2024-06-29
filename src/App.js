import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Components/Register";
import BoardPets from "./Pages/BoardPets";
import Services from "./Pages/Services"
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/boardpets" element={<BoardPets />} />
          <Route path="/register" element={ <Register /> } />
          <Route path="/login" element= { <Login /> } />
          <Route path="/services" element={<Services/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;