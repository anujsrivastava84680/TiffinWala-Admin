
import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaStar,
  FaEye,
  FaTimes,
  FaTrash,
  FaCheck,
  FaEyeSlash,
  FaRegStar,
  FaFilter,
} from "react-icons/fa";
import "./CSS/Reviews.css";

const initialReviews = [
  {
    id: "REV1001",
    customer: "Rahul Sharma",
    email: "rahul@example.com",
    chef: "Ramesh Kumar",
    tiffin: "Healthy Veg Thali",
    rating: 5,
    date: "2026-11-09",
    review: "Excellent homemade food. The taste and quality were amazing. Delivery was also on time.",
    status: "Approved",
  },
  {
    id: "REV1002",
    customer: "Priya Singh",
    email: "priya@example.com",
    chef: "Sunita Sharma",
    tiffin: "Special Paneer Thali",
    rating: 4,
    date: "2026-11-08",
    review: "Food was delicious and fresh. Packaging could be a little better.",
    status: "Pending",
  },
  {
    id: "REV1003",
    customer: "Amit Verma",
    email: "amit@example.com",
    chef: "Neha Gupta",
    tiffin: "Mini Lunch Combo",
    rating: 2,
    date: "2026-11-08",
    review: "The food arrived cold and was not as described.",
    status: "Hidden",
  },
  {
    id: "REV1004",
    customer: "Neha Gupta",
    email: "neha@example.com",
    chef: "Ramesh Kumar",
    tiffin: "Regular Veg Thali",
    rating: 5,
    date: "2026-11-07",
    review: "Very tasty food with homely flavour. Highly recommended!",
    status: "Approved",
  },
  {
    id: "REV1005",
    customer: "Karan Singh",
    email: "karan@example.com",
    chef: "Priya Verma",
    tiffin: "North Indian Thali",
    rating: 3,
    date: "2026-11-06",
    review: "Average experience. Some items were good but overall quantity was less.",
    status: "Pending",
  },
  {
    id: "REV1006",
    customer: "Pooja Mishra",
    email: "pooja@example.com",
    chef: "Sunita Sharma",
    tiffin: "Homestyle Dinner",
    rating: 4,
    date: "2026-11-05",
    review: "Good taste and reasonable price. I will order again.",
    status: "Approved",
  },
  {
    id: "REV1007",
    customer: "Vikas Yadav",
    email: "vikas@example.com",
    chef: "Neha Gupta",
    tiffin: "Dal Rice Combo",
    rating: 1,
    date: "2026-11-04",
    review: "Very poor experience. The order was not satisfactory.",
    status: "Pending",
  },
];

