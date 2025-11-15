import React, { useEffect, useState } from "react";

let idCounter = 0;

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const { message = "", type = "info", duration = 3000 } = e.detail || {};
      const id = ++idCounter;
      setToasts((t) => [...t, { id, message, type }]);
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, duration);
    };

    window.addEventListener("toast", handler);
    return () => window.removeEventListener("toast", handler);
  }, []);

  if (!toasts.length) return null;

  return (
    <div style={containerStyle} aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            ...toastStyle,
            ...(t.type === "success" ? successStyle : {}),
          }}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
};

const containerStyle = {
  position: "fixed",
  top: 16,
  right: 16,
  zIndex: 2000,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  // allow clicks to pass through the container except on the toast elements themselves
  pointerEvents: "none",
};

const toastStyle = {
  padding: "10px 14px",
  background: "rgba(15,23,42,0.95)",
  color: "#fff",
  borderRadius: 8,
  boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
  maxWidth: 320,
  // make individual toasts interactive
  pointerEvents: "auto",
};

const successStyle = {
  background: "linear-gradient(90deg,#10b981,#06b6d4)",
};

export default ToastContainer;
