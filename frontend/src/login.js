// login.js
import axios from "axios";

import { API_BASE_URL } from "./config";

const API_URL = `${API_BASE_URL}/api/auth`;

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  localStorage.setItem("user", JSON.stringify(response.data.user));
  return response.data.user;
};

export const register = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { username, email, password });
  return response.data.user;
};
