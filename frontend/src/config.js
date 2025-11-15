// Central API base resolution (no trailing /api in env). We prefer local API during local dev.
const REMOTE_DEFAULT = "https://ecom-backend-c92s.onrender.com";

function resolveBase() {
  // 1) If running on localhost, prefer local backend
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return "http://localhost:5000";
    }
  }

  // 2) Else use env var if provided, otherwise fall back to remote default
  const fromEnv = process.env.REACT_APP_API_URL || REMOTE_DEFAULT;
  return fromEnv;
}

export const API_BASE_URL = resolveBase().replace(/\/$/, "") + "/api";
