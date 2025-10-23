import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { API_BASE_URL } from "../config";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useContext(CartContext);

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

  if (!product) return <p>Loading...</p>;

  const handleAdd = () => {
    addToCart({ ...product, qty });
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
          <div className="d-flex align-items-center mb-3">
            <label className="me-2">Qty:</label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="form-control qty-input"
            />
          </div>
          <button className="btn btn-primary" onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
