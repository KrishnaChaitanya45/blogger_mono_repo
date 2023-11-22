import axios from "axios";
const BASE_URL = "http://localhost:5000";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosCredentialsInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
