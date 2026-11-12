
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import AdminLayout from "./Components/AdminLayout";
import Customers from "./Pages/Customers";
import HomeChefs from "./Pages/HomeChefs";
import Orders from "./Pages/Orders";
import Payments from "./Pages/Payments";
import Tiffins from "./Pages/Tiffins";
import Complaints from "./Pages/Complaints";
import Reviews from "./Pages/Reviews";
import Reports from "./Pages/Reports";
import Profile from "./Pages/Profile";
import ForgotPassword from "./Pages/ForgotPassword";
import Settings from "./Pages/Settings";
import Notifications from "./Pages/Notifications";
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
<Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/homechefs" element={<HomeChefs />} />
          <Route path="/tiffins" element={<Tiffins />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
