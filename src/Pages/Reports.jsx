
import React, { useMemo, useState } from "react";
import {
  FaChartLine,
  FaUsers,
  FaUserTie,
  FaShoppingBag,
  FaRupeeSign,
  FaDownload,
  FaFilter,
  FaStar,
} from "react-icons/fa";
import "./CSS/Reports.css";

const readStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const getDate = (item) => {
  const value = item.date || item.orderDate || item.createdAt || item.created_at;
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getAmount = (item) => {
  const value =
    item.amount ??
    item.totalAmount ??
    item.total ??
    item.price ??
    item.orderAmount ??
    0;

  const amount = Number(String(value).replace(/[₹,\s]/g, ""));
  return Number.isFinite(amount) ? amount : 0;
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

function Reports() {
  const [period, setPeriod] = useState("Monthly");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Read data from the Admin Panel's existing LocalStorage modules.
  const orders = useMemo(() => readStorage("adminOrders"), []);
  const payments = useMemo(() => readStorage("adminPayments"), []);
  const customers = useMemo(() => readStorage("adminCustomers"), []);
  const chefs = useMemo(() => readStorage("adminHomeChefs"), []);
  const tiffins = useMemo(() => readStorage("adminTiffins"), []);

  const isInRange = (item) => {
    const date = getDate(item);
    if (!date) return !startDate && !endDate;

    const start = startDate ? new Date(`${startDate}T00:00:00`) : null;
    const end = endDate ? new Date(`${endDate}T23:59:59`) : null;

    return (!start || date >= start) && (!end || date <= end);
  };

  const filteredOrders = orders.filter(isInRange);
  const filteredPayments = payments.filter(isInRange);

  const completedOrders = filteredOrders.filter(order =>
    ["completed", "delivered"].includes(String(order.status || "").toLowerCase())
  );

  const cancelledOrders = filteredOrders.filter(order =>
    String(order.status || "").toLowerCase() === "cancelled"
  );

  const pendingOrders = filteredOrders.filter(order =>
    ["pending", "accepted", "preparing", "out for delivery"].includes(
      String(order.status || "").toLowerCase()
    )
  );

  const paidPayments = filteredPayments.filter(payment =>
    String(payment.status || "").toLowerCase() === "paid"
  );

  const revenue = paidPayments.reduce((sum, payment) => sum + getAmount(payment), 0);

  const commission = paidPayments.reduce((sum, payment) => {
    const amount = getAmount(payment);
    const savedCommission = Number(payment.commission);
    return sum + (
      Number.isFinite(savedCommission) && savedCommission > 0
        ? savedCommission
        : amount * 0.10
    );
  }, 0);

  const chefEarnings = Math.max(0, revenue - commission);

  const averageOrderValue = filteredOrders.length
    ? filteredOrders.reduce((sum, order) => sum + getAmount(order), 0) / filteredOrders.length
    : 0;

  const getPeriodLabel = (date) => {
    if (period === "Daily") {
      return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    }
    if (period === "Weekly") {
      return `Week ${Math.ceil(date.getDate() / 7)}`;
    }
    return date.toLocaleDateString("en-IN", { month: "short" });
  };

  const chartData = useMemo(() => {
    const grouped = {};

    filteredOrders.forEach(order => {
      const date = getDate(order);
      if (!date) return;

      const label = getPeriodLabel(date);
      grouped[label] = (grouped[label] || 0) + 1;
    });

    return Object.entries(grouped).map(([label, count]) => ({
      label,
      count,
    }));
  }, [filteredOrders, period, startDate, endDate]);

  const maxOrders = Math.max(1, ...chartData.map(item => item.count));

  const statusData = [
    { label: "Completed / Delivered", value: completedOrders.length },
    { label: "Pending / Processing", value: pendingOrders.length },
    { label: "Cancelled", value: cancelledOrders.length },
  ];

  const maxStatus = Math.max(1, ...statusData.map(item => item.value));

  const topChefs = useMemo(() => {
    const counts = {};

    filteredOrders.forEach(order => {
      const name = order.chef || order.chefName || order.homeChef || "Unknown Chef";
      counts[name] = (counts[name] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [filteredOrders]);

  const popularTiffins = useMemo(() => {
    const counts = {};

    filteredOrders.forEach(order => {
      const name = order.tiffin || order.tiffinName || order.productName || "Unknown Tiffin";
      counts[name] = (counts[name] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [filteredOrders]);

  const paymentCounts = {
    Paid: filteredPayments.filter(p => String(p.status || "").toLowerCase() === "paid").length,
    Pending: filteredPayments.filter(p => String(p.status || "").toLowerCase() === "pending").length,
    Failed: filteredPayments.filter(p => String(p.status || "").toLowerCase() === "failed").length,
  };

  const exportCSV = () => {
    const rows = [
      ["Report", "Value"],
      ["Total Orders", filteredOrders.length],
      ["Completed Orders", completedOrders.length],
      ["Pending / Processing Orders", pendingOrders.length],
      ["Cancelled Orders", cancelledOrders.length],
      ["Paid Revenue", revenue],
      ["Platform Commission", commission],
      ["HomeChef Earnings (estimated)", chefEarnings],
      ["Average Order Value", Math.round(averageOrderValue)],
      ["Customers (all-time)", customers.length],
      ["HomeChefs (all-time)", chefs.length],
      ["Tiffins (all-time)", tiffins.length],
      [],
      ["Order ID", "Customer", "HomeChef", "Tiffin", "Status", "Date", "Amount"],
      ...filteredOrders.map(order => [
        order.id || order.orderId || "",
        order.customer || order.customerName || "",
        order.chef || order.chefName || "",
        order.tiffin || order.tiffinName || "",
        order.status || "",
        order.date || order.orderDate || "",
        getAmount(order),
      ]),
    ];

    const csv = rows.map(row =>
      row.map(value => `"${String(value ?? "").replaceAll('"', '""')}"`).join(",")
    ).join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tiffin-marketplace-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearDates = () => {
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="reports-page">
      <div className="reports-heading">
        <div>
          <h1>Reports & Analytics</h1>
          <p>Track marketplace performance and business growth.</p>
        </div>

        <button className="report-export-btn" onClick={exportCSV}>
          <FaDownload /> Export CSV
        </button>
      </div>

      <div className="reports-date-filter">
        <div className="reports-filter-title">
          <FaFilter /> <strong>Filter Reports</strong>
        </div>

        <select value={period} onChange={e => setPeriod(e.target.value)}>
          <option value="Daily">Daily View</option>
          <option value="Weekly">Weekly View</option>
          <option value="Monthly">Monthly View</option>
        </select>

        <label>
          From
          <input
            type="date"
            value={startDate}
            max={endDate || undefined}
            onChange={e => setStartDate(e.target.value)}
          />
        </label>

        <label>
          To
          <input
            type="date"
            value={endDate}
            min={startDate || undefined}
            onChange={e => setEndDate(e.target.value)}
          />
        </label>

        <button className="report-clear-btn" onClick={clearDates}>
          Clear Dates
        </button>
      </div>

      <div className="reports-section-heading">
        <h2>Business Overview</h2>
        <span>Based on available Admin demo data</span>
      </div>

      <div className="reports-stats-grid">
        <div className="report-stat-card">
          <div className="report-stat-top">
            <span>Paid Revenue</span>
            <div className="report-stat-icon green"><FaRupeeSign /></div>
          </div>
          <h2>{formatCurrency(revenue)}</h2>
          <small>Successful paid transactions</small>
        </div>

        <div className="report-stat-card">
          <div className="report-stat-top">
            <span>Platform Commission</span>
            <div className="report-stat-icon orange"><FaChartLine /></div>
          </div>
          <h2>{formatCurrency(commission)}</h2>
          <small>Saved commission or estimated 10%</small>
        </div>

        <div className="report-stat-card">
          <div className="report-stat-top">
            <span>HomeChef Earnings</span>
            <div className="report-stat-icon green"><FaUserTie /></div>
          </div>
          <h2>{formatCurrency(chefEarnings)}</h2>
          <small>Estimated after commission</small>
        </div>

        <div className="report-stat-card">
          <div className="report-stat-top">
            <span>Total Orders</span>
            <div className="report-stat-icon orange"><FaShoppingBag /></div>
          </div>
          <h2>{filteredOrders.length}</h2>
          <small>{completedOrders.length} completed orders</small>
        </div>

        <div className="report-stat-card">
          <div className="report-stat-top">
            <span>Customers</span>
            <div className="report-stat-icon green"><FaUsers /></div>
          </div>
          <h2>{customers.length}</h2>
          <small>All-time Admin records</small>
        </div>

        <div className="report-stat-card">
          <div className="report-stat-top">
            <span>HomeChefs</span>
            <div className="report-stat-icon orange"><FaUserTie /></div>
          </div>
          <h2>{chefs.length}</h2>
          <small>All-time Admin records</small>
        </div>
      </div>

      <div className="reports-main-grid">
        <section className="report-panel">
          <div className="report-panel-heading">
            <div>
              <h3>Orders Overview</h3>
              <p>{period} order activity</p>
            </div>
            <FaChartLine />
          </div>

          {chartData.length > 0 ? (
            <div className="report-bar-chart">
              {chartData.map(item => (
                <div className="report-bar-item" key={item.label}>
                  <strong>{item.count}</strong>
                  <div className="report-bar-track">
                    <div
                      className="report-bar-fill"
                      style={{ height: `${(item.count / maxOrders) * 100}%` }}
                    />
                  </div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="report-no-data">No dated order records available for this filter.</div>
          )}
        </section>

        <section className="report-panel">
          <div className="report-panel-heading">
            <div>
              <h3>Order Status Analysis</h3>
              <p>Order distribution</p>
            </div>
            <FaShoppingBag />
          </div>

          <div className="report-status-list">
            {statusData.map(item => (
              <div className="report-status-item" key={item.label}>
                <div className="report-status-label">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
                <div className="report-status-track">
                  <div
                    className="report-status-fill"
                    style={{ width: `${(item.value / maxStatus) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="reports-main-grid">
        <section className="report-panel">
          <div className="report-panel-heading">
            <div>
              <h3>Top Performing HomeChefs</h3>
              <p>Based on order count</p>
            </div>
            <FaUserTie />
          </div>

          {topChefs.length ? topChefs.map((chef, index) => (
            <div className="report-ranking-row" key={chef.name}>
              <span className="report-rank">{index + 1}</span>
              <strong>{chef.name}</strong>
              <span>{chef.count} orders</span>
            </div>
          )) : <div className="report-no-data">No HomeChef order data available.</div>}
        </section>

        <section className="report-panel">
          <div className="report-panel-heading">
            <div>
              <h3>Popular Tiffins</h3>
              <p>Based on order count</p>
            </div>
            <FaStar />
          </div>

          {popularTiffins.length ? popularTiffins.map((tiffin, index) => (
            <div className="report-ranking-row" key={tiffin.name}>
              <span className="report-rank">{index + 1}</span>
              <strong>{tiffin.name}</strong>
              <span>{tiffin.count} orders</span>
            </div>
          )) : <div className="report-no-data">No Tiffin order data available.</div>}
        </section>
      </div>

      <section className="report-panel report-payment-panel">
        <div className="report-panel-heading">
          <div>
            <h3>Payment Reports</h3>
            <p>Transaction status summary</p>
          </div>
          <FaRupeeSign />
        </div>

        <div className="report-payment-grid">
          <div>
            <span>Paid Transactions</span>
            <strong>{paymentCounts.Paid}</strong>
          </div>
          <div>
            <span>Pending Transactions</span>
            <strong>{paymentCounts.Pending}</strong>
          </div>
          <div>
            <span>Failed Transactions</span>
            <strong>{paymentCounts.Failed}</strong>
          </div>
          <div>
            <span>Average Order Value</span>
            <strong>{formatCurrency(averageOrderValue)}</strong>
          </div>
        </div>
      </section>

      <p className="reports-disclaimer">
        Reports use data saved inside this Admin Panel. Customer and HomeChef
        records are not automatically synced between the separate applications.
        Commission is estimated at 10% when a transaction has no saved commission value.
      </p>
    </div>
  );
}

export default Reports;
