
import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaEye,
  FaTimes,
  FaHeadset,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaFilter,
  FaPaperPlane,
} from "react-icons/fa";
import "./CSS/Complaints.css";

const initialComplaints = [
  {
    id: "CMP1001",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    type: "Customer",
    subject: "Late Order Delivery",
    category: "Delivery",
    message: "My tiffin order was delivered very late. Please look into this issue.",
    date: "2026-11-08",
    priority: "High",
    status: "Open",
    reply: "",
  },
  {
    id: "CMP1002",
    name: "Ramesh Kumar",
    email: "ramesh@example.com",
    type: "HomeChef",
    subject: "Payment Not Received",
    category: "Payment",
    message: "My payment for completed orders is still pending.",
    date: "2026-11-08",
    priority: "High",
    status: "In Progress",
    reply: "We are checking your payment details.",
  },
  {
    id: "CMP1003",
    name: "Priya Singh",
    email: "priya@example.com",
    type: "Customer",
    subject: "Wrong Tiffin Received",
    category: "Food Quality",
    message: "I received a different tiffin from the one I ordered.",
    date: "2026-11-07",
    priority: "Medium",
    status: "Open",
    reply: "",
  },
  {
    id: "CMP1004",
    name: "Sunita Sharma",
    email: "sunita@example.com",
    type: "HomeChef",
    subject: "Unable to Update Menu",
    category: "Technical",
    message: "I am unable to update my tiffin availability.",
    date: "2026-11-07",
    priority: "Medium",
    status: "Resolved",
    reply: "Your issue has been resolved.",
  },
  {
    id: "CMP1005",
    name: "Amit Verma",
    email: "amit@example.com",
    type: "Customer",
    subject: "Refund Request",
    category: "Refund",
    message: "My order was cancelled but I have not received my refund.",
    date: "2026-11-06",
    priority: "High",
    status: "In Progress",
    reply: "Your refund request is under review.",
  },
  {
    id: "CMP1006",
    name: "Neha Gupta",
    email: "neha@example.com",
    type: "Customer",
    subject: "App Feedback",
    category: "Other",
    message: "I would like to suggest some improvements to the platform.",
    date: "2026-11-05",
    priority: "Low",
    status: "Closed",
    reply: "Thank you for sharing your feedback.",
  },
  {
    id: "CMP1007",
    name: "Priya Singh",
    email: "chefpriya@example.com",
    type: "HomeChef",
    subject: "Account Verification",
    category: "Account",
    message: "Please update me about my account verification.",
    date: "2026-11-04",
    priority: "Medium",
    status: "Open",
    reply: "",
  },
];

const statusOptions = ["Open", "In Progress", "Resolved", "Closed"];

