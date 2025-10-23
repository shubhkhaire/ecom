import React from "react";

const AboutUs = () => {
  return (
    <div className="container mt-5">
      <div className="card" style={{ padding: "2rem" }}>
        <h2 style={{ color: "#6366f1", marginBottom: "0.5rem" }}>About Us</h2>
        <p className="text-muted" style={{ fontSize: "1.05rem" }}>
          Welcome to our store! We are a small team passionate about providing
          high-quality products and excellent customer service. Our mission is
          to make shopping online simple, enjoyable, and secure. We curate our
          selection carefully to bring you the best variety at competitive
          prices.
        </p>
        <p className="text-muted" style={{ fontSize: "1.05rem" }}>
          If you'd like to learn more, check out our Contact page to reach out
          directly. Thank you for supporting our small business.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
