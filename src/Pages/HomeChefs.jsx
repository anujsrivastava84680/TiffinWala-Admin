
import React, { useState } from "react";
import {
  FaUserTie,
  FaSearch,
  FaEye,
  FaCheck,
  FaTimes,
  FaBan,
  FaUtensils,
  FaShoppingBag,
} from "react-icons/fa";
import "./CSS/HomeChefs.css";

const initialChefs = [
  {
    id: 1,
    name: "Ramesh Kumar",
    email: "ramesh@gmail.com",
    phone: "9876543201",
    city: "Lucknow",
    tiffins: 8,
    orders: 125,
    joined: "10 Aug 2026",
    status: "Active",
    verification: "Approved",
    address: "Aliganj, Lucknow, Uttar Pradesh",
    specialty: "North Indian Food",
  },
  {
    id: 2,
    name: "Sunita Devi",
    email: "sunita@gmail.com",
    phone: "9876543202",
    city: "Varanasi",
    tiffins: 5,
    orders: 86,
    joined: "15 Aug 2026",
    status: "Active",
    verification: "Approved",
    address: "Lanka, Varanasi, Uttar Pradesh",
    specialty: "Homemade Thali",
  },
  {
    id: 3,
    name: "Pooja Singh",
    email: "pooja@gmail.com",
    phone: "9876543203",
    city: "Kanpur",
    tiffins: 3,
    orders: 0,
    joined: "20 Sep 2026",
    status: "Pending",
    verification: "Pending",
    address: "Kakadeo, Kanpur, Uttar Pradesh",
    specialty: "Healthy Food",
  },
  {
    id: 4,
    name: "Amit Verma",
    email: "amitchef@gmail.com",
    phone: "9876543204",
    city: "Prayagraj",
    tiffins: 6,
    orders: 94,
    joined: "25 Aug 2026",
    status: "Inactive",
    verification: "Approved",
    address: "Civil Lines, Prayagraj, Uttar Pradesh",
    specialty: "Traditional Indian Food",
  },
  {
    id: 5,
    name: "Neha Sharma",
    email: "nehachef@gmail.com",
    phone: "9876543205",
    city: "Lucknow",
    tiffins: 4,
    orders: 63,
    joined: "05 Sep 2026",
    status: "Active",
    verification: "Approved",
    address: "Gomti Nagar, Lucknow, Uttar Pradesh",
    specialty: "Vegetarian Meals",
  },
  {
    id: 6,
    name: "Rajesh Yadav",
    email: "rajesh@gmail.com",
    phone: "9876543206",
    city: "Ayodhya",
    tiffins: 2,
    orders: 0,
    joined: "28 Sep 2026",
    status: "Pending",
    verification: "Pending",
    address: "Civil Lines, Ayodhya, Uttar Pradesh",
    specialty: "Home Style Food",
  },
];

