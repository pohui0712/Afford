import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Route, Routes } from "react-router-dom";
import AdminBookingEditPage from "./admin/pages/AdminBookingEditPage";
import AdminBookingPage from "./admin/pages/AdminBookingPage";
import AdminDashboardPage from "./admin/pages/AdminDashboardPage";
import AdminSpecifyBookingPage from "./admin/pages/AdminSpecifyBookingPage";
import AdminSpecifyUserPage from "./admin/pages/AdminSpecifyUserPage";
import AdminUserEdit from "./admin/pages/AdminUserEdit";
import AdminUserManagePage from "./admin/pages/AdminUserManagePage";
import "./App.css";
import { AuthProvider } from "./users/components/authProvider";
import Appointment from "./users/components/userAppoinment";
import Dashboard from "./users/components/userDashboard";
import History from "./users/components/userHistory";
import Settings from "./users/components/userSetting";
import Booking from "./users/pages/Booking";
import Home from "./users/pages/Home";
import Login from "./users/pages/Login";
import Register from "./users/pages/Register";
import MechanistMain from "./mechanist/pages/MechanistMain";
import MechanistUserAppointment from "./mechanist/pages/MechanistUserAppointment";
import MechanistProgress from "./mechanist/pages/MechanistProgress";

function App() {
  return (
    <Theme>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/dashboard/:id" element={<Dashboard />} />
          <Route path="/user/appointment/:id" element={<Appointment />} />
          <Route path="/user/history/:id" element={<History />} />
          <Route path="/user/settings/:id" element={<Settings />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/booking" element={<AdminBookingPage />} />
          <Route
            path="/admin/booking/:id"
            element={<AdminSpecifyBookingPage />}
          />
          <Route
            path="/admin/booking/edit/:id"
            element={<AdminBookingEditPage />}
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
          <Route path="/mechanist" element={<MechanistMain />} />
          <Route
            path="/mechanist/userAppointment/:id"
            element={<MechanistUserAppointment />}
          />
          <Route
            path="/mechanist/progress/:id"
            element={<MechanistProgress />}
          />
        </Routes>
      </AuthProvider>
    </Theme>
  );
}

export default App;
