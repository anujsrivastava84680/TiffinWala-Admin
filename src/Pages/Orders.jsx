
import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaEye,
  FaTimes,
  FaShoppingBag,
  FaCheck,
  FaClock,
  FaTruck,
  FaTimesCircle,
  FaFilter,
} from "react-icons/fa";
import "./CSS/Orders.css";

const initialOrders = [
  {
    id: "ORD1001",
    customer: "Rahul Sharma",
    phone: "9876543210",
    chef: "Ramesh Kumar",
    tiffin: "Healthy Veg Thali",
    quantity: 2,
    amount: 200,
    payment: "Paid",
    date: "2026-11-08",
    address: "Aliganj, Lucknow",
    status: "Pending",
  },
  {
    id: "ORD1002",
    customer: "Priya Singh",
    phone: "9876543211",
    chef: "Sunita Sharma",
    tiffin: "Special Punjabi Thali",
    quantity: 1,
    amount: 140,
    payment: "Paid",
    date: "2026-11-08",
    address: "Gomti Nagar, Lucknow",
    status: "Accepted",
  },
  {
    id: "ORD1003",
    customer: "Amit Verma",
    phone: "9876543212",
    chef: "Ramesh Kumar",
    tiffin: "Special Chicken Meal",
    quantity: 1,
    amount: 180,
    payment: "COD",
    date: "2026-11-07",
    address: "Indira Nagar, Lucknow",
    status: "Preparing",
  },
  {
    id: "ORD1004",
    customer: "Neha Gupta",
    phone: "9876543213",
    chef: "Priya Singh",
    tiffin: "Mini Veg Meal",
    quantity: 3,
    amount: 210,
    payment: "Paid",
    date: "2026-11-07",
    address: "Hazratganj, Lucknow",
    status: "Completed",
  },
  {
    id: "ORD1005",
    customer: "Vikas Yadav",
    phone: "9876543214",
    chef: "Amit Verma",
    tiffin: "Simple Homemade Thali",
    quantity: 2,
    amount: 160,
    payment: "COD",
    date: "2026-11-06",
    address: "Mahanagar, Lucknow",
    status: "Cancelled",
  },
  {
    id: "ORD1006",
    customer: "Pooja Mishra",
    phone: "9876543215",
    chef: "Neha Gupta",
    tiffin: "Premium Diet Thali",
    quantity: 1,
    amount: 160,
    payment: "Paid",
    date: "2026-11-06",
    address: "Jankipuram, Lucknow",
    status: "Delivered",
  },
  {
    id: "ORD1007",
    customer: "Karan Singh",
    phone: "9876543216",
    chef: "Sunita Sharma",
    tiffin: "Special Punjabi Thali",
    quantity: 2,
    amount: 280,
    payment: "Paid",
    date: "2026-11-05",
    address: "Vikas Nagar, Lucknow",
    status: "Pending",
  },
];

const statusOptions = [
  "Pending",
  "Accepted",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Completed",
  "Cancelled",
];

