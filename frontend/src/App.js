import "./App.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Routes, Route } from "react-router-dom";
import Home from "./users/pages/Home";
import Login from "./users/pages/Login";
import Register from "./users/pages/Register";
import Booking from "./users/pages/Booking";
import AdminDashboardPage from "./admin/pages/AdminDashboardPage";
import AdminBookingPage from "./admin/pages/AdminBookingPage";

function App() {
  return (
    <Theme>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/booking" element={<AdminBookingPage />} />
      </Routes>
    </Theme>
  );
}

export default App;
