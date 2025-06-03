import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import MenuPage from "./pages/MenuPage";
import Cart from "./pages/Cart";
import Instruction from "./pages/Instruction";
import Status from "./pages/Status"; 
const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MenuPage cart={cart} setCart={setCart} />}
        />
        <Route
          path="/cart"
          element={<Cart cartItems={cart} setCart={setCart} />}
        />
        <Route
          path="/instructions"
          element={<Instruction />}
        />
        <Route
          path="/status" 
          element={<Status />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