function Orders() {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("adminOrders");
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    localStorage.setItem("adminOrders", JSON.stringify(orders));
  }, [orders]);

  const total = orders.length;
  const pending = orders.filter(o => o.status === "Pending").length;
  const accepted = orders.filter(o => o.status === "Accepted").length;
  const completed = orders.filter(
    o => ["Completed", "Delivered"].includes(o.status)
  ).length;
  const cancelled = orders.filter(o => o.status === "Cancelled").length;

  const filteredOrders = orders.filter(order => {
    const text = search.toLowerCase();

    const matchesSearch =
      order.id.toLowerCase().includes(text) ||
      order.customer.toLowerCase().includes(text) ||
      order.chef.toLowerCase().includes(text) ||
      order.tiffin.toLowerCase().includes(text);

    const matchesFilter =
      filter === "All" || order.status === filter;

    return matchesSearch && matchesFilter;
  });

  const updateStatus = (id, status) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status } : order
      )
    );

    setSelectedOrder(prev =>
      prev?.id === id ? { ...prev, status } : prev
    );
  };

  const getStatusClass = status =>
    status.toLowerCase().replaceAll(" ", "-");

  return (
    <div className="orders-page">
      <div className="orders-heading">
        <div>
          <h1>Orders Management</h1>
          <p>Monitor and manage all customer orders.</p>
        </div>
        <div className="orders-heading-icon">
          <FaShoppingBag />
        </div>
      </div>

      <div className="orders-stats">
        <div className="orders-stat-card">
          <span>Total Orders</span>
          <h2>{total}</h2>
          <div className="orders-stat-icon green"><FaShoppingBag /></div>
        </div>

        <div className="orders-stat-card">
          <span>Pending Orders</span>
          <h2>{pending}</h2>
          <div className="orders-stat-icon orange"><FaClock /></div>
        </div>

        <div className="orders-stat-card">
          <span>Accepted Orders</span>
          <h2>{accepted}</h2>
          <div className="orders-stat-icon blue"><FaCheck /></div>
        </div>

        <div className="orders-stat-card">
          <span>Completed Orders</span>
          <h2>{completed}</h2>
          <div className="orders-stat-icon green"><FaTruck /></div>
        </div>
      </div>

      <div className="orders-extra-stats">
        <span>
          <FaTimesCircle /> Cancelled Orders: <strong>{cancelled}</strong>
        </span>
      </div>

      <div className="orders-toolbar">
        <div className="orders-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search Order ID, Customer, Chef..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="orders-filter">
          <FaFilter />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="All">All Orders</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="orders-table-container">
        <div className="orders-table-title">
          <h3>All Orders</h3>
          <span>{filteredOrders.length} results</span>
        </div>

        <div className="orders-table-scroll">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>HomeChef</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td><strong className="order-id">{order.id}</strong></td>
                  <td>{order.customer}</td>
                  <td>{order.chef}</td>
                  <td>₹{order.amount}</td>
                  <td>
                    <span className={`order-payment ${order.payment.toLowerCase()}`}>
                      {order.payment}
                    </span>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <span className={`order-status ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="order-view-btn"
                      title="View Order Details"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="8" className="orders-empty">
                    <FaShoppingBag />
                    <p>No orders found!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <div
          className="order-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div className="order-modal" onClick={e => e.stopPropagation()}>
            <div className="order-modal-header">
              <div>
                <h2>Order Details</h2>
                <p>{selectedOrder.id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="order-modal-body">
              <div className="order-detail-section">
                <h4>Customer Information</h4>
                <p><span>Name</span><strong>{selectedOrder.customer}</strong></p>
                <p><span>Phone</span><strong>{selectedOrder.phone}</strong></p>
                <p><span>Address</span><strong>{selectedOrder.address}</strong></p>
              </div>

              <div className="order-detail-section">
                <h4>Order Information</h4>
                <p><span>Tiffin</span><strong>{selectedOrder.tiffin}</strong></p>
                <p><span>HomeChef</span><strong>{selectedOrder.chef}</strong></p>
                <p><span>Quantity</span><strong>{selectedOrder.quantity}</strong></p>
                <p><span>Order Date</span><strong>{selectedOrder.date}</strong></p>
                <p><span>Payment</span><strong>{selectedOrder.payment}</strong></p>
                <p><span>Total Amount</span><strong>₹{selectedOrder.amount}</strong></p>
              </div>

              <div className="order-detail-section">
                <h4>Update Order Status</h4>
                <select
                  className="order-status-select"
                  value={selectedOrder.status}
                  onChange={e => updateStatus(selectedOrder.id, e.target.value)}
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <p className="order-current-status">
                  Current Status: <strong>{selectedOrder.status}</strong>
                </p>
              </div>
            </div>

            <div className="order-modal-footer">
              {selectedOrder.status !== "Cancelled" &&
               selectedOrder.status !== "Completed" &&
               selectedOrder.status !== "Delivered" && (
                <button
                  className="order-cancel-btn"
                  onClick={() => updateStatus(selectedOrder.id, "Cancelled")}
                >
                  <FaTimesCircle /> Cancel Order
                </button>
              )}

              <button
                className="order-close-btn"
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

export default Orders;
