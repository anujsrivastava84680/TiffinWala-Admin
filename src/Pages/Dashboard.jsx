
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaUserTie,
  FaShoppingBag,
  FaRupeeSign,
  FaClock,
  FaCheckCircle,
  FaUtensils,
  FaArrowUp,
  FaEye,
  FaArrowRight,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import "./CSS/Dashboard.css";

const stats = [
  {
    title: "Total Customers",
    value: "2,450",
    change: "+12.5%",
    icon: <FaUsers />,
    type: "up",
    color: "green",
  },
  {
    title: "Total HomeChefs",
    value: "186",
    change: "+8.2%",
    icon: <FaUserTie />,
    type: "up",
    color: "orange",
  },
  {
    title: "Total Orders",
    value: "1,284",
    change: "+15.8%",
    icon: <FaShoppingBag />,
    type: "up",
    color: "blue",
  },
  {
    title: "Total Revenue",
    value: "₹1,85,600",
    change: "+10.3%",
    icon: <FaRupeeSign />,
    type: "up",
    color: "purple",
  },
];

const orders = [
  {
    id: "ORD1001",
    customer: "Rahul Sharma",
    chef: "Priya Kitchen",
    amount: "₹250",
    status: "Delivered",
  },
  {
    id: "ORD1002",
    customer: "Amit Verma",
    chef: "Ghar Ka Swad",
    amount: "₹180",
    status: "Pending",
  },
  {
    id: "ORD1003",
    customer: "Neha Singh",
    chef: "Maa Ki Rasoi",
    amount: "₹320",
    status: "Preparing",
  },
  {
    id: "ORD1004",
    customer: "Rohit Gupta",
    chef: "Healthy Tiffin",
    amount: "₹210",
    status: "Delivered",
  },
  {
    id: "ORD1005",
    customer: "Pooja Mishra",
    chef: "Priya Kitchen",
    amount: "₹280",
    status: "Cancelled",
  },
];

const chefs = [
  {
    name: "Priya Kitchen",
    owner: "Priya Sharma",
    orders: 145,
    rating: "4.9",
    status: "Approved",
  },
  {
    name: "Maa Ki Rasoi",
    owner: "Sunita Verma",
    orders: 120,
    rating: "4.8",
    status: "Approved",
  },
  {
    name: "Healthy Tiffin",
    owner: "Anjali Gupta",
    orders: 98,
    rating: "4.7",
    status: "Pending",
  },
];

const chartData = [
  { day: "Mon", height: 45 },
  { day: "Tue", height: 65 },
  { day: "Wed", height: 52 },
  { day: "Thu", height: 82 },
  { day: "Fri", height: 60 },
  { day: "Sat", height: 95 },
  { day: "Sun", height: 72 },
];

