
import React, { useEffect, useState } from "react";
import {
  FaBell,
  FaSearch,
  FaPaperPlane,
  FaUsers,
  FaUserTie,
  FaPlus,
  FaEye,
  FaTrash,
  FaTimes,
  FaSave,
  FaFilter,
} from "react-icons/fa";
import "./CSS/Notifications.css";

const initialNotifications = [
  {
    id: "NTF1001",
    title: "Welcome to Tiffin Marketplace",
    message: "Welcome! Explore homemade meals from our HomeChefs.",
    audience: "Customer",
    category: "General",
    status: "Sent",
    date: "2026-11-09",
  },
  {
    id: "NTF1002",
    title: "Complete Your Chef Profile",
    message: "Please complete your profile to improve your visibility.",
    audience: "HomeChef",
    category: "Update",
    status: "Sent",
    date: "2026-11-08",
  },
  {
    id: "NTF1003",
    title: "Special Festival Offer",
    message: "Enjoy special offers on your favourite homemade meals.",
    audience: "Everyone",
    category: "Offer",
    status: "Draft",
    date: "2026-11-08",
  },
  {
    id: "NTF1004",
    title: "Platform Maintenance Notice",
    message: "Scheduled platform maintenance will take place soon.",
    audience: "Everyone",
    category: "Alert",
    status: "Sent",
    date: "2026-11-07",
  },
];

