import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Bookevent from "./pages/Bookevent";
import Payment from "./pages/Payment";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-event" element={<Bookevent />} />
        <Route path="/payment/:bookingId/:eventId/:userId/:ticketCount" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;