function HomeChefs() {
  const [chefs, setChefs] = useState(() => {
    const saved = localStorage.getItem("adminHomeChefs");
    return saved ? JSON.parse(saved) : initialChefs;
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedChef, setSelectedChef] = useState(null);

  const saveChefs = (updatedChefs) => {
    setChefs(updatedChefs);
    localStorage.setItem("adminHomeChefs", JSON.stringify(updatedChefs));
  };

  const updateChef = (id, changes) => {
    const updatedChefs = chefs.map((chef) =>
      chef.id === id ? { ...chef, ...changes } : chef
    );

    saveChefs(updatedChefs);

    if (selectedChef?.id === id) {
      setSelectedChef(updatedChefs.find((chef) => chef.id === id));
    }
  };

  const handleApprove = (chef) => {
    updateChef(chef.id, {
      status: "Active",
      verification: "Approved",
    });
  };

  const handleReject = (chef) => {
    const confirmReject = window.confirm(
      `Are you sure you want to reject ${chef.name}?`
    );

    if (confirmReject) {
      updateChef(chef.id, {
        status: "Rejected",
        verification: "Rejected",
      });
    }
  };

  const toggleStatus = (chef) => {
    updateChef(chef.id, {
      status: chef.status === "Active" ? "Inactive" : "Active",
    });
  };

  const filteredChefs = chefs.filter((chef) => {
    const matchesSearch =
      chef.name.toLowerCase().includes(search.toLowerCase()) ||
      chef.email.toLowerCase().includes(search.toLowerCase()) ||
      chef.phone.includes(search) ||
      chef.city.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || chef.status === filter;

    return matchesSearch && matchesFilter;
  });

  const activeCount = chefs.filter(
    (chef) => chef.status === "Active"
  ).length;

  const pendingCount = chefs.filter(
    (chef) => chef.status === "Pending"
  ).length;

  const inactiveCount = chefs.filter(
    (chef) => chef.status === "Inactive"
  ).length;

  return (
    <div className="homechefs-page">
      <div className="homechefs-heading">
        <div>
          <h1>HomeChef Management</h1>
          <p>Manage, verify and monitor all registered HomeChefs.</p>
        </div>

        <div className="homechefs-heading-icon">
          <FaUserTie />
        </div>
      </div>

      <div className="homechef-stats">
        <div className="homechef-stat-card">
          <div className="homechef-stat-icon total"><FaUserTie /></div>
          <div>
            <p>Total HomeChefs</p>
            <h2>{chefs.length}</h2>
          </div>
        </div>

        <div className="homechef-stat-card">
          <div className="homechef-stat-icon active"><FaCheck /></div>
          <div>
            <p>Active HomeChefs</p>
            <h2>{activeCount}</h2>
          </div>
        </div>

        <div className="homechef-stat-card">
          <div className="homechef-stat-icon pending"><FaTimes /></div>
          <div>
            <p>Pending Approval</p>
            <h2>{pendingCount}</h2>
          </div>
        </div>

        <div className="homechef-stat-card">
          <div className="homechef-stat-icon inactive"><FaBan /></div>
          <div>
            <p>Inactive HomeChefs</p>
            <h2>{inactiveCount}</h2>
          </div>
        </div>
      </div>

      <div className="homechefs-toolbar">
        <div className="homechefs-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search name, email, phone or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All HomeChefs</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Inactive">Inactive</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="homechefs-table-card">
        <div className="homechefs-table-heading">
          <div>
            <h3>All HomeChefs</h3>
            <p>{filteredChefs.length} HomeChefs found</p>
          </div>
        </div>

        <div className="homechefs-table-wrapper">
          <table className="homechefs-table">
            <thead>
              <tr>
                <th>HomeChef</th>
                <th>City</th>
                <th>Tiffins</th>
                <th>Orders</th>
                <th>Verification</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredChefs.map((chef) => (
                <tr key={chef.id}>
                  <td>
                    <div className="homechef-info">
                      <div className="homechef-avatar">
                        {chef.name.charAt(0)}
                      </div>
                      <div>
                        <strong>{chef.name}</strong>
                        <span>{chef.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>{chef.city}</td>
                  <td>{chef.tiffins}</td>
                  <td>{chef.orders}</td>

                  <td>
                    <span className={`homechef-status ${
                      chef.verification === "Approved"
                        ? "chef-approved"
                        : chef.verification === "Pending"
                        ? "chef-pending"
                        : "chef-rejected"
                    }`}>
                      {chef.verification}
                    </span>
                  </td>

                  <td>
                    <span className={`homechef-status ${
                      chef.status === "Active"
                        ? "chef-active"
                        : chef.status === "Pending"
                        ? "chef-pending"
                        : chef.status === "Rejected"
                        ? "chef-rejected"
                        : "chef-inactive"
                    }`}>
                      {chef.status}
                    </span>
                  </td>

                  <td>
                    <div className="homechef-actions">
                      <button
                        className="homechef-view-btn"
                        title="View Details"
                        onClick={() => setSelectedChef(chef)}
                      >
                        <FaEye />
                      </button>

                      {chef.status === "Pending" ? (
                        <>
                          <button
                            className="homechef-approve-btn"
                            title="Approve"
                            onClick={() => handleApprove(chef)}
                          >
                            <FaCheck />
                          </button>
                          <button
                            className="homechef-reject-btn"
                            title="Reject"
                            onClick={() => handleReject(chef)}
                          >
                            <FaTimes />
                          </button>
                        </>
                      ) : chef.status !== "Rejected" ? (
                        <button
                          className={
                            chef.status === "Active"
                              ? "homechef-deactivate-btn"
                              : "homechef-approve-btn"
                          }
                          title={chef.status === "Active" ? "Deactivate" : "Activate"}
                          onClick={() => toggleStatus(chef)}
                        >
                          {chef.status === "Active" ? <FaBan /> : <FaCheck />}
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredChefs.length === 0 && (
                <tr>
                  <td colSpan="7" className="homechef-empty">
                    No HomeChefs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedChef && (
        <div
          className="homechef-modal-overlay"
          onClick={() => setSelectedChef(null)}
        >
          <div
            className="homechef-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="homechef-modal-header">
              <h3>HomeChef Details</h3>
              <button onClick={() => setSelectedChef(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="homechef-modal-profile">
              <div className="homechef-modal-avatar">
                <FaUserTie />
              </div>
              <h2>{selectedChef.name}</h2>
              <span>{selectedChef.verification}</span>
            </div>

            <div className="homechef-detail-list">
              <p><strong>Email:</strong> {selectedChef.email}</p>
              <p><strong>Phone:</strong> {selectedChef.phone}</p>
              <p><strong>City:</strong> {selectedChef.city}</p>
              <p><strong>Address:</strong> {selectedChef.address}</p>
              <p><strong>Specialty:</strong> {selectedChef.specialty}</p>
              <p><strong>Joined:</strong> {selectedChef.joined}</p>
              <p><FaUtensils /> <strong>Tiffins:</strong> {selectedChef.tiffins}</p>
              <p><FaShoppingBag /> <strong>Orders:</strong> {selectedChef.orders}</p>
              <p><strong>Account Status:</strong> {selectedChef.status}</p>
            </div>

            {selectedChef.status === "Pending" && (
              <div className="homechef-modal-actions">
                <button onClick={() => handleApprove(selectedChef)}>
                  <FaCheck /> Approve
                </button>
                <button onClick={() => handleReject(selectedChef)}>
                  <FaTimes /> Reject
                </button>
              </div>
            )}

            {selectedChef.status !== "Pending" &&
              selectedChef.status !== "Rejected" && (
                <button
                  className="homechef-modal-status-btn"
                  onClick={() => toggleStatus(selectedChef)}
                >
                  {selectedChef.status === "Active"
                    ? "Deactivate HomeChef"
                    : "Activate HomeChef"}
                </button>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeChefs;
