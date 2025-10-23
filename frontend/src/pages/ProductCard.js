import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="card mb-3">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5>{product.name}</h5>
        <p>₹{product.price}</p>
        <Link
          to={`/product/${product._id}`}
          className="btn btn-outline-primary"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
