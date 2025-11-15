import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  // Refs to avoid extra re-renders and stale updates
  const searchTimerRef = useRef(null);
  const reqIdRef = useRef(0);

  // Build a compact page number list with ellipsis for large totals
  const buildPageList = (current, total, maxLength = 7) => {
    if (total <= maxLength) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const sideCount = Math.max(1, Math.floor((maxLength - 3) / 2));
    const left = Math.max(2, current - sideCount);
    const right = Math.min(total - 1, current + sideCount);

    const range = [];
    for (let i = left; i <= right; i++) range.push(i);

    const withEllipsis = [1];
    if (left > 2) withEllipsis.push("…");
    withEllipsis.push(...range);
    if (right < total - 1) withEllipsis.push("…");
    withEllipsis.push(total);
    return withEllipsis;
  };

  const fetchProducts = async (opts = {}) => {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      q.set("page", opts.page || page);
      q.set("limit", 12);
      q.set("sort", sortBy);
      const term = (search || "").trim();
      if (term) q.set("search", term);
      if (category && category !== "all") q.set("category", category);
      const url = `${API_BASE_URL}/products?${q.toString()}`;
      console.log("[HomePage] Fetching products:", url);
      const currentId = ++reqIdRef.current;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      console.log("[HomePage] Products response:", data);
      // Ignore stale responses
      if (currentId !== reqIdRef.current) return;
      const items = Array.isArray(data) ? data : data.products || [];
      setProducts(items);
      setPage(Array.isArray(data) ? 1 : data.page || 1);
      setPages(Array.isArray(data) ? 1 : data.pages || 1);
      setTotal(
        Array.isArray(data) ? items.length : data.total || items.length || 0
      );
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const catUrl = `${API_BASE_URL}/products/categories/list`;
      console.log("[HomePage] Fetching categories:", catUrl);
      const res = await fetch(catUrl);
      if (res.ok) {
        const data = await res.json();
        console.log("[HomePage] Categories response:", data);
        setCategories(data);
      }
    } catch (e) {
      console.error("Failed to load categories", e);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts({ page: 1 });

    const handler = () => {
      setSearch("");
      setCategory("all");
      setSortBy("newest");
      setPage(1);
      fetchProducts({ page: 1 });
    };

    window.addEventListener("refreshHome", handler);
    return () => window.removeEventListener("refreshHome", handler);
  }, []);

  // Debounce search so users don't need to press Enter
  useEffect(() => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setPage(1);
      fetchProducts({ page: 1 });
    }, 400);
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, [search]);

  // Refetch immediately when category or sort changes
  useEffect(() => {
    fetchProducts({ page: 1 });
  }, [category, sortBy]);

  const filteredProducts = products;

  if (loading) {
    return (
      <div className="container mt-5">
        <h3 className="text-center gradient-text">
          Loading amazing products...
        </h3>
      </div>
    );
  }

  return (
    <div className="container mt-5 fade-in">
      {/* Hero Section */}
      <div className="hero mb-5">
        <div className="hero__left">
          <h1 className="hero__title">Discover Amazing Products</h1>
          <p className="hero__subtitle">
            Shop the latest collection with exclusive deals and fast delivery
          </p>
          <div className="hero__cta">
            <button
              className="btn btn--primary btn-lg"
              onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })}
            >
              Explore Now
            </button>
          </div>
        </div>
        <div className="hero__art">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient
                id="heroGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#7c3aed", stopOpacity: 1 }}
                />
                <stop
                  offset="50%"
                  style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#ec4899", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <path
              fill="url(#heroGradient)"
              d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.8,56.4,53.8,69,40.1,76.8C26.4,84.6,10,87.6,-5.8,88.3C-21.6,89,-37.2,87.4,-50.3,80.1C-63.4,72.8,-74,59.8,-80.8,45.1C-87.6,30.4,-90.6,13.9,-89.1,-2.1C-87.6,-18.1,-81.6,-33.6,-72.8,-46.8C-64,-60,-52.4,-70.9,-39.1,-78.4C-25.8,-85.9,-10.7,-90,3.8,-96.8C18.3,-103.6,30.6,-83.6,44.7,-76.4Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </div>

      <h2 className="mb-4 gradient-text">🛍️ Our Products</h2>

      {/* Filters */}
      <div className="row mb-4 g-2 fade-in-up">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control search-input"
            placeholder="🔍 Search products by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchProducts({ page: 1 })}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filteredProducts.length === 0 ? (
          <div
            className="col-12 text-center text-muted fade-in"
            style={{ fontSize: "1.2rem", marginTop: "2rem" }}
          >
            No products found.
          </div>
        ) : (
          filteredProducts.map((product, index) => (
            <div className="col-md-3 mb-4" key={product._id}>
              <ProductCard product={product} index={index} />
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <nav
          className="d-flex flex-column align-items-center my-4 fade-in-up"
          aria-label="Product pagination"
        >
          <div className="d-flex justify-content-center align-items-center gap-2">
            <button
              className="btn btn-sm btn--ghost"
              disabled={page === 1}
              onClick={() => {
                const p = Math.max(1, page - 1);
                setPage(p);
                fetchProducts({ page: p });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              ← Prev
            </button>

            {buildPageList(page, pages).map((p, idx) =>
              p === "…" ? (
                <span
                  key={`dots-${idx}`}
                  className="text-muted"
                  style={{ padding: "0 6px" }}
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  className={`btn btn-sm ${
                    p === page ? "btn--primary" : "btn--ghost"
                  }`}
                  aria-current={p === page ? "page" : undefined}
                  onClick={() => {
                    if (p === page) return;
                    setPage(p);
                    fetchProducts({ page: p });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {p}
                </button>
              )
            )}

            <button
              className="btn btn-sm btn--ghost"
              disabled={page === pages}
              onClick={() => {
                const p = Math.min(pages, page + 1);
                setPage(p);
                fetchProducts({ page: p });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Next →
            </button>
          </div>
          <small className="text-muted mt-2">
            Page {page} of {pages} • {total} items
          </small>
        </nav>
      )}
    </div>
  );
}
