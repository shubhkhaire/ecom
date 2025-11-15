import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <div>
          <div className="brand">Mini E-Shop</div>
          <p
            className="text-muted"
            style={{ marginTop: "0.5rem", maxWidth: "300px" }}
          >
            Small shop, big heart — curated products for everyday life.
          </p>
        </div>

        <div>
          <p
            style={{
              fontWeight: 700,
              marginBottom: "0.8rem",
              color: "var(--text-primary)",
            }}
          >
            Quick Links
          </p>
          <div
            className="footer-links"
            style={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>

        <div>
          <p
            style={{
              fontWeight: 700,
              marginBottom: "0.8rem",
              color: "var(--text-primary)",
            }}
          >
            Stay Connected
          </p>
          <p
            className="text-muted"
            style={{ fontSize: "0.9rem", marginBottom: "0.8rem" }}
          >
            Subscribe to our newsletter for updates
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing!");
            }}
            style={{ display: "flex", gap: "0.5rem", marginTop: "0.8rem" }}
          >
            <input
              className="form-control"
              type="email"
              aria-label="email"
              placeholder="Your email"
              required
              style={{ flex: 1 }}
            />
            <button className="btn btn--mc" type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid var(--border-color)",
          color: "var(--text-muted)",
          fontSize: "0.9rem",
        }}
      >
        <p>© {new Date().getFullYear()} Mini E-Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
