import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { API_BASE_URL } from "../config";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [related, setRelated] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");

  useEffect(() => {
    let mounted = true;
    fetch(`${API_BASE_URL}/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => {
        if (mounted) setProduct(data);
      })
      .catch((err) => console.error(err));

    return () => (mounted = false);
  }, [id]);

  useEffect(() => {
    const loadRelated = async () => {
      try {
        setLoadingRelated(true);
        const res = await fetch(`${API_BASE_URL}/products/${id}/related`);
        if (res.ok) {
          const data = await res.json();
          setRelated(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        console.error("Failed to load related products", e);
      } finally {
        setLoadingRelated(false);
      }
    };
    if (id) loadRelated();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAdd = () => {
    const maxQty = Math.max(0, Number(product.countInStock) || 0);
    const clampedQty = Math.min(Math.max(1, Number(qty) || 1), maxQty || 1);
    if (maxQty === 0) return; // out of stock safeguard
    addToCart({ ...product, qty: clampedQty });
  };

  const handleQtyChange = (val) => {
    const maxQty = Math.max(0, Number(product.countInStock) || 0);
    const n = Number(val);
    if (Number.isNaN(n)) return;
    setQty((prev) => {
      const clamped = Math.min(Math.max(1, n), Math.max(1, maxQty));
      return clamped;
    });
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setReviewError("");
    setReviewSuccess("");
    if (!user) {
      setReviewError("Please login to write a review.");
      return;
    }
    try {
      setSubmittingReview(true);
      const res = await fetch(`${API_BASE_URL}/products/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ rating: reviewRating, comment: reviewComment }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to submit review");
      setReviewSuccess("Review submitted successfully.");
      setReviewComment("");
      setReviewRating(5);
      // Refresh product to show latest reviews and rating
      const pr = await fetch(`${API_BASE_URL}/products/${id}`);
      if (pr.ok) setProduct(await pr.json());
    } catch (err) {
      setReviewError(err.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="product-details container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid"
            onError={(e) => {
              console.error("Product image failed to load:", e.target.src);
              e.target.src = "https://via.placeholder.com/400?text=No+Image";
            }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h3>₹{product.price}</h3>
          <div className="mb-2 text-muted">
            {typeof product.rating === "number" ? (
              <span>
                Rating: {product.rating.toFixed(1)} / 5
                {typeof product.numReviews === "number" && (
                  <span> ({product.numReviews} reviews)</span>
                )}
              </span>
            ) : (
              <span>No ratings yet</span>
            )}
          </div>
          {product.countInStock === 0 && (
            <div
              style={{
                display: "inline-block",
                background: "#dc3545",
                color: "#fff",
                padding: "4px 8px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Out of Stock
            </div>
          )}
          <div className="d-flex align-items-center mb-3">
            <label className="me-2">Qty:</label>
            <input
              type="number"
              min="1"
              max={Math.max(1, product.countInStock || 1)}
              value={qty}
              onChange={(e) => handleQtyChange(e.target.value)}
              className="form-control qty-input"
              disabled={(product.countInStock || 0) === 0}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={handleAdd}
            disabled={(product.countInStock || 0) === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="row mt-5">
        <div className="col-md-6">
          <h4>Customer Reviews</h4>
          {product.reviews && product.reviews.length > 0 ? (
            <ul className="list-group">
              {product.reviews.map((r) => (
                <li key={r._id || r.user} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <strong>{r.name || "Anonymous"}</strong>
                    <span>
                      {typeof r.rating === "number" ? `${r.rating}/5` : ""}
                    </span>
                  </div>
                  {r.createdAt && (
                    <small className="text-muted">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </small>
                  )}
                  <p className="mb-0 mt-1">{r.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No reviews yet.</p>
          )}
        </div>
        <div className="col-md-6">
          <h4>Write a Review</h4>
          {!user ? (
            <p>
              Please <Link to="/auth">login</Link> to write a review.
            </p>
          ) : (
            <form onSubmit={submitReview} className="card p-3 shadow-sm">
              {reviewError && (
                <div className="alert alert-danger py-2" role="alert">
                  {reviewError}
                </div>
              )}
              {reviewSuccess && (
                <div className="alert alert-success py-2" role="alert">
                  {reviewSuccess}
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <select
                  className="form-control"
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                >
                  {[5, 4, 3, 2, 1].map((v) => (
                    <option key={v} value={v}>{`${v} - ${
                      v === 5
                        ? "Excellent"
                        : v === 4
                        ? "Good"
                        : v === 3
                        ? "Average"
                        : v === 2
                        ? "Poor"
                        : "Terrible"
                    }`}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Comment</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your experience..."
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submittingReview}
              >
                {submittingReview ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-5">
        <h4>Related Products</h4>
        {loadingRelated ? (
          <p>Loading related products...</p>
        ) : related.length === 0 ? (
          <p className="text-muted">No related products found.</p>
        ) : (
          <div className="row">
            {related.map((p) => (
              <div className="col-md-3 mb-4" key={p._id}>
                <div className="card h-100 shadow-sm position-relative">
                  {p.countInStock === 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        background: "#dc3545",
                        color: "#fff",
                        padding: "4px 8px",
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      Out of Stock
                    </div>
                  )}
                  <img
                    src={p.image || "https://via.placeholder.com/200"}
                    className="card-img-top"
                    alt={p.name}
                    style={{ opacity: p.countInStock === 0 ? 0.6 : 1 }}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/200?text=No+Image";
                    }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title" title={p.name}>
                      {p.name}
                    </h5>
                    <p className="card-text">₹{p.price}</p>
                    <Link
                      to={`/product/${p._id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
