import "./App.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./users/components/authProvider";
import Home from "./users/pages/Home";
import Login from "./users/pages/Login";
import Register from "./users/pages/Register";
import Booking from "./users/pages/Booking";
import Profile from "./users/screen/profile";
import AdminDashboardPage from "./admin/pages/AdminDashboardPage";
import AdminBookingPage from "./admin/pages/AdminBookingPage";
import AdminUserManagePage from "./admin/pages/AdminUserManagePage";
import AdminSpecifyUserPage from "./admin/pages/AdminSpecifyUserPage";
import AdminUserEdit from "./admin/pages/AdminUserEdit";
import AdminSpecifyBookingPage from "./admin/pages/AdminSpecifyBookingPage";

function App() {
  return (
    <Theme>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/booking" element={<AdminBookingPage />} />
          <Route
            path="/admin/booking/:id"
            element={<AdminSpecifyBookingPage />}
          />
          <Route
            path="/admin/userManagement"
            element={<AdminUserManagePage />}
          />
          <Route
            path="/admin/userManagement/:id"
            element={<AdminSpecifyUserPage />}
          />
          <Route
            path="/admin/userManagement/edit/:id"
            element={<AdminUserEdit />}
          />
        </Routes>
      </AuthProvider>
    </Theme>
  );
}

export default App;
