import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Bookevent from "./pages/Bookevent";
import Payment from "./pages/Payment";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-event" element={<Bookevent />} />
        <Route path="/payment/:eventId/:ticketCount" element={<Payment />} />
      </Routes>
    </Router>
  );
};

export default App;