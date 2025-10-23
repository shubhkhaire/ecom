import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container mt-4">
      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              className="d-flex justify-content-between border p-2"
            >
              <span>{item.name}</span>
              <span>₹{item.price}</span>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
          <h4 className="mt-3">Total: ₹{total}</h4>
          <Link to="/checkout" className="btn btn-success mt-2">
            Proceed to Checkout
          </Link>
        </>
      )}
    </div>
  );
}

export default CartPage;
