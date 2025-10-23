import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "https://ecom-backend-c92s.onrender.com";

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true, // important for cookies/session
});

export default API;
