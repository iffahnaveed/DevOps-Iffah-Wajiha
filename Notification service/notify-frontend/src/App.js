import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotificationList from "./components/notifyy";  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:booking_id" element={<NotificationList />} />  {/* ✅ Booking ID in URL */}
      </Routes>
    </Router>
  );
}

export default App;