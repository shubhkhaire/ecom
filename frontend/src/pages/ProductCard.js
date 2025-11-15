import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductCard({ product, index }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete) {
      setImageLoaded(true);
    }
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      className={`card mb-3 stagger-item fade-in-up`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="image-wrapper">
        <img
          ref={imgRef}
          src={product.image}
          className={`card-img-top ${imageLoaded ? "loaded" : ""}`}
          alt={product.name}
          loading="lazy"
          onLoad={handleImageLoad}
        />
        {!imageLoaded && (
          <div
            className="lazy-load"
            style={{ position: "absolute", inset: 0 }}
          />
        )}
      </div>
      <div className="card-body">
        <h5 className="card__title">{product.name}</h5>
        <p className="price">₹{product.price}</p>
        <Link
          to={`/product/${product._id}`}
          className="btn btn-outline-primary btn-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
