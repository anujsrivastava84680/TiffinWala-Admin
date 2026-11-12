
import React, { useState } from "react";
import {
  FaUsers,
  FaSearch,
  FaEye,
  FaBan,
  FaCheckCircle,
  FaUserCircle,
  FaShoppingBag,
  FaTimes,
} from "react-icons/fa";
import "./CSS/Customers.css";

const initialCustomers = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9876543210",
    orders: 12,
    joined: "12 Aug 2026",
    status: "Active",
    address: "Lucknow, Uttar Pradesh",
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya@gmail.com",
    phone: "9876543211",
    orders: 8,
    joined: "18 Aug 2026",
    status: "Active",
    address: "Kanpur, Uttar Pradesh",
  },
  {
    id: 3,
    name: "Amit Singh",
    email: "amit@gmail.com",
    phone: "9876543212",
    orders: 5,
    joined: "25 Aug 2026",
    status: "Blocked",
    address: "Varanasi, Uttar Pradesh",
  },
  {
    id: 4,
    name: "Neha Gupta",
    email: "neha@gmail.com",
    phone: "9876543213",
    orders: 15,
    joined: "02 Sep 2026",
    status: "Active",
    address: "Prayagraj, Uttar Pradesh",
  },
  {
    id: 5,
    name: "Vikas Yadav",
    email: "vikas@gmail.com",
    phone: "9876543214",
    orders: 3,
    joined: "10 Sep 2026",
    status: "Active",
    address: "Ayodhya, Uttar Pradesh",
  },
  {
    id: 6,
    name: "Sneha Mishra",
    email: "sneha@gmail.com",
    phone: "9876543215",
    orders: 0,
    joined: "15 Sep 2026",
    status: "Blocked",
    address: "Gorakhpur, Uttar Pradesh",
  },
];

function Customers() {
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem("adminCustomers");
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const saveCustomers = (updatedCustomers) => {
    setCustomers(updatedCustomers);
    localStorage.setItem("adminCustomers", JSON.stringify(updatedCustomers));
  };

  const toggleStatus = (id) => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === id
        ? {
            ...customer,
            status: customer.status === "Active" ? "Blocked" : "Active",
          }
        : customer
    );

    saveCustomers(updatedCustomers);

    if (selectedCustomer?.id === id) {
      setSelectedCustomer(
        updatedCustomers.find((customer) => customer.id === id)
      );
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search);

    const matchesFilter =
      filter === "All" || customer.status === filter;

    return matchesSearch && matchesFilter;
  });

  const activeCount = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const blockedCount = customers.filter(
    (customer) => customer.status === "Blocked"
  ).length;

  return (
    <div className="customers-page">
      <div className="customers-heading">
        <div>
          <h1>Customer Management</h1>
          <p>Manage and monitor all registered customers.</p>
        </div>

        <div className="customers-heading-icon">
          <FaUsers />
        </div>
      </div>

      <div className="customer-stats">
        <div className="customer-stat-card">
          <div className="customer-stat-icon total">
            <FaUsers />
          </div>
          <div>
            <p>Total Customers</p>
            <h2>{customers.length}</h2>
          </div>
        </div>

        <div className="customer-stat-card">
          <div className="customer-stat-icon active">
            <FaCheckCircle />
          </div>
          <div>
            <p>Active Customers</p>
            <h2>{activeCount}</h2>
          </div>
        </div>

        <div className="customer-stat-card">
          <div className="customer-stat-icon blocked">
            <FaBan />
          </div>
          <div>
            <p>Blocked Customers</p>
            <h2>{blockedCount}</h2>
          </div>
        </div>
      </div>

      <div className="customers-toolbar">
        <div className="customers-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Customers</option>
          <option value="Active">Active Customers</option>
          <option value="Blocked">Blocked Customers</option>
        </select>
      </div>

      <div className="customers-table-card">
        <div className="customers-table-heading">
          <div>
            <h3>All Customers</h3>
            <p>{filteredCustomers.length} customers found</p>
          </div>
        </div>

        <div className="customers-table-wrapper">
          <table className="customers-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Total Orders</th>
                <th>Joined Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="customer-info">
                      <div className="customer-avatar">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <strong>{customer.name}</strong>
                        <span>{customer.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>{customer.phone}</td>
                  <td>
                    <span className="customer-order-count">
                      {customer.orders}
                    </span>
                  </td>
                  <td>{customer.joined}</td>

                  <td>
                    <span
                      className={`customer-status ${
                        customer.status === "Active" ? "status-active" : "status-blocked"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>

                  <td>
                    <div className="customer-actions">
                      <button
                        className="customer-view-btn"
                        title="View Details"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <FaEye />
                      </button>

                      <button
                        className={
                          customer.status === "Active"
                            ? "customer-block-btn"
                            : "customer-unblock-btn"
                        }
                        title={
                          customer.status === "Active" ? "Block" : "Unblock"
                        }
                        onClick={() => toggleStatus(customer.id)}
                      >
                        {customer.status === "Active" ? (
                          <FaBan />
                        ) : (
                          <FaCheckCircle />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan="6" className="customer-empty">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCustomer && (
        <div
          className="customer-modal-overlay"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="customer-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="customer-modal-header">
              <h3>Customer Details</h3>
              <button onClick={() => setSelectedCustomer(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="customer-modal-profile">
              <div className="customer-modal-avatar">
                <FaUserCircle />
              </div>
              <h2>{selectedCustomer.name}</h2>
              <span>{selectedCustomer.status}</span>
            </div>

            <div className="customer-detail-list">
              <p><strong>Email:</strong> {selectedCustomer.email}</p>
              <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
              <p><strong>Address:</strong> {selectedCustomer.address}</p>
              <p>
                <strong>Total Orders:</strong>{" "}
                <FaShoppingBag /> {selectedCustomer.orders}
              </p>
              <p><strong>Joined:</strong> {selectedCustomer.joined}</p>
            </div>

            <button
              className="customer-modal-status-btn"
              onClick={() => toggleStatus(selectedCustomer.id)}
            >
              {selectedCustomer.status === "Active"
                ? "Block Customer"
                : "Unblock Customer"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customers;
