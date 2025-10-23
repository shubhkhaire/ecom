import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <div className="brand">Mini E-Shop</div>
        <div>
          <p className="text-muted">
            Small shop, big heart — curated products for everyday life.
          </p>
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
        <div>
          <p style={{ fontWeight: 700 }}>Subscribe</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}
          >
            <input
              className="form-control"
              aria-label="email"
              placeholder="Your email"
            />
            <button className="btn btn--mc" type="submit">
              Join
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
