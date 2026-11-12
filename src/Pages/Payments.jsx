
import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaEye,
  FaTimes,
  FaWallet,
  FaMoneyBillWave,
  FaChartLine,
  FaClock,
  FaCheckCircle,
  FaFilter,
  FaRupeeSign,
} from "react-icons/fa";
import "./CSS/Payments.css";

const initialPayments = [
  {
    id: "TXN1001",
    orderId: "ORD1001",
    customer: "Rahul Sharma",
    chef: "Ramesh Kumar",
    amount: 200,
    commission: 20,
    chefEarning: 180,
    method: "UPI",
    date: "2026-11-08",
    status: "Paid",
    payoutStatus: "Paid",
  },
  {
    id: "TXN1002",
    orderId: "ORD1002",
    customer: "Priya Singh",
    chef: "Sunita Sharma",
    amount: 140,
    commission: 14,
    chefEarning: 126,
    method: "Card",
    date: "2026-11-08",
    status: "Paid",
    payoutStatus: "Pending",
  },
  {
    id: "TXN1003",
    orderId: "ORD1003",
    customer: "Amit Verma",
    chef: "Ramesh Kumar",
    amount: 180,
    commission: 18,
    chefEarning: 162,
    method: "COD",
    date: "2026-11-07",
    status: "Paid",
    payoutStatus: "Pending",
  },
  {
    id: "TXN1004",
    orderId: "ORD1004",
    customer: "Neha Gupta",
    chef: "Priya Singh",
    amount: 210,
    commission: 21,
    chefEarning: 189,
    method: "UPI",
    date: "2026-11-07",
    status: "Paid",
    payoutStatus: "Paid",
  },
  {
    id: "TXN1005",
    orderId: "ORD1005",
    customer: "Vikas Yadav",
    chef: "Amit Verma",
    amount: 160,
    commission: 16,
    chefEarning: 144,
    method: "Card",
    date: "2026-11-06",
    status: "Failed",
    payoutStatus: "Not Applicable",
  },
  {
    id: "TXN1006",
    orderId: "ORD1006",
    customer: "Pooja Mishra",
    chef: "Neha Gupta",
    amount: 160,
    commission: 16,
    chefEarning: 144,
    method: "UPI",
    date: "2026-11-06",
    status: "Paid",
    payoutStatus: "Pending",
  },
  {
    id: "TXN1007",
    orderId: "ORD1007",
    customer: "Karan Singh",
    chef: "Sunita Sharma",
    amount: 280,
    commission: 28,
    chefEarning: 252,
    method: "COD",
    date: "2026-11-05",
    status: "Pending",
    payoutStatus: "Not Applicable",
  },
];

