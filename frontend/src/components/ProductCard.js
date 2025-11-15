import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FALLBACK_IMG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='400' height='300' fill='%23f1f5f9'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2364758b' font-family='Arial' font-size='20'>Image unavailable</text></svg>";

function ProductCard({ product, index }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageErrored, setImageErrored] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setImageLoaded(true);
    }
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageErrored(true);
    setImageLoaded(true); // remove skeleton
    console.warn(
      "[ProductCard] Image failed to load for",
      product?.name,
      product?.image
    );
  };

  function normalizeSrc(raw) {
    if (!raw) return FALLBACK_IMG;
    if (imageErrored) return FALLBACK_IMG;
    // Unsplash optimization: strip existing query and add standard params
    if (raw.includes("images.unsplash.com")) {
      const base = raw.split("?")[0];
      return `${base}?auto=format&fit=crop&w=400&q=80`; // consistent sizing & quality
    }
    return raw;
  }
  const src = normalizeSrc(product?.image);

  return (
    <div
      className={`card mb-3 stagger-item fade-in-up`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="image-wrapper">
        <img
          ref={imgRef}
          src={src}
          className={`card-img-top ${imageLoaded ? "loaded" : ""}`}
          alt={product?.name || "Product"}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
          decoding="async"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
        />
        {!imageLoaded && (
          <div
            className="lazy-load"
            style={{ position: "absolute", inset: 0 }}
          />
        )}
        {imageErrored && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              padding: "0.5rem",
              textAlign: "center",
            }}
          >
            Failed to load image
          </div>
        )}
      </div>
      <div className="card-body">
        <h5 className="card__title">{product?.name || "Unnamed"}</h5>
        <p className="price">₹{product?.price ?? "--"}</p>
        <Link
          to={`/product/${product?._id}`}
          className="btn btn-outline-primary btn-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