function Complaints() {
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem("adminComplaints");
    return saved ? JSON.parse(saved) : initialComplaints;
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    localStorage.setItem("adminComplaints", JSON.stringify(complaints));
  }, [complaints]);

  const total = complaints.length;
  const open = complaints.filter(c => c.status === "Open").length;
  const inProgress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(
    c => ["Resolved", "Closed"].includes(c.status)
  ).length;

  const filteredComplaints = complaints.filter(complaint => {
    const text = search.toLowerCase();

    const matchesSearch =
      complaint.id.toLowerCase().includes(text) ||
      complaint.name.toLowerCase().includes(text) ||
      complaint.subject.toLowerCase().includes(text) ||
      complaint.category.toLowerCase().includes(text);

    const matchesStatus =
      statusFilter === "All" || complaint.status === statusFilter;

    const matchesType =
      typeFilter === "All" || complaint.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const updateStatus = (id, status) => {
    setComplaints(prev =>
      prev.map(c => c.id === id ? { ...c, status } : c)
    );

    setSelectedComplaint(prev =>
      prev?.id === id ? { ...prev, status } : prev
    );
  };

  const saveReply = () => {
    if (!replyText.trim()) {
      alert("Please write a reply first.");
      return;
    }

    const updatedReply = replyText.trim();

    setComplaints(prev =>
      prev.map(c =>
        c.id === selectedComplaint.id
          ? { ...c, reply: updatedReply }
          : c
      )
    );

    setSelectedComplaint(prev => ({
      ...prev,
      reply: updatedReply,
    }));

    setReplyText("");
    alert("Reply saved successfully!");
  };

  return (
    <div className="complaints-page">
      <div className="complaints-heading">
        <div>
          <h1>Complaints & Support</h1>
          <p>Manage customer and HomeChef support requests.</p>
        </div>

        <div className="complaints-heading-icon">
          <FaHeadset />
        </div>
      </div>

      <div className="complaint-stats">
        <div className="complaint-stat-card">
          <span>Total Complaints</span>
          <h2>{total}</h2>
          <div className="complaint-stat-icon green">
            <FaHeadset />
          </div>
        </div>

        <div className="complaint-stat-card">
          <span>Open Complaints</span>
          <h2>{open}</h2>
          <div className="complaint-stat-icon orange">
            <FaExclamationCircle />
          </div>
        </div>

        <div className="complaint-stat-card">
          <span>In Progress</span>
          <h2>{inProgress}</h2>
          <div className="complaint-stat-icon blue">
            <FaClock />
          </div>
        </div>

        <div className="complaint-stat-card">
          <span>Resolved / Closed</span>
          <h2>{resolved}</h2>
          <div className="complaint-stat-icon green">
            <FaCheckCircle />
          </div>
        </div>
      </div>

      <div className="complaints-toolbar">
        <div className="complaints-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search Complaint ID, Name, Subject..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="complaints-filter">
          <FaFilter />
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            <option value="All">All Users</option>
            <option value="Customer">Customer</option>
            <option value="HomeChef">HomeChef</option>
          </select>
        </div>

        <div className="complaints-filter">
          <FaFilter />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="complaints-table-container">
        <div className="complaints-table-title">
          <h3>All Complaints</h3>
          <span>{filteredComplaints.length} results</span>
        </div>

        <div className="complaints-table-scroll">
          <table className="complaints-table">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Name</th>
                <th>User Type</th>
                <th>Subject</th>
                <th>Priority</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredComplaints.map(complaint => (
                <tr key={complaint.id}>
                  <td>
                    <strong className="complaint-id">{complaint.id}</strong>
                  </td>
                  <td>{complaint.name}</td>
                  <td>
                    <span className={`complaint-user-type ${complaint.type.toLowerCase()}`}>
                      {complaint.type}
                    </span>
                  </td>
                  <td>{complaint.subject}</td>
                  <td>
                    <span className={`complaint-priority ${complaint.priority.toLowerCase()}`}>
                      {complaint.priority}
                    </span>
                  </td>
                  <td>{complaint.date}</td>
                  <td>
                    <span className={`complaint-status ${complaint.status.toLowerCase().replaceAll(" ", "-")}`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="complaint-view-btn"
                      title="View Details"
                      onClick={() => {
                        setSelectedComplaint(complaint);
                        setReplyText(complaint.reply || "");
                      }}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredComplaints.length === 0 && (
                <tr>
                  <td colSpan="8" className="complaints-empty">
                    <FaHeadset />
                    <p>No complaints found!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedComplaint && (
        <div
          className="complaint-modal-overlay"
          onClick={() => setSelectedComplaint(null)}
        >
          <div
            className="complaint-modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="complaint-modal-header">
              <div>
                <h2>Complaint Details</h2>
                <p>{selectedComplaint.id}</p>
              </div>
              <button onClick={() => setSelectedComplaint(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="complaint-modal-body">
              <div className="complaint-info-box">
                <h4>Submitted By</h4>
                <p><span>Name</span><strong>{selectedComplaint.name}</strong></p>
                <p><span>Email</span><strong>{selectedComplaint.email}</strong></p>
                <p><span>User Type</span><strong>{selectedComplaint.type}</strong></p>
                <p><span>Date</span><strong>{selectedComplaint.date}</strong></p>
              </div>

              <div className="complaint-info-box">
                <h4>Complaint Information</h4>
                <p><span>Subject</span><strong>{selectedComplaint.subject}</strong></p>
                <p><span>Category</span><strong>{selectedComplaint.category}</strong></p>
                <p><span>Priority</span><strong>{selectedComplaint.priority}</strong></p>
                <div className="complaint-message">
                  <span>Message</span>
                  <p>{selectedComplaint.message}</p>
                </div>
              </div>

              <div className="complaint-info-box">
                <h4>Update Complaint Status</h4>
                <select
                  className="complaint-status-select"
                  value={selectedComplaint.status}
                  onChange={e => updateStatus(selectedComplaint.id, e.target.value)}
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="complaint-info-box">
                <h4>Admin Reply</h4>

                {selectedComplaint.reply && (
                  <div className="saved-reply">
                    <strong>Previously Saved Reply</strong>
                    <p>{selectedComplaint.reply}</p>
                  </div>
                )}

                <textarea
                  className="complaint-reply-input"
                  rows="4"
                  placeholder="Write your response to this complaint..."
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                />

                <button className="complaint-send-btn" onClick={saveReply}>
                  <FaPaperPlane /> Save Reply
                </button>
              </div>
            </div>

            <div className="complaint-modal-footer">
              <button
                className="complaint-close-btn"
                onClick={() => setSelectedComplaint(null)}
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

export default Complaints;
