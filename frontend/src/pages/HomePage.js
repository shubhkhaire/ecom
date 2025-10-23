import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch products from your backend
    fetch(`${API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      (product.category &&
        product.category.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛍️ Our Products</h2>
      <div className="search-bar colorful-search mb-4">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search products by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredProducts.length === 0 ? (
          <div
            className="col-12 text-center text-muted"
            style={{ fontSize: "1.2rem", marginTop: "2rem" }}
          >
            No products found.
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div className="col-md-3 mb-4" key={product._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image || "https://via.placeholder.com/200"}
                  className="card-img-top"
                  alt={product.name}
                  onError={(e) => {
                    console.error("Image failed to load:", e.target.src);
                    e.target.src =
                      "https://via.placeholder.com/200?text=No+Image";
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">₹{product.price}</p>
                  <Link
                    to={`/product/${product._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