function Notifications() {
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem("adminNotifications");
      return saved ? JSON.parse(saved) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  const [search, setSearch] = useState("");
  const [audienceFilter, setAudienceFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const emptyForm = {
    title: "",
    message: "",
    audience: "Everyone",
    category: "General",
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem("adminNotifications", JSON.stringify(notifications));
  }, [notifications]);

  const sentCount = notifications.filter(n => n.status === "Sent").length;
  const draftCount = notifications.filter(n => n.status === "Draft").length;
  const scheduledCount = notifications.filter(n => n.status === "Scheduled").length;

  const filteredNotifications = notifications.filter(notification => {
    const text = search.toLowerCase();

    const matchesSearch =
      notification.id.toLowerCase().includes(text) ||
      notification.title.toLowerCase().includes(text) ||
      notification.message.toLowerCase().includes(text);

    const matchesAudience =
      audienceFilter === "All" || notification.audience === audienceFilter;

    const matchesStatus =
      statusFilter === "All" || notification.status === statusFilter;

    return matchesSearch && matchesAudience && matchesStatus;
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveNotification = (status) => {
    if (!formData.title.trim() || !formData.message.trim()) {
      alert("Please enter both notification title and message.");
      return;
    }

    const newNotification = {
      id: `NTF${Date.now().toString().slice(-7)}`,
      title: formData.title.trim(),
      message: formData.message.trim(),
      audience: formData.audience,
      category: formData.category,
      status,
      date: new Date().toISOString().slice(0, 10),
    };

    setNotifications(prev => [newNotification, ...prev]);
    setFormData(emptyForm);
    setShowForm(false);

    alert(
      status === "Sent"
        ? "Announcement saved as Sent in Admin Panel!"
        : "Announcement saved as Draft!"
    );
  };

  const deleteNotification = (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?")) {
      return;
    }

    setNotifications(prev => prev.filter(n => n.id !== id));
    setSelectedNotification(null);
  };

  const openDetails = (notification) => {
    setSelectedNotification(notification);
  };

  return (
    <div className="admin-notifications-page">
      <div className="admin-notifications-heading">
        <div>
          <h1>Notifications & Announcements</h1>
          <p>Create and manage platform announcements.</p>
        </div>

        <button
          className="notification-create-btn"
          onClick={() => {
            setFormData(emptyForm);
            setShowForm(true);
          }}
        >
          <FaPlus /> Create Announcement
        </button>
      </div>

      <div className="notification-stats">
        <div className="notification-stat-card">
          <span>Total Notifications</span>
          <h2>{notifications.length}</h2>
          <div className="notification-stat-icon green"><FaBell /></div>
        </div>

        <div className="notification-stat-card">
          <span>Sent</span>
          <h2>{sentCount}</h2>
          <div className="notification-stat-icon orange"><FaPaperPlane /></div>
        </div>

        <div className="notification-stat-card">
          <span>Drafts</span>
          <h2>{draftCount}</h2>
          <div className="notification-stat-icon green"><FaSave /></div>
        </div>

        <div className="notification-stat-card">
          <span>Scheduled</span>
          <h2>{scheduledCount}</h2>
          <div className="notification-stat-icon orange"><FaBell /></div>
        </div>
      </div>

      <div className="notification-audience-info">
        <div>
          <FaUsers />
          <span>Customer Announcements</span>
        </div>
        <div>
          <FaUserTie />
          <span>HomeChef Announcements</span>
        </div>
        <div>
          <FaBell />
          <span>Everyone</span>
        </div>
      </div>

      <div className="notification-toolbar">
        <div className="notification-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search title, message or ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="notification-filter">
          <FaFilter />
          <select
            value={audienceFilter}
            onChange={e => setAudienceFilter(e.target.value)}
          >
            <option value="All">All Audiences</option>
            <option value="Customer">Customer</option>
            <option value="HomeChef">HomeChef</option>
            <option value="Everyone">Everyone</option>
          </select>
        </div>

        <div className="notification-filter">
          <FaFilter />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Sent">Sent</option>
            <option value="Draft">Draft</option>
            <option value="Scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      <div className="notification-list-container">
        <div className="notification-list-heading">
          <h3>Announcement History</h3>
          <span>{filteredNotifications.length} notifications</span>
        </div>

        <div className="notification-table-scroll">
          <table className="notification-table">
            <thead>
              <tr>
                <th>Notification ID</th>
                <th>Title</th>
                <th>Audience</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredNotifications.map(notification => (
                <tr key={notification.id}>
                  <td><strong className="notification-id">{notification.id}</strong></td>
                  <td className="notification-title-cell">{notification.title}</td>
                  <td>
                    <span className={`notification-audience ${notification.audience.toLowerCase()}`}>
                      {notification.audience}
                    </span>
                  </td>
                  <td>{notification.category}</td>
                  <td>{notification.date}</td>
                  <td>
                    <span className={`notification-status ${notification.status.toLowerCase()}`}>
                      {notification.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="notification-view-btn"
                      title="View Details"
                      onClick={() => openDetails(notification)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="notification-delete-btn"
                      title="Delete"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredNotifications.length === 0 && (
                <tr>
                  <td colSpan="7" className="notification-empty">
                    <FaBell />
                    <p>No notifications found!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div
          className="notification-modal-overlay"
          onClick={() => setShowForm(false)}
        >
          <div
            className="notification-modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="notification-modal-header">
              <div>
                <h2>Create Announcement</h2>
                <p>Prepare a message for your platform users.</p>
              </div>
              <button onClick={() => setShowForm(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="notification-modal-body">
              <label>Announcement Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter announcement title"
                value={formData.title}
                onChange={handleInput}
                maxLength="100"
              />

              <label>Target Audience</label>
              <select
                name="audience"
                value={formData.audience}
                onChange={handleInput}
              >
                <option value="Everyone">Everyone</option>
                <option value="Customer">Customers Only</option>
                <option value="HomeChef">HomeChefs Only</option>
              </select>

              <label>Notification Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInput}
              >
                <option value="General">General</option>
                <option value="Offer">Offer</option>
                <option value="Alert">Alert</option>
                <option value="Update">Update</option>
              </select>

              <label>Message</label>
              <textarea
                name="message"
                rows="5"
                placeholder="Write your announcement message..."
                value={formData.message}
                onChange={handleInput}
                maxLength="1000"
              />

              <span className="notification-character-count">
                {formData.message.length}/1000 characters
              </span>
            </div>

            <div className="notification-modal-actions">
              <button
                className="notification-draft-btn"
                onClick={() => saveNotification("Draft")}
              >
                <FaSave /> Save Draft
              </button>

              <button
                className="notification-send-btn"
                onClick={() => saveNotification("Sent")}
              >
                <FaPaperPlane /> Send Announcement
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedNotification && (
        <div
          className="notification-modal-overlay"
          onClick={() => setSelectedNotification(null)}
        >
          <div
            className="notification-modal notification-details-modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="notification-modal-header">
              <div>
                <h2>Announcement Details</h2>
                <p>{selectedNotification.id}</p>
              </div>
              <button onClick={() => setSelectedNotification(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="notification-modal-body">
              <div className="notification-detail-row">
                <span>Title</span>
                <strong>{selectedNotification.title}</strong>
              </div>
              <div className="notification-detail-row">
                <span>Audience</span>
                <strong>{selectedNotification.audience}</strong>
              </div>
              <div className="notification-detail-row">
                <span>Category</span>
                <strong>{selectedNotification.category}</strong>
              </div>
              <div className="notification-detail-row">
                <span>Date</span>
                <strong>{selectedNotification.date}</strong>
              </div>
              <div className="notification-detail-row">
                <span>Status</span>
                <strong>{selectedNotification.status}</strong>
              </div>

              <div className="notification-detail-message">
                <span>Message</span>
                <p>{selectedNotification.message}</p>
              </div>
            </div>

            <div className="notification-modal-actions">
              <button
                className="notification-delete-modal-btn"
                onClick={() => deleteNotification(selectedNotification.id)}
              >
                <FaTrash /> Delete
              </button>
              <button
                className="notification-draft-btn"
                onClick={() => setSelectedNotification(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;
