import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const totalItems = cart.reduce((s, p) => s + (p.qty || 0), 0);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar__brand">
          Mini E-Shop
        </Link>
        <div className="navbar__links">
          <Link
            to="/"
            className="navbar__link"
            onClick={() => window.dispatchEvent(new CustomEvent("refreshHome"))}
          >
            Home
          </Link>
          <Link to="/about" className="navbar__link">
            About
          </Link>
          <Link to="/contact" className="navbar__link">
            Contact
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {user ? (
            <>
              <span className="text-muted">Hello, {user.name}!</span>
              <button onClick={logout} className="btn btn--ghost btn-sm">
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="btn btn--ghost btn-sm">
              Login / Sign up
            </Link>
          )}
          <ThemeToggle />
          <Link to="/cart" className="btn btn--primary btn-sm">
            🛒 Cart ({totalItems})
          </Link>
        </div>
      </div>
    </nav>
  );
}
