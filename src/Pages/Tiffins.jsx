
import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaEye,
  FaCheck,
  FaTimes,
  FaPowerOff,
  FaUtensils,
  FaFilter,
  FaTimesCircle,
} from "react-icons/fa";
import "./CSS/Tiffins.css";

const initialTiffins = [
  {
    id: 1,
    name: "Healthy Veg Thali",
    chef: "Ramesh Kumar",
    category: "Veg",
    price: 100,
    meals: "Lunch",
    description: "Fresh homemade veg thali with dal, rice, roti and sabzi.",
    status: "Approved",
    available: true,
  },
  {
    id: 2,
    name: "Special Punjabi Thali",
    chef: "Sunita Sharma",
    category: "Veg",
    price: 140,
    meals: "Lunch & Dinner",
    description: "Punjabi style homemade food with paneer and seasonal sabzi.",
    status: "Pending",
    available: true,
  },
  {
    id: 3,
    name: "Simple Homemade Thali",
    chef: "Amit Verma",
    category: "Veg",
    price: 80,
    meals: "Dinner",
    description: "Simple and healthy daily homemade meal.",
    status: "Approved",
    available: false,
  },
  {
    id: 4,
    name: "Special Chicken Meal",
    chef: "Ramesh Kumar",
    category: "Non-Veg",
    price: 180,
    meals: "Dinner",
    description: "Homemade chicken curry with rice and chapati.",
    status: "Pending",
    available: true,
  },
  {
    id: 5,
    name: "Mini Veg Meal",
    chef: "Priya Singh",
    category: "Veg",
    price: 70,
    meals: "Lunch",
    description: "Affordable mini meal for everyday lunch.",
    status: "Rejected",
    available: false,
  },
  {
    id: 6,
    name: "Premium Diet Thali",
    chef: "Neha Gupta",
    category: "Healthy",
    price: 160,
    meals: "Lunch & Dinner",
    description: "Light and nutritious homemade diet meal.",
    status: "Approved",
    available: true,
  },
];

