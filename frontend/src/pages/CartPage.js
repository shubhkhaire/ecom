import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );

  return (
    <div className="container mt-4 fade-in">
      <div className="cart-container">
        <h3 className="cart__title">🛒 Your Shopping Cart</h3>
        {cart.length === 0 ? (
          <div className="text-center" style={{ padding: "3rem 0" }}>
            <p
              className="text-muted"
              style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}
            >
              Your cart is empty. Start shopping!
            </p>
            <Link to="/" className="btn btn--primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                key={item._id}
                className="cart-item"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className="d-flex align-items-center gap-3"
                  style={{ flex: 1 }}
                >
                  {item.image && (
                    <div
                      className="image-wrapper"
                      style={{ width: "80px", height: "80px", flexShrink: 0 }}
                    >
                      <img src={item.image} alt={item.name} loading="lazy" />
                    </div>
                  )}
                  <div>
                    <h5 style={{ marginBottom: "0.3rem", fontWeight: 700 }}>
                      {item.name}
                    </h5>
                    {item.qty && (
                      <small className="text-muted">Quantity: {item.qty}</small>
                    )}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className="price" style={{ fontSize: "1.3rem" }}>
                    ₹{item.price * (item.qty || 1)}
                  </span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div
              className="d-flex justify-content-between align-items-center"
              style={{
                marginTop: "2rem",
                padding: "1.5rem",
                background: "var(--gradient-subtle)",
                borderRadius: "var(--r-md)",
                border: "1px solid var(--border-color)",
              }}
            >
              <h4
                className="gradient-text"
                style={{ fontSize: "1.5rem", margin: 0 }}
              >
                Total Amount
              </h4>
              <h3
                className="gradient-text"
                style={{ fontSize: "2rem", margin: 0 }}
              >
                ₹{total.toFixed(2)}
              </h3>
            </div>

            <div className="d-flex gap-3 mt-4">
              <Link to="/" className="btn btn--ghost" style={{ flex: 1 }}>
                Continue Shopping
              </Link>
              <Link
                to="/checkout"
                className="btn btn--primary"
                style={{ flex: 1 }}
              >
                Proceed to Checkout →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
