import React, { useContext, useState, useMemo } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { API_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

/*
  Mock checkout without real payment gateway:
  - Collect shipping address & payment method choice.
  - Simulate payment processing delay.
  - Create order via /api/orders (re-using existing order creation).
  - Show confirmation inline once complete & clear cart.
*/

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("India");
  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod | card | wallet
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [successOrder, setSuccessOrder] = useState(null);

  const cartTotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * (item.qty || 1), 0),
    [cart]
  );

  const validate = () => {
    if (!user) {
      setError("Please login to checkout.");
      return false;
    }
    if (cart.length === 0) {
      setError("Cart is empty.");
      return false;
    }
    if (!address || !city || !postal) {
      setError("Please fill in shipping details.");
      return false;
    }
    return true;
  };

  const mockProcessPayment = async () => {
    // Simulate server-side or gateway latency
    await new Promise((r) => setTimeout(r, 1200));
    // For card/wallet, pretend success; for COD, always success.
    return { status: "ok", transactionId: `TXN-${Date.now()}` };
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessOrder(null);
    if (!validate()) return;
    setPlacing(true);
    try {
      const paymentResult = await mockProcessPayment();
      if (paymentResult.status !== "ok") {
        throw new Error("Payment failed. Please try again.");
      }
      const items = cart.map((c) => ({
        _id: c._id,
        name: c.name,
        price: c.price,
        qty: c.qty || 1,
        image: c.image,
      }));
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?._id,
          items,
          total: cartTotal,
          shipping: { address, city, postal, country },
          payment: {
            method: paymentMethod,
            transactionId: paymentResult.transactionId,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || data.message || "Order failed");
      setSuccessOrder(data.order);
      clearCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setPlacing(false);
    }
  };

  if (successOrder) {
    return (
      <div className="container mt-5">
        <div className="alert alert-success">
          <h4 className="alert-heading">Order Confirmed!</h4>
          <p>Order ID: {successOrder._id}</p>
          <p className="mb-2">Thank you for shopping with us 🎉</p>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/cart")}
            >
              View Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3>Checkout</h3>
      <div className="row mt-3">
        <div className="col-md-7">
          <form onSubmit={placeOrder} className="card p-3 shadow-sm">
            <h5 className="mb-3">Shipping Address</h5>
            {error && (
              <div className="alert alert-danger py-2" role="alert">
                {error}
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street / Area"
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Postal Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                  placeholder="PIN Code"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Country</label>
              <input
                type="text"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
              />
            </div>
            <h5 className="mt-3 mb-2">Payment Method</h5>
            <div className="mb-3">
              <select
                className="form-control"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="cod">Cash on Delivery (Mock)</option>
                <option value="card">Card (Simulated)</option>
                <option value="wallet">Wallet/UPI (Simulated)</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={placing || cart.length === 0}
            >
              {placing ? "Placing Order..." : `Place Order (₹${cartTotal})`}
            </button>
          </form>
        </div>
        <div className="col-md-5 mt-4 mt-md-0">
          <div className="card p-3 shadow-sm">
            <h5 className="mb-3">Order Summary</h5>
            {cart.length === 0 ? (
              <p className="text-muted">Cart is empty.</p>
            ) : (
              <ul className="list-group mb-3">
                {cart.map((item) => (
                  <li
                    key={item._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span className="text-truncate" style={{ maxWidth: "60%" }}>
                      {item.name} × {item.qty || 1}
                    </span>
                    <strong>₹{item.price * (item.qty || 1)}</strong>
                  </li>
                ))}
              </ul>
            )}
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <strong>₹{cartTotal}</strong>
            </div>
            <div className="d-flex justify-content-between text-muted">
              <small>Shipping</small>
              <small>₹0 (Free)</small>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <span>Total</span>
              <strong>₹{cartTotal}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
