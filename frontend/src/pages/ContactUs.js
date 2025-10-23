import React, { useState } from "react";
import { API_BASE_URL } from "../config";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // If you have a backend endpoint, post the message. Here we mock success.
      // const res = await fetch(`${API_BASE_URL}/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      // if (!res.ok) throw new Error('Network error');
      await new Promise((r) => setTimeout(r, 700));
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card" style={{ padding: "2rem" }}>
        <h2 style={{ color: "#0ea5e9", marginBottom: "0.5rem" }}>Contact Us</h2>
        <p className="text-muted" style={{ fontSize: "1.05rem" }}>
          Have a question or feedback? Send us a message and we'll get back to
          you soon.
        </p>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
          style={{ marginTop: "1.2rem" }}
        >
          {status === "sent" && (
            <div className="success-message">
              Message sent successfully — thank you!
            </div>
          )}
          {status === "error" && (
            <div className="error-message">
              There was an error sending your message.
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="form-control"
              rows={5}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setForm({ name: "", email: "", message: "" })}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
