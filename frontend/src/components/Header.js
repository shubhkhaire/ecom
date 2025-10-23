import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const totalItems = cart.reduce((s, p) => s + (p.qty || 0), 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Mini E-Shop
        </Link>
        <div className="d-flex align-items-center gap-3">
          {user ? (
            <>
              <span>Hello, {user.name}!</span>
              <Link to="/admin" className="btn btn-outline-secondary">
                Admin
              </Link>
              <button onClick={logout} className="btn btn-outline-danger">
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="btn btn-outline-secondary">
              Login / Sign up
            </Link>
          )}
          <Link to="/cart" className="btn btn-outline-primary">
            Cart ({totalItems})
          </Link>
        </div>
      </div>
    </nav>
  );
}