function Payments() {
  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem("adminPayments");
    return saved ? JSON.parse(saved) : initialPayments;
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    localStorage.setItem("adminPayments", JSON.stringify(payments));
  }, [payments]);

  const totalRevenue = payments
    .filter(p => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalCommission = payments
    .filter(p => p.status === "Paid")
    .reduce((sum, p) => sum + p.commission, 0);

  const totalChefEarnings = payments
    .filter(p => p.status === "Paid")
    .reduce((sum, p) => sum + p.chefEarning, 0);

  const pendingPayouts = payments
    .filter(p => p.status === "Paid" && p.payoutStatus === "Pending")
    .reduce((sum, p) => sum + p.chefEarning, 0);

  const paidPayouts = payments
    .filter(p => p.payoutStatus === "Paid")
    .reduce((sum, p) => sum + p.chefEarning, 0);

  const filteredPayments = payments.filter(payment => {
    const text = search.toLowerCase();

    const matchesSearch =
      payment.id.toLowerCase().includes(text) ||
      payment.orderId.toLowerCase().includes(text) ||
      payment.customer.toLowerCase().includes(text) ||
      payment.chef.toLowerCase().includes(text);

    const matchesFilter =
      filter === "All" || payment.status === filter;

    return matchesSearch && matchesFilter;
  });

  const updatePayout = (id) => {
    setPayments(prev =>
      prev.map(payment =>
        payment.id === id
          ? { ...payment, payoutStatus: "Paid" }
          : payment
      )
    );

    setSelectedPayment(prev =>
      prev?.id === id ? { ...prev, payoutStatus: "Paid" } : prev
    );
  };

  return (
    <div className="payments-page">
      <div className="payments-heading">
        <div>
          <h1>Payments & Commission</h1>
          <p>Track marketplace revenue, commission and HomeChef payouts.</p>
        </div>
        <div className="payments-heading-icon">
          <FaWallet />
        </div>
      </div>

      <div className="payment-stats">
        <div className="payment-stat-card">
          <span>Total Revenue</span>
          <h2>₹{totalRevenue.toLocaleString("en-IN")}</h2>
          <div className="payment-stat-icon green"><FaMoneyBillWave /></div>
          <small>Successful payments</small>
        </div>

        <div className="payment-stat-card">
          <span>Platform Commission</span>
          <h2>₹{totalCommission.toLocaleString("en-IN")}</h2>
          <div className="payment-stat-icon orange"><FaChartLine /></div>
          <small>Platform earnings</small>
        </div>

        <div className="payment-stat-card">
          <span>HomeChef Earnings</span>
          <h2>₹{totalChefEarnings.toLocaleString("en-IN")}</h2>
          <div className="payment-stat-icon blue"><FaWallet /></div>
          <small>Net chef earnings</small>
        </div>

        <div className="payment-stat-card">
          <span>Pending Payouts</span>
          <h2>₹{pendingPayouts.toLocaleString("en-IN")}</h2>
          <div className="payment-stat-icon red"><FaClock /></div>
          <small>Awaiting payout</small>
        </div>
      </div>

      <div className="payout-summary">
        <div>
          <div className="payout-summary-icon"><FaCheckCircle /></div>
          <div>
            <span>Total Paid to HomeChefs</span>
            <h3>₹{paidPayouts.toLocaleString("en-IN")}</h3>
          </div>
        </div>
        <div className="payout-summary-note">
          Payout summary based on successful demo transactions
        </div>
      </div>

      <div className="payments-toolbar">
        <div className="payments-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search Transaction, Order, Customer, Chef..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="payments-filter">
          <FaFilter />
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="All">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="payments-table-container">
        <div className="payments-table-title">
          <h3>Transaction History</h3>
          <span>{filteredPayments.length} transactions</span>
        </div>

        <div className="payments-table-scroll">
          <table className="payments-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>HomeChef</th>
                <th>Amount</th>
                <th>Commission</th>
                <th>Payment Method</th>
                <th>Payment Status</th>
                <th>Payout Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.map(payment => (
                <tr key={payment.id}>
                  <td><strong className="transaction-id">{payment.id}</strong></td>
                  <td>{payment.customer}</td>
                  <td>{payment.chef}</td>
                  <td>₹{payment.amount}</td>
                  <td>₹{payment.commission}</td>
                  <td>{payment.method}</td>
                  <td>
                    <span className={`payment-status ${payment.status.toLowerCase()}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td>
                    <span className={`payout-status ${payment.payoutStatus.toLowerCase().replaceAll(" ", "-")}`}>
                      {payment.payoutStatus}
                    </span>
                  </td>
                  <td>
                    <button
                      className="payment-view-btn"
                      title="View Details"
                      onClick={() => setSelectedPayment(payment)}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="9" className="payments-empty">
                    <FaWallet />
                    <p>No transactions found!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPayment && (
        <div
          className="payment-modal-overlay"
          onClick={() => setSelectedPayment(null)}
        >
          <div className="payment-modal" onClick={e => e.stopPropagation()}>
            <div className="payment-modal-header">
              <div>
                <h2>Transaction Details</h2>
                <p>{selectedPayment.id}</p>
              </div>
              <button onClick={() => setSelectedPayment(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="payment-modal-body">
              <div className="payment-amount-display">
                <span>Transaction Amount</span>
                <h2>₹{selectedPayment.amount}</h2>
                <span className={`payment-status ${selectedPayment.status.toLowerCase()}`}>
                  {selectedPayment.status}
                </span>
              </div>

              <div className="payment-detail-list">
                <div><span>Order ID</span><strong>{selectedPayment.orderId}</strong></div>
                <div><span>Customer</span><strong>{selectedPayment.customer}</strong></div>
                <div><span>HomeChef</span><strong>{selectedPayment.chef}</strong></div>
                <div><span>Payment Method</span><strong>{selectedPayment.method}</strong></div>
                <div><span>Transaction Date</span><strong>{selectedPayment.date}</strong></div>
                <div><span>Platform Commission</span><strong>₹{selectedPayment.commission}</strong></div>
                <div><span>HomeChef Earning</span><strong>₹{selectedPayment.chefEarning}</strong></div>
                <div><span>Payout Status</span><strong>{selectedPayment.payoutStatus}</strong></div>
              </div>
            </div>

            <div className="payment-modal-footer">
              {selectedPayment.status === "Paid" &&
               selectedPayment.payoutStatus === "Pending" && (
                <button
                  className="mark-paid-btn"
                  onClick={() => updatePayout(selectedPayment.id)}
                >
                  <FaCheckCircle /> Mark Payout as Paid
                </button>
              )}

              <button
                className="payment-close-btn"
                onClick={() => setSelectedPayment(null)}
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

export default Payments;