function Dashboard() {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="admin-dashboard">

      {/* PAGE HEADER */}
      <div className="admin-dashboard-heading">
        <div>
          <span className="admin-dashboard-tag">OVERVIEW</span>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening on your marketplace.</p>
        </div>

        <div className="admin-dashboard-date">
          <span>Today's Overview</span>
          <strong>
            {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </strong>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="admin-stats-grid">
        {stats.map((item, index) => (
          <div className="admin-stat-card" key={index}>
            <div className="admin-stat-top">
              <div className={`admin-stat-icon ${item.color}`}>
                {item.icon}
              </div>
              <span className={`admin-stat-change ${item.type}`}>
                <FaArrowUp /> {item.change}
              </span>
            </div>

            <h2>{item.value}</h2>
            <p>{item.title}</p>
          </div>
        ))}
      </div>

      {/* SECONDARY STATS */}
      <div className="admin-secondary-stats">
        <div className="admin-secondary-card">
          <div className="admin-secondary-icon pending">
            <FaClock />
          </div>
          <div>
            <h3>24</h3>
            <p>Pending Orders</p>
          </div>
        </div>

        <div className="admin-secondary-card">
          <div className="admin-secondary-icon success">
            <FaCheckCircle />
          </div>
          <div>
            <h3>1,120</h3>
            <p>Completed Orders</p>
          </div>
        </div>

        <div className="admin-secondary-card">
          <div className="admin-secondary-icon chef">
            <FaUtensils />
          </div>
          <div>
            <h3>12</h3>
            <p>Chef Approval Requests</p>
          </div>
        </div>
      </div>

      {/* CHART AND TOP CHEFS */}
      <div className="admin-dashboard-middle">

        <div className="admin-dashboard-panel admin-revenue-panel">
          <div className="admin-panel-heading">
            <div>
              <h3>Revenue Overview</h3>
              <p>Weekly revenue performance</p>
            </div>
            <span className="admin-panel-period">This Week</span>
          </div>

          <div className="admin-chart-summary">
            <h2>₹45,850</h2>
            <span><FaArrowUp /> 12.5% this week</span>
          </div>

          <div className="admin-chart">
            {chartData.map((item) => (
              <div className="admin-chart-column" key={item.day}>
                <div className="admin-chart-bar-wrapper">
                  <div
                    className="admin-chart-bar"
                    style={{ height: `${item.height}%` }}
                    title={`${item.day} revenue`}
                  ></div>
                </div>
                <span>{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-dashboard-panel admin-chef-panel">
          <div className="admin-panel-heading">
            <div>
              <h3>Top HomeChefs</h3>
              <p>Best performing chefs</p>
            </div>
            <FaUserTie className="admin-panel-heading-icon" />
          </div>

          <div className="admin-top-chefs">
            {chefs.map((chef, index) => (
              <div className="admin-chef-item" key={index}>
                <div className="admin-chef-avatar">
                  {chef.name.charAt(0)}
                </div>

                <div className="admin-chef-info">
                  <strong>{chef.name}</strong>
                  <span>{chef.owner}</span>
                  <small>
                    <FaStar /> {chef.rating} · {chef.orders} orders
                  </small>
                </div>

                <span className={`admin-chef-status ${chef.status.toLowerCase()}`}>
                  {chef.status}
                </span>
              </div>
            ))}
          </div>

          <button
            className="admin-view-all-btn"
            onClick={() => navigate("/homechefs")}
          >
            View All HomeChefs <FaArrowRight />
          </button>
        </div>

      </div>

      {/* RECENT ORDERS */}
      <div className="admin-dashboard-panel admin-recent-orders">
        <div className="admin-panel-heading">
          <div>
            <h3>Recent Orders</h3>
            <p>Latest activity across your marketplace</p>
          </div>

          <button
            className="admin-view-all-btn"
            onClick={() => navigate("/orders")}
          >
            View All <FaArrowRight />
          </button>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-dashboard-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>HomeChef</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="admin-order-id">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.chef}</td>
                  <td className="admin-order-amount">{order.amount}</td>
                  <td>
                    <span className={`admin-order-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="admin-order-view"
                      title="View order"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE ORDER CARDS */}
        <div className="admin-mobile-orders">
          {orders.map((order) => (
            <div className="admin-mobile-order-card" key={order.id}>
              <div className="admin-mobile-order-top">
                <strong>{order.id}</strong>
                <span className={`admin-order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
              <p>Customer: {order.customer}</p>
              <p>HomeChef: {order.chef}</p>
              <strong>{order.amount}</strong>

              <button
                className="admin-order-view"
                title="View order"
                onClick={() => setSelectedOrder(order)}
              >
                <FaEye /> View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-dashboard-bottom">
        <span>© 2026 TiffinWala Admin Panel</span>
        <span>Manage your marketplace with confidence.</span>
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div
          className="dashboard-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="dashboard-order-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dashboard-modal-header">
              <div>
                <h2>Order Details</h2>
                <p>Complete information about this order</p>
              </div>

              <button
                className="dashboard-modal-close"
                onClick={() => setSelectedOrder(null)}
                aria-label="Close order details"
              >
                <FaTimes />
              </button>
            </div>

            <div className="dashboard-modal-body">
              <div className="dashboard-modal-order-id">
                <span>Order ID</span>
                <strong>{selectedOrder.id}</strong>
              </div>

              <div className="dashboard-modal-detail">
                <span>Customer Name</span>
                <strong>{selectedOrder.customer}</strong>
              </div>

              <div className="dashboard-modal-detail">
                <span>HomeChef</span>
                <strong>{selectedOrder.chef}</strong>
              </div>

              <div className="dashboard-modal-detail">
                <span>Order Amount</span>
                <strong>{selectedOrder.amount}</strong>
              </div>

              <div className="dashboard-modal-detail">
                <span>Order Status</span>
                <strong>
                  <span className={`admin-order-status ${selectedOrder.status.toLowerCase()}`}>
                    {selectedOrder.status}
                  </span>
                </strong>
              </div>
            </div>

            <div className="dashboard-modal-footer">
              <button
                className="dashboard-modal-manage"
                onClick={() => navigate("/orders")}
              >
                Manage Orders <FaArrowRight />
              </button>

              <button
                className="dashboard-modal-close-btn"
                onClick={() => setSelectedOrder(null)}
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

export default Dashboard;