function Tiffins() {
  const [tiffins, setTiffins] = useState(() => {
    const saved = localStorage.getItem("adminTiffins");
    return saved ? JSON.parse(saved) : initialTiffins;
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedTiffin, setSelectedTiffin] = useState(null);

  useEffect(() => {
    localStorage.setItem("adminTiffins", JSON.stringify(tiffins));
  }, [tiffins]);

  const total = tiffins.length;
  const approved = tiffins.filter(t => t.status === "Approved").length;
  const pending = tiffins.filter(t => t.status === "Pending").length;
  const unavailable = tiffins.filter(t => !t.available).length;

  const filteredTiffins = tiffins.filter((tiffin) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      tiffin.name.toLowerCase().includes(searchText) ||
      tiffin.chef.toLowerCase().includes(searchText) ||
      tiffin.category.toLowerCase().includes(searchText);

    const matchesFilter =
      filter === "All" ||
      (filter === "Unavailable"
        ? !tiffin.available
        : tiffin.status === filter);

    return matchesSearch && matchesFilter;
  });

  const updateStatus = (id, status) => {
    setTiffins(prev =>
      prev.map(t =>
        t.id === id ? { ...t, status } : t
      )
    );

    setSelectedTiffin(prev =>
      prev?.id === id ? { ...prev, status } : prev
    );
  };

  const toggleAvailability = (id) => {
    setTiffins(prev =>
      prev.map(t =>
        t.id === id ? { ...t, available: !t.available } : t
      )
    );

    setSelectedTiffin(prev =>
      prev?.id === id ? { ...prev, available: !prev.available } : prev
    );
  };

  return (
    <div className="tiffins-page">
      <div className="tiffins-heading">
        <div>
          <h1>Tiffin Management</h1>
          <p>Manage, review and control all marketplace tiffins.</p>
        </div>
        <div className="tiffin-heading-icon">
          <FaUtensils />
        </div>
      </div>

      <div className="tiffin-stats">
        <div className="tiffin-stat-card">
          <span>Total Tiffins</span>
          <h2>{total}</h2>
          <div className="stat-icon green"><FaUtensils /></div>
        </div>

        <div className="tiffin-stat-card">
          <span>Approved</span>
          <h2>{approved}</h2>
          <div className="stat-icon green"><FaCheck /></div>
        </div>

        <div className="tiffin-stat-card">
          <span>Pending Approval</span>
          <h2>{pending}</h2>
          <div className="stat-icon orange"><FaFilter /></div>
        </div>

        <div className="tiffin-stat-card">
          <span>Unavailable</span>
          <h2>{unavailable}</h2>
          <div className="stat-icon red"><FaPowerOff /></div>
        </div>
      </div>

      <div className="tiffin-toolbar">
        <div className="tiffin-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search tiffin, chef or category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="tiffin-filter">
          <FaFilter />
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="All">All Tiffins</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
      </div>

      <div className="tiffin-table-container">
        <div className="tiffin-table-title">
          <h3>All Tiffins</h3>
          <span>{filteredTiffins.length} results</span>
        </div>

        <div className="tiffin-table-scroll">
          <table className="tiffin-table">
            <thead>
              <tr>
                <th>Tiffin Details</th>
                <th>HomeChef</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTiffins.map(tiffin => (
                <tr key={tiffin.id}>
                  <td>
                    <div className="tiffin-name-cell">
                      <div className="tiffin-food-icon"><FaUtensils /></div>
                      <div>
                        <strong>{tiffin.name}</strong>
                        <small>{tiffin.meals}</small>
                      </div>
                    </div>
                  </td>

                  <td>{tiffin.chef}</td>
                  <td>{tiffin.category}</td>
                  <td>₹{tiffin.price}</td>

                  <td>
                    <span className={`tiffin-status ${tiffin.status.toLowerCase()}`}>
                      {tiffin.status}
                    </span>
                  </td>

                  <td>
                    <span className={`availability ${tiffin.available ? "yes" : "no"}`}>
                      {tiffin.available ? "Available" : "Unavailable"}
                    </span>
                  </td>

                  <td>
                    <div className="tiffin-actions">
                      <button
                        className="tiffin-action view"
                        title="View Details"
                        onClick={() => setSelectedTiffin(tiffin)}
                      >
                        <FaEye />
                      </button>

                      {tiffin.status === "Pending" && (
                        <>
                          <button
                            className="tiffin-action approve"
                            title="Approve"
                            onClick={() => updateStatus(tiffin.id, "Approved")}
                          >
                            <FaCheck />
                          </button>

                          <button
                            className="tiffin-action reject"
                            title="Reject"
                            onClick={() => updateStatus(tiffin.id, "Rejected")}
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}

                      {tiffin.status === "Approved" && (
                        <button
                          className={`tiffin-action ${tiffin.available ? "reject" : "approve"}`}
                          title={tiffin.available ? "Deactivate" : "Activate"}
                          onClick={() => toggleAvailability(tiffin.id)}
                        >
                          <FaPowerOff />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredTiffins.length === 0 && (
                <tr>
                  <td colSpan="7" className="tiffin-empty">
                    <FaTimesCircle />
                    <p>No tiffins found!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTiffin && (
        <div className="tiffin-modal-overlay" onClick={() => setSelectedTiffin(null)}>
          <div className="tiffin-modal" onClick={e => e.stopPropagation()}>
            <div className="tiffin-modal-header">
              <div>
                <h2>Tiffin Details</h2>
                <p>Complete information about this tiffin</p>
              </div>
              <button onClick={() => setSelectedTiffin(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="tiffin-modal-body">
              <div className="tiffin-modal-food-icon"><FaUtensils /></div>
              <h3>{selectedTiffin.name}</h3>
              <p className="tiffin-modal-description">{selectedTiffin.description}</p>

              <div className="tiffin-detail-grid">
                <div><span>HomeChef</span><strong>{selectedTiffin.chef}</strong></div>
                <div><span>Category</span><strong>{selectedTiffin.category}</strong></div>
                <div><span>Price</span><strong>₹{selectedTiffin.price}</strong></div>
                <div><span>Meal Type</span><strong>{selectedTiffin.meals}</strong></div>
                <div><span>Approval Status</span><strong>{selectedTiffin.status}</strong></div>
                <div><span>Availability</span><strong>{selectedTiffin.available ? "Available" : "Unavailable"}</strong></div>
              </div>
            </div>

            <div className="tiffin-modal-footer">
              {selectedTiffin.status === "Pending" && (
                <>
                  <button
                    className="modal-approve"
                    onClick={() => updateStatus(selectedTiffin.id, "Approved")}
                  >
                    <FaCheck /> Approve
                  </button>
                  <button
                    className="modal-reject"
                    onClick={() => updateStatus(selectedTiffin.id, "Rejected")}
                  >
                    <FaTimes /> Reject
                  </button>
                </>
              )}

              {selectedTiffin.status === "Approved" && (
                <button
                  className={selectedTiffin.available ? "modal-reject" : "modal-approve"}
                  onClick={() => toggleAvailability(selectedTiffin.id)}
                >
                  <FaPowerOff />
                  {selectedTiffin.available ? "Deactivate" : "Activate"}
                </button>
              )}

              <button className="modal-close" onClick={() => setSelectedTiffin(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tiffins;
