// Use REACT_APP_API_URL (no trailing /api) so we can append endpoints consistently
export const API_BASE_URL = (process.env.REACT_APP_API_URL || "https://ecom-backend-c92s.onrender.com").replace(/\/$/, "") + "/api";