function Reviews() {
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem("adminReviews");
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    localStorage.setItem("adminReviews", JSON.stringify(reviews));
  }, [reviews]);

  const totalReviews = reviews.length;
  const approved = reviews.filter(r => r.status === "Approved").length;
  const pending = reviews.filter(r => r.status === "Pending").length;
  const hidden = reviews.filter(r => r.status === "Hidden").length;

  const averageRating = totalReviews
    ? (
        reviews.reduce((sum, review) => sum + review.rating, 0) /
        totalReviews
      ).toFixed(1)
    : "0.0";

  const filteredReviews = reviews.filter(review => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      review.id.toLowerCase().includes(searchText) ||
      review.customer.toLowerCase().includes(searchText) ||
      review.chef.toLowerCase().includes(searchText) ||
      review.tiffin.toLowerCase().includes(searchText) ||
      review.review.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" || review.status === statusFilter;

    const matchesRating =
      ratingFilter === "All" ||
      review.rating === Number(ratingFilter);

    return matchesSearch && matchesStatus && matchesRating;
  });

  const updateReviewStatus = (id, status) => {
    setReviews(prev =>
      prev.map(review =>
        review.id === id ? { ...review, status } : review
      )
    );

    setSelectedReview(prev =>
      prev?.id === id ? { ...prev, status } : prev
    );
  };

  const deleteReview = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    setReviews(prev => prev.filter(review => review.id !== id));
    setSelectedReview(null);
  };

  const renderStars = (rating) => (
    <span className="review-stars">
      {[1, 2, 3, 4, 5].map(star =>
        star <= rating ? (
          <FaStar key={star} />
        ) : (
          <FaRegStar key={star} />
        )
      )}
    </span>
  );

  return (
    <div className="reviews-page">
      <div className="reviews-heading">
        <div>
          <h1>Reviews & Ratings</h1>
          <p>Monitor customer feedback and manage platform reviews.</p>
        </div>
        <div className="reviews-heading-icon">
          <FaStar />
        </div>
      </div>

      <div className="reviews-stats">
        <div className="review-stat-card">
          <span>Total Reviews</span>
          <h2>{totalReviews}</h2>
          <div className="review-stat-icon green"><FaStar /></div>
        </div>

        <div className="review-stat-card">
          <span>Average Rating</span>
          <h2>{averageRating} <FaStar className="average-star" /></h2>
          <div className="review-stat-icon orange"><FaRegStar /></div>
        </div>

        <div className="review-stat-card">
          <span>Approved Reviews</span>
          <h2>{approved}</h2>
          <div className="review-stat-icon green"><FaCheck /></div>
        </div>

        <div className="review-stat-card">
          <span>Pending / Hidden</span>
          <h2>{pending + hidden}</h2>
          <div className="review-stat-icon orange"><FaEyeSlash /></div>
        </div>
      </div>

      <div className="reviews-toolbar">
        <div className="reviews-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search customer, chef, tiffin or review..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="reviews-filter">
          <FaFilter />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Hidden">Hidden</option>
          </select>
        </div>

        <div className="reviews-filter">
          <FaStar />
          <select
            value={ratingFilter}
            onChange={e => setRatingFilter(e.target.value)}
          >
            <option value="All">All Ratings</option>
            {[5, 4, 3, 2, 1].map(rating => (
              <option key={rating} value={rating}>{rating} Stars</option>
            ))}
          </select>
        </div>
      </div>

      <div className="reviews-table-container">
        <div className="reviews-table-title">
          <h3>All Customer Reviews</h3>
          <span>{filteredReviews.length} results</span>
        </div>

        <div className="reviews-table-scroll">
          <table className="reviews-table">
            <thead>
              <tr>
                <th>Review ID</th>
                <th>Customer</th>
                <th>HomeChef</th>
                <th>Tiffin</th>
                <th>Rating</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredReviews.map(review => (
                <tr key={review.id}>
                  <td><strong className="review-id">{review.id}</strong></td>
                  <td>{review.customer}</td>
                  <td>{review.chef}</td>
                  <td>{review.tiffin}</td>
                  <td>{renderStars(review.rating)}</td>
                  <td>{review.date}</td>
                  <td>
                    <span className={`review-status ${review.status.toLowerCase()}`}>
                      {review.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="review-action-btn"
                      title="View Review"
                      onClick={() => setSelectedReview(review)}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredReviews.length === 0 && (
                <tr>
                  <td colSpan="8" className="reviews-empty">
                    <FaRegStar />
                    <p>No reviews found!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedReview && (
        <div
          className="review-modal-overlay"
          onClick={() => setSelectedReview(null)}
        >
          <div className="review-modal" onClick={e => e.stopPropagation()}>
            <div className="review-modal-header">
              <div>
                <h2>Review Details</h2>
                <p>{selectedReview.id}</p>
              </div>
              <button onClick={() => setSelectedReview(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="review-modal-body">
              <div className="review-detail-box">
                <h4>Customer Information</h4>
                <p><span>Name</span><strong>{selectedReview.customer}</strong></p>
                <p><span>Email</span><strong>{selectedReview.email}</strong></p>
                <p><span>Review Date</span><strong>{selectedReview.date}</strong></p>
              </div>

              <div className="review-detail-box">
                <h4>Order Information</h4>
                <p><span>HomeChef</span><strong>{selectedReview.chef}</strong></p>
                <p><span>Tiffin</span><strong>{selectedReview.tiffin}</strong></p>
              </div>

              <div className="review-detail-box">
                <h4>Customer Feedback</h4>
                <div className="review-modal-stars">
                  {renderStars(selectedReview.rating)}
                  <strong>{selectedReview.rating}/5</strong>
                </div>
                <p className="review-full-text">{selectedReview.review}</p>
              </div>

              <div className="review-detail-box">
                <h4>Review Status</h4>
                <span className={`review-status ${selectedReview.status.toLowerCase()}`}>
                  {selectedReview.status}
                </span>
              </div>
            </div>

            <div className="review-modal-actions">
              {selectedReview.status !== "Approved" && (
                <button
                  className="review-approve-btn"
                  onClick={() => updateReviewStatus(selectedReview.id, "Approved")}
                >
                  <FaCheck /> Approve
                </button>
              )}

              {selectedReview.status !== "Hidden" && (
                <button
                  className="review-hide-btn"
                  onClick={() => updateReviewStatus(selectedReview.id, "Hidden")}
                >
                  <FaEyeSlash /> Hide
                </button>
              )}

              {selectedReview.status === "Hidden" && (
                <button
                  className="review-approve-btn"
                  onClick={() => updateReviewStatus(selectedReview.id, "Approved")}
                >
                  <FaEye /> Show Again
                </button>
              )}

              <button
                className="review-delete-btn"
                onClick={() => deleteReview(selectedReview.id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reviews;
