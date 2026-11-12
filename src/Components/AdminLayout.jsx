
import React, { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaThLarge,
  FaUsers,
  FaUserTie,
  FaUtensils,
  FaShoppingBag,
  FaWallet,
  FaHeadset,
  FaStar,
  FaChartBar,
  FaBell,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaChevronRight,
  FaShieldAlt,
} from "react-icons/fa";
import "./CSS/AdminLayout.css";

const menuItems = [
  { title: "Dashboard", path: "/dashboard", icon: <FaThLarge /> },
  { title: "Customer Management", path: "/customers", icon: <FaUsers /> },
  { title: "HomeChef Management", path: "/homechefs", icon: <FaUserTie /> },
  { title: "Tiffin Management", path: "/tiffins", icon: <FaUtensils /> },
  { title: "Orders Management", path: "/orders", icon: <FaShoppingBag /> },
  { title: "Payments & Commission", path: "/payments", icon: <FaWallet /> },
  { title: "Complaints & Support", path: "/complaints", icon: <FaHeadset /> },
  { title: "Reviews & Ratings", path: "/reviews", icon: <FaStar /> },
  { title: "Reports & Analytics", path: "/reports", icon: <FaChartBar /> },

  { title: "Notifications", path: "/notifications", icon: <FaBell /> },
];

const bottomItems = [
  { title: "Admin Profile", path: "/profile", icon: <FaUserCircle /> },
  { title: "Settings", path: "/settings", icon: <FaCog /> },
];

const pageTitles = {
  "/dashboard": "Dashboard",
  "/customers": "Customer Management",
  "/homechefs": "HomeChef Management",
  "/tiffins": "Tiffin Management",
  "/orders": "Orders Management",
  "/payments": "Payments & Commission",
  "/complaints": "Complaints & Support",
  "/reviews": "Reviews & Ratings",
  "/reports": "Reports & Analytics",
  "/notifications": "Notifications",
  "/profile": "Admin Profile",
  "/settings": "Settings",
};

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
  const adminName = adminUser.name || "Super Admin";

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminRememberMe");

    navigate("/login", { replace: true });
  };

  const closeSidebar = () => setSidebarOpen(false);

  const renderLinks = (items) =>
    items.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={closeSidebar}
        className={({ isActive }) =>
          `admin-nav-link ${isActive ? "active" : ""}`
        }
      >
        <span className="admin-nav-icon">{item.icon}</span>
        <span className="admin-nav-text">{item.title}</span>
        <FaChevronRight className="admin-nav-arrow" />
      </NavLink>
    ));

  return (
    <div className="admin-layout">
      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={closeSidebar}></div>
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-logo">
            <FaShieldAlt />
          </div>
          <div>
            <h2>Tiffin<span>Wala</span></h2>
            <p>ADMIN PANEL</p>
          </div>
          <button
            className="admin-sidebar-close"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        <div className="admin-sidebar-section  admin-sidebar-main-menu">
          <span className="admin-sidebar-label">MAIN MENU</span>
          <nav>{renderLinks(menuItems)}</nav>
        </div>

        <div className="admin-sidebar-section admin-sidebar-bottom">
          <span className="admin-sidebar-label">ACCOUNT</span>
          <nav>{renderLinks(bottomItems)}</nav>

          <button className="admin-logout-btn" onClick={handleLogout}>
            <span className="admin-nav-icon"><FaSignOutAlt /></span>
            <span>Logout</span>
          </button>
        </div>

        <div className="admin-sidebar-version">
          TiffinWala Admin · Demo Version
        </div>
      </aside>

      <div className="admin-main-area">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              className="admin-menu-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <FaBars />
            </button>

            <div className="admin-breadcrumb">
              <span>Admin</span>
              <FaChevronRight />
              <strong>{pageTitles[location.pathname] || "Dashboard"}</strong>
            </div>
          </div>

          <div className="admin-topbar-right">
            <button
              className="admin-topbar-notification"
              onClick={() => navigate("/notifications")}
              title="Notifications"
            >
              <FaBell />
              <span></span>
            </button>

            <div className="admin-topbar-profile">
              <div className="admin-topbar-avatar">
                {adminName.charAt(0).toUpperCase()}
              </div>
              <div className="admin-topbar-user-info">
                <strong>{adminName}</strong>
                <span>Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        <main className="admin-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